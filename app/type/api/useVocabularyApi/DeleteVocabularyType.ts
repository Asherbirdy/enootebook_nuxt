export interface DeleteVobPayload {
  vocabularyId: string
}

export interface DeleteVobResponse {
  msg: string
  vocabulary: DeleteVobVocabulary
}

export interface DeleteVobVocabulary {
  _id: string
  word: string
  translation: string
  proficiencyLevel: number
  timesTested: number
  libraryId: string
  userId: string
  testFormat: DeleteVobTestFormat[]
  __v: number
}

export interface DeleteVobTestFormat {
  firstLetter: string
  lastLetter: string
  middleDash: number
  _id: string
}
