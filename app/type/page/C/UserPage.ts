import type { LandingPageAccess, Role } from '~/enum'

export interface UserPageDataType {
  form: {
    userId: string
    role: Role
    landingPageAccess: LandingPageAccess[]
  }
}

export interface UserPageFeatureType {
  modal: {
    open: boolean
  }
}
