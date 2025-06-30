import type { Role } from '~/enum'

export interface UserPageDataType {
  form: {
    userId: string
    role: Role
  }
}

export interface UserPageFeatureType {
  modal: {
    open: boolean
  }
}
