"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { sendGTMEvent } from "@next/third-parties/google";
import { useQuoteModal } from "./QuoteModalProvider";
import { trackEvent } from "@/lib/tracking/events";
import { getAttribution } from "@/lib/tracking/attribution";

// ── Config ──────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "5561998630303";

// Dial codes for the phone field — Brazil first (primary market/default),
// then grouped roughly by relevance to an executive/diplomatic clientele.
const COUNTRY_CODES: { dial: string; flag: string; name: string }[] = [
  { dial: "55",  flag: "🇧🇷", name: "Brasil" },
  { dial: "1",   flag: "🇺🇸", name: "Estados Unidos" },
  { dial: "1",   flag: "🇨🇦", name: "Canadá" },
  { dial: "54",  flag: "🇦🇷", name: "Argentina" },
  { dial: "56",  flag: "🇨🇱", name: "Chile" },
  { dial: "598",  flag: "🇺🇾", name: "Uruguai" },
  { dial: "595",  flag: "🇵🇾", name: "Paraguai" },
  { dial: "51",  flag: "🇵🇪", name: "Peru" },
  { dial: "57",  flag: "🇨🇴", name: "Colômbia" },
  { dial: "58",  flag: "🇻🇪", name: "Venezuela" },
  { dial: "593",  flag: "🇪🇨", name: "Equador" },
  { dial: "591",  flag: "🇧🇴", name: "Bolívia" },
  { dial: "52",  flag: "🇲🇽", name: "México" },
  { dial: "351", flag: "🇵🇹", name: "Portugal" },
  { dial: "34",  flag: "🇪🇸", name: "Espanha" },
  { dial: "33",  flag: "🇫🇷", name: "França" },
  { dial: "49",  flag: "🇩🇪", name: "Alemanha" },
  { dial: "39",  flag: "🇮🇹", name: "Itália" },
  { dial: "44",  flag: "🇬🇧", name: "Reino Unido" },
  { dial: "41",  flag: "🇨🇭", name: "Suíça" },
  { dial: "31",  flag: "🇳🇱", name: "Países Baixos" },
  { dial: "32",  flag: "🇧🇪", name: "Bélgica" },
  { dial: "351", flag: "🇮🇪", name: "Irlanda" },
  { dial: "971", flag: "🇦🇪", name: "Emirados Árabes Unidos" },
  { dial: "966", flag: "🇸🇦", name: "Arábia Saudita" },
  { dial: "974", flag: "🇶🇦", name: "Catar" },
  { dial: "972", flag: "🇮🇱", name: "Israel" },
  { dial: "86",  flag: "🇨🇳", name: "China" },
  { dial: "81",  flag: "🇯🇵", name: "Japão" },
  { dial: "82",  flag: "🇰🇷", name: "Coreia do Sul" },
  { dial: "91",  flag: "🇮🇳", name: "Índia" },
  { dial: "65",  flag: "🇸🇬", name: "Singapura" },
  { dial: "27",  flag: "🇿🇦", name: "África do Sul" },
  { dial: "61",  flag: "🇦🇺", name: "Austrália" },
  { dial: "64",  flag: "🇳🇿", name: "Nova Zelândia" },
];

// ── Types ───────────────────────────────────────────────────────────
type Purpose = "empresa" | "trabalho" | "pessoa-fisica";

type FormData = {
  purpose: Purpose | "";
  serviceType: string;
  startDate: string;
  endDate: string;
  bilingualDriver: boolean;
  vehicleProtection: "blindado" | "convencional" | "";
  vehicleModel: string;
  additionalInfo: string;
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  position: string;
  company: string;
};

const initialData: FormData = {
  purpose: "",
  serviceType: "",
  startDate: "",
  endDate: "",
  bilingualDriver: false,
  vehicleProtection: "",
  vehicleModel: "",
  additionalInfo: "",
  fullName: "",
  email: "",
  countryCode: "55",
  phone: "",
  position: "",
  company: "",
};

// value = canonical PT (kept in the lead notification); key = i18n label lookup
const serviceTypes = [
  { value: "Transporte Executivo Corporativo", key: "corporativo" },
  { value: "Transfer Aeroporto",               key: "transferAeroporto" },
  { value: "Eventos e Congressos",             key: "eventos" },
  { value: "Cerimônias e Festas",              key: "cerimonias" },
  { value: "Visita Diplomática",               key: "diplomatica" },
  { value: "Atendimento Continuado",           key: "continuado" },
  { value: "Outro",                            key: "outro" },
];

