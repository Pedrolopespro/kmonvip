export type EventType = "whatsapp_click" | "form_submission" | "phone_click";

export type LeadStatus =
  | "novo"
  | "em_atendimento"
  | "qualificado"
  | "proposta_enviada"
  | "fechado"
  | "perdido";

export const LEAD_STATUSES: LeadStatus[] = [
  "novo",
  "em_atendimento",
  "qualificado",
  "proposta_enviada",
  "fechado",
  "perdido",
];

export type TrackingEventInput = {
  eventType: EventType;
  pageUrl?: string | null;
  pageTitle?: string | null;
  buttonId?: string | null;
  buttonText?: string | null;
  buttonLocation?: string | null;
  service?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmContent?: string | null;
  utmTerm?: string | null;
  gclid?: string | null;
  fbclid?: string | null;
  referrer?: string | null;
  deviceType?: string | null;
  ipHash?: string | null;
  metadata?: Record<string, unknown> | null;
};

export type TrackingEventRow = {
  id: number;
  event_type: EventType;
  page_url: string | null;
  page_title: string | null;
  button_id: string | null;
  button_text: string | null;
  button_location: string | null;
  service: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  gclid: string | null;
  fbclid: string | null;
  referrer: string | null;
  device_type: string | null;
  created_at: string;
};

export type LeadInput = {
  name: string;
  companyName?: string | null;
  phone?: string | null;
  email?: string | null;
  serviceInterest?: string | null;
  serviceCity?: string | null;
  source?: string | null;
  medium?: string | null;
  campaign?: string | null;
  conversionPage?: string | null;
  gclid?: string | null;
  fbclid?: string | null;
  utmTerm?: string | null;
  utmContent?: string | null;
  notes?: string | null;
};

export type LeadRow = {
  id: number;
  name: string;
  company_name: string | null;
  phone: string | null;
  phone_normalized: string | null;
  email: string | null;
  service_interest: string | null;
  service_city: string | null;
  source: string | null;
  medium: string | null;
  campaign: string | null;
  conversion_page: string | null;
  gclid: string | null;
  fbclid: string | null;
  utm_term: string | null;
  utm_content: string | null;
  status: LeadStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type LeadFilters = {
  search?: string;
  status?: LeadStatus;
  source?: string;
  from?: string; // ISO date
  to?: string; // ISO date
  limit?: number;
  offset?: number;
};
