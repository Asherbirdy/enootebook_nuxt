<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { LandingPageGetAllData, StateType } from '~/type'
import { useLandingPageApi } from '~/apis/useLandingPageApi'
import { AddLandingPageComponent } from '~/components'
import { useWindowSize } from '~/composables/useWindowSize'
import { ClientRoutes, LandingPageAccess, PublicRoutes, UserRequestUrl } from '~/enum'

const table = useTemplateRef<HTMLTableElement>('table')
const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const { data: LandingPageResponse } = await useLandingPageApi.getAll()

interface DataType {
  modal: {
    currentData: LandingPageGetAllData
  }
}

interface FeatureType {
  modal: {
    open: boolean
  }
}

const state = ref<StateType<DataType, FeatureType>>({
  data: {
    modal: {
      currentData: {
        _id: '',
        title: '',
        isActive: false,
        isCustom: false,
        urlPathId: '',
        updatedAt: '',
        description: '',
        isCustomId: '',
        updatedBy: '',
        lastEditVisited: '',
        createdAt: '',
        lastEditVisitedUser: '',
        __v: 0,
      },
    },
  },
  feature: {
    modal: {
      open: false,
    },
  },
})
const { isMdSize } = useWindowSize()

const { data: UserInfoResponse } = useNuxtData(UserRequestUrl.UserShowMe)

const urlBase = computed(() => window.location.origin)

const openModal = (data: LandingPageGetAllData) => {
  state.value.data.modal.currentData = data
  state.value.feature.modal.open = true
}

const columns: TableColumn<LandingPageGetAllData>[] = [
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => h(UBadge, {
      class: 'capitalize',
      variant: 'subtle',
      color: row.getValue('isActive') ? 'success' : 'info',
    }, () => row.getValue('isActive') ? '上線' : '未上線'),
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => row.getValue('title'),
  },
  {
    accessorKey: 'isCustom',
    header: 'Custom',
    cell: ({ row }) => h(UBadge, {
      class: 'capitalize',
      variant: 'subtle',
      color: row.getValue('isCustom') ? 'info' : 'neutral',
    }, () => row.getValue('isCustom') ? '客製化' : '公版'),
  },
  // {
  //   accessorKey: 'urlPathId',
  //   header: 'URL Path ID',
  //   cell: ({ row }) => row.getValue('urlPathId'),
  // },
  {
    accessorKey: '_id',
    header: 'url',
    cell: ({ row }) => `${urlBase.value}${PublicRoutes.LandingPage}/${row.getValue('_id')}`,
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const isEdit = UserInfoResponse.value.user.landingPageAccess.includes(LandingPageAccess.edit_post)
      const items = [
        ...(isEdit
          ? [{
              label: '文字編輯器',
              onSelect() {
                navigateTo(`${ClientRoutes.LandingPageEditor}/${row.original._id}`)
              },
            }, {
              label: '編輯標題',
              type: 'Actions',
              onSelect: () => {
                openModal(row.original)
              },
            }]
          : []),
      ]

      return h(
        'div',
        { class: 'text-right' },
        h(UDropdownMenu, {
          'content': { align: 'end' },
          items,
          'aria-label': 'Actions dropdown',
        }, () => h(
          UButton,
          {
            'icon': 'i-lucide-ellipsis-vertical',
            'color': 'neutral',
            'variant': 'ghost',
            'class': 'ml-auto',
            'aria-label': 'Actions dropdown',
          },
        )),
      )
    },
  },
]

const onSubmit = async () => {
  const { execute } = await useLandingPageApi.editInfoById({
    query: {
      landingPageId: state.value.data.modal.currentData._id,
    },
    body: state.value.data.modal.currentData,
  })
  await execute()
  refreshNuxtData(UserRequestUrl.LandingPageGetALL)
  state.value.feature.modal.open = false
}
</script>

<template>
  <div class="flex-1 w-full">
    <div class="flex justify-between mb-3">
      <p class="text-lg font-bold">
        Landing Page
      </p>
      <AddLandingPageComponent />
    </div>
    <UTable
      v-if="!isMdSize"
      ref="table"
      :data="LandingPageResponse?.data"
      :columns="columns"
      sticky
      class="h-96"
    >
      <template #expanded="{ row }">
        <pre>{{ row.original }}</pre>
      </template>
    </UTable>
    <!-- 手機版 -->
    <div
      v-else
      class="flex flex-col w-full"
    >
      <UCard
        v-for="row in LandingPageResponse?.data"
        :key="row._id"
        class="mb-3 w-full"
      >
        <div class="flex flex-wrap gap-2 mb-2">
          <UBadge
            :color="row.isActive ? 'success' : 'info'"
            variant="soft"
          >
            {{ row.isActive ? '上線' : '未上線' }}
          </UBadge>
          <UBadge
            color="neutral"
            variant="soft"
          >
            {{ row.isCustom ? '客製化' : '公版' }}
          </UBadge>
        </div>
        <h2 class="text-lg font-bold mb-2">
          {{ row.title }}
        </h2>
        <p class="mb-1">
          ID: {{ row.urlPathId }}
        </p>
        <p class="text-sm break-all mb-4">
          網址: {{ `${urlBase}${PublicRoutes.LandingPage}/${row._id}` }}
        </p>

        <div class="flex flex-wrap gap-2 justify-center">
          <UButton
            variant="soft"
            size="sm"
            class="sm:flex-none"
            :disabled="!UserInfoResponse.user.landingPageAccess.includes(LandingPageAccess.edit_post)"
            @click="openModal(row)"
          >
            編輯標題
          </UButton>
          <UButton
            variant="soft"
            size="sm"
            :disabled="!UserInfoResponse.user.landingPageAccess.includes(LandingPageAccess.edit_post)"
            class="sm:flex-none"
            @click="navigateTo(`${ClientRoutes.LandingPageEditor}/${row._id}`)"
          >
            文字編輯器
          </UButton>
        </div>
      </UCard>
    </div>
    <UModal
      v-model:open="state.feature.modal.open"
      title="編輯頁面資訊"
      :ui="{ footer: 'justify-end' }"
    >
      <template #body>
        <UForm
          :state="state.data"
          class="space-y-4 flex flex-col gap-4"
        >
          <UFormField
            label="標題"
            name="title"
          >
            <UInput
              v-model="state.data.modal.currentData.title"
              label="標題"
              name="title"
              :ui="{ root: 'w-full' }"
            />
          </UFormField>
        </UForm>
      </template>
      <template #footer>
        <UButton
          label="取消"
          color="neutral"
          variant="outline"
          @click="state.feature.modal.open = false"
        />
        <UButton
          label="更新"
          @click="onSubmit"
        />
      </template>
    </UModal>
  </div>
</template>
