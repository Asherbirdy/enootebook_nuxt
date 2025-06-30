<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui'
import { Logo } from '~/components'
import { PublicRoutes } from '~/enum'

// 定義導航路由
const routes = [
  // {
  //   label: '表單教學',
  //   to: PublicRoutes.News,
  // },
  {
    label: '登入',
    to: PublicRoutes.Login,
  },
]

const items = ref<DropdownMenuItem[][]>([
  [
    {
      label: 'Benjamin',
      avatar: {
        src: 'https://github.com/benjamincanac.png',
      },
      type: 'label',
    },
  ],
  [
    {
      label: 'Profile',
      icon: 'i-lucide-user',
      to: PublicRoutes.Login,
    },
    {
      label: 'Billing',
      icon: 'i-lucide-credit-card',
      to: PublicRoutes.Login,
    },
    {
      label: 'Settings',
      icon: 'i-lucide-cog',
      kbds: [','],
      to: PublicRoutes.Login,
    },
    {
      label: 'Keyboard shortcuts',
      icon: 'i-lucide-monitor',
      to: PublicRoutes.Login,
    },
  ],

])
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="flex justify-between items-center">
      <Logo />
      <div class="hidden md:block">
        <nav class="flex space-x-4">
          <NuxtLink
            v-for="route in routes"
            :key="route.to"
            :to="route.to"
            class="text-gray-600"
          >
            {{ route.label }}
          </NuxtLink>
        </nav>
      </div>
      <div class="md:hidden">
        <UDropdownMenu
          :items="items"
          :ui="{
            content: 'w-48',
          }"
        >
          <UButton
            icon="i-lucide-menu"
            variant="ghost"
          />
        </UDropdownMenu>
      </div>
    </header>
    <main class="flex-grow mx-2">
      <slot />
    </main>
    <footer class="bg-gray-100 p-4 mt-16">
      <div class="text-center">
        Footer
      </div>
    </footer>
  </div>
</template>
