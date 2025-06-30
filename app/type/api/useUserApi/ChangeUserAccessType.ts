import type { LandingPageAccess, Role } from '~/enum'

export interface ChangeUserAccessRequestPayload {
  userId: string
  role: Role
  landingPageAccess: LandingPageAccess[]
}
