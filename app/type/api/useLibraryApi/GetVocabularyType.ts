export interface GetVocabularyResponse {
  msg: string
  library: GetVocabularyLibrary
  count: number
  allVocabulary: AllVocabulary[]
}

export interface GetVocabularyLibrary {
  _id: string
  userId: string
  title: string
  averageLevel: number
  librarySize: number
  onQuiz: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export interface AllVocabulary {
  _id: string
  word: string
  translation: string
  proficiencyLevel: number
  timesTested: number
  libraryId: string
  userId: string
  testFormat: TestFormat[]
  __v: number
}

export interface TestFormat {
  firstLetter: string
  lastLetter: string
  middleDash: number
  _id: string
}
