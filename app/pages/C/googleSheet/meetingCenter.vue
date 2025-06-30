<script setup lang='ts'>
import type { ShowMeResponse } from '~/type'
import { useMeetingCenterApi } from '~/apis'
import { Role, UserRequestUrl } from '~/enum'

enum GospelFriendIdentity {
  male = '男介朋友',
  female = '女介朋友',
  child = '兒童',
}

enum Journey {
  departure = '搭乘去程',
  returnRide = '搭乘回程',
  selfGo = '自行前往',
  notReturn = '不搭回程',
}

const {
  data: UserInfoResponse,
} = useNuxtData<ShowMeResponse>(UserRequestUrl.UserShowMe)

const {
  data: MeetingCenterResponse,
  refresh: MeetingCenterRequest,
} = await useMeetingCenterApi.getAll()

const {
  execute: MeetingCenterCreateRequest,
  status: MeetingCenterCreateStatus,
} = await useMeetingCenterApi.create()

const data = computed(() => MeetingCenterResponse.value?.data)
const kidData = computed(() => data.value?.filter(item => item.identity === GospelFriendIdentity.child))
// const adultData = computed(() => data.value?.filter(item => item.identity !== GospelFriendIdentity.child))
const districtOne = computed(() => data.value?.filter(
  item => item.districtName === '一區',
))
const districtTwo = computed(() => data.value?.filter(
  item => item.districtName === '二區',
))
const districtThree = computed(() => data.value?.filter(
  item => item.districtName === '三區',
))
const districtFour = computed(() => data.value?.filter(
  item => item.districtName === '四區',
))

const tabs = [
  { label: '報名名單', slot: 'join' },
  { label: '搭乘遊覽車', slot: 'departure' },
  { label: '自行前往', slot: 'selfGo' },
]

const updateData = async () => {
  await MeetingCenterCreateRequest()
  await MeetingCenterRequest()
}

const GOSPEL_FRIEND_IDENTITIES = [
  GospelFriendIdentity.male,
  GospelFriendIdentity.female,
  GospelFriendIdentity.child,
]

const isGospelFriend = (identity: string) =>
  GOSPEL_FRIEND_IDENTITIES.includes(identity as GospelFriendIdentity,
  )

const isGospelFriendString = (identity: string) => {
  if (identity === GospelFriendIdentity.child) {
    return '(兒童)'
  }
  if (identity === GospelFriendIdentity.male || identity === GospelFriendIdentity.female) {
    return '(福音朋友)'
  }

  return ''
}
</script>

<template>
  <div class="pb-20">
    <UButton
      size="sm"
      variant="soft"
      :loading="MeetingCenterCreateStatus === 'pending'"
      :disabled="!(UserInfoResponse?.user.role === Role.admin || UserInfoResponse?.user.role === Role.dev)"
      @click="updateData"
    >
      更新數據
    </UButton>
    <UTabs
      :items="tabs"
      variant="link"
      class="gap-4 w-full"
      :ui="{ trigger: 'flex-1' }"
    >
      <template #join>
        <div>6/8 港湖集中主日 報名：{{ data?.length }}位，其中兒童有{{ kidData?.length }}位</div>
        <!-- <div>成人{{ adultData?.length }}位,兒童{{ kidData?.length }}位</div> -->
        <p>一區</p>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="(item, index) in districtOne"
            :key="index"
            :color="isGospelFriend(item.identity) ? 'success' : 'info'"
            variant="soft"
          >
            {{ item.name }}{{ isGospelFriendString(item.identity) }}
          </UBadge>
        </div>
        <p>二區</p>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="(item, index) in districtTwo"
            :key="index"
            :color="isGospelFriend(item.identity) ? 'success' : 'info'"
            variant="soft"
          >
            {{ item.name }}{{ isGospelFriendString(item.identity) }}
          </UBadge>
        </div>
        <p>三區</p>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="(item, index) in districtThree"
            :key="index"
            :color="isGospelFriend(item.identity) ? 'success' : 'info'"
            variant="soft"
          >
            {{ item.name }}{{ isGospelFriendString(item.identity) }}
          </UBadge>
        </div>
        <p>四區</p>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="(item, index) in districtFour"
            :key="index"
            :color="isGospelFriend(item.identity) ? 'success' : 'info'"
            variant="soft"
          >
            {{ item.name }}{{ isGospelFriendString(item.identity) }}
          </UBadge>
        </div>
      </template>
      <template #departure>
        <div>
          <p>6/8 港湖集中主日 要搭遊覽車人位</p>
          <p class="font-bold">
            搭乘去程遊覽車(東湖->信基)({{ data?.filter(item => item.departure === Journey.departure).length }}人)
          </p>
          <p>一區:</p>
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="(item, index) in districtOne?.filter(item => item.departure === Journey.departure)"
              :key="index"
              color="info"
              variant="soft"
            >
              {{ item.name }}
            </UBadge>
          </div>
          <p>二區:</p>
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="(item, index) in districtTwo?.filter(item => item.departure === Journey.departure)"
              :key="index"
              color="info"
              variant="soft"
            >
              {{ item.name }}
            </UBadge>
          </div>
          <p>三區:</p>
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="(item, index) in districtThree?.filter(item => item.departure === Journey.departure)"
              :key="index"
              color="info"
              variant="soft"
            >
              {{ item.name }}
            </UBadge>
          </div>
          <p>四區:</p>
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="(item, index) in districtFour?.filter(item => item.departure === Journey.departure)"
              :key="index"
              color="info"
              variant="soft"
            >
              {{ item.name }}
            </UBadge>
          </div>
        </div>

        <p class="font-bold">
          搭乘回程遊覽車(信基->東湖)({{ data?.filter(item => item.returnRide === Journey.returnRide).length }}人)
        </p>
        <p>一區:</p>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="(item, index) in districtOne?.filter(item => item.returnRide === Journey.returnRide)"
            :key="index"
            color="info"
            variant="soft"
          >
            {{ item.name }}
          </UBadge>
        </div>
        <p>二區:</p>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="(item, index) in districtTwo?.filter(item => item.returnRide === Journey.returnRide)"
            :key="index"
            color="info"
            variant="soft"
          >
            {{ item.name }}
          </UBadge>
        </div>
        <p>三區:</p>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="(item, index) in districtThree?.filter(item => item.returnRide === Journey.returnRide)"
            :key="index"
            color="info"
            variant="soft"
          >
            {{ item.name }}
          </UBadge>
        </div>
        <p>四區:</p>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="(item, index) in districtFour?.filter(item => item.returnRide === Journey.returnRide)"
            :key="index"
            color="info"
            variant="soft"
          >
            {{ item.name }}
          </UBadge>
        </div>
      </template>
      <template #selfGo>
        <p>自行前往(早):</p>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="(item, index) in data?.filter(item => item.departure === Journey.selfGo)"
            :key="index"
            color="info"
            variant="soft"
          >
            {{ item.name }}
          </UBadge>
        </div>
        <p>不搭回程(午):</p>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="(item, index) in data?.filter(item => item.returnRide === Journey.notReturn)"
            :key="index"
            color="info"
            variant="soft"
          >
            {{ item.name }}
          </UBadge>
        </div>
      </template>
    </UTabs>
  </div>
</template>
