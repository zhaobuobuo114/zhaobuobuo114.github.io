import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, Check, Mail, MessageCircle, MessageSquareText, Tv, Users } from 'lucide-react'
import SiteHeader from '../components/SiteHeader.jsx'
import LangSwap from '../components/LangSwap.jsx'
import ContactCard from '../components/ContactCard.jsx'
import QrModal from '../components/QrModal.jsx'
import { copyText } from '../lib/clipboard.js'
import { useApp } from '../store.jsx'

const EASE_OUT = [0.22, 1, 0.36, 1]

/* 联系方式配置：值保持原文，不随语言切换 */
const QQ = '1071576270'
const QQ_GROUP = '784757608'
const EMAIL = '1071576270@qq.com'
const WECHAT = 'zhao114514b'
const BILI_UID = '1724047245'
const QQ_CHAT = `https://wpa.qq.com/msgrd?v=3&uin=${QQ}&site=qq&menu=yes`
const QQ_GROUP_JOIN = 'https://qm.qq.com/q/gjfpPcb2Ja'
const BILI_SPACE = `https://space.bilibili.com/${BILI_UID}`
const QR_SRC = `${import.meta.env.BASE_URL}assets/qq-group-qr.png`

/* 联系我们：顶部胶囊进入；邮箱主卡 + 群卡（二维码） + QQ / 微信 / B 站 */
export default function Contact() {
  const { t, lang, staticMode } = useApp()
  const [copied, setCopied] = useState(null)
  const [toast, setToast] = useState(null)
  const [qrOpen, setQrOpen] = useState(false)
  const timerRef = useRef(0)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const closeQr = useCallback(() => setQrOpen(false), [])

  const handleCopy = async (value, label) => {
    const ok = await copyText(value)
    clearTimeout(timerRef.current)

    if (!ok) {
      setToast({ ok: false, text: t('contact.copyFailed') })
      timerRef.current = setTimeout(() => setToast(null), 2200)
      return
    }

    setCopied(label)
    const sep = lang === 'zh' ? '：' : ': '
    setToast({ ok: true, text: `${t('contact.copied')} ${label}${sep}${value}` })
    timerRef.current = setTimeout(() => {
      setCopied(null)
      setToast(null)
    }, 2000)
  }

  const delay = (i) => (staticMode ? 0 : 0.5 + i * 0.06)
  const enter = staticMode ? false : { opacity: 0, y: 12, filter: 'blur(6px)' }
  const show = { opacity: 1, y: 0, filter: 'blur(0px)' }

  const channels = [
    {
      key: 'qq',
      icon: MessageSquareText,
      label: t('contact.qq'),
      value: QQ,
      hint: t('contact.qqHint'),
      href: QQ_CHAT,
      action: t('contact.chat')
    },
    {
      key: 'wechat',
      icon: MessageCircle,
      label: t('contact.wechat'),
      value: WECHAT,
      hint: t('contact.wechatHint')
    },
    {
      key: 'bilibili',
      icon: Tv,
      label: t('contact.bilibili'),
      value: BILI_UID,
      hint: t('contact.bilibiliHint'),
      href: BILI_SPACE,
      action: t('contact.visit')
    }
  ]

  return (
    <div className="repo-page">
      <SiteHeader brandLink />

      <main className="contact-main">
        <motion.header
          className="contact-hero"
          initial={staticMode ? false : { opacity: 0, y: 10, filter: 'blur(5px)' }}
          animate={show}
          transition={{ duration: 0.55, delay: 0.42, ease: EASE_OUT }}
        >
          <p className="contact-eyebrow">CONTACT</p>
          <h1 className="contact-title font-display">
            <LangSwap>{t('contact.title')}</LangSwap>
          </h1>
          <p className="contact-sub">
            <LangSwap>{t('contact.sub')}</LangSwap>
          </p>
        </motion.header>

        <div className="contact-grid">
          <motion.div
            initial={enter}
            animate={show}
            transition={{ duration: 0.55, delay: delay(0), ease: EASE_OUT }}
          >
            <ContactCard
              primary
              longValue
              icon={Mail}
              label={t('contact.email')}
              value={EMAIL}
              hint={t('contact.emailHint')}
              href={`mailto:${EMAIL}`}
              action={t('contact.open')}
              copied={copied === t('contact.email')}
              onCopy={handleCopy}
            />
          </motion.div>

          <motion.div
            initial={enter}
            animate={show}
            transition={{ duration: 0.55, delay: delay(1), ease: EASE_OUT }}
          >
            <ContactCard
              icon={Users}
              label={t('contact.group')}
              value={QQ_GROUP}
              hint={t('contact.groupHint')}
              href={QQ_GROUP_JOIN}
              action={t('contact.join')}
              qr={QR_SRC}
              qrLabel={t('contact.showQr')}
              copied={copied === t('contact.group')}
              onCopy={handleCopy}
              onShowQr={() => setQrOpen(true)}
            />
          </motion.div>
        </div>

        <div className="contact-bottom">
          {channels.map((c, i) => (
            <motion.div
              key={c.key}
              initial={enter}
              animate={show}
              transition={{ duration: 0.55, delay: delay(i + 2), ease: EASE_OUT }}
            >
              <ContactCard
                compact
                icon={c.icon}
                label={c.label}
                value={c.value}
                hint={c.hint}
                href={c.href}
                action={c.action}
                copied={copied === c.label}
                onCopy={handleCopy}
              />
            </motion.div>
          ))}
        </div>
      </main>

      <footer
        className="site-footer text-center text-[11px] tracking-wide"
        style={{ color: 'var(--c-muted)' }}
      >
        © {new Date().getFullYear()} ZHBOWiki
      </footer>

      <QrModal
        open={qrOpen}
        src={QR_SRC}
        group={QQ_GROUP}
        joinHref={QQ_GROUP_JOIN}
        onClose={closeQr}
      />

      <AnimatePresence>
        {toast && (
          <motion.div
            className="contact-toast"
            role="status"
            aria-live="polite"
            initial={staticMode ? false : { opacity: 0, y: 10, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 8, x: '-50%' }}
            transition={{ duration: 0.2 }}
          >
            {toast.ok ? (
              <Check size={14} aria-hidden="true" />
            ) : (
              <AlertCircle size={14} aria-hidden="true" />
            )}
            <span>{toast.text}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}