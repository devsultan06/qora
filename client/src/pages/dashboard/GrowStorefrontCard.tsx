import { useState } from "react";
import { Check, Copy, ExternalLink, MessageCircle } from "lucide-react";

interface GrowStorefrontCardProps {
  storeName?: string;
  storeSlug?: string;
}

export default function GrowStorefrontCard({
  storeName = "Sultan",
  storeSlug = "sultan",
}: GrowStorefrontCardProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  const origin = typeof window !== "undefined" && window.location.origin
    ? window.location.origin
    : "https://www.etura.ng";
  const storeUrl = `${origin}/store/${storeSlug}`;
  const promoMessage = `Check out ${storeName}'s catalogue: ${storeUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(storeUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(promoMessage);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2000);
  };

  const handleShareWhatsAppStatus = () => {
    const encoded = encodeURIComponent(promoMessage);
    const url = `https://api.whatsapp.com/send?text=${encoded}`;
    if (navigator.share && /mobile|android|iphone|ipad/i.test(navigator.userAgent)) {
      navigator.share({
        title: `${storeName}'s catalogue`,
        text: promoMessage,
        url: storeUrl,
      }).catch(() => {
        window.open(url, "_blank");
      });
    } else {
      window.open(url, "_blank");
    }
  };

  return (
    <div className="dash-panel-card" style={{ marginTop: 24 }}>
      <div className="panel-card-head">
        <div>
          <h2>Grow your storefront</h2>
          <p>Share your catalogue across social channels to drive direct orders.</p>
        </div>
        <a
          href={`/store/${storeSlug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="header-btn-view"
        >
          View Storefront <ExternalLink size={12} />
        </a>
      </div>

      <div className="grow-items-grid">
        {/* Instagram Bio */}
        <div className="grow-item-box">
          <span className="grow-item-label">For your Instagram bio</span>
          <div className="grow-link-row">
            <span className="grow-url-text">{storeUrl}</span>
            <button
              type="button"
              className={`grow-action-btn ${copiedLink ? "copied" : ""}`}
              onClick={handleCopyLink}
            >
              {copiedLink ? <Check size={13} /> : <Copy size={13} />}
              <span>{copiedLink ? "Copied" : "Copy link"}</span>
            </button>
          </div>
        </div>

        {/* WhatsApp Status */}
        <div className="grow-item-box">
          <span className="grow-item-label">Share to WhatsApp Status</span>
          <button
            type="button"
            className="grow-whatsapp-btn"
            onClick={handleShareWhatsAppStatus}
          >
            <MessageCircle size={15} />
            <span>Share to WhatsApp Status</span>
          </button>
          <span className="grow-caption">
            Opens your phone&apos;s share menu — pick WhatsApp, then Status.
          </span>
        </div>

        {/* Share this storefront your way */}
        <div className="grow-item-box">
          <span className="grow-item-label">Share this storefront, your way</span>
          <div className="grow-message-row">
            <p className="grow-message-text">{promoMessage}</p>
            <button
              type="button"
              className={`grow-action-btn ${copiedMsg ? "copied" : ""}`}
              onClick={handleCopyMessage}
            >
              {copiedMsg ? <Check size={13} /> : <Copy size={13} />}
              <span>{copiedMsg ? "Copied" : "Copy message"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
