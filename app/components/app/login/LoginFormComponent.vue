<script setup lang="ts">
import type { FormError } from '@nuxt/ui'
import type { LoginPayload } from '~/type'

const modelValue = defineModel<LoginPayload>({ required: true })

const validate = (state: Partial<LoginPayload>): FormError[] => {
  const errors = []
  if (!state.name) {
    errors.push({
      name: 'name',
      message: '請輸入帳號',
    })
  }
  if (!state.password) {
    errors.push({
      name: 'password',
      message: '請輸入密碼',
    })
  }
  return errors
}
</script>

<template>
  <UForm
    :state="modelValue"
    :validate="validate"
    class="space-y-6"
  >
    <UFormField
      label="帳號"
      name="name"
    >
      <UInput
        v-model="modelValue.name"
        placeholder="請輸入您的帳號"
        class="w-full h-12 rounded-xl"
      >
        <template #leading>
          <UIcon name="i-lucide-user" class="text-gray-400" />
        </template>
      </UInput>
    </UFormField>
    
    <UFormField
      label="密碼"
      name="password"
    >
      <UInput
        v-model="modelValue.password"
        type="password"
        placeholder="請輸入您的密碼"
        class="w-full h-12 rounded-xl"
      >
        <template #leading>
          <UIcon name="i-lucide-lock" class="text-gray-400" />
        </template>
      </UInput>
    </UFormField>
  </UForm>
</template>
