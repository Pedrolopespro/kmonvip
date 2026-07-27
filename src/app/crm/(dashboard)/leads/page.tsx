"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Download } from "lucide-react";
import { inputCls, PrimaryButton } from "@/components/crm/FormField";
import LeadModal from "@/components/crm/LeadModal";
import { LEAD_STATUSES, type LeadRow, type LeadStatus } from "@/lib/crm/types";

const STATUS_LABELS: Record<LeadStatus, string> = {
  novo: "Novo",
  em_atendimento: "Em atendimento",
  qualificado: "Qualificado",
  proposta_enviada: "Proposta enviada",
  fechado: "Fechado",
  perdido: "Perdido",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR");
}

export default function CrmLeadsPage() {
  const [rows, setRows] = useState<LeadRow[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalLead, setModalLead] = useState<LeadRow | null | "new">(null);

  const fetchLeads = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (status) params.set("status", status);
    if (from) params.set("from", from);
    if (to) params.set("to", to);

    fetch(`/api/crm/leads?${params.toString()}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (json?.ok) setRows(json.rows);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [search, status, from, to]);

  useEffect(() => {
    const timeout = setTimeout(fetchLeads, 250);
    return () => clearTimeout(timeout);
  }, [fetchLeads]);

  const exportHref = useMemo(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (status) params.set("status", status);
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    const qs = params.toString();
    return `/api/crm/leads/export${qs ? `?${qs}` : ""}`;
  }, [search, status, from, to]);

  async function handleStatusChange(id: number, newStatus: LeadStatus) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
    await fetch(`/api/crm/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-medium text-ink-900">Leads</h1>
        <div className="flex items-center gap-3">
          <a
            href={exportHref}
            className="px-6 py-3 rounded-full border border-ink-200 text-sm font-medium text-ink-700 hover:bg-white transition-colors flex items-center gap-2"
          >
            <Download size={16} /> Exportar CSV
          </a>
          <PrimaryButton type="button" onClick={() => setModalLead("new")} className="flex items-center gap-2">
            <Plus size={16} /> Novo lead
          </PrimaryButton>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <input
          placeholder="Buscar por nome, telefone ou empresa"
          className={`${inputCls()} max-w-xs`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className={`${inputCls()} max-w-[180px]`} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Todos os status</option>
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
        <input type="date" className={`${inputCls()} max-w-[160px]`} value={from} onChange={(e) => setFrom(e.target.value)} />
        <input type="date" className={`${inputCls()} max-w-[160px]`} value={to} onChange={(e) => setTo(e.target.value)} />
      </div>

      <div className="overflow-x-auto rounded-xl border border-ink-100 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-100 bg-ink-50 text-left">
              <th className="px-4 py-3 font-medium text-ink-700">Nome</th>
              <th className="px-4 py-3 font-medium text-ink-700">Empresa</th>
              <th className="px-4 py-3 font-medium text-ink-700">Telefone</th>
              <th className="px-4 py-3 font-medium text-ink-700">Serviço</th>
              <th className="px-4 py-3 font-medium text-ink-700">Origem</th>
              <th className="px-4 py-3 font-medium text-ink-700">Status</th>
              <th className="px-4 py-3 font-medium text-ink-700">Entrada</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-ink-500">
                  Carregando...
                </td>
              </tr>
            )}
            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-ink-500">
                  Nenhum lead encontrado.
                </td>
              </tr>
            )}
            {rows.map((lead) => (
              <tr key={lead.id} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/50">
                <td className="px-4 py-3 font-medium text-ink-900 whitespace-nowrap">{lead.name}</td>
                <td className="px-4 py-3 text-ink-500 whitespace-nowrap">{lead.company_name ?? "—"}</td>
                <td className="px-4 py-3 text-ink-500 whitespace-nowrap">{lead.phone ?? "—"}</td>
                <td className="px-4 py-3 text-ink-500 whitespace-nowrap">{lead.service_interest ?? "—"}</td>
                <td className="px-4 py-3 text-ink-500 whitespace-nowrap">{lead.source ?? "Direto"}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <select
                    className="rounded-full border border-ink-200 bg-white px-2 py-1 text-xs"
                    value={lead.status}
                    onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                  >
                    {LEAD_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {STATUS_LABELS[s]}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 text-ink-500 whitespace-nowrap">{formatDate(lead.created_at)}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <button
                    onClick={() => setModalLead(lead)}
                    className="text-xs font-medium text-ink-700 hover:text-ink-900 underline"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalLead && (
        <LeadModal
          lead={modalLead === "new" ? null : modalLead}
          onClose={() => setModalLead(null)}
          onSaved={() => {
            setModalLead(null);
            fetchLeads();
          }}
        />
      )}
    </div>
  );
}
