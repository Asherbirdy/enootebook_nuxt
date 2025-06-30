<script setup lang="ts">
import { useLineAccountMemberApi } from '~/apis'
import { RegisterLineFormComponent } from '~/components'
import { liffStateFromUrl } from '~/composables'
import { CookieEnums } from '~/enum'

enum Page {
  Loading = 'loading',
  Register = 'register',
  AccountReviewing = 'account-reviewing',
  Attendance = 'attendance',
}

const toast = useToast()

const { LineProfile } = useLiff({
  liffId: {
    dev: '2007494898-BJjV7nbe',
    production: '',
  },
  liffInit: true,
  login: true,
})

const state = ref({
  data: {
    register: {
      name: '',
      districtId: '',
      lineProfileId: '',
    },
    attendance: {
      date: '',
      time: '',
    },
  },
  feature: {
    page: Page.Loading,
  },
})

// 註冊 api
const {
  execute: RegisterRequest,
  status: RegisterStatus,
} = await useLineAccountMemberApi.create(state.value.data.register)

const handleRegister = async () => {
  const { feature } = state.value
  await RegisterRequest()
  feature.page = Page.AccountReviewing
}

watch(LineProfile, async (newVal) => {
  const { feature, data } = state.value

  const { lineFellowshipReportId } = liffStateFromUrl.getFromCookie({
    cookieName: CookieEnums.LineOAAttendance,
  })

  if (!lineFellowshipReportId) {
    toast.add({
      title: '無lineFellowshipReportId',
      color: 'error',
    })
    return
  }

  if (newVal) {
    const { error, execute } = await useLineAccountMemberApi.checkAccountStatus({
      lineProfileId: newVal.userId,
    })
    data.register.lineProfileId = newVal.userId

    await execute()

    // 未有帳號 去註冊綁定
    if (error.value?.data.error === 'LINE_ACCOUNT_MEMBER_NOT_FOUND') {
      feature.page = Page.Register
      return
    }

    // 帳號審核中
    if (error.value?.data.error === 'LINE_ACCOUNT_MEMBER_NOT_ACTIVE') {
      feature.page = Page.AccountReviewing
      return
    }

    feature.page = Page.Attendance
  }
})

const init = async () => {
  liffStateFromUrl.setToCookie({
    cookieName: CookieEnums.LineOAAttendance,
    expires: 1000 * 60 * 10,
  })
}

onMounted(init)
</script>

<template>
  <div>
    <div v-if="state.feature.page === Page.Loading">
      <h2>Loading</h2>
    </div>
    <div v-if="state.feature.page === Page.Register">
      <h2>Register</h2>
      <RegisterLineFormComponent v-model:state="state.data.register" />
      <UButton
        type="submit"
        :disabled="!state.data.register.name || !state.data.register.districtId"
        :loading="RegisterStatus === 'pending'"
        @click="handleRegister"
      >
        Submit
      </UButton>
    </div>
    <div v-if="state.feature.page === Page.AccountReviewing">
      <h2>審核中</h2>
    </div>
    <div v-if="state.feature.page === Page.Attendance">
      aa
    </div>
  </div>
</template>
