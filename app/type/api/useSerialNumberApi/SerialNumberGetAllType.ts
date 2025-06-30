export interface SerialNumberGetAllResponse {
  msg: string
  userSerialNumber: SerialNumberGetAllUserSerialNumber[]
}

export interface SerialNumberGetAllUserSerialNumber {
  _id: string
  serialNumber: string
  isUsed: boolean
  role: string
  districtId: {
    _id: string
    name: string
    active: boolean
    __v: number
  }
  createByUser: string
  notes: string
  createdAt: string
  updatedAt: string
  __v: number
}
