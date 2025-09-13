export interface CheckVobExistPayload {
  word: string
}

export interface CheckVobExistResponse {
  msg: string
  repeat: boolean
  word: CheckVobExistWord[]
}

export interface CheckVobExistWord {
  _id: string
  word: string
  translation: string
  proficiencyLevel: number
  timesTested: number
  libraryId: CheckVobExistLibraryId
  userId: string
  testFormat: CheckVobExistTestFormat[]
  __v: number
}

export interface CheckVobExistLibraryId {
  userId: string
  title: string
  onQuiz: boolean
  createdAt: string
  updatedAt: string
}

export interface CheckVobExistTestFormat {
  firstLetter: string
  lastLetter: string
  middleDash: number
  _id: string
}
