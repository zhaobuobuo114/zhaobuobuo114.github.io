/* 插件仓库数据
   字段说明：
   - gameplay  卡片大标题（玩法），卡片名以「玩法（插件名）」呈现
   - tagline   一句话定位，详情页标题下方展示
   - desc      卡片第二行与详情页简介，卡片最多显示两行
   - server    服务端标签，Spigot / Paper / Fabric 可同时存在
   - mc        游戏版本，永远作为卡片第一个标签
   - versions  支持版本筛选值，按筛选项填写（如 1.12.x）
   - attribute 插件属性（本体插件 / 前置插件）
   - types     插件类型（中文 key，按 Spigot 分类）
   - requires  必需前置插件名称数组；空数组表示无前置
   - tags      类型标签；中文标签同时作为筛选 key
   - github    展示用仓库地址
   - repo      GitHub 仓库完整地址
   - download  插件下载直链（Release jar）
   - downloads 下载量，用于排序与格式化 */

export const plugins = [
  {
    slug: 'ZHBO_plugin_QianDao_1.1.4',
    name: 'ZHBO_plugin_QianDao_1.1.4',
    gameplay: {
      zh: '每日签到 · 七日周期奖励系统',
      en: 'Daily Check-in · 7-Day Reward System'
    },
    tagline: {
      zh: '开箱即用的 1.12.2 图形化签到系统，七天一周期奖励 + 补签卡 + 排行榜 + 经济插件联动。',
      en: 'A ready-to-use 1.12.2 GUI check-in system with 7-day reward cycles, make-up cards, rankings and economy hooks.'
    },
    desc: {
      zh: '玩家通过 /qd 打开签到面板领取每日奖励；7 天一个周期，第 7 天终极大奖，支持补签卡、排行榜与三种经济联动。',
      en: 'Players run /qd to claim daily rewards in a GUI. 7-day cycles with a grand prize on day 7, plus make-up cards, rankings and three economy hooks.'
    },
    server: ['Spigot', 'Paper'],
    mc: '1.12.2',
    versions: ['1.12.x'],
    version: '1.1.4',
    status: 'stable',
    downloads: 0,
    updated: '2026-10-21',
    author: 'zhaobuobuo',
    github: 'github.com/zhaobuobuo114/ZHBO_plugin_QianDao_1.1.4',
    repo: 'https://github.com/zhaobuobuo114/ZHBO_plugin_QianDao_1.1.4',
    download:
      'https://github.com/zhaobuobuo114/ZHBO_plugin_QianDao_1.1.4/releases/download/v1.1.4/ZHBO-plugin_QianDao_1.1.4.jar',
    tags: {
      zh: ['签到', '补签卡', '排行榜', '经济联动', '全配置化'],
      en: ['Check-in', 'Make-up', 'Leaderboard', 'Economy', 'Configurable']
    },
    attribute: '本体插件',
    types: ['娱乐'],
    requires: [],
    features: [
      {
        title: { zh: '七日周期奖励', en: '7-day reward cycle' },
        text: {
          zh: '第 1~7 天奖励逐天递增，第 7 天发放终极大奖；第 8 天回到第 1 天，连续天数继续累计，断签后才归零重算。',
          en: 'Rewards ramp up from day 1 to day 7 with the grand prize on day 7; day 8 loops back to day 1 while the streak keeps counting.'
        }
      },
      {
        title: { zh: '补签卡系统', en: 'Make-up cards' },
        text: {
          zh: '右键补签卡打开补签面板，可补最近 3 天内的漏签日期；二次确认消耗 1 张，补签后连续天数恢复，另支持在线时长自动发卡。',
          en: 'Right-click a card to recover a recent missed date within 3 days. One card is consumed after confirmation and the streak is restored; cards also drop from playtime.'
        }
      },
      {
        title: { zh: '排行榜与经济联动', en: 'Rankings and economy' },
        text: {
          zh: '屏幕右侧计分板实时显示前 10 名，/qd rank 打开图形化排行榜；金币支持 ZPoints、PlayerPoints、Vault，未安装时自动跳过。',
          en: 'A live top-10 sidebar plus a /qd rank GUI. Coins work with ZPoints, PlayerPoints or Vault, and are skipped automatically when the plugin is absent.'
        }
      },
      {
        title: { zh: '全配置化', en: 'Fully configurable' },
        text: {
          zh: '奖励物品、金币数量、提示文本、音效、粒子与刷新时间都在 config.yml 中；奖励以控制台指令发放，可接入任意插件。',
          en: 'Items, coin amounts, messages, sounds, particles and refresh times all live in config.yml; rewards run as console commands so any plugin can be wired in.'
        }
      }
    ],
    install: {
      zh: [
        '下载 ZHBO-plugin_QianDao_1.1.4.jar，放入服务端 plugins/ 目录',
        '启动服务器，自动生成 plugins/ZHBO_plugin_QianDao_1.1.4/config.yml',
        '按需修改 config.yml 中的周期奖励、金币、刷新时间与音效',
        '执行 /qd reload 或重启服务器使配置生效',
        '如需金币奖励，安装 ZPoints / PlayerPoints / Vault 之一，并设置 economy.type',
        '玩家执行 /qd 打开签到面板'
      ],
      en: [
        'Download ZHBO-plugin_QianDao_1.1.4.jar and place it in the server plugins/ folder',
        'Start the server to generate plugins/ZHBO_plugin_QianDao_1.1.4/config.yml',
        'Edit cycle rewards, coins, refresh times and sounds in config.yml',
        'Run /qd reload or restart the server to apply the configuration',
        'For coin rewards, install ZPoints, PlayerPoints or Vault and set economy.type',
        'Players run /qd to open the check-in panel'
      ]
    },
    commands: [
      {
        cmd: '/qd',
        desc: {
          zh: '打开签到面板（别名 /qiandao、/sign）',
          en: 'Open the check-in panel (aliases /qiandao, /sign)'
        },
        perm: 'qiandao.use'
      },
      {
        cmd: '/qd rank',
        desc: { zh: '打开签到排行榜', en: 'Open the check-in ranking GUI' },
        perm: 'qiandao.use'
      },
      {
        cmd: '/qd help',
        desc: { zh: '查看帮助（管理员显示全部）', en: 'Show help (admins see all commands)' },
        perm: 'qiandao.use'
      },
      {
        cmd: '/qd givecard <玩家> [数量]',
        desc: { zh: '发放补签卡，数量 1~2304', en: 'Give make-up cards, amount 1-2304' },
        perm: 'qiandao.admin'
      },
      {
        cmd: '/qd reload',
        desc: { zh: '重载配置文件', en: 'Reload the configuration' },
        perm: 'qiandao.admin'
      }
    ],
    config: `general:
  timezone: "Asia/Shanghai"
  refresh-hour: 4
  refresh-minute: 0
  auto-save-seconds: 300

cycle:
  1:
    icon: "WOOD"
    name: "&f第1天"
    display: ["&7铁锭 x5"]
    commands: ["give %player% iron_ingot 5"]
  7:
    icon: "SKULL_ITEM"
    icon-data: 5
    name: "&6第7天 &e&l★终极大奖★"
    display:
      - "&7钻石 x16"
      - "&7绿宝石 x10"
    commands:
      - "give %player% diamond 16"
      - "give %player% emerald 10"

milestones:
  7:
    commands: ["give %player% gold_ingot 8"]
    broadcast: "&e[签到] &6%player% &e已连续签到 &6&l7天!"

buqian:
  enabled: true
  max-days: 3
  give-cycle-reward: true

economy:
  type: "zpoints"          # none | zpoints | playerpoints | vault
  cycle-gold: [10, 12, 15, 18, 20, 25, 50]
  streak-bonus:
    7: 50
    14: 100
    30: 300
  buqian-gold: false

online-reward:
  enabled: true
  interval-minutes: 60
  daily-max: 1

ranking:
  scoreboard-enable: true
  scoreboard-title: "&6&l签到排行榜"
  amount: 10`
  }
]

export function getPlugin(slug) {
  return plugins.find((p) => p.slug === slug)
}
