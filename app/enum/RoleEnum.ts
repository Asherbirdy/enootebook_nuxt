export enum Role {
  dev = 'dev', // 開發者
  admin = 'admin', // 管理者 子開發者
  districtLeader = 'districtLeader', // 區域負責人(一般都創建這帳號)
  user = 'user', // 使用者
}

export const roleOptions = [
  {
    label: '管理者',
    value: Role.admin,
  },
  {
    label: '區負責',
    value: Role.districtLeader,
  },
  {
    label: '使用者',
    value: Role.user,
  },
]
