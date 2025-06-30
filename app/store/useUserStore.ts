import type { ShowMeUser } from '~/type/api/useUserApi/ShowMeApiType'
import { Role } from '~/enum'

export function useUserStore() {
  const user = useState<ShowMeUser>('user', () => ({
    _id: '',
    name: '',
    email: '',
    emailVerified: false,
    role: Role.user,
    district: {
      _id: '',
      name: '',
      active: false,
      __v: 0,
    },
    leaderOfGroupIds: [],
    groups: [],
    landingPageAccess: [],
  }))

  const userInfo = computed(() => user.value)

  const setUserInfo = (data: ShowMeUser) => user.value = data

  return {
    userInfo,
    setUserInfo,
  }
}
