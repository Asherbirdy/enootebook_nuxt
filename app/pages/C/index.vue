<script setup lang="ts">
import type { BindOTPEmailErrorType } from '~/type'
import { useAuthApi, useUserApi } from '~/apis'

const toast = useToast()
const state = ref({
  data: {
    emailVerifiedModal: {
      OTP: '',
    },
  },
  feature: {
    emailCountdown: {
      status: false,
      time: 60,
      countdown: 0,
    },
  },
})

/*
  * USER API
*/
const { data: UserInfoResponse } = await useUserApi.showMe()

/*
  * AUTH API
*/
const { execute: executeEmailRequest } = await useAuthApi.sendOTP()

/*
  * bindOTPEmail API
*/
const {
  execute: emailVerifyRequest,
  error: emailVerifyError,
  status: emailVerifyStatus,
} = await useAuthApi.bindOTPEmail(state.value.data.emailVerifiedModal)

/*
  * SEND EMAIL VERIFY
*/
const onEmailRequest = async () => {
  const { emailCountdown } = state.value.feature
  await executeEmailRequest()
  emailCountdown.status = true
  emailCountdown.countdown = emailCountdown.time
}

/*
  * EMAIL VERIFY
*/
const onEmailVerify = async () => {
  const { data } = state.value
  await emailVerifyRequest()

  if (emailVerifyError.value?.data.error === 'INVALID_OTP') {
    toast.add({
      title: '不正確的驗證碼',
      color: 'error',
    })
    data.emailVerifiedModal.OTP = ''
    return
  }

  const errorList: BindOTPEmailErrorType[] = [
    'ACCOUNT_BLOCKED',
    'OTP_EXPIRED',
    'OTP_NOT_FOUND_OR_EXPIRED',
  ]

  if (errorList.includes(
    emailVerifyError.value?.data.error as BindOTPEmailErrorType,
  )) {
    toast.add({
      title: '帳號已停用驗證，請聯絡管理員',
      color: 'error',
    })
    data.emailVerifiedModal.OTP = ''
    return
  }

  toast.add({
    title: '驗證成功 | 5秒後請重新登入',
    color: 'success',
  })
}

/*
  * EMAIL COUNT DOWN
*/
watch(state.value.feature.emailCountdown, (value) => {
  const { feature } = state.value
  if (value.countdown > 0) {
    setTimeout(() => {
      feature.emailCountdown.countdown--
    }, 1000)
    return
  }
  feature.emailCountdown.status = false
  feature.emailCountdown.countdown = feature.emailCountdown.time
})

const validate = (state: Partial<{
  OTP: string
}>) => {
  const errors = []
  if (!state.OTP) {
    errors.push({
      name: 'OTP',
      message: '驗證碼不能為空',
    })
  }
  return errors
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
    <!-- 背景裝飾 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
      <div class="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-indigo-400/10 to-pink-400/10 rounded-full blur-3xl" />
    </div>

    <div class="relative z-10 max-w-4xl mx-auto">
      <!-- 頁面標題 -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
          <UIcon
            name="i-lucide-user"
            class="w-8 h-8 text-white"
          />
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          個人資料
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          查看和管理您的帳戶資訊
        </p>
      </div>

      <!-- 主要內容區域 -->
      <div class="grid gap-6 lg:grid-cols-2">
        <!-- 個人資料卡片 -->
        <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-6">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <UIcon
                name="i-lucide-user-check"
                class="w-5 h-5 text-white"
              />
            </div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              基本資訊
            </h2>
          </div>

          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div class="flex items-center gap-3">
                <UIcon
                  name="i-lucide-user"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                />
                <span class="text-gray-600 dark:text-gray-300 font-medium">姓名</span>
              </div>
              <span class="text-gray-900 dark:text-white font-semibold">
                {{ UserInfoResponse?.user.name || '未設定' }}
              </span>
            </div>

            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div class="flex items-center gap-3">
                <UIcon
                  name="i-lucide-mail"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                />
                <span class="text-gray-600 dark:text-gray-300 font-medium">電子信箱</span>
              </div>
              <span class="text-gray-900 dark:text-white font-semibold">
                {{ UserInfoResponse?.user.email || '未設定' }}
              </span>
            </div>

            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div class="flex items-center gap-3">
                <UIcon
                  name="i-lucide-shield-check"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                />
                <span class="text-gray-600 dark:text-gray-300 font-medium">Email驗證</span>
              </div>
              <div class="flex items-center gap-2">
                <div
                  :class="UserInfoResponse?.user.emailVerified ? 'bg-green-500' : 'bg-red-500'"
                  class="w-2 h-2 rounded-full"
                />
                <span
                  :class="UserInfoResponse?.user.emailVerified ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
                  class="font-semibold"
                >
                  {{ UserInfoResponse?.user.emailVerified ? '已驗證' : '未驗證' }}
                </span>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div class="flex items-center gap-3">
                <UIcon
                  name="i-lucide-crown"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                />
                <span class="text-gray-600 dark:text-gray-300 font-medium">權限</span>
              </div>
              <span class="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold rounded-full">
                {{ UserInfoResponse?.user.role }}
              </span>
            </div>
          </div>
        </div>

        <!-- Email驗證卡片 -->
        <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-6">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <UIcon
                name="i-lucide-mail-check"
                class="w-5 h-5 text-white"
              />
            </div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Email驗證
            </h2>
          </div>

          <div
            v-if="!UserInfoResponse?.user.emailVerified"
            class="space-y-4"
          >
            <div class="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
              <div class="flex items-start gap-3">
                <UIcon
                  name="i-lucide-alert-triangle"
                  class="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0"
                />
                <div>
                  <h3 class="font-medium text-amber-800 dark:text-amber-200 mb-1">
                    需要驗證Email
                  </h3>
                  <p class="text-sm text-amber-700 dark:text-amber-300">
                    為了確保帳戶安全，請驗證您的電子信箱地址
                  </p>
                </div>
              </div>
            </div>

            <UForm
              :state="state.data?.emailVerifiedModal"
              :validate="validate"
            >
              <UFormField
                label="驗證碼"
                name="otp"
                class="mb-4"
              >
                <div class="flex gap-3">
                  <UInput
                    v-model="state.data.emailVerifiedModal.OTP"
                    placeholder="請輸入驗證碼"
                    class="flex-1"
                    size="lg"
                  />
                  <UButton
                    :disabled="state.feature.emailCountdown.status"
                    :label="
                      state.feature.emailCountdown.status
                        ? `${state.feature.emailCountdown.countdown}秒`
                        : '寄送驗證碼'
                    "
                    variant="soft"
                    color="primary"
                    size="lg"
                    @click="onEmailRequest"
                  />
                </div>
              </UFormField>
            </UForm>

            <UButton
              label="驗證 Email"
              block
              size="lg"
              color="success"
              :disabled="state.data.emailVerifiedModal.OTP.length < 4"
              :loading="emailVerifyStatus === 'pending'"
              @click="onEmailVerify"
            />
          </div>

          <div
            v-else
            class="text-center py-8"
          >
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <UIcon
                name="i-lucide-check"
                class="w-8 h-8 text-white"
              />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Email已驗證
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              您的電子信箱已成功驗證
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
