<script setup lang="ts">
import type { StateType } from '~/type'
import { useAttendanceAccountApi } from '~/apis'
import { UserRequestUrl } from '~/enum'

interface DataType {
  form: {
    name: string
    serialNumber: string
  }
}

interface FeatureType {
  modal: {
    open: boolean
  }
}

const toast = useToast()

const state = ref<StateType<DataType, FeatureType>>({
  data: {
    form: {
      name: '',
      serialNumber: '',
    },
  },
  feature: {
    modal: {
      open: false,
    },
  },
})

const {
  execute: CreateAttendanceAccountRequest,
  status: CreateAttendanceAccountStatus,
} = await useAttendanceAccountApi.create(state.value.data.form)

const handleSubmit = async () => {
  const { feature } = state.value
  await CreateAttendanceAccountRequest()
  feature.modal.open = false

  toast.add({
    title: '新增成功',
    color: 'success',
  })

  await refreshNuxtData(UserRequestUrl.AttendanceAccount)
}
</script>

<template>
  <div>
    <UButton
      label="新增"
      color="primary"
      @click="state.feature.modal.open = true"
    />
    <UModal
      v-model:open="state.feature.modal.open"
      title="帳號資訊"
      :ui="{ footer: 'justify-end' }"
    >
      <template #body>
        <UForm :ui="{ root: 'space-y-4' }">
          <UFormField
            label="名稱"
            name="name"
          >
            <UInput
              v-model="state.data.form.name"
              label="標題"
              :ui="{ root: 'w-full' }"
            />
          </UFormField>
          <UFormField
            label="序號"
            name="serialNumber"
          >
            <UInput
              v-model="state.data.form.serialNumber"
              label="序號"
              :ui="{ root: 'w-full' }"
            />
          </UFormField>
        </UForm>
      </template>
      <template #footer>
        <UButton
          label="取消"
          color="neutral"
          variant="outline"
          @click="state.feature.modal.open = false"
        />
        <UButton
          label="確認"
          variant="outline"
          :disabled="!state.data.form.name || !state.data.form.serialNumber"
          :loading="CreateAttendanceAccountStatus === 'pending'"
          @click="handleSubmit"
        />
      </template>
    </UModal>
  </div>
</template>
