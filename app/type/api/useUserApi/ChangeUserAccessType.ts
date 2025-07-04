import type { Role } from '~/enum'

export interface ChangeUserAccessRequestPayload {
  userId: string
  role: Role
}
