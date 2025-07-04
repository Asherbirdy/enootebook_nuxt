import { ClientRoutes, CookieEnums, PublicRoutes } from '~/enum'
// import { useUserStore } from './useUserStore'

export function useMenuStore() {
  const route = useRoute()

  // const userStore = useUserStore()
  // const { userInfo } = userStore

  /*
    * 使用者
  */
  // const userRoute = []

  const menu = useState('menu', () => [
    {
      label: '個人資料',
      icon: 'i-lucide-user',
      to: ClientRoutes.Home,
      active: computed(() => route.path === ClientRoutes.Home),
    },

    // 使用者
    // ...userRoute,

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
