<script setup lang="ts">
import type { FormError } from '@nuxt/ui'

interface Model {
  name: string
  email: string
  password: string
  confirmPassword: string
  serialNumber: string
}

const modelValue = defineModel<Model>({ required: true })

const validate = (state: Partial<Model>): FormError[] => {
  const errors = []
  if (!state.name) {
    errors.push({
      name: 'name',
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
  if (state?.password?.length && state.password.length < 8) {
    errors.push({
      name: 'password',
      message: '密碼長度至少8個字',
    })
  }
  if (!state.confirmPassword) {
    errors.push({
      name: 'confirmPassword',
      message: 'Required',
    })
  }

  if (state.password !== state.confirmPassword) {
    errors.push({
      name: 'confirmPassword',
      message: 'Password does not match',
    })
  }

  if (!state.serialNumber) {
    errors.push({
      name: 'serialNumber',
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
      label="姓名"
      name="name"
    >
      <UInput
        v-model="modelValue.name"
        class="w-full"
      />
    </UFormField>
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
      label="密碼"
      name="password"
    >
      <UInput
        v-model="modelValue.password"
        type="password"
        class="w-full"
      />
    </UFormField>
    <UFormField
      label="確認密碼"
      name="confirmPassword"
    >
      <UInput
        v-model="modelValue.confirmPassword"
        type="password"
        class="w-full"
      />
    </UFormField>
    <UFormField
      label="序號"
      name="serialNumber"
    >
      <UInput
        v-model="modelValue.serialNumber"
        class="w-full"
      />
    </UFormField>
  </UForm>
</template>
