<script setup lang="ts">
import { useSheepApi } from '~/apis'

const {
  data: SheepListResponse,
} = await useSheepApi.list()
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <h2>家聚會人位</h2>
      <UButton size="sm">
        <template #leading>
          <UIcon name="i-heroicons-plus" />
        </template>
        新增
      </UButton>
    </div>
    <UBadge
      v-for="item in SheepListResponse?.sheep"
      :key="item._id"
      :label="item.name"
      variant="soft"
      color="primary"
      class="m-1"
    />
  </div>
</template>
