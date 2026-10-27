import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Search, SlidersHorizontal, Users, Wrench, X } from 'lucide-react'
import LangSwap from '../components/LangSwap.jsx'
import RepoCard from '../components/RepoCard.jsx'
import { useLiquidLight } from '../hooks/useLiquidLight.js'
import { plugins } from '../data/plugins.js'
import { useApp } from '../store.jsx'

/* 筛选选项与需求图一致；数组顺序按两列逐行排列 */
const SERVERS = [
  'Cauldron', 'CraftBukkit',
  'Spigot', 'Sponge',
  'BungeeCord', 'Nukkit',
  'PocketMine-MP', 'LeviLamina(原',
  'BDSX', 'Endstone',
  'PowerNukkitX', 'CloudburstNukkit',
  'Dragonfly', 'Velocity',
  'Paper', '其它'
]

const VERSIONS = [
  '1.6.x', '1.7.x',
  '1.8.x', '1.9.x',
  '1.10.x', '1.11.x',
  '1.12.x', '1.13.x',
  '1.14.x', '1.15.x',
  '1.16.x', '1.17.x',
  '1.18.x', '1.19.x',
  '1.20.x', '1.21.x',
  '26.x'
]

const ATTRIBUTES = [
  { key: '本体插件', zh: '本体插件', en: 'Base plugin' },
  { key: '前置插件', zh: '前置插件', en: 'Dependency' }
]

const TYPES = [
  { key: '管理', zh: '管理', en: 'Management' },
  { key: '安全', zh: '安全', en: 'Security' },
  { key: '聊天', zh: '聊天', en: 'Chat' },
  { key: '编程', zh: '编程', en: 'Programming' },
  { key: '经济', zh: '经济', en: 'Economy' },
  { key: '圈地', zh: '圈地', en: 'Land claim' },
  { key: '修正', zh: '修正', en: 'Fixes' },
  { key: '娱乐', zh: '娱乐', en: 'Fun' },
  { key: '综合', zh: '综合', en: 'Misc' },
  { key: '信息', zh: '信息', en: 'Information' },
  { key: '传送', zh: '传送', en: 'Teleport' },
  { key: '机械', zh: '机械', en: 'Mechanics' },
  { key: '网页', zh: '网页', en: 'Web' },
  { key: '创世', zh: '创世', en: 'Worldgen' },
  { key: '角色', zh: '角色', en: 'Roles' },
  { key: '其他', zh: '其他', en: 'Other' }
]

const SORTS = ['updated', 'downloads']
const EASE_OUT = [0.22, 1, 0.36, 1]

const AD_EMAIL = '1071576270@qq.com'
const AD_QQ_GROUP = '784757608'
const AD_QQ_JOIN = 'https://qm.qq.com/q/gjfpPcb2Ja'

/* 二级页：插件仓库
   顶部栏与首页完全一致；左栏搜索 + 筛选 + 插件名索引，右栏插件卡片 */
