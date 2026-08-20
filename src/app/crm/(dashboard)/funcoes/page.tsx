"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { FormField, inputCls, PrimaryButton } from "@/components/crm/FormField";

type WhatsappFloatingConfig = {
  enabled: boolean;
  number: string;
};

function formatNumberDisplay(digits: string) {
  // Best-effort BR-shaped display for the common case (55 + 2-digit DDD + number);
  // falls back to the raw digits for any other country code / length.
  const m = digits.match(/^55(\d{2})(\d{4,5})(\d{4})$/);
  if (!m) return digits;
  return `+55 (${m[1]}) ${m[2]}-${m[3]}`;
}

export default function CrmFuncoesPage() {
  const [loading, setLoading] = useState(true);
  const [enabled, setEnabled] = useState(true);
  const [number, setNumber] = useState("");
  const [savedNumber, setSavedNumber] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    fetch("/api/crm/settings/whatsapp-floating")
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((json: { ok: boolean; config: WhatsappFloatingConfig }) => {
        if (json.ok) {
          setEnabled(json.config.enabled);
          setNumber(json.config.number);
          setSavedNumber(json.config.number);
        }
      })
      .catch(() => setError("Não foi possível carregar as configurações."))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    setError(null);
    setJustSaved(false);

    const res = await fetch("/api/crm/settings/whatsapp-floating", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled, number }),
    });
    const json = await res.json();
    setSaving(false);

    if (!res.ok || !json.ok) {
      setError(json.error ?? "Não foi possível salvar. Tente novamente.");
      return;
    }
    setEnabled(json.config.enabled);
    setNumber(json.config.number);
    setSavedNumber(json.config.number);
    setJustSaved(true);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium text-ink-900">Funções do site</h1>
        <p className="text-sm text-ink-500 max-w-2xl mt-1">
          Liga e desliga comportamentos do site ao vivo, sem precisar de deploy. Mais controles chegam aqui com o tempo.
        </p>
      </div>

      {loading ? (
        <div className="rounded-xl border border-ink-100 bg-white p-6 text-sm text-ink-500">Carregando...</div>
      ) : (
        <div className="rounded-xl border border-ink-100 bg-white p-6 max-w-xl">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
              <MessageCircle size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-medium text-ink-900">WhatsApp flutuante</h2>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${
                    enabled ? "bg-accent-green/20 text-ink-900" : "bg-ink-100 text-ink-500"
                  }`}
                >
                  {enabled ? "Ativo" : "Oculto"}
                </span>
              </div>
              <p className="text-sm text-ink-500 mt-1">
                Botão fixo no canto inferior direito de todas as páginas do site.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <span
                className="relative inline-flex w-11 h-6 rounded-full transition-colors shrink-0"
                style={{ background: enabled ? "var(--brand-champagne)" : "var(--c-ink-200)" }}
              >
                <span
                  className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform"
                  style={{ transform: enabled ? "translateX(20px)" : "translateX(0)" }}
                />
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => {
                    setEnabled(e.target.checked);
                    setJustSaved(false);
                  }}
                  className="sr-only"
                />
              </span>
              <span className="text-sm font-medium text-ink-900">
                Exibir o botão flutuante no site
              </span>
            </label>

            <FormField label="Número do WhatsApp">
              <input
                type="text"
                value={number}
                onChange={(e) => {
                  setNumber(e.target.value);
                  setJustSaved(false);
                }}
                placeholder="556199999999"
                className={inputCls()}
              />
              <p className="mt-1.5 text-xs text-ink-400">
                Código do país + DDD + número, só dígitos. Ex: 556199999999. Hoje: {formatNumberDisplay(savedNumber)}
              </p>
            </FormField>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex items-center gap-3 pt-1">
              <PrimaryButton onClick={handleSave} disabled={saving}>
                {saving ? "Salvando..." : "Salvar"}
              </PrimaryButton>
              {justSaved && (
                <span className="text-xs text-ink-500">Salvo — já vale para o site.</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
