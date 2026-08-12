"use client";

import { useState } from "react";
import { FormField, inputCls, PrimaryButton, SecondaryButton } from "./FormField";
import { LEAD_STATUSES, type LeadRow, type LeadStatus } from "@/lib/crm/types";

const STATUS_LABELS: Record<LeadStatus, string> = {
  novo: "Novo",
  em_atendimento: "Em atendimento",
  qualificado: "Qualificado",
  proposta_enviada: "Proposta enviada",
  fechado: "Fechado",
  perdido: "Perdido",
};

export default function LeadModal({
  lead,
  onClose,
  onSaved,
}: {
  lead: LeadRow | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState(lead?.name ?? "");
  const [companyName, setCompanyName] = useState(lead?.company_name ?? "");
  const [phone, setPhone] = useState(lead?.phone ?? "");
  const [email, setEmail] = useState(lead?.email ?? "");
  const [serviceInterest, setServiceInterest] = useState(lead?.service_interest ?? "");
  const [serviceCity, setServiceCity] = useState(lead?.service_city ?? "");
  const [status, setStatus] = useState<LeadStatus>(lead?.status ?? "novo");
  const [notes, setNotes] = useState(lead?.notes ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    if (!name.trim()) {
      setError("Nome é obrigatório.");
      return;
    }
    setSaving(true);
    setError(null);

    const url = lead ? `/api/crm/leads/${lead.id}` : "/api/crm/leads";
    const method = lead ? "PATCH" : "POST";
    const body = lead
      ? { name, companyName, phone, email, serviceInterest, serviceCity, status, notes }
      : { name, companyName, phone, email, serviceInterest, serviceCity, notes };

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setSaving(false);

    if (!res.ok) {
      setError("Não foi possível salvar. Tente novamente.");
      return;
    }
    onSaved();
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-medium text-ink-900 mb-6">{lead ? "Editar lead" : "Novo lead"}</h2>

        <div className="space-y-4">
          <FormField label="Nome">
            <input className={inputCls()} value={name} onChange={(e) => setName(e.target.value)} />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Empresa">
              <input className={inputCls()} value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            </FormField>
            <FormField label="Telefone">
              <input className={inputCls()} value={phone} onChange={(e) => setPhone(e.target.value)} />
            </FormField>
          </div>
          <FormField label="E-mail">
            <input className={inputCls()} value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Serviço de interesse">
              <input className={inputCls()} value={serviceInterest} onChange={(e) => setServiceInterest(e.target.value)} />
            </FormField>
            <FormField label="Cidade do atendimento">
              <input className={inputCls()} value={serviceCity} onChange={(e) => setServiceCity(e.target.value)} />
            </FormField>
          </div>
          {lead && (
            <FormField label="Status">
              <select className={inputCls()} value={status} onChange={(e) => setStatus(e.target.value as LeadStatus)}>
                {LEAD_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </FormField>
          )}
          <FormField label="Observação" error={error ?? undefined}>
            <textarea
              className={inputCls()}
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </FormField>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <SecondaryButton type="button" onClick={onClose}>
            Cancelar
          </SecondaryButton>
          <PrimaryButton type="button" onClick={handleSave} disabled={saving}>
            {saving ? "Salvando..." : "Salvar"}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
