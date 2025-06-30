<script setup lang="ts">
import { useDevApi } from '~/apis'

definePageMeta({
  layout: 'default',
})

const { data } = await useDevApi.get()

const navigateToLogin = () => {
  navigateTo('/login')
}
</script>

<template>
  <div>
    <UButton @click="navigateToLogin">
      登入
    </UButton>
    <p>
      {{ data }}
    </p>
  </div>
</template>
