export interface AddVobToLibraryPayload {
  libraryId: string
  word: string
  translation: string
}

export interface AddVobToLibraryResponse {
  msg: string
  data: AddVobToLibraryData
}

export interface AddVobToLibraryData {
  word: string
  translation: string
  proficiencyLevel: number
  timesTested: number
  libraryId: string
  userId: string
  _id: string
  testFormat: AddVobToLibraryDataTestFormat[]
  __v: number
}

export interface AddVobToLibraryDataTestFormat {
  firstLetter: string
  lastLetter: string
  middleDash: number
  _id: string
}