export default function Plugins() {
  const { t, pick, lang, staticMode } = useApp()
  const [q, setQ] = useState('')
  const [server, setServer] = useState('all')
  const [versionKeys, setVersionKeys] = useState([])
  const [attributeKeys, setAttributeKeys] = useState([])
  const [typeKeys, setTypeKeys] = useState([])
  const [prereq, setPrereq] = useState('')
  const [pricing, setPricing] = useState('all')
  const [sort, setSort] = useState('updated')
  const [tagKeys, setTagKeys] = useState([])
  const [filterOpen, setFilterOpen] = useState(false)
  const [active, setActive] = useState(null)

  const popRef = useRef(null)
  const timerRef = useRef(0)
  const searchRef = useRef(null)
  const filterBtnRef = useRef(null)
  const searchLight = useLiquidLight(searchRef, { enabled: !staticMode })
  const filterLight = useLiquidLight(filterBtnRef, {
    enabled: !staticMode,
    radius: 50,
    entryBoost: 0.6
  })
  /* 首屏进场只播一次，后续筛选/排序新增的卡片不再延迟 */
  const firstRef = useRef(true)

  useEffect(() => {
    const id = setTimeout(() => {
      firstRef.current = false
    }, 1400)
    return () => clearTimeout(id)
  }, [])

  /* 点击筛选面板外部 / 按 Esc 关闭 */
  useEffect(() => {
    const onDown = (e) => {
      if (popRef.current && !popRef.current.contains(e.target)) setFilterOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setFilterOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
      clearTimeout(timerRef.current)
    }
  }, [])

  /* 标签注册表：用中文标签作为稳定 key，切语言时只换显示文案 */
  const tagIndex = useMemo(() => {
    const map = new Map()
    plugins.forEach((p) => {
      const zh = p.tags?.zh || []
      const en = p.tags?.en || []
      zh.forEach((key, i) => {
        if (!map.has(key)) map.set(key, { key, zh: key, en: en[i] || key })
      })
    })
    return [...map.values()]
  }, [])

  const list = useMemo(() => {
    const key = q.trim().toLowerCase()
    const filtered = plugins.filter((p) => {
      const matchQ =
        !key ||
        [p.name, pick(p.gameplay), pick(p.tagline), pick(p.desc), ...pick(p.tags), p.author, p.mc]
          .join(' ')
          .toLowerCase()
          .includes(key)
      const matchS = server === 'all' || p.server.includes(server)
      const matchV =
        versionKeys.length === 0 ||
        (p.versions || []).some((v) => versionKeys.includes(v))
      const matchA =
        attributeKeys.length === 0 || attributeKeys.includes(p.attribute)
      const matchTy =
        typeKeys.length === 0 ||
        (p.types || []).some((type) => typeKeys.includes(type))
      const matchPrice =
        pricing === 'all' || (pricing === 'paid' ? !!p.paid : !p.paid)
      const need = prereq.trim().toLowerCase()
      const matchP =
        !need ||
        (need === '无前置' || need === t('plugins.noPrereq').toLowerCase()
          ? (p.requires || []).length === 0
          : (p.requires || []).some((r) => r.toLowerCase().includes(need)))
      const matchT =
        tagKeys.length === 0 || (p.tags?.zh || []).some((tag) => tagKeys.includes(tag))
      return matchQ && matchS && matchV && matchA && matchTy && matchPrice && matchP && matchT
    })

    return [...filtered].sort((a, b) =>
      sort === 'downloads'
        ? b.downloads - a.downloads
        : a.updated < b.updated
          ? 1
          : -1
    )
  }, [q, server, versionKeys, attributeKeys, typeKeys, prereq, pricing, sort, tagKeys, pick, t])

  const filterActive =
    server !== 'all' ||
    sort !== 'updated' ||
    tagKeys.length > 0 ||
    versionKeys.length > 0 ||
    attributeKeys.length > 0 ||
    typeKeys.length > 0 ||
    prereq.trim() !== '' ||
    pricing !== 'all'

  /* 左栏插件名：滚到对应卡片并高亮一下，作为页内快捷入口 */
  const jump = (slug) => {
    document.getElementById(`plugin-${slug}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
    setActive(slug)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setActive(null), 1600)
  }

  const toggleTag = (key) => {
    setTagKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  const toggleVersion = (key) => {
    setVersionKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  const toggleAttribute = (key) => {
    setAttributeKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  const toggleType = (key) => {
    setTypeKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  const reset = () => {
    setServer('all')
    setVersionKeys([])
    setAttributeKeys([])
    setTypeKeys([])
    setPrereq('')
    setPricing('all')
    setSort('updated')
    setTagKeys([])
  }

  return (
    <div className="repo-page">

      <main className="repo-main">
        <motion.aside
          className="repo-rail"
          initial={staticMode ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.45, ease: EASE_OUT }}
        >
          <div className="repo-search-row" ref={popRef}>
            <label className="repo-search" ref={searchRef} {...searchLight}>
              {/* 搜索框的四边反光，与卡片同一套液态玻璃光源 */}
              <span className="liquid-edge liquid-edge-top" aria-hidden="true" />
              <span className="liquid-edge liquid-edge-right" aria-hidden="true" />
              <span className="liquid-edge liquid-edge-bottom" aria-hidden="true" />
              <span className="liquid-edge liquid-edge-left" aria-hidden="true" />

              <Search size={14} strokeWidth={2} aria-hidden="true" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t('plugins.search')}
                aria-label={t('plugins.search')}
              />
              {q && (
                <button
                  type="button"
                  className="repo-search-clear"
                  onClick={() => setQ('')}
                  aria-label="Clear"
                >
                  <X size={12} />
                </button>
              )}
            </label>

            <button
              type="button"
              ref={filterBtnRef}
              className="repo-filter-btn"
              data-open={filterOpen ? '1' : '0'}
              data-active={filterActive ? '1' : '0'}
              onClick={() => setFilterOpen((v) => !v)}
              aria-label={t('plugins.filter')}
              aria-expanded={filterOpen}
              {...filterLight}
            >
              <span className="liquid-edge liquid-edge-top" aria-hidden="true" />
              <span className="liquid-edge liquid-edge-right" aria-hidden="true" />
              <span className="liquid-edge liquid-edge-bottom" aria-hidden="true" />
              <span className="liquid-edge liquid-edge-left" aria-hidden="true" />
              <SlidersHorizontal size={15} strokeWidth={1.9} />
            </button>

            {filterOpen && (
              <div className="repo-filter">
                <div>
                  <p className="repo-filter-label">
                    <LangSwap>{t('plugins.versions')}</LangSwap>
                  </p>
                  <div className="repo-filter-group" data-cols="2">
                    <button
                      type="button"
                      className="repo-filter-chip repo-filter-chip-all"
                      data-on={versionKeys.length === 0 ? '1' : '0'}
                      onClick={() => setVersionKeys([])}
                    >
                      <LangSwap>{t('plugins.all')}</LangSwap>
                    </button>
                    {VERSIONS.map((v) => (
                      <button
                        key={v}
                        type="button"
                        className="repo-filter-chip"
                        data-on={versionKeys.includes(v) ? '1' : '0'}
                        onClick={() => toggleVersion(v)}
                      >
                        <LangSwap>{v}</LangSwap>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="repo-filter-block">
                  <p className="repo-filter-label">
                    <LangSwap>{t('plugins.server')}</LangSwap>
                  </p>
                  <div className="repo-filter-group" data-cols="2">
                    <button
                      type="button"
                      className="repo-filter-chip repo-filter-chip-all"
                      data-on={server === 'all' ? '1' : '0'}
                      onClick={() => setServer('all')}
                    >
                      <LangSwap>{t('plugins.all')}</LangSwap>
                    </button>
                    {SERVERS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className="repo-filter-chip"
                        data-on={server === s ? '1' : '0'}
                        onClick={() => setServer(s)}
                      >
                        <LangSwap>{s === '其它' ? t('plugins.other') : s}</LangSwap>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="repo-filter-block">
                  <p className="repo-filter-label">
                    <LangSwap>{t('plugins.attribute')}</LangSwap>
                  </p>
                  <div className="repo-filter-group" data-cols="2">
                    <button
                      type="button"
                      className="repo-filter-chip repo-filter-chip-all"
                      data-on={attributeKeys.length === 0 ? '1' : '0'}
                      onClick={() => setAttributeKeys([])}
                    >
                      <LangSwap>{t('plugins.all')}</LangSwap>
                    </button>
                    {ATTRIBUTES.map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        className="repo-filter-chip"
                        data-on={attributeKeys.includes(item.key) ? '1' : '0'}
                        onClick={() => toggleAttribute(item.key)}
                      >
                        <LangSwap>{lang === 'zh' ? item.zh : item.en}</LangSwap>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="repo-filter-block">
                  <p className="repo-filter-label">
                    <LangSwap>{t('plugins.pricing')}</LangSwap>
                  </p>
                  <div className="repo-filter-group" data-cols="2">
                    <button
                      type="button"
                      className="repo-filter-chip repo-filter-chip-all"
                      data-on={pricing === 'all' ? '1' : '0'}
                      onClick={() => setPricing('all')}
                    >
                      <LangSwap>{t('plugins.all')}</LangSwap>
                    </button>
                    <button
                      type="button"
                      className="repo-filter-chip"
                      data-on={pricing === 'free' ? '1' : '0'}
                      onClick={() => setPricing('free')}
                    >
                      <LangSwap>{t('plugins.free')}</LangSwap>
                    </button>
                    <button
                      type="button"
                      className="repo-filter-chip"
                      data-on={pricing === 'paid' ? '1' : '0'}
                      onClick={() => setPricing('paid')}
                    >
                      <LangSwap>{t('plugins.paid')}</LangSwap>
                    </button>
                  </div>
                </div>

                <div className="repo-filter-block">
                  <p className="repo-filter-label">
                    <LangSwap>{t('plugins.types')}</LangSwap>
                  </p>
                  <div className="repo-filter-group" data-cols="2">
                    <button
                      type="button"
                      className="repo-filter-chip repo-filter-chip-all"
                      data-on={typeKeys.length === 0 ? '1' : '0'}
                      onClick={() => setTypeKeys([])}
                    >
                      <LangSwap>{t('plugins.all')}</LangSwap>
                    </button>
                    {TYPES.map((item) => (
                      <button
                        key={item.key}
                        type="button"
                        className="repo-filter-chip"
                        data-on={typeKeys.includes(item.key) ? '1' : '0'}
                        onClick={() => toggleType(item.key)}
                      >
                        <LangSwap>{lang === 'zh' ? item.zh : item.en}</LangSwap>
                      </button>
                    ))}
                  </div>
                  <p className="repo-filter-note">
                    <LangSwap>{t('plugins.typeNote')}</LangSwap>
                  </p>
                </div>

                <div className="repo-filter-block">
                  <p className="repo-filter-label">
                    <LangSwap>{t('plugins.prereq')}</LangSwap>
                  </p>
                  <input
                    className="repo-filter-input"
                    value={prereq}
                    onChange={(e) => setPrereq(e.target.value)}
                    placeholder={t('plugins.noPrereq')}
                    aria-label={t('plugins.prereq')}
                  />
                </div>

                <div className="repo-filter-block">
                  <p className="repo-filter-label">
                    <LangSwap>{t('plugins.tags')}</LangSwap>
                  </p>
                  <div className="repo-filter-group">
                    {tagIndex.map((tag) => (
                      <button
                        key={tag.key}
                        type="button"
                        className="repo-filter-chip"
                        data-on={tagKeys.includes(tag.key) ? '1' : '0'}
                        onClick={() => toggleTag(tag.key)}
                      >
                        <LangSwap>{lang === 'zh' ? tag.zh : tag.en}</LangSwap>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="repo-filter-block">
                  <p className="repo-filter-label">
                    <LangSwap>{t('plugins.sort')}</LangSwap>
                  </p>
                  <div className="repo-filter-group">
                    {SORTS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className="repo-filter-chip"
                        data-on={sort === s ? '1' : '0'}
                        onClick={() => setSort(s)}
                      >
                        <LangSwap>
                          {t(s === 'downloads' ? 'plugins.sortDownloads' : 'plugins.sortUpdated')}
                        </LangSwap>
                      </button>
                    ))}
                  </div>
                </div>

                <button type="button" className="repo-filter-reset" onClick={reset}>
                  <LangSwap>{t('plugins.reset')}</LangSwap>
                </button>
              </div>
            )}
          </div>

          <p className="repo-count">
            {list.length}{' '}
            <LangSwap>{list.length === 1 ? t('plugins.countOne') : t('plugins.count')}</LangSwap>
          </p>

          <p className="repo-index-label">
            <LangSwap>{t('plugins.index')}</LangSwap>
          </p>
          <nav className="repo-index">
            {list.map((p) => (
              <button
                key={p.slug}
                type="button"
                data-active={active === p.slug ? '1' : '0'}
                onClick={() => jump(p.slug)}
              >
                {p.name}
              </button>
            ))}
            {list.length === 0 && <span className="repo-index-empty">—</span>}
          </nav>

          <div className="repo-ad glass-card">
            <span className="repo-ad-head">
              <span className="repo-ad-icon">
                <Wrench size={14} strokeWidth={2} />
              </span>
              <span className="repo-ad-title font-display">
                <LangSwap>{t('plugins.adTitle')}</LangSwap>
              </span>
            </span>
            <span className="repo-ad-text">
              <LangSwap>{t('plugins.adText')}</LangSwap>
            </span>
            <span className="repo-ad-contact-label">
              <LangSwap>{t('plugins.adContact')}</LangSwap>
            </span>
            <span className="repo-ad-contacts">
              <a className="repo-ad-contact" href={`mailto:${AD_EMAIL}`}>
                <Mail size={12} strokeWidth={2} />
                <span className="repo-ad-contact-key">
                  <LangSwap>{t('contact.email')}</LangSwap>
                </span>
                <span className="repo-ad-contact-value">{AD_EMAIL}</span>
              </a>
              <a
                className="repo-ad-contact"
                href={AD_QQ_JOIN}
                target="_blank"
                rel="noreferrer"
              >
                <Users size={12} strokeWidth={2} />
                <span className="repo-ad-contact-key">
                  <LangSwap>{t('contact.group')}</LangSwap>
                </span>
                <span className="repo-ad-contact-value">{AD_QQ_GROUP}</span>
              </a>
            </span>
          </div>
        </motion.aside>

        <section className="repo-list">
          <h1 className="sr-only">{t('plugins.title')}</h1>

          {list.map((p, i) => (
            <motion.div
              key={p.slug}
              className="repo-card-wrap"
              initial={
                staticMode ? false : { opacity: 0, y: 12, filter: 'blur(6px)' }
              }
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.55,
                delay: firstRef.current ? 0.5 + i * 0.06 : 0,
                ease: EASE_OUT
              }}
            >
              <RepoCard plugin={p} flash={active === p.slug} />
            </motion.div>
          ))}

          {list.length === 0 && (
            <div className="repo-empty glass-card">
              <p className="repo-empty-title font-display">
                <LangSwap>{t('plugins.empty')}</LangSwap>
              </p>
              <p className="repo-empty-hint">
                <LangSwap>{t('plugins.emptyHint')}</LangSwap>
              </p>
            </div>
          )}
        </section>
      </main>

      <footer className="site-footer text-center text-[11px] tracking-wide" style={{ color: 'var(--c-muted)' }}>
        © {new Date().getFullYear()} ZHBOWiki
      </footer>
    </div>
  )
}
