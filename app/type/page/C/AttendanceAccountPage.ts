export interface AttendanceAccountDataType {
  form: {
    name: string
    api: string
  }
}

export interface AttendanceAccountFeatureType {
  modal: {
    open: boolean
  }
  delete: {
    isLoading: boolean
  }
  create: {
    isLoading: boolean
  }
}
