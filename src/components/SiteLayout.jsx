import { useEffect, useLayoutEffect, useRef } from 'react'
import { Outlet, useLocation, useNavigationType } from 'react-router-dom'
import SiteHeader from './SiteHeader.jsx'

/* 瞬时滚动：暂时覆盖 html 的 scroll-behavior:smooth（该样式只给站内锚点用） */
function jumpTo(y) {
  const root = document.documentElement
  const prev = root.style.scrollBehavior
  root.style.scrollBehavior = 'auto'
  void root.offsetHeight
  window.scrollTo({ top: y, left: 0, behavior: 'instant' })
  root.style.scrollBehavior = prev
}

/* 全站常驻布局：顶栏只挂载一次，路由切换只替换 Outlet
   - 顶栏不再随页面切换重播入场动画
   - 发布按钮在插件列表与详情页都显示，插件区间顶栏保持一致
   - PUSH/REPLACE 新页置顶；POP（后退/前进）恢复该历史条目的滚动位置 */
export default function SiteLayout() {
  const { pathname, search, key } = useLocation()
  const navType = useNavigationType()
  const positions = useRef(new Map())
  const preSavedKey = useRef(null)

  const clean = pathname.replace(/\/+$/, '') || '/'
  const isHome = clean === '/'
  const parts = clean.split('/').filter(Boolean)
  const inPlugins = parts[0] === 'plugins' && parts.length <= 2

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  /* 内链点击：先记住当前页滚动位置并把旧页瞬时置顶。
     这样新页面挂载时不会继承旧的滚动偏移，也不会把新页夹在中间。 */
  useEffect(() => {
    const onClick = (e) => {
      if (!(e.target instanceof Element)) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
      const link = e.target.closest('a')
      if (!link) return
      if (link.target === '_blank' || link.hasAttribute('download')) return
      const href = link.getAttribute('href')
      if (!href || !href.startsWith('/') || href.startsWith('//')) return

      positions.current.set(key, window.scrollY)
      preSavedKey.current = key
      jumpTo(0)
      link.blur()
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [key])

  useLayoutEffect(() => {
    let alive = true
    let timer = 0
    const moveTo = (y) => {
      if (alive) jumpTo(y)
    }

    if (navType === 'POP') {
      const saved = positions.current.get(key)
      if (saved != null) requestAnimationFrame(() => moveTo(saved))
    } else {
      jumpTo(0)
      requestAnimationFrame(() => moveTo(0))
      timer = setTimeout(() => moveTo(0), 80)
    }

    return () => {
      alive = false
      if (timer) clearTimeout(timer)
      if (preSavedKey.current !== key) {
        positions.current.set(key, window.scrollY)
      } else {
        preSavedKey.current = null
      }
    }
  }, [key, navType])

  return (
    <div className="site-shell">
      <SiteHeader brandLink={!isHome} publish={inPlugins} />
      <div className="site-body">
        <Outlet />
      </div>
    </div>
  )
}