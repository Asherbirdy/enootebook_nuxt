export enum LandingPageAccess {
  create = 'create', // 允許新增
  edit_post = 'edit_post', // 允許編輯
  delete = 'delete', // 允許刪除
}

export const landingPageAccessOptions = [
  {
    label: '允許新增',
    value: LandingPageAccess.create,
  },
  {
    label: '允許編輯',
    value: LandingPageAccess.edit_post,
  },
  {
    label: '允許刪除',
    value: LandingPageAccess.delete,
  },
]
