<script setup lang="ts">
import type { GoogleSheet, SheetStateData, SheetStateFeature, StateType } from '~/type'
import { useSheetApi } from '~/apis'

const { data: sheets } = await useSheetApi.getAll()

const state = ref<StateType<SheetStateData, SheetStateFeature>>({
  data: {
    modalForm: {
      name: '',
      api: '',
    },
  },
  feature: {
    modal: {
      status: false,
    },
  },
})

const openModal = (googleSheet: GoogleSheet) => {
  const { data, feature } = state.value
  data.modalForm.name = googleSheet.name
  data.modalForm.api = googleSheet.api
  feature.modal.status = true
}
</script>

<template>
  <div>
    <h1>Sheet</h1>
    <UCard
      v-for="sheet in sheets?.sheets"
      :key="sheet._id"
    >
      <div class="flex items-center justify-between">
        <div>
          <p>id: {{ sheet._id }}</p>
          <p>name: {{ sheet.name }}</p>
          <p>api: {{ sheet.api }}</p>
        </div>
        <div class="flex flex-col gap-2">
          <UButton
            icon="i-lucide-pencil"
            size="xs"
            color="primary"
            variant="solid"
            @click="openModal(sheet)"
          />
          <UButton
            icon="i-lucide-trash"
            size="xs"
            color="primary"
            variant="solid"
          />
        </div>
      </div>
    </UCard>
    <UModal
      v-model:open="state.feature.modal.status"
      title="Modal with footer"
      description="This is useful when you want a form in a Modal."
      :ui="{ footer: 'justify-end' }"
    >
      <UButton
        label="Open"
        color="neutral"
        variant="subtle"
      />

      <template #body>
        ss
      </template>

      <template #footer>
        <UButton
          label="Cancel"
          color="neutral"
          variant="outline"
          @click="state.feature.modal.status = false"
        />
        <UButton
          label="Submit"
          color="neutral"
        />
      </template>
    </UModal>
  </div>
</template>
