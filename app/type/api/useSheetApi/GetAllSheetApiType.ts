export interface SheetGetAllResponse {
  sheets: GoogleSheet[]
}

export interface GoogleSheet {
  _id: string
  name: string
  api: string
  createdBy: string
  createdAt: string
  updatedAt: string
  __v: number
}
