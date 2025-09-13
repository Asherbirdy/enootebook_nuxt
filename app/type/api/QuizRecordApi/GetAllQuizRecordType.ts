export interface GetAllQuizRecordsResponse {
  msg: string
  getAllRecords: GetAllRecord[]
}

export interface GetAllRecord {
  _id: string
  userId: string
  libraryId: string
  records: GetAllRecord[]
  createdAt: string
  updatedAt: string
  __v: number
}

export interface GetAllRecord {
  word: string
  translation: string
  userAnswer: string
  corrected: boolean
  originalProficiencyLevel: number
  updatedProficiencyLevel: number
  _id: string
}
