import { useState } from "react";
import { Check, Copy, ExternalLink, MessageCircle, X } from "lucide-react";

interface GrowStorefrontModalProps {
  isOpen: boolean;
  onClose: () => void;
  storeName?: string;
  storeSlug?: string;
}

export default function GrowStorefrontModal({
  isOpen,
  onClose,
  storeName = "Sultan Store",
  storeSlug = "sultan",
}: GrowStorefrontModalProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  if (!isOpen) return null;

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
        title: `${storeName} Catalogue`,
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
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-box grow-modal-box"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-box-header">
          <div>
            <h3>Grow your storefront</h3>
            <p className="modal-subtitle">
              Share your catalogue link across channels to drive direct orders.
            </p>
          </div>
          <button
            type="button"
            className="modal-x"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grow-modal-content">
          {/* 1. Instagram Bio */}
          <div className="grow-block">
            <label className="grow-label">For your Instagram bio</label>
            <div className="grow-input-btn-group">
              <input
                type="text"
                className="grow-input-mono"
                value={storeUrl}
                readOnly
              />
              <button
                type="button"
                className={`grow-btn-copy ${copiedLink ? "copied" : ""}`}
                onClick={handleCopyLink}
              >
                {copiedLink ? <Check size={13} /> : <Copy size={13} />}
                <span>{copiedLink ? "Copied" : "Copy link"}</span>
              </button>
            </div>
          </div>

          {/* 2. WhatsApp Status */}
          <div className="grow-block">
            <label className="grow-label">Share to WhatsApp Status</label>
            <button
              type="button"
              className="btn-whatsapp-status"
              onClick={handleShareWhatsAppStatus}
            >
              <MessageCircle size={16} />
              <span>Share to WhatsApp Status</span>
            </button>
            <span className="grow-subtext">
              Opens your phone&apos;s share menu — pick WhatsApp, then Status.
            </span>
          </div>

          {/* 3. Share this storefront, your way */}
          <div className="grow-block">
            <label className="grow-label">Share this storefront, your way</label>
            <div className="grow-msg-card">
              <p className="grow-msg-text">{promoMessage}</p>
              <button
                type="button"
                className={`grow-btn-copy-msg ${copiedMsg ? "copied" : ""}`}
                onClick={handleCopyMessage}
              >
                {copiedMsg ? <Check size={13} /> : <Copy size={13} />}
                <span>{copiedMsg ? "Copied message" : "Copy message"}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grow-modal-footer">
          <a
            href={`/store/${storeSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="grow-modal-preview-link"
          >
            <span>Preview live storefront</span>
            <ExternalLink size={12} />
          </a>
          <button
            type="button"
            className="btn-cancel"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