const vehicleModels = [
  { value: "Sedan",        key: "sedan" },
  { value: "SUV",          key: "suv" },
  { value: "Van",          key: "van" },
  { value: "Minivan",      key: "minivan" },
  { value: "Micro-ônibus", key: "microOnibus" },
  { value: "Ônibus",       key: "onibus" },
];

// ── Component ───────────────────────────────────────────────────────
export default function QuoteModal() {
  const t = useTranslations("quoteModal");
  const tc = useTranslations("common");
  const { isOpen, close } = useQuoteModal();
  const [step, setStep]   = useState(1);
  const [data, setData]   = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [hasMoreBelow, setHasMoreBelow] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Show a "scroll for more" hint only while there's unseen content below
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;

    const check = () => {
      setHasMoreBelow(el.scrollHeight - el.scrollTop - el.clientHeight > 12);
    };

    check();
    el.addEventListener("scroll", check);
    const ro = new ResizeObserver(check);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", check);
      ro.disconnect();
    };
  }, [step, submitted]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      // Slight delay to avoid flicker during close transition
      const t = setTimeout(() => {
        setStep(1);
        setData(initialData);
        setErrors({});
        setSubmitted(false);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Body scroll lock + ESC
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  // ── Validation per step ───────────────────────────────────────────
  const validateStep = (s: number): boolean => {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (!data.purpose) e.purpose = t("step1.errorSelect");
      if (data.purpose === "trabalho") e.purpose = t("step1.blockTitle");
    } else if (s === 2) {
      if (!data.serviceType) e.serviceType = "Selecione o tipo de serviço.";
      if (!data.startDate)   e.startDate   = "Data de início é obrigatória.";
      if (!data.vehicleProtection) e.vehicleProtection = "Selecione um tipo de veículo.";
      if (!data.vehicleModel) e.vehicleModel = "Modelo do veículo é obrigatório.";
      if (!data.additionalInfo.trim()) e.additionalInfo = "Informações adicionais são obrigatórias.";
    } else if (s === 3) {
      if (!data.fullName.trim()) e.fullName = "Nome é obrigatório.";
      if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        e.email = "E-mail válido é obrigatório.";
      if (!data.phone.trim()) e.phone = "Telefone é obrigatório.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(3, s + 1));
  };

  const goBack = () => setStep((s) => Math.max(1, s - 1));

  // ── Submit ────────────────────────────────────────────────────────
  const buildMessage = () => {
    const purposeLabel = {
      "empresa": "Empresa / Empresário",
      "trabalho": "Oportunidade de trabalho",
      "pessoa-fisica": "Pessoa Física",
    }[data.purpose as Purpose] || "—";

    return [
      `*Nova Cotação — KMON VIP*`,
      ``,
      `*Categoria:* ${purposeLabel}`,
      `*Serviço:* ${data.serviceType}`,
      `*Início:* ${data.startDate}`,
      data.endDate ? `*Término:* ${data.endDate}` : "",
      `*Motorista bilíngue:* ${data.bilingualDriver ? "Sim" : "Não"}`,
      `*Tipo de veículo:* ${data.vehicleProtection}`,
      `*Modelo:* ${data.vehicleModel}`,
      ``,
      `*Informações adicionais:*`,
      data.additionalInfo,
      ``,
      `*Dados de contato:*`,
      `Nome: ${data.fullName}`,
      `E-mail: ${data.email}`,
      `Telefone: +${data.countryCode} ${data.phone}`,
      data.position ? `Cargo: ${data.position}` : "",
      data.company ? `Empresa: ${data.company}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  };

  const buildEmailHtml = () => {
    const purposeLabel = {
      "empresa": "Empresa / Empresário",
      "trabalho": "Oportunidade de trabalho",
      "pessoa-fisica": "Pessoa Física",
    }[data.purpose as Purpose] || "—";

    const rows: [string, string][] = [
      ["Categoria", purposeLabel],
      ["Serviço", data.serviceType],
      ["Início", formatDateBR(data.startDate)],
      ...(data.endDate ? ([["Término", formatDateBR(data.endDate)]] as [string, string][]) : []),
      ["Motorista bilíngue", data.bilingualDriver ? "Sim" : "Não"],
      ["Tipo de veículo", data.vehicleProtection === "blindado" ? "Blindado" : "Convencional"],
      ["Modelo", data.vehicleModel],
      ["Nome", data.fullName],
      ["E-mail", data.email],
      ["Telefone", `+${data.countryCode} ${data.phone}`],
      ...(data.position ? ([["Cargo", data.position]] as [string, string][]) : []),
      ...(data.company ? ([["Empresa", data.company]] as [string, string][]) : []),
    ];

    const rowsHtml = rows
      .map(
        ([label, value]) => `
        <tr>
          <td style="padding:10px 16px 10px 0;border-bottom:1px solid #E8E6DC;color:#6B6B66;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 0;border-bottom:1px solid #E8E6DC;color:#0A0A0A;font-size:14px;font-weight:500;">${escapeHtml(value)}</td>
        </tr>`
      )
      .join("");

    const firstName = data.fullName.trim().split(" ")[0] || "cliente";

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Nova solicitação de cotação — KMON VIP</title>
</head>
<body style="margin:0;padding:0;background:#F4F2EC;">
<div style="background:#F4F2EC;padding:32px 16px;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#FFFFFF;border-radius:16px;overflow:hidden;border:1px solid #E8E6DC;">
    <tr>
      <td style="background:#0A0A0A;padding:24px 32px;">
        <span style="color:#FFFFFF;font-size:20px;font-weight:700;letter-spacing:0.02em;">KMON <span style="color:#BFB08A;">VIP</span></span>
      </td>
    </tr>
    <tr>
      <td style="padding:32px;">
        <p style="margin:0 0 6px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;color:#BFB08A;">Nova solicitação de cotação</p>
        <h1 style="margin:0 0 24px;font-size:22px;font-weight:600;color:#0A0A0A;line-height:1.3;">${escapeHtml(data.fullName)}</h1>
        <a href="${waLink(data.countryCode, data.phone, firstName)}" style="display:inline-block;background:#25D366;color:#FFFFFF;text-decoration:none;padding:14px 26px;border-radius:999px;font-weight:600;font-size:14px;margin-bottom:28px;">Falar com ${escapeHtml(firstName)} no WhatsApp</a>
        <table role="presentation" width="100%" style="border-collapse:collapse;margin-top:8px;">${rowsHtml}
        </table>
        ${
          data.additionalInfo
            ? `<div style="margin-top:24px;">
          <p style="margin:0 0 6px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;color:#6B6B66;">Informações adicionais</p>
          <p style="margin:0;font-size:14px;color:#2A2A28;line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.additionalInfo)}</p>
        </div>`
            : ""
        }
      </td>
    </tr>
    <tr>
      <td style="padding:18px 32px;background:#F4F2EC;text-align:center;">
        <span style="font-size:11px;color:#B0AEA5;">Lead recebido via site KMON VIP</span>
      </td>
    </tr>
  </table>
</div>
</body>
</html>`;
  };

  const handleSubmit = () => {
    if (!validateStep(3)) return;

    const attribution = getAttribution();

    fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        html: buildEmailHtml(),
        text: buildMessage(),
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        countryCode: data.countryCode,
        company: data.company,
        position: data.position,
        purpose: data.purpose,
        serviceType: data.serviceType,
        vehicleProtection: data.vehicleProtection,
        ...attribution,
        landingPage: window.location.pathname,
      }),
    }).catch((err) => console.error("[KMON-LEAD] email send failed", err));

    sendGTMEvent({
      event: "quote_submitted",
      landing_page: window.location.pathname,
      purpose: data.purpose,
    });

    setSubmitted(true);
  };

  const openWhatsApp = () => {
    trackEvent({ eventType: "whatsapp_click", buttonId: "quote-success-whatsapp", buttonLocation: "quote-modal-success" });
    sendGTMEvent({ event: "whatsapp_click", button_location: "quote-modal-success" });
    const text = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={close}
        className="fixed inset-0 z-[80] transition-opacity duration-300"
        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Solicitar cotação"
        className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-6 pointer-events-none"
      >
        <div
          className="relative bg-white w-full max-w-xl pointer-events-auto rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-ink-100 shrink-0">
            <Image
              src="/images/logos/logo SVG KMON preta.svg"
              alt="KMON VIP"
              width={90}
              height={30}
              className="h-7 w-auto object-contain"
            />
            <button
              onClick={close}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-50 hover:bg-ink-100 transition-colors text-ink-700"
              aria-label="Fechar"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
            </button>
          </div>

          {/* Progress + Step label */}
          {!submitted && (
            <div className="px-6 pt-5 shrink-0">
              <div className="flex gap-2 mb-3">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className="flex-1 h-1 rounded-full transition-colors"
                    style={{
                      background:
                        s <= step ? "var(--brand-champagne)" : "var(--c-ink-100)",
                    }}
                  />
                ))}
              </div>
              <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500">
                {t("step", { current: step, total: 3 })}
              </span>
            </div>
          )}

          {/* Body — scrollable */}
          <div ref={bodyRef} className="flex-1 min-h-0 overflow-y-auto px-6 py-6">
            {submitted ? (
              <SuccessScreen
                onWhatsApp={openWhatsApp}
                onClose={close}
              />
            ) : step === 1 ? (
              <Step1 data={data} set={set} errors={errors} />
            ) : step === 2 ? (
              <Step2 data={data} set={set} errors={errors} />
            ) : (
              <Step3 data={data} set={set} errors={errors} />
            )}

            {/* Subtle "scroll for more" hint — sticks to the bottom of the
                scrollable viewport, only while there's unseen content below */}
            <div
              className={`pointer-events-none sticky bottom-0 left-0 right-0 -mb-6 flex justify-center pb-1.5 pt-6 transition-opacity duration-300 ${
                hasMoreBelow ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background: "linear-gradient(to bottom, transparent, var(--c-white) 65%)",
              }}
              aria-hidden="true"
            >
              <span className="text-[11px] text-ink-400">
                ↓ {tc("scrollForMore")}
              </span>
            </div>
          </div>

          {/* Footer buttons */}
          {!submitted && (
            <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-ink-100 bg-paper shrink-0">
              {step > 1 ? (
                <button
                  onClick={goBack}
                  className="px-6 py-3 rounded-full border border-ink-200 text-sm font-medium text-ink-700 hover:bg-white transition-colors"
                >
                  {tc("back")}
                </button>
              ) : (
                <span />
              )}
              {step < 3 ? (
                <button
                  onClick={goNext}
                  disabled={step === 1 && data.purpose === "trabalho"}
                  className="ml-auto inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-medium uppercase tracking-wider transition-all hover:shadow-lg active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
                  style={{ background: "var(--brand-champagne)", color: "var(--c-ink-900)" }}
                >
                  {t("next")}
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="ml-auto inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-medium uppercase tracking-wider transition-all hover:shadow-lg active:scale-[0.97]"
                  style={{ background: "var(--brand-champagne)", color: "var(--c-ink-900)" }}
                >
                  {t("submit")}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── Step 1: Purpose ────────────────────────────────────────────────
function Step1({
  data, set, errors,
}: {
  data: FormData;
  set: <K extends keyof FormData>(k: K, v: FormData[K]) => void;
  errors: Record<string, string>;
}) {
  const t = useTranslations("quoteModal");
  const opts: { value: Purpose; key: string }[] = [
    { value: "empresa",       key: "empresa" },
    { value: "pessoa-fisica", key: "pessoaFisica" },
    { value: "trabalho",      key: "trabalho" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-medium tracking-tight mb-6">{t("step1.title")}</h2>
      <div className="flex flex-col gap-3">
        {opts.map((o) => {
          const isActive = data.purpose === o.value;
          return (
            <label
              key={o.value}
              className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                isActive
                  ? "border-ink-900 bg-ink-50"
                  : "border-ink-200 hover:border-ink-300 bg-white"
              }`}
            >
              <input
                type="radio"
                name="purpose"
                value={o.value}
                checked={isActive}
                onChange={() => set("purpose", o.value)}
                className="sr-only"
              />
              <span
                className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  isActive ? "border-ink-900" : "border-ink-300"
                }`}
              >
                {isActive && (
                  <span className="h-2.5 w-2.5 rounded-full bg-ink-900" />
                )}
              </span>
              <span className="flex-1">
                <span className="block font-medium text-ink-900">{t(`step1.options.${o.key}.title`)}</span>
                <span className="block text-sm text-ink-500">{t(`step1.options.${o.key}.sub`)}</span>
              </span>
            </label>
          );
        })}
      </div>
      {errors.purpose && <p className="mt-3 text-sm text-red-600">{errors.purpose}</p>}

      {/* Block message when "Oportunidade de trabalho" selected */}
      {data.purpose === "trabalho" && (
        <div
          className="mt-6 rounded-xl border p-5"
          style={{
            background: "rgba(191,176,138,0.08)",
            borderColor: "rgba(191,176,138,0.35)",
          }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-ink-900 mb-2">
            {t("step1.blockTitle")}
          </p>
          <p className="text-sm text-ink-700 leading-relaxed">
            {t("step1.blockMessage")}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Step 2: Details ────────────────────────────────────────────────
function Step2({
  data, set, errors,
}: {
  data: FormData;
  set: <K extends keyof FormData>(k: K, v: FormData[K]) => void;
  errors: Record<string, string>;
}) {
  const t = useTranslations("quoteModal");
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl font-medium tracking-tight mb-1">{t("step2.title")}</h2>
      <p className="text-sm text-ink-500 -mt-3">{t("step2.subtitle")}</p>

      <Field label={`${t("step2.serviceType")} *`} error={errors.serviceType}>
        <select
          value={data.serviceType}
          onChange={(e) => set("serviceType", e.target.value)}
          className={inputCls(!!errors.serviceType)}
        >
          <option value="">{t("step2.selectPlaceholder")}</option>
          {serviceTypes.map((s) => (
            <option key={s.key} value={s.value}>{t(`step2.serviceOptions.${s.key}`)}</option>
          ))}
        </select>
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label={`${t("step2.startDate")} *`} error={errors.startDate}>
          <input
            type="date"
            value={data.startDate}
            onChange={(e) => set("startDate", e.target.value)}
            className={inputCls(!!errors.startDate)}
          />
        </Field>
        <Field label={t("step2.endDate")}>
          <input
            type="date"
            value={data.endDate}
            onChange={(e) => set("endDate", e.target.value)}
            className={inputCls(false)}
          />
        </Field>
      </div>

      {/* Toggle Motorista Bilíngue */}
      <label className="flex items-center gap-3 cursor-pointer select-none">
        <span
          className="relative inline-flex w-11 h-6 rounded-full transition-colors"
          style={{
            background: data.bilingualDriver ? "var(--brand-champagne)" : "var(--c-ink-200)",
          }}
        >
          <span
            className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform"
            style={{ transform: data.bilingualDriver ? "translateX(20px)" : "translateX(0)" }}
          />
          <input
            type="checkbox"
            checked={data.bilingualDriver}
            onChange={(e) => set("bilingualDriver", e.target.checked)}
            className="sr-only"
          />
        </span>
        <span className="text-sm font-medium text-ink-900">{t("step2.bilingual")}</span>
      </label>

      <Field label={`${t("step2.vehicleProtection")} *`} error={errors.vehicleProtection}>
        <div className="grid grid-cols-2 gap-3">
          {(["blindado", "convencional"] as const).map((v) => {
            const isActive = data.vehicleProtection === v;
            return (
              <label
                key={v}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  isActive ? "border-ink-900 bg-ink-50" : "border-ink-200 hover:border-ink-300"
                }`}
              >
                <input
                  type="radio"
                  name="vehicleProtection"
                  value={v}
                  checked={isActive}
                  onChange={() => set("vehicleProtection", v)}
                  className="sr-only"
                />
                <span
                  className={`h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isActive ? "border-ink-900" : "border-ink-300"
                  }`}
                >
                  {isActive && <span className="h-2 w-2 rounded-full bg-ink-900" />}
                </span>
                <span className="text-sm font-medium">{v === "blindado" ? t("step2.armored") : t("step2.conventional")}</span>
              </label>
            );
          })}
        </div>
      </Field>

      <Field label={`${t("step2.vehicleModel")} *`} error={errors.vehicleModel}>
        <select
          value={data.vehicleModel}
          onChange={(e) => set("vehicleModel", e.target.value)}
          className={inputCls(!!errors.vehicleModel)}
        >
          <option value="">{t("step2.selectModel")}</option>
          {vehicleModels.map((m) => (
            <option key={m.key} value={m.value}>{t(`step2.modelOptions.${m.key}`)}</option>
          ))}
        </select>
      </Field>

      <Field label={`${t("step2.additionalInfo")} *`} error={errors.additionalInfo}>
        <textarea
          value={data.additionalInfo}
          onChange={(e) => set("additionalInfo", e.target.value)}
          rows={3}
          placeholder={t("step2.placeholderAdditional")}
          className={inputCls(!!errors.additionalInfo)}
        />
      </Field>
    </div>
  );
}

