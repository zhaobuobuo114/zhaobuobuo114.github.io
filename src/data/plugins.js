/* 插件仓库数据
   字段说明：
   - gameplay  卡片大标题（玩法），卡片名以「玩法（插件名）」呈现
   - tagline   一句话定位，详情页标题下方展示
   - desc      卡片第二行与详情页简介，卡片最多显示两行
   - server    服务端标签，Spigot / Paper / Fabric 可同时存在
   - mc        游戏版本，永远作为卡片第一个标签
   - versions  支持版本筛选值，按筛选项填写（如 1.12.x）
   - attribute 插件属性（本体插件 / 前置插件）
   - paid      是否付费，true 付费 / false 免费
   - types     插件类型（中文 key，按 Spigot 分类）
   - requires  必需前置插件名称数组；空数组表示无前置
   - prereqs   前置插件详情：hard 硬前置 / soft 软前置；每项含 name / version / note
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
    paid: false,
    types: ['娱乐'],
    requires: [],
    prereqs: {
      soft: [
        {
          name: 'ZPoints / PlayerPoints / Vault',
          note: {
            zh: '金币奖励可选，任选其一安装；未安装时自动跳过',
            en: 'Optional for coin rewards; install any one; skipped when absent'
          }
        }
      ]
    },
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
  },
  {
    slug: 'ZHBO_plugin_ZPoints_1.3.0',
    name: 'ZHBO_plugin_ZPoints_1.3.0',
    gameplay: {
      zh: '积分商店 · 双奖池抽奖 · VIP 成长',
      en: 'Points Shop · Dual-Pool Gacha · VIP Progression'
    },
    tagline: {
      zh: '以 PlayerPoints 积分为核心，把常驻/每日商店、双奖池保底抽奖、消费排行与 VIP 成长串成完整经济循环的 1.12.2 插件。',
      en: 'A 1.12.2 PlayerPoints economy suite that links shops, dual-pool pity gacha, spending rankings, and VIP progression into one complete loop.'
    },
    desc: {
      zh: '【ZHBO】plugin_ZPoints 是一套面向 Minecraft 1.12.2 的积分经济综合插件。以 PlayerPoints 积分为核心货币、Vault 金币为第二货币，提供常驻商店、每日随机商店、有保底/无保底双奖池抽奖、消费排行榜与 VIP 等级成长；可选联动 BagTest 仓库，实现背包溢出存仓、仓库拓展器/开锁器奖励与 VIP 自动扩仓。商品、奖品、概率与提示文本全部 YAML 配置化，支持 /zp reload 热重载与 PlaceholderAPI 变量。',
      en: '[ZHBO] plugin_ZPoints is a Minecraft 1.12.2 economy suite built on PlayerPoints and Vault. It provides permanent and daily rotating shops, pity and no-pity gacha pools, a spending leaderboard, and VIP progression, with optional BagTest integration for overflow storage, expander/unlocker rewards, and VIP storage upgrades. Items, prizes, odds, and messages are fully YAML-configurable, with hot reload and PlaceholderAPI support.'
    },
    server: ['Spigot', 'Paper'],
    mc: '1.12.2',
    versions: ['1.12.x'],
    version: '1.3.0',
    status: 'stable',
    downloads: 0,
    updated: '2026-10-27',
    author: 'zhaobuobuo',
    github: 'github.com/zhaobuobuo114/ZHBO_plugin_ZPoints_1.3.0',
    repo: 'https://github.com/zhaobuobuo114/ZHBO_plugin_ZPoints_1.3.0',
    download:
      'https://github.com/zhaobuobuo114/ZHBO_plugin_ZPoints_1.3.0/releases/download/v1.3.0/ZHBO_plugin_ZPoints_1.3.0.jar',
    tags: {
      zh: ['经济', '商店', '抽奖', '保底', '排行', 'VIP', '仓库联动', 'GUI', '配置化'],
      en: ['Economy', 'Shop', 'Gacha', 'Pity', 'Ranking', 'VIP', 'BagTest', 'GUI', 'Configurable']
    },
    attribute: '本体插件',
    paid: false,
    types: ['经济'],
    requires: ['PlayerPoints'],
    prereqs: {
      hard: [
        {
          name: 'PlayerPoints',
          version: '2.x',
          note: { zh: '积分核心，必需安装', en: 'Required points core' }
        }
      ],
      soft: [
        {
          name: 'Vault',
          note: {
            zh: '金币功能需要 Vault + 经济插件',
            en: 'Coin features need Vault and an economy plugin'
          }
        },
        {
          name: 'PlaceholderAPI',
          note: { zh: '可选变量支持', en: 'Optional placeholder support' }
        },
        {
          name: 'BagTest',
          note: { zh: '可选仓库联动', en: 'Optional storage integration' }
        }
      ]
    },
    features: [
      {
        title: { zh: '常驻商店 + 每日随机商店', en: 'Permanent shop + daily rotating shop' },
        text: {
          zh: '金币/积分双货币、分页 GUI、左键买 1 份 / Shift 批量购买，默认每日 04:00 全服刷新并显示实时倒计时。',
          en: 'Dual currency (coins/points), paginated GUI, left-click to buy one or Shift-click to buy in bulk; the daily shop refreshes at 04:00 server time with a live countdown.'
        }
      },
      {
        title: { zh: '双奖池保底抽奖', en: 'Dual-pool pity gacha' },
        text: {
          zh: '默认 90 抽小保底 + 90 抽大保底、每 10 抽稀有保底、指定大奖选择，支持单抽与十连。',
          en: 'By default, 90-pull soft pity plus 90-pull hard pity, a rare guarantee every 10 pulls, selectable grand prizes, and single or ten-pull options.'
        }
      },
      {
        title: { zh: '消费排行 + VIP 成长 + BagTest 联动', en: 'Spending ranking + VIP progression + BagTest' },
        text: {
          zh: '仅统计积分消费的排行榜、VIP 0~10 级递增费用与动态权限、背包溢出自动存仓及仓库拓展器/开锁器奖励。',
          en: 'A leaderboard that counts point spending only, VIP levels 0-10 with increasing costs and dynamic permissions, automatic overflow storage, and expander/unlocker rewards.'
        }
      }
    ],
    install: {
      zh: [
        '安装必需前置 PlayerPoints 2.x（服务端 Java 8+）；如需金币功能，安装 Vault + 经济插件；可选 PlaceholderAPI、BagTest。',
        '下载 ZHBO_plugin_ZPoints_1.3.0.jar 放入服务端 plugins/ 目录并重启。',
        '编辑 plugins/ZHBO_plugin_ZPoints_1.3.0/ 下的 config.yml、messages.yml、shops/*.yml、gacha/*.yml。',
        '执行 /zp reload 或重启服务器；玩家执行 /zp 打开主菜单。'
      ],
      en: [
        'Install PlayerPoints 2.x (Java 8+); for coin features, install Vault and an economy plugin; PlaceholderAPI and BagTest are optional.',
        'Download ZHBO_plugin_ZPoints_1.3.0.jar into the server plugins/ folder and restart.',
        'Edit config.yml, messages.yml, shops/*.yml and gacha/*.yml under plugins/ZHBO_plugin_ZPoints_1.3.0/.',
        'Run /zp reload or restart the server; players run /zp to open the main menu.'
      ]
    },
    commands: [
      {
        cmd: '/zp',
        desc: { zh: '打开主菜单', en: 'Open the main menu' },
        perm: 'zpoints.use'
      },
      {
        cmd: '/zp help',
        desc: { zh: '查看帮助', en: 'Show help' },
        perm: 'zpoints.use'
      },
      {
        cmd: '/zp shop',
        desc: { zh: '打开常驻商店', en: 'Open the permanent shop' },
        perm: 'zpoints.use'
      },
      {
        cmd: '/zp shop daily',
        desc: { zh: '打开每日随机商店', en: 'Open the daily rotating shop' },
        perm: 'zpoints.use'
      },
      {
        cmd: '/zp shop daily status',
        desc: { zh: '查看每日商店刷新倒计时', en: 'Show the daily shop refresh countdown' },
        perm: 'zpoints.use'
      },
      {
        cmd: '/zp gacha',
        desc: { zh: '打开奖池选择', en: 'Open the gacha pool selection' },
        perm: 'zpoints.use'
      },
      {
        cmd: '/zp rank',
        desc: { zh: '查看消费排行榜', en: 'View the spending leaderboard' },
        perm: 'zpoints.use'
      },
      {
        cmd: '/zp vip',
        desc: { zh: '打开 VIP 界面并在界面内升级', en: 'Open the VIP menu and upgrade there' },
        perm: 'zpoints.use'
      },
      {
        cmd: '/zp points me',
        desc: { zh: '查看我的积分', en: 'View my points' },
        perm: 'zpoints.use'
      },
      {
        cmd: '/zp money me',
        desc: { zh: '查看我的金币', en: 'View my coins' },
        perm: 'zpoints.use'
      },
      {
        cmd: '/zp reload',
        desc: { zh: '热重载全部配置', en: 'Hot-reload all configuration' },
        perm: 'zpoints.admin'
      },
      {
        cmd: '/zp shop list',
        desc: { zh: '列出常驻商品', en: 'List permanent shop items' },
        perm: 'zpoints.admin'
      },
      {
        cmd: '/zp shop daily refresh',
        desc: { zh: '立即刷新每日商店', en: 'Refresh the daily shop immediately' },
        perm: 'zpoints.admin'
      },
      {
        cmd: '/zp shop daily pool list',
        desc: { zh: '列出每日物品池', en: 'List the daily item pool' },
        perm: 'zpoints.admin'
      },
      {
        cmd: '/zp gacha prize list <pity|nopity>',
        desc: { zh: '查看指定奖池的奖品与概率', en: 'Show prizes and odds for a pool' },
        perm: 'zpoints.admin'
      },
      {
        cmd: '/zp gacha resetpity <玩家>',
        desc: { zh: '重置玩家保底进度', en: 'Reset pity progress for a player' },
        perm: 'zpoints.admin'
      },
      {
        cmd: '/zp gacha simulate <池> <次数> [大奖ID]',
        desc: { zh: '模拟抽奖并统计结果', en: 'Simulate pulls and summarize results' },
        perm: 'zpoints.admin'
      },
      {
        cmd: '/zp points give <玩家> <数量>',
        desc: { zh: '给予玩家积分', en: 'Give points to a player' },
        perm: 'zpoints.admin'
      },
      {
        cmd: '/zp money give|take <玩家> <数量>',
        desc: { zh: '给予或扣除玩家金币', en: 'Give or take coins for a player' },
        perm: 'zpoints.admin'
      },
      {
        cmd: '/zp vip set <玩家> <等级>',
        desc: { zh: '设置玩家 VIP 等级（0 为重置）', en: 'Set VIP level for a player (0 resets)' },
        perm: 'zpoints.admin'
      }
    ],
    config: `settings:
  config-version: 3
  autosave-minutes: 5

shop:
  daily:
    enabled: true
    slots: 8
    refresh-hour: 4
    refresh-minute: 0

gacha:
  cost:
    single: 160
    multi: 1600

rank:
  top-size: 10

vip:
  enabled: true
  max-level: 10
  first-cost: 50
  base-cost: 100
  bagtest:
    enabled: true
    tiers:
      1: bagtest.vip1
      4: bagtest.vip2
      7: bagtest.svip`
  },
  {
    slug: 'ZHBO_plugin_GuaJiPool_1.1.1',
    name: 'ZHBO_plugin_GuaJiPool_1.1.1',
    gameplay: {
      zh: '挂机池 · 区域挂机自动发奖',
      en: 'AFK Pool · Region-Based AFK Rewards'
    },
    tagline: {
      zh: '玩家站进指定区域即自动计时，倒计时结束由控制台发奖的轻量挂机池插件。',
      en: 'A lightweight AFK pool plugin that counts down while players stay inside a defined region and grants console-configured rewards.'
    },
    desc: {
      zh: 'ZHBO_plugin_GuaJiPool_1.1.1 是一款面向 Minecraft 1.12.2 的区域挂机插件。管理员通过 /guaji pos1、/guaji pos2 圈定长方体挂机区域，玩家在区域内挂机时，屏幕显示每秒刷新的大字倒计时；倒计时结束后由控制台执行奖励命令，并播放音效、粒子与聊天/大字提示，随后自动进入下一轮。挂机时长、奖励命令、提示文本、音效与粒子均可通过 config.yml 配置，支持自动热重载；离开区域可选择清零或暂停保留进度。',
      en: 'A region-based AFK plugin for Minecraft 1.12.2. Admins define a cuboid AFK zone with /guaji pos1 and /guaji pos2; players inside get a per-player title countdown, and when it ends the plugin runs console reward commands with sound, particle, chat and title feedback, then starts the next cycle automatically. Duration, rewards, messages, sounds and particles are configurable via config.yml with auto hot-reload; leaving the zone can either reset or pause progress.'
    },
    server: ['Spigot', 'Paper'],
    mc: '1.12.2',
    versions: ['1.12.x'],
    version: '1.1.1',
    status: 'stable',
    downloads: 0,
    updated: '2026-10-27',
    author: 'zhaobuobuo',
    github: 'github.com/zhaobuobuo114/ZHBO_plugin_GuaJiPool_1.1.1',
    repo: 'https://github.com/zhaobuobuo114/ZHBO_plugin_GuaJiPool_1.1.1',
    download:
      'https://github.com/zhaobuobuo114/ZHBO_plugin_GuaJiPool_1.1.1/releases/download/v1.1.1/ZHBO_plugin_GuaJiPool_1.1.1.jar',
    tags: {
      zh: ['挂机', '奖励', '区域', '配置化', '音效粒子'],
      en: ['AFK', 'Rewards', 'Region', 'Configurable', 'Effects']
    },
    attribute: '本体插件',
    paid: false,
    types: ['娱乐'],
    requires: [],
    features: [
      {
        title: { zh: '区域挂机独立计时', en: 'Independent AFK timers' },
        text: {
          zh: '两个对角点圈定长方体区域，每位玩家独立倒计时，离开可清零或暂停保留。',
          en: 'Define a cuboid zone with two corner points. Every player counts down independently, and leaving can either reset progress or pause it.'
        }
      },
      {
        title: { zh: '大字倒计时 + 视听反馈', en: 'Title countdown + effects' },
        text: {
          zh: 'Title 每秒刷新剩余时间（X分Y秒），最后 X 秒滴答音调递增，奖励带音效、粒子、聊天与大字提示。',
          en: 'The title updates the remaining time every second (Xm Ys). The final seconds tick with rising pitch, and rewards play sounds, particles, chat and title feedback.'
        }
      },
      {
        title: { zh: '控制台奖励 + 自动热重载', en: 'Console rewards + auto reload' },
        text: {
          zh: 'rewards 支持 %player% 与任意控制台命令，发奖后自动循环；config.yml 保存后自动重载，时长不变时保留进度。',
          en: 'rewards supports %player% and any console command, then loops automatically. config.yml reloads on save, and progress is kept when the duration is unchanged.'
        }
      }
    ],
    install: {
      zh: [
        '下载 ZHBO_plugin_GuaJiPool_1.1.1.jar，放入服务端 plugins/ 目录',
        '重启服务器，自动生成 plugins/ZHBO_plugin_GuaJiPool_1.1.1/config.yml',
        '按需修改挂机时长、奖励命令、音效与粒子',
        '进入游戏执行 /guaji pos1、/guaji pos2 设置挂机区域',
        '执行 /guaji status 检查区域、时长与奖励命令数量'
      ],
      en: [
        'Download ZHBO_plugin_GuaJiPool_1.1.1.jar and place it in the server plugins/ folder',
        'Restart the server to generate plugins/ZHBO_plugin_GuaJiPool_1.1.1/config.yml',
        'Adjust the AFK duration, reward commands, sounds and particles as needed',
        'In game, run /guaji pos1 and /guaji pos2 to define the AFK region',
        'Run /guaji status to check the region, duration and reward command count'
      ]
    },
    commands: [
      {
        cmd: '/guaji',
        desc: { zh: '查看帮助，覆盖全部子命令', en: 'Show help for all subcommands' },
        perm: 'guaji.admin'
      },
      {
        cmd: '/guaji pos1',
        desc: {
          zh: '以站立位置设置区域角点 1，立即写入配置',
          en: 'Set corner 1 at your position and save it immediately'
        },
        perm: 'guaji.admin'
      },
      {
        cmd: '/guaji pos2',
        desc: {
          zh: '以站立位置设置区域角点 2，立即写入配置',
          en: 'Set corner 2 at your position and save it immediately'
        },
        perm: 'guaji.admin'
      },
      {
        cmd: '/guaji reload',
        desc: {
          zh: '热重载配置，时长未变时保留进度',
          en: 'Hot-reload the configuration; progress is preserved when the duration is unchanged'
        },
        perm: 'guaji.admin'
      },
      {
        cmd: '/guaji status',
        desc: {
          zh: '查看区域范围、时长、奖励命令数量与音效状态',
          en: 'Show region bounds, duration, reward command count and sound status'
        },
        perm: 'guaji.admin'
      }
    ],
    config: `region:
  world: world
  pos1: [0, 60, 0]
  pos2: [10, 80, 10]
duration: 600
rewards:
  - "give %player% diamond 1"
  - "say %player% 获得了挂机奖励！"
reset-on-leave: true
auto-reload: true
display:
  enabled: true
  title: "§6§l距离下次奖励还剩"
  subtitle: "§e%time%"
reward:
  message: "§a✔ 你获得了挂机奖励！"
  title: "§a§l✔ 挂机奖励已发放"
  subtitle: ""
  particle: "FIREWORKS_SPARK;40"
sounds:
  countdown-tick-seconds: 5
  countdown-tick: "BLOCK_NOTE_PLING;1.0;1.2"
  reward: "ENTITY_PLAYER_LEVELUP;1.0;1.0"`
  }
]

export function getPlugin(slug) {
  return plugins.find((p) => p.slug === slug)
}
