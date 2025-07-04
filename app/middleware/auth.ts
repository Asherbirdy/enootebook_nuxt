import { useUserApi } from '~/apis'
import { PublicRoutes } from '~/enum'
import { useUserStore } from '~/store/useUserStore'

export default defineNuxtRouteMiddleware(async () => {
  const { setUserInfo } = useUserStore()
  const { data, error } = await useUserApi.showMe()

  if (error.value) {
    clearNuxtData() // 清掉 cache
    clearNuxtState()
    return navigateTo(PublicRoutes.Login)
  }

  if (data.value && !error.value) {
    setUserInfo(data.value.user)
  }
})
