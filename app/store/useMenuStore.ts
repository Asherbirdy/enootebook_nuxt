import { ClientRoutes, CookieEnums, PublicRoutes, Role } from '~/enum'
import { useUserStore } from './useUserStore'

export function useMenuStore() {
  const route = useRoute()

  const userStore = useUserStore()
  const { userInfo } = userStore

  /*
    * 使用者
  */
  const userRoute = [
    {
      label: '首頁編輯器',
      icon: 'fluent-mdl2:page',
      to: ClientRoutes.LandingPage,
      active: computed(() => route.path.startsWith(ClientRoutes.LandingPage)),
    },
    {
      label: '表單分析',
      icon: 'i-lucide-file-spreadsheet',
      children: [
        {
          label: '相調',
          icon: 'material-symbols-light:blender',
          to: ClientRoutes.Blending,
          active: computed(() => route.path === ClientRoutes.Blending),
        },
        {
          label: '港湖集中主日',
          icon: 'i-lucide-video',
          to: ClientRoutes.MeetingCenter,
          active: computed(() => route.path === ClientRoutes.MeetingCenter),
        },
      ],
    },
  ]

  /*
    * 管理者
  */
  const adminRoute = [
    {
      label: '帳號管理',
      icon: 'mingcute:group-3-line',
      to: ClientRoutes.User,
      active: computed(() => route.path === ClientRoutes.User),
    },
    {
      label: '帳號序號申請',
      icon: 'i-lucide-barcode',
      to: ClientRoutes.SerialNumber,
      active: computed(() => route.path === ClientRoutes.SerialNumber),
    },
    {
      label: '區',
      icon: 'pixelarticons:drop-area',
      to: ClientRoutes.District,
      active: computed(() => route.path === ClientRoutes.District),
    },
  ]

  /*
    * 區負責人
  */
  const diistrictLeaderRoute = [
    {
      label: 'Line聚會統計',
      icon: 'i-lucide-file-spreadsheet',
      children: [
        {
          label: 'Line帳號管理',
          icon: 'material-symbols-light:blender',
          to: ClientRoutes.FellowshipCountingLineAccount,
          active: computed(() => route.path === ClientRoutes.FellowshipCountingLineAccount),
        },
        {
          label: '聚會統計回報',
          icon: 'material-symbols-light:blender',
          to: ClientRoutes.FellowshipCountingReportGroup,
          active: computed(() => route.path === ClientRoutes.FellowshipCountingReportGroup),
        },
      ],
    },
  ]

  const devRoute = [
    {
      label: 'DEMO測試專用',
      icon: 'solar:pen-line-duotone',
      children: [
        {
          label: '點名者管理',
          icon: 'material-symbols-light:blender',
          to: ClientRoutes.HomeMeeting,
          active: computed(() => route.path === ClientRoutes.HomeMeeting),
        },
        {
          label: '人位',
          icon: 'material-symbols:person-outline-rounded',
          to: ClientRoutes.HomeMeetingSheep,
          active: computed(() => route.path === ClientRoutes.HomeMeetingSheep),
        },
      ],
    },
  ]

  const menu = useState('menu', () => [
    {
      label: '個人資料',
      icon: 'i-lucide-user',
      to: ClientRoutes.Home,
      active: computed(() => route.path === ClientRoutes.Home),
    },

    // 管理者
    ...(
      [Role.admin, Role.dev].includes(userInfo.value.role)
        ? adminRoute
        : []),

    // 區負責人
    ...(
      [Role.admin, Role.dev, Role.districtLeader].includes(userInfo.value.role)
        ? diistrictLeaderRoute
        : []),

    // 開發者
    ...(
      [Role.dev].includes(userInfo.value.role)
        ? devRoute
        : []),

    // 使用者
    ...userRoute,

    {
      label: '登出',
      icon: 'i-lucide-log-out',
      active: computed(() => route.path === PublicRoutes.Login),
      onSelect: async () => {
        useCookie(CookieEnums.AccessToken, { maxAge: 0 }).value = ''
        useCookie(CookieEnums.RefreshToken, { maxAge: 0 }).value = ''

        clearNuxtState()
        clearNuxtData()

        navigateTo(PublicRoutes.Login)
      },
    },
  ])

  const getMenu = computed(() => menu.value)

  return { getMenu }
}
