<script setup lang='ts'>
import { useLineFellowshipReportApi } from '~/apis'

const { data } = await useLineFellowshipReportApi.getAll()
</script>

<template>
  <div>
    <h1>Report Group</h1>
  </div>
</template>
