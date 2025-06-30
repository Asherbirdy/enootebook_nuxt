<script setup lang="ts">
import type { LineAccountMemberGetAll } from '~/type'
import { useLineAccountMemberApi } from '~/apis'

const state = ref({
  data: {
    modal: {
      _id: '',
      name: '',
      lineProfileId: '',
      districtId: '',
      active: false,
      createdAt: '',
      updatedAt: '',
    },
  },
  feature: {
    modal: {
      open: false,
    },
    submit: {
      loading: false,
    },
  },
})

const {
  data: LineAccountResponse,
  refresh: LineAccountRefresh,
} = await useLineAccountMemberApi.getAll()

const openModal = (item: LineAccountMemberGetAll) => {
  const { data, feature } = state.value
  feature.modal.open = true
  data.modal = item
}

const closeModal = () => {
  const { feature } = state.value
  feature.modal.open = false
}

const handleEditAccount = async () => {
  const { data, feature } = state.value
  const { execute } = await useLineAccountMemberApi.editActivate({
    lineAccountMemberId: data.modal._id,
    active: data.modal.active,
  })

  feature.submit.loading = true
  await execute()
  feature.submit.loading = false
  LineAccountRefresh()
  feature.modal.open = false
}
</script>

<template>
  <div>
    <h1>Line帳號管理</h1>
    <UBadge
      v-for="item in LineAccountResponse?.data"
      :key="item._id"
      class="m-1"
      :color="item.active ? 'primary' : 'warning'"
      variant="soft"
      @click="openModal(item)"
    >
      {{ item.name }}{{ item.active ? '' : '(未審核)' }}
    </UBadge>
    <UModal
      v-model:open="state.feature.modal.open"
      title="帳號資訊"
      :ui="{ footer: 'justify-end' }"
    >
      <template #body>
        <p>Id: {{ state.data.modal._id }}</p>
        <p>行名:{{ state.data.modal.name }}</p>
        <p>Line Profile Id:{{ state.data.modal.lineProfileId }}</p>
        <p>區 Id:{{ state.data.modal.districtId }}</p>
        <USwitch
          v-model="state.data.modal.active"
          unchecked-icon="i-lucide-x"
          checked-icon="i-lucide-check"
          default-value
          label="審核"
        />
      </template>

      <template #footer>
        <UButton
          label="Cancel"
          color="neutral"
          variant="outline"
          @click="closeModal"
        />
        <UButton
          label="確認送出"
          color="neutral"
          :loading="state.feature.submit.loading"
          @click="handleEditAccount"
        />
      </template>
    </UModal>
  </div>
</template>
