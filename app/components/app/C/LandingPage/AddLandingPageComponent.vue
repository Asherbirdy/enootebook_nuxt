<script setup lang='ts'>
import type { StateType } from '~/type'
import { useLandingPageApi } from '~/apis/useLandingPageApi'
import { LandingPageAccess, UserRequestUrl } from '~/enum'

interface DataType {
  title: string
}

interface FeatureType {
  modal: {
    open: boolean
  }
}
const { data: UserInfoResponse } = useNuxtData(UserRequestUrl.UserShowMe)
const state = ref<StateType<DataType, FeatureType>>({
  data: {
    title: '',
  },
  feature: {
    modal: {
      open: false,
    },
  },
})

// Create Landing Page
const {
  execute: CreateLandingPageRequest,
  status: CreateLandingPageStatus,
} = await useLandingPageApi.create({
  title: state.value.data.title,
})

// Handle Submit
const handleSubmit = async () => {
  await CreateLandingPageRequest()
  await refreshNuxtData(UserRequestUrl.LandingPageGetALL)
  state.value.feature.modal.open = false
}
</script>

<template>
  <UButton
    label="新增頁面"
    :disabled="!UserInfoResponse.user.landingPageAccess.includes(LandingPageAccess.create)"
    @click="state.feature.modal.open = true"
  />
  <UModal
    v-model:open="state.feature.modal.open"
    title="新增頁面"
    :ui="{ footer: 'justify-end' }"
  >
    <template #body>
      <UForm
        :ui="{ root: 'space-y-4' }"
        @submit="handleSubmit"
      >
        <UFormField
          label="名稱"
          name="title"
        >
          <UInput
            v-model="state.data.title"
            label="標題"
            :ui="{ root: 'w-full' }"
          />
        </UFormField>
      </UForm>
    </template>
    <template #footer>
      <UButton
        label="送出"
        variant="outline"
        :disabled="!state.data.title"
        :loading="CreateLandingPageStatus === 'pending'"
        @click="handleSubmit"
      />
    </template>
  </UModal>
</template>
