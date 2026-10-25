import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import LangSwap from './LangSwap.jsx'
import { useApp } from '../store.jsx'

/* QQ 群二维码弹层：点击卡片缩略图打开，支持 Esc / 点击遮罩关闭 */
export default function QrModal({ open, src, group, joinHref, onClose }) {
  const { t } = useApp()
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="contact-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            className="contact-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-qr-title"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              ref={closeRef}
              type="button"
              className="contact-modal-close"
              onClick={onClose}
              aria-label={t('contact.close')}
            >
              <X size={16} aria-hidden="true" />
            </button>

            <h2 id="contact-qr-title" className="contact-modal-title font-display">
              <LangSwap>{t('contact.qrTitle')}</LangSwap>
            </h2>
            <img className="contact-modal-qr" src={src} alt={t('contact.qrTitle')} />
            <p className="contact-modal-group">{group}</p>
            <p className="contact-modal-hint">
              <LangSwap>{t('contact.qrHint')}</LangSwap>
            </p>
            <a
              className="contact-modal-link"
              href={joinHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LangSwap>{t('contact.join')}</LangSwap>
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}