<script setup lang="ts">
import { useAuthApi } from '~/apis'
import { LoginFormComponent, RegisterFormComponent } from '~/components'
import { ClientRoutes, CookieEnums } from '~/enum'

const toast = useToast()

const state = ref({
  data: {
    login: {
      name: '',
      password: '',
    },
    register: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      serialNumber: '',
    },
  },
})

// 添加當前選中的標籤狀態
const currentTab = ref('login')

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
  * REGISTER API
*/
const {
  data: RegisterResponse,
  execute: RegisterRequest,
  status: RegisterStatus,
  error: RegisterError,
} = await useAuthApi.register(state.value.data.register)

/*
  * CHECK VALID TOKEN API
*/
const {
  data: CheckValidTokenResponse,
  refresh: CheckValidTokenRefresh,
} = await useAuthApi.checkValidToken()

const tabs = [
  {
    label: '登入',
    icon: 'i-lucide-user',
    slot: 'login' as const,
  },
  {
    label: '註冊',
    icon: 'i-lucide-lock',
    slot: 'register' as const,
  },
]

// 處理標籤切換
const handleTabChange = (tabSlot: string) => {
  currentTab.value = tabSlot
}

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

const onRegister = async () => {
  const { register } = state.value.data
  await RegisterRequest()

  if (RegisterError.value) {
    toast.add({
      title: '錯誤序號或重複註冊',
      color: 'error',
    })

    register.serialNumber = ''
    register.password = ''
    register.confirmPassword = ''
    return
  }

  toast.add({
    title: '註冊成功 請登入',
    color: 'success',
  })

  register.name = ''
  register.email = ''
  register.password = ''
  register.confirmPassword = ''
  register.serialNumber = ''

  useCookie(CookieEnums.AccessToken).value = RegisterResponse.value?.token.accessTokenJWT
  useCookie(CookieEnums.RefreshToken).value = RegisterResponse.value?.token.refreshTokenJWT

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
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 relative">
    <!-- 背景裝飾元素 (小螢幕隱藏) -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl" />
    </div>

    <!-- 主要內容卡片 -->
    <div class="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 px-4 py-6 sm:p-8 mx-auto">
      <!-- Logo 區域 -->
      <div class="text-center mb-6 sm:mb-8">
        <div class="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-3 sm:mb-4 shadow-lg">
          <UIcon
            name="i-lucide-book-open"
            class="w-6 h-6 sm:w-8 sm:h-8 text-white"
          />
        </div>
        <h1 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
          歡迎回來
        </h1>
        <p class="text-gray-600 dark:text-gray-400 text-xs sm:text-base">
          請登入您的帳戶或註冊新帳戶
        </p>
      </div>

      <!-- 自定義標籤切換 -->
      <div class="mb-6 sm:mb-8">
        <div class="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
          <button
            v-for="tab in tabs"
            :key="tab.slot"
            class="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 ease-in-out relative"
            :class="{
              'text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-600 shadow-sm': currentTab === tab.slot,
              'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200': currentTab !== tab.slot,
            }"
            @click="handleTabChange(tab.slot)"
          >
            <UIcon
              :name="tab.icon"
              class="w-4 h-4 sm:w-5 sm:h-5"
              :class="{
                'text-blue-600 dark:text-blue-400': currentTab === tab.slot,
                'text-gray-500 dark:text-gray-400': currentTab !== tab.slot,
              }"
            />
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- 登入/註冊內容 - 使用 Transition 實現高度動畫 -->
      <Transition
        name="height-fade"
        mode="out-in"
        appear
      >
        <div
          :key="currentTab"
          class="overflow-hidden"
        >
          <!-- 登入表單 -->
          <div
            v-if="currentTab === 'login'"
            class="space-y-4 sm:space-y-6"
          >
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

          <!-- 註冊表單 -->
          <div
            v-else-if="currentTab === 'register'"
            class="space-y-4 sm:space-y-6"
          >
            <RegisterFormComponent v-model="state.data.register" />
            <UButton
              label="註冊"
              type="submit"
              variant="solid"
              color="secondary"
              class="w-full h-11 sm:h-12 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              :loading="RegisterStatus === 'pending'"
              :disabled="(
                !state.data.register.name
                || !state.data.register.email
                || !state.data.register.password
                || !state.data.register.confirmPassword
                || !state.data.register.serialNumber
                || !state.data.register.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
                || state.data.register.password !== state.data.register.confirmPassword
              )"
              @click="onRegister"
            />
          </div>
        </div>
      </Transition>

      <!-- 底部文字 -->
      <div class="text-center mt-4 sm:mt-6">
        <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          © 2024 E-Notebook. 保留所有權利
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 高度和淡入淡出動畫 */
.height-fade-enter-active,
.height-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.height-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
  max-height: 0;
}

.height-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}

.height-fade-enter-to,
.height-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 1000px;
}
</style>