// ─── Step 3: Contact ────────────────────────────────────────────────
function Step3({
  data, set, errors,
}: {
  data: FormData;
  set: <K extends keyof FormData>(k: K, v: FormData[K]) => void;
  errors: Record<string, string>;
}) {
  const t = useTranslations("quoteModal");
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-medium tracking-tight">{t("step3.title")}</h2>
      <p className="text-sm text-ink-500 -mt-2">
        {t("step3.subtitle")}
      </p>

      <Field label={`${t("step3.fullName")} *`} error={errors.fullName}>
        <input
          type="text"
          value={data.fullName}
          onChange={(e) => set("fullName", e.target.value)}
          placeholder={t("step3.placeholderName")}
          className={inputCls(!!errors.fullName)}
        />
      </Field>

      <Field label={`${t("step3.email")} *`} error={errors.email}>
        <input
          type="email"
          value={data.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder={t("step3.placeholderEmail")}
          className={inputCls(!!errors.email)}
        />
      </Field>

      <Field label={`${t("step3.phone")} *`} error={errors.phone}>
        <div className="flex gap-2">
          <select
            value={data.countryCode}
            onChange={(e) => set("countryCode", e.target.value)}
            aria-label={t("step3.countryCode")}
            className="shrink-0 rounded-lg border border-ink-200 bg-ink-50 px-2 py-3 text-base text-ink-700 font-medium outline-none focus:border-ink-900 focus:ring-1 focus:ring-ink-900/10"
          >
            {COUNTRY_CODES.map((c, i) => (
              <option key={`${c.dial}-${i}`} value={c.dial}>
                {c.flag} +{c.dial}
              </option>
            ))}
          </select>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder={t("step3.placeholderPhone")}
            className={inputCls(!!errors.phone)}
          />
        </div>
      </Field>

      {data.purpose !== "pessoa-fisica" && (
        <>
          <Field label={t("step3.position")}>
            <input
              type="text"
              value={data.position}
              onChange={(e) => set("position", e.target.value)}
              placeholder={t("step3.placeholderPosition")}
              className={inputCls(false)}
            />
          </Field>

          <Field label={t("step3.company")}>
            <input
              type="text"
              value={data.company}
              onChange={(e) => set("company", e.target.value)}
              placeholder={t("step3.placeholderCompany")}
              className={inputCls(false)}
            />
          </Field>
        </>
      )}
    </div>
  );
}

