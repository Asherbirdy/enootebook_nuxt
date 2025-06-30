export interface GetAllLineFellowshipReportResponse {
  msg: string
  lineFellowshipReportIds: LineFellowshipReportId[]
}

export interface LineFellowshipReportId {
  _id: string
  name: string
  createBy: string
  recordWeekSundayDate: string
  expiredTime: string
  createdAt: string
  updatedAt: string
  __v: number
}
