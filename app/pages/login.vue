<script setup lang="ts">
import { useAuthApi } from '~/apis'
import { LoginFormComponent } from '~/components'
import { ClientRoutes, CookieEnums } from '~/enum'

definePageMeta({
  layout: 'none',
})

const toast = useToast()

const state = ref({
  data: {
    login: {
      name: '',
      password: '',
    },
  },
})

/*
  * LOGIN API
*/
const {
  data: LoginResponse,
  execute: LoginRequest,
  error: LoginError,
  status: LoginStatus,
} = await useAuthApi.login(state.value.data.login)

/*
  * CHECK VALID TOKEN API
*/
const {
  data: CheckValidTokenResponse,
  refresh: CheckValidTokenRefresh,
} = await useAuthApi.checkValidToken()

const onLogin = async () => {
  const { login } = state.value.data
  await LoginRequest()

  if (LoginError.value) {
    toast.add({
      title: '錯誤帳號或密碼',
      color: 'error',
    })
    console.error(LoginError.value)
    login.password = ''
    return
  }

  const accessToken = useCookie<string>(CookieEnums.AccessToken)
  const refreshToken = useCookie<string>(CookieEnums.RefreshToken)
  accessToken.value = LoginResponse.value?.token.accessTokenJWT || ''
  refreshToken.value = LoginResponse.value?.token.refreshTokenJWT || ''

  navigateTo(ClientRoutes.Home)
}

/*
  * ONMOUNTED
*/
const init = async () => {
  const accessToken = useCookie(CookieEnums.AccessToken)
  const refreshToken = useCookie(CookieEnums.RefreshToken)

  if (accessToken.value && refreshToken.value) {
    await CheckValidTokenRefresh()

    if (CheckValidTokenResponse.value?.msg === 'Token is valid') {
      navigateTo(ClientRoutes.Home)
    }
  }
}

onMounted(init)
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-start justify-center p-4 pt-20">
    <!-- 背景裝飾元素 (小螢幕隱藏) -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl" />
    </div>

    <!-- 主要內容卡片 -->
    <div class="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 px-4 py-6 sm:p-8">
      <!-- Logo 區域 -->
      <div class="text-center mb-6 sm:mb-8">
        <!-- <div class="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-3 sm:mb-4 shadow-lg">
          <UIcon
            name="i-lucide-book-open"
            class="w-6 h-6 sm:w-8 sm:h-8 text-white"
          />
        </div> -->
        <h1 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
          歡迎回來
        </h1>
        <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-base">
          請登入您的帳戶
        </p>
      </div>

      <!-- 登入表單 -->
      <div class="space-y-4 sm:space-y-6">
        <LoginFormComponent v-model="state.data.login" />
        <UButton
          label="登入"
          type="submit"
          variant="solid"
          color="primary"
          class="w-full h-11 sm:h-12 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          :loading="LoginStatus === 'pending'"
          :disabled="(
            !state.data.login.name
            || !state.data.login.password
          )"
          @click="onLogin"
        />
      </div>

      <!-- 底部文字 -->
      <!-- <div class="text-center mt-4 sm:mt-6">
        <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          © 2024 E-Notebook. 保留所有權利
        </p>
      </div> -->
    </div>
  </div>
</template>
