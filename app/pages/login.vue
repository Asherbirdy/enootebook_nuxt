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
  <UTabs
    :items="tabs"
    class="gap-4 w-full"
    :ui="{ trigger: 'flex-1' }"
  >
    <template #login>
      <LoginFormComponent v-model="state.data.login" />
      <UButton
        label="登入"
        type="submit"
        variant="soft"
        class="self-end"
        :loading="LoginStatus === 'pending'"
        :disabled="(
          !state.data.login.name
          || !state.data.login.password
        )"

        @click="onLogin"
      />
    </template>

    <template #register>
      <RegisterFormComponent v-model="state.data.register" />
      <UButton
        label="註冊"
        type="submit"
        variant="soft"
        class="self-end"
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
    </template>
  </UTabs>
</template>
