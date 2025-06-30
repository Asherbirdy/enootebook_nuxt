<script setup lang="ts">
import type { LandingPageAccess } from '~/enum'
import type { GetUserList, StateType, UserPageDataType, UserPageFeatureType } from '~/type'
import { useUserApi } from '~/apis'
import { landingPageAccessOptions, Role, roleOptions } from '~/enum'

const state = ref<StateType<UserPageDataType, UserPageFeatureType>>({
  data: {
    form: {
      userId: '',
      role: Role.user,
      landingPageAccess: [],
    },
  },
  feature: {
    modal: {
      open: false,
    },
  },
})

const {
  data: UserListResponse,
  refresh: UserListRefresh,
} = await useUserApi.getUserList()

const {
  execute: ChangeUserAccessRequest,
  status: ChangeUserAccessStatus,
} = await useUserApi.changeUserAccess(state.value.data.form)

const handleUpdateUserAccess = async () => {
  await ChangeUserAccessRequest()
  await UserListRefresh()
  state.value.feature.modal.open = false
}

const openModal = (row: GetUserList) => {
  const { data, feature } = state.value
  data.form.userId = row._id
  data.form.role = row.role as Role
  data.form.landingPageAccess = row.landingPageAccess as LandingPageAccess[]
  feature.modal.open = true
}
</script>

<template>
  <div class="flex-1 w-full">
    <div class="flex justify-between mb-3">
      <p class="text-lg font-bold">
        帳號管理
      </p>
    </div>
    <div class="flex flex-col w-full">
      <UCard
        v-for="row in UserListResponse?.users"
        :key="row._id"
        class="mb-3 w-full"
      >
        <div class="flex flex-col gap-2 mb-2">
          <div class="flex justify-between">
            <p>{{ row.name }}</p>
            <UButton
              v-if="row.role !== Role.dev"
              variant="soft"
              size="sm"
              class="sm:flex-none"
              @click="openModal(row)"
            >
              編輯
            </UButton>
          </div>
          <p>電子信箱：{{ row.email }}</p>
          <p>角色：{{ row.role }}</p>
          <p>首頁權限：{{ row.landingPageAccess }}</p>
        </div>
      </UCard>
    </div>
    <UModal
      v-model:open="state.feature.modal.open"
      title="編輯帳號"
      :ui="{ footer: 'justify-end' }"
    >
      <template #body>
        <UForm :state="state.data">
          <UFormField
            label="角色"
            name="role"
          >
            <USelect
              v-model="state.data.form.role"
              label="角色"
              name="role"
              :items="roleOptions"
            />
          </UFormField>
          <UFormField
            label="首頁權限"
            name="landingPageAccess"
          >
            <USelectMenu
              v-model="state.data.form.landingPageAccess"
              value-key="value"
              multiple
              :items="landingPageAccessOptions"
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
          color="neutral"
          :loading="ChangeUserAccessStatus === 'pending'"
          @click="handleUpdateUserAccess"
        />
      </template>
    </UModal>
  </div>
</template>