// ─── Success screen ─────────────────────────────────────────────────
function SuccessScreen({
  onWhatsApp, onClose,
}: {
  onWhatsApp: () => void;
  onClose: () => void;
}) {
  const t = useTranslations("quoteModal");
  const tc = useTranslations("common");
  return (
    <div className="text-center py-6">
      <div
        className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
        style={{ background: "var(--brand-champagne)" }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h3 className="text-2xl font-medium tracking-tight mb-3">{t("success.title")}</h3>
      <p className="text-sm text-ink-500 leading-relaxed mb-8 max-w-sm mx-auto">
        {t("success.subtitle")}
      </p>

      <div className="flex flex-col gap-3 max-w-xs mx-auto">
        <button
          onClick={onWhatsApp}
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-medium text-sm text-white transition-transform active:scale-[0.97]"
          style={{ background: "#25D366" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
          </svg>
          {tc("talkOnWhatsApp")}
        </button>
        <button
          onClick={onClose}
          className="text-xs text-ink-500 hover:text-ink-900 transition-colors mt-2"
        >
          {tc("close")}
        </button>
      </div>
    </div>
  );
}

// ─── Shared field components ────────────────────────────────────────
function Field({
  label, error, children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-[0.08em] text-ink-700 mb-2">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return `w-full px-4 py-3 rounded-lg border bg-white text-base text-ink-900 placeholder:text-ink-300 outline-none transition-colors focus:border-ink-900 focus:ring-1 focus:ring-ink-900/10 ${
    hasError ? "border-red-500" : "border-ink-200"
  }`;
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDateBR(iso: string) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function waLink(countryCode: string, phone: string, firstName: string) {
  const digits = phone.replace(/\D/g, "");
  const greeting = encodeURIComponent(
    `Olá, ${firstName}! Recebemos sua solicitação de cotação na KMON VIP e gostaria de dar continuidade ao seu atendimento.`
  );
  return `https://wa.me/${countryCode}${digits}?text=${greeting}`;
}
