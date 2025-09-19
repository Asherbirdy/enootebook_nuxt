<script setup lang="ts">
import { RegisterFormComponent } from '~/components'

interface RegisterModel {
  name: string
  email: string
  password: string
  confirmPassword: string
  serialNumber: string
}

const registerForm = ref<RegisterModel>({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  serialNumber: '',
})

const handleSubmit = async () => {
  // TODO: Implement registration logic
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          註冊帳號
        </h2>
      </div>
      <div class="mt-8 space-y-6">
        <RegisterFormComponent v-model="registerForm" />
        <div>
          <UButton
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="handleSubmit"
          >
            註冊
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
