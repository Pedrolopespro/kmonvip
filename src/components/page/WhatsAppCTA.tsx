"use client";

import { trackEvent } from "@/lib/tracking/events";
import { sendGTMEvent } from "@next/third-parties/google";
import { BRAND_WHATSAPP } from "@/lib/seo/constants";

type Props = {
  /** Pre-filled first message. Identifies which landing page the lead came from,
   * which is the whole point — a bare wa.me click arrives anonymous. */
  message: string;
  buttonId: string;
  buttonLocation: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function WhatsAppCTA({
  message,
  buttonId,
  buttonLocation,
  children,
  className,
  style,
}: Props) {
  const href = `https://wa.me/${BRAND_WHATSAPP}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        trackEvent({ eventType: "whatsapp_click", buttonId, buttonLocation });
        sendGTMEvent({ event: "whatsapp_click", button_location: buttonLocation });
      }}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}
