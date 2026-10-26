export const dict = {
  zh: {
    brand: 'ZHBOWiki',
    landing: {
      sub: 'Minecraft 服务端插件文档站。用心做好每一个插件，每一次服务。',
      cta: '开始探索'
    },
    nav: { contact: '联系我们', publish: '发布', contactBack: '再次点击返回' },
    contact: {
      title: '联系我',
      sub: '插件问题、定制合作、功能建议——选一个最方便的方式。',
      primary: '优先',
      qq: 'QQ',
      qqHint: '直接发起临时会话',
      group: 'QQ 群',
      groupHint: '插件交流与问题反馈',
      email: '邮箱',
      emailHint: '适合详细描述问题',
      wechat: '微信',
      wechatHint: '添加时请备注来意',
      bilibili: 'Bilibili',
      bilibiliHint: 'UID',
      copy: '复制',
      copied: '已复制',
      copyFailed: '复制失败，请手动选择',
      chat: '发起聊天',
      open: '打开',
      join: '加入群聊',
      visit: '打开空间',
      showQr: '扫码加群',
      qrTitle: 'QQ 群二维码',
      qrHint: '使用 QQ 扫码加群；识别失败可点击下方按钮。',
      close: '关闭'
    },
    theme: { dark: '暗色', light: '亮色' },
    status: { stable: '稳定版', beta: '测试版' },
    plugins: {
      title: '插件仓库',
      search: '搜索插件、玩法或标签',
      filter: '筛选',
      server: '服务端',
      tags: '标签',
      sort: '排序',
      all: '全部',
      sortUpdated: '最近更新',
      sortDownloads: '下载最多',
      reset: '重置筛选',
      index: '插件名',
      count: '个插件',
      download: '下载',
      viewDetail: '查看详情',
      empty: '没有匹配的插件',
      emptyHint: '换个关键词，或清空筛选条件试试。'
    },
    detail: {
      back: '返回插件仓库',
      features: '功能特性',
      install: '安装步骤',
      commands: '指令',
      config: '配置示例',
      author: '作者',
      repo: 'GitHub 仓库',
      notFound: '插件不存在',
      notFoundHint: '该插件可能已下线，或链接有误。',
      backToList: '回到插件仓库',
      command: '指令',
      description: '说明',
      permission: '权限'
    },
    notFound: {
      title: '页面不存在',
      hint: '这个地址可能已经失效，或者链接有误。',
      home: '回到首页',
      plugins: '去插件仓库'
    }
  },
  en: {
    brand: 'ZHBOWiki',
    landing: {
      sub: 'Documentation for Minecraft server plugins. Every plugin, every service — done with care.',
      cta: 'Get Started'
    },
    nav: { contact: 'Contact', publish: 'Publish', contactBack: 'Click again to go back' },
    contact: {
      title: 'Get in touch',
      sub: 'Plugin issues, custom work, or feature ideas — pick whichever is easiest.',
      primary: 'Primary',
      qq: 'QQ',
      qqHint: 'Start a direct chat',
      group: 'QQ Group',
      groupHint: 'Plugin chat and support',
      email: 'Email',
      emailHint: 'Best for detailed messages',
      wechat: 'WeChat',
      wechatHint: 'Please mention why you are adding me',
      bilibili: 'Bilibili',
      bilibiliHint: 'UID',
      copy: 'Copy',
      copied: 'Copied',
      copyFailed: 'Copy failed — select it manually',
      chat: 'Start chat',
      open: 'Open',
      join: 'Join group',
      visit: 'Open channel',
      showQr: 'Scan to join',
      qrTitle: 'QQ group QR',
      qrHint: 'Scan with QQ to join. If it does not work, use the button below.',
      close: 'Close'
    },
    theme: { dark: 'Dark', light: 'Light' },
    status: { stable: 'Stable', beta: 'Beta' },
    plugins: {
      title: 'Plugin Library',
      search: 'Search plugins or tags',
      filter: 'Filter',
      server: 'Server',
      tags: 'Tags',
      sort: 'Sort',
      all: 'All',
      sortUpdated: 'Recently updated',
      sortDownloads: 'Most downloaded',
      reset: 'Reset filters',
      index: 'Plugins',
      count: 'plugins',
      download: 'Download',
      viewDetail: 'Details',
      empty: 'No plugins match',
      emptyHint: 'Try another keyword, or clear the filters.'
    },
    detail: {
      back: 'Back to library',
      features: 'Features',
      install: 'Installation',
      commands: 'Commands',
      config: 'Config example',
      author: 'Author',
      repo: 'GitHub repository',
      notFound: 'Plugin not found',
      notFoundHint: 'This plugin may be retired or the link is wrong.',
      backToList: 'Back to library',
      command: 'Command',
      description: 'Description',
      permission: 'Permission'
    },
    notFound: {
      title: 'Page not found',
      hint: 'This address may be outdated, or the link is wrong.',
      home: 'Back home',
      plugins: 'Open the library'
    }
  }
}

const fallback = 'zh'

export function makeT(lang) {
  return (key) => {
    const walk = (obj, parts) =>
      parts.reduce((acc, p) => (acc == null ? acc : acc[p]), obj)
    const value = walk(dict[lang] || dict[fallback], key.split('.'))
    if (value !== undefined) return value
    return walk(dict[fallback], key.split('.')) ?? key
  }
}

export function pick(value, lang) {
  if (value == null) return ''
  if (typeof value === 'string') return value
  return value[lang] || value[fallback] || value.en || ''
}
