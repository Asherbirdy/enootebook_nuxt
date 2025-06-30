<script setup lang="ts">
import type { FormError } from '@nuxt/ui'
import type { LoginPayload } from '~/type'

const modelValue = defineModel<LoginPayload>({ required: true })

const validate = (state: Partial<LoginPayload>): FormError[] => {
  const errors = []
  if (!state.name) {
    errors.push({
      name: 'name',
      message: 'Required',
    })
  }
  if (!state.password) {
    errors.push({
      name: 'password',
      message: 'Required',
    })
  }
  return errors
}
</script>

<template>
  <UForm
    :state="modelValue"
    :validate="validate"
    class="flex flex-col gap-4"
  >
    <UFormField
      label="Email"
      name="email"
    >
      <UInput
        v-model="modelValue.name"
        class="w-full"
      />
    </UFormField>
    <UFormField
      label="Password"
      name="password"
    >
      <UInput
        v-model="modelValue.password"
        type="password"
        class="w-full"
      />
    </UFormField>
  </UForm>
</template>
