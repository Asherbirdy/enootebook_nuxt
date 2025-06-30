<script setup lang="ts">
import type {
  AttendanceAccountDataType,
  AttendanceAccountFeatureType,
  AttendanceAccountGetAll,
  StateType,
} from '~/type'
import { useAttendanceAccountApi } from '~/apis/useAttendanceAccountApi'
import { CreateAttendanceAccountComponent } from '~/components'
import { UserRequestUrl } from '~/enum'

const state = ref<StateType<AttendanceAccountDataType, AttendanceAccountFeatureType>>({
  data: {
    form: {
      _id: '',
      name: '',
      serialNumber: '',
      lineProfileId: '',
      serialNumberExpiredDate: '',
      active: false,
      createdAt: '',
      updatedAt: '',
      __v: 0,
    },
  },
  feature: {
    modal: {
      open: false,
    },
    delete: {
      isLoading: false,
    },
    create: {
      isLoading: false,
    },
  },
})

/*
  * 取的資料 API
*/
const {
  data: AttendanceAccountResponse,
} = await useAttendanceAccountApi.getAll()

/*
  * 刪除 API
*/
const handleDeleteAttendanceAccount = async () => {
  const { data, feature } = state.value

  const { execute } = await useAttendanceAccountApi.delete({
    attendanceAccountId: data.form._id,
  })

  feature.delete.isLoading = true
  await execute()
  feature.delete.isLoading = false

  await refreshNuxtData(UserRequestUrl.AttendanceAccount)
  feature.modal.open = false
}

/*
  * 打開 Info Modal
*/
const handleOpenInfoModal = (form: AttendanceAccountGetAll) => {
  const { feature, data } = state.value
  feature.modal.open = true
  data.form = form
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <h1>Attendance Account</h1>
      <CreateAttendanceAccountComponent />
    </div>
    <UBadge
      v-for="item in AttendanceAccountResponse?.data"
      :key="item._id"
      :label="`${item.name} ${item.active ? '' : '(未啟動)'}`"
      variant="soft"
      :color="item.active ? 'primary' : 'warning'"
      @click="handleOpenInfoModal(item)"
    />
    <UModal
      v-model:open="state.feature.modal.open"
      title="帳號資訊"
      :ui="{ footer: 'justify-end' }"
    >
      <template #body>
        <div>
          <p>名字： {{ state.data.form.name }}</p>
          <p>序號： {{ state.data.form.serialNumber }}</p>
          <p>序號到期日： {{ state.data.form.serialNumberExpiredDate }}</p>
          <p>LineProfile： {{ state.data.form.lineProfileId }}</p>
          <p>啟用： {{ state.data.form.active ? '是' : '否' }}</p>
        </div>
      </template>
      <template #footer>
        <UPopover>
          <UButton
            label="刪除"
            color="neutral"
            :disabled="state.data.form.active"
            variant="subtle"
          />
          <template #content>
            <UButton
              label="確認刪除"
              color="error"
              @click="handleDeleteAttendanceAccount"
            />
          </template>
        </UPopover>
        <UButton
          label="確認"
          variant="outline"
          @click="state.feature.modal.open = false"
        />
      </template>
    </UModal>
  </div>
</template>
