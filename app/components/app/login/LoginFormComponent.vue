<script setup lang="ts">
import type { FormError } from '@nuxt/ui'

interface Model {
  email: string
  password: string
}

const modelValue = defineModel<Model>({ required: true })

const validate = (state: Partial<Model>): FormError[] => {
  const errors = []
  if (!state.email) {
    errors.push({
      name: 'email',
      message: 'Required',
    })
  }
  if (!regex.email.test(String(state.email))) {
    errors.push({
      name: 'email',
      message: 'Invalid email format',
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
        v-model="modelValue.email"
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
