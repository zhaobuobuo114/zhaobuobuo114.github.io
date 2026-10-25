import { useRef } from 'react'
import { ArrowUpRight, Check, Copy, QrCode } from 'lucide-react'
import LangSwap from './LangSwap.jsx'
import { useLiquidLight } from '../hooks/useLiquidLight.js'
import { useApp } from '../store.jsx'

/* 联系渠道卡片：沿用仓库卡片的液态玻璃光源
   主卡放大号码与动作；群卡带二维码缩略图；compact 用于底部三张渠道卡 */
export default function ContactCard({
  icon: Icon,
  label,
  value,
  hint,
  href,
  action,
  qr,
  qrLabel,
  primary = false,
  longValue = false,
  compact = false,
  copied = false,
  onCopy,
  onShowQr
}) {
  const { t, staticMode } = useApp()
  const cardRef = useRef(null)
  const lightHandlers = useLiquidLight(cardRef, { enabled: !staticMode })

  return (
    <article
      ref={cardRef}
      className={`contact-card glass-card${primary ? ' contact-card-primary' : ''}${compact ? ' contact-card-compact' : ''}${longValue ? ' contact-card-long' : ''}`}
      {...lightHandlers}
    >
      <span className="liquid-edge liquid-edge-top" aria-hidden="true" />
      <span className="liquid-edge liquid-edge-right" aria-hidden="true" />
      <span className="liquid-edge liquid-edge-bottom" aria-hidden="true" />
      <span className="liquid-edge liquid-edge-left" aria-hidden="true" />
      {primary && <span className="contact-signal" aria-hidden="true" />}

      <div className="contact-card-inner">
        <div className="contact-card-head">
          <span className="contact-icon">
            <Icon size={primary ? 19 : 16} strokeWidth={1.9} aria-hidden="true" />
          </span>
          <span className="contact-label">
            <LangSwap>{label}</LangSwap>
          </span>
          {primary && (
            <span className="contact-primary-badge">
              <LangSwap>{t('contact.primary')}</LangSwap>
            </span>
          )}
        </div>

        <div className={primary ? 'contact-primary-body' : 'contact-body'}>
          <div className="contact-value-wrap">
            <p className="contact-value">{value}</p>
            {hint && (
              <p className="contact-hint">
                <LangSwap>{hint}</LangSwap>
              </p>
            )}
          </div>

          {qr && (
            <button
              type="button"
              className="contact-qr-thumb"
              onClick={onShowQr}
              aria-label={qrLabel}
              title={qrLabel}
            >
              <img src={qr} alt={qrLabel} />
              <span>
                <QrCode size={11} aria-hidden="true" />
                <LangSwap>{qrLabel}</LangSwap>
              </span>
            </button>
          )}
        </div>

        <div className="contact-actions">
          <button
            type="button"
            className="contact-act"
            data-copied={copied ? '1' : '0'}
            onClick={() => onCopy(value, label)}
            aria-label={`${t('contact.copy')} ${label}`}
          >
            {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
            <LangSwap>{copied ? t('contact.copied') : t('contact.copy')}</LangSwap>
          </button>

          {href && (
            <a
              className={`contact-act ${primary ? 'contact-act-primary' : 'contact-act-link'}`}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            >
              <LangSwap>{action}</LangSwap>
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}