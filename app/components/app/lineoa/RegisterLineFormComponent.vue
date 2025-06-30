<script setup lang='ts'>
import type { FormError } from '@nuxt/ui'
import { useDistrictApi } from '~/apis'

interface ModelType {
  name: string
  districtId: string
  lineProfileId: string
}

const model = defineModel<ModelType>('state', { required: true })

enum FormKey {
  Name = 'name',
  DistrictId = 'districtId',
}

const validate = (): FormError[] => {
  const errors = []
  if (!model.value.name)
    errors.push({ name: FormKey.Name, message: 'Required' })

  if (!model.value.districtId)
    errors.push({ name: FormKey.DistrictId, message: 'Required' })
  return errors
}

const { data } = await useDistrictApi.getAll()

const districts = computed(() => data.value?.districts.map(item => ({
  label: item.name,
  value: item._id,
})) ?? [])
</script>

<template>
  <UForm
    :validate="validate"
    :state="model"
    class="space-y-4"
  >
    <UFormField
      label="姓名"
      :name="FormKey.Name"
    >
      <UInput v-model="model.name" />
    </UFormField>

    <UFormField
      label="區"
      :name="FormKey.DistrictId"
    >
      <USelect
        v-model="model.districtId"
        :items="districts"
        class="w-48"
      />
    </UFormField>
  </UForm>
</template>
