export interface EditLibraryPayload {
  libraryId: string
  title: string
}

export interface EditLibraryResponse {
  msg: string
  library: EditLibrary
}

export interface EditLibrary {
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
