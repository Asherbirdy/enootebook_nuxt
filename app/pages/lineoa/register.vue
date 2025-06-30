<script setup lang='ts'>
import type { FormError } from '@nuxt/ui'
import type { LineoaRegisterDataType, LineoaRegisterFeatureType, StateType } from '~/type'
import { useAttendanceAccountApi } from '~/apis'

enum FormKey {
  SerialNumber = 'serialNumber',
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

const state = ref<StateType<LineoaRegisterDataType, LineoaRegisterFeatureType>>({
  data: {
    form: {
      [FormKey.SerialNumber]: '',
    },
  },
  feature: {
    submit: {
      isLoading: false,
    },
  },
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state[FormKey.SerialNumber]) {
    errors.push({
      name: FormKey.SerialNumber,
      message: '請輸入序號',
    })
  }
  return errors
}

const handleBindAccount = async () => {
  const { feature, data } = state.value

  const { execute, error, status } = await useAttendanceAccountApi.activate({
    lineProfileId: LineProfile?.value?.userId || '',
    serialNumber: data.form[FormKey.SerialNumber],
  })

  feature.submit.isLoading = true
  execute()
  feature.submit.isLoading = false

  if (error.value?.data?.error === 'LINE_PROFILE_ID_ALREADY_EXISTS') {
    toast.add({
      title: '已綁定過',
      color: 'error',
    })
    data.form[FormKey.SerialNumber] = ''
    return
  }

  if (error.value?.data.error === 'ATTENDANCE_ACCOUNT_NOT_FOUND') {
    toast.add({
      title: '序號錯誤',
      color: 'error',
    })
    data.form[FormKey.SerialNumber] = ''
    return
  }

  if (status.value === 'success') {
    toast.add({
      title: '綁定成功',
      color: 'success',
    })
    data.form[FormKey.SerialNumber] = ''
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <h2 class="text-2xl font-extrabol mb-4">
      點名者帳號綁定
    </h2>
    <img
      :src="LineProfile?.pictureUrl"
      alt="Line Profile"
      class="w-24 h-24 rounded-full border-4 border-white shadow-md"
    >
    <p class="text-lg mt-2">
      {{ LineProfile?.displayName }}
    </p>
    <p class="text-sm text-gray-500">
      Id: {{ LineProfile?.userId }}
    </p>
    <UForm
      :validate="validate"
      :ui="{ root: 'space-y-4' }"
      :state="state.data.form"
    >
      <UFormField
        label="序號"
        :name="FormKey.SerialNumber"
      >
        <UInput
          v-model="state.data.form.serialNumber"
          label="序號"
          :ui="{ root: 'w-full' }"
        />
      </UFormField>
    </UForm>
    <UButton
      label="註冊"
      :loading="state.feature.submit.isLoading"
      @click="handleBindAccount"
    />
  </div>
</template>
