<script setup lang='ts'>
import type { ShowMeResponse } from '~/type'
import { useBlendingApi } from '~/apis'
import { Role, UserRequestUrl } from '~/enum'

enum AgeRange {
  Elder = '年長',
  Middle = '壯年',
  Young = '青職',
  College = '大學',
  Teen = '青少年',
  Child = '兒童',
  SixYearOld = '六歲以下',
}

enum Identity {
  Brother = '弟兄',
  Sister = '姊妹',
  Male = '男介朋友',
  Female = '女介朋友',
}

const {
  data: BlendingResponse,
  execute: BlendingRequest,
} = await useBlendingApi.get()

const {
  execute: CreateFromSheetRequest,
  status: CreateFromSheetStatus,
} = await useBlendingApi.createFromSheet()

const handleUpdateData = async () => {
  await CreateFromSheetRequest()
  await BlendingRequest()
}
const {
  data: UserInfoResponse,
} = useNuxtData<ShowMeResponse>(UserRequestUrl.UserShowMe)

// 過濾掉空值name
const data = computed(() => BlendingResponse.value?.response.filter(item => item.name !== ''))

// 福音朋友
const gospelFriends = computed(() => data.value
  ?.filter(item =>
    item.identity === Identity.Female
    || item.identity === Identity.Male,
  ))

// 過濾年齡
const filterAgeRange = (ageRange: AgeRange) => data.value
  ?.filter(item => item.ageRange === ageRange)
  .map(item => item) || []

// 過濾單日報名
const filterOneDay = computed(() => data.value
  ?.filter(item => item.selectSchedule === '週六_單日行程')
  .map(item => item) || [])

const filterSunday = computed(() => data.value
  ?.filter(item => item.selectSchedule === '只前往主日')
  .map(item => item) || [])

// 過濾列表 a
const filterList = computed(() => [
  { title: '年長報名', data: filterAgeRange(AgeRange.Elder) },
  { title: '壯年報名', data: filterAgeRange(AgeRange.Middle) },
  { title: '青職報名', data: filterAgeRange(AgeRange.Young) },
  { title: '大學報名', data: filterAgeRange(AgeRange.College) },
  { title: '青少年報名', data: filterAgeRange(AgeRange.Teen) },
  { title: '兒童報名', data: filterAgeRange(AgeRange.Child) },
  { title: '六歲以下報名', data: filterAgeRange(AgeRange.SixYearOld) },
])

const tabs = [
  { label: '報名名單', slot: 'join' },
  { label: '福音朋友', slot: 'gospel' },
  { label: '單日報名', slot: 'oneDay' },
]
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <h1>2025年 全會所戶外相調</h1>
      <UButton
        color="info"
        variant="soft"
        size="sm"
        :loading="CreateFromSheetStatus === 'pending'"
        :disabled="!(UserInfoResponse?.user.role === Role.admin || UserInfoResponse?.user.role === Role.dev)"
        @click="handleUpdateData"
      >
        更新
      </UButton>
    </div>
    <UTabs
      :items="tabs"
      variant="link"
      class="gap-4 w-full"
      :ui="{ trigger: 'flex-1' }"
    >
      <template #join>
        <p class="mb-4">
          報名人數{{ data?.length }}
        </p>
        <div
          v-for="nameSet in filterList"
          :key="nameSet.title"
          class="mb-4"
        >
          <p>{{ nameSet.title }} ({{ nameSet.data.length }}位):</p>
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="name in nameSet.data"
              :key="name._id"
              color="info"
              variant="soft"
            >
              {{ name.name }}
            </UBadge>
          </div>
        </div>
      </template>

      <template #gospel>
        <p>福音朋友{{ gospelFriends?.length }}位</p>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="nameData in gospelFriends"
            :key="nameData._id"
            color="info"
            variant="soft"
          >
            {{ nameData.name }} ({{ nameData.ageRange }})
          </UBadge>
        </div>
      </template>

      <template #oneDay>
        <p>週六單日報名{{ filterOneDay?.length }}位</p>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="nameData in filterOneDay"
            :key="nameData._id"
            color="info"
            variant="soft"
          >
            {{ nameData.name }}
          </UBadge>
        </div>
        <p>只前往主日{{ filterSunday?.length }}位</p>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="nameData in filterSunday"
            :key="nameData._id"
            color="info"
            variant="soft"
          >
            {{ nameData.name }}
          </UBadge>
        </div>
      </template>
    </UTabs>
  </div>
</template>
