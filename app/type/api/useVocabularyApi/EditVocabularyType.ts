export interface EditVobPayload {
  vocabularyId: string
  word: string
  translation: string
}

export interface EditVobResponse {
  msg: string
  edit: EditVob
}

export interface EditVob {
  _id: string
  word: string
  translation: string
  proficiencyLevel: number
  timesTested: number
  libraryId: string
  userId: string
  testFormat: EditVobTestFormat[]
  __v: number
}

export interface EditVobTestFormat {
  firstLetter: string
  lastLetter: string
  middleDash: number
  _id: string
}
