<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'
import { Logo } from '~/components'
import { useMenuStore } from '~/store'

const menuStore = useMenuStore()
const { getMenu } = menuStore as unknown as { getMenu: NavigationMenuItem[] }
</script>

<template>
  <div>
    <header class="flex items-center justify-between">
      <Logo />
      <div class="md:hidden">
        <UDropdownMenu
          :items="getMenu"
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
    <!-- 側邊選單 - 網頁 -->
    <div class="flex h-[calc(100vh-64px)] ">
      <UNavigationMenu
        orientation="vertical"
        :items="getMenu"
        class="data-[orientation=vertical]:w-48 m-3 md:block hidden"
      />
      <UContainer class="flex-1 m-3">
        <slot />
      </UContainer>
    </div>
  </div>
</template>
