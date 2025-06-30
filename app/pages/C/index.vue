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
  <div class="flex flex-col justify-between gap-4 h-full">
    <UCard>
      <h2>姓名：{{ UserInfoResponse?.user.name || '未設定' }}</h2>
      <h2>電子信箱：{{ UserInfoResponse?.user.email || '未設定' }}</h2>
      <h2>Email驗證：{{ UserInfoResponse?.user.emailVerified ? '已驗證' : '未驗證' }}</h2>
      <h2>權限：{{ UserInfoResponse?.user.role }}</h2>
    </UCard>

    <UModal
      :dismissible="false"
      title="Email驗證"
    >
      <UButton
        v-if="!UserInfoResponse?.user.emailVerified"
        label="Email 驗證"
        block
      />

      <template #body>
        <UForm
          :state="state.data?.emailVerifiedModal"
          :validate="validate"
        >
          <div class="">
            <UFormField
              label="驗證碼"
              name="otp"
              class="flex-1 justify-between w-full gap-4 mb-2"
            >
              <UInput
                v-model="state.data.emailVerifiedModal.OTP"
                label="驗證碼"
                class="flex-1 w-[calc(100%-124px)] mr-1"
                placeholder="請輸入驗證碼"
              />
              <UButton
                :disabled="state.feature.emailCountdown.status"
                :label="
                  state.feature.emailCountdown.status
                    ? `${state.feature.emailCountdown.countdown}秒`
                    : '寄送 Email 驗證'
                "
                variant="soft"
                class="inline-block"
                @click="onEmailRequest"
              />
            </UFormField>
          </div>
        </UForm>
        <UButton
          label="驗證 Email"
          block
          :disabled="state.data.emailVerifiedModal.OTP.length < 4"
          :loading="emailVerifyStatus === 'pending'"
          @click="onEmailVerify"
        />
      </template>
    </UModal>
  </div>
</template>
