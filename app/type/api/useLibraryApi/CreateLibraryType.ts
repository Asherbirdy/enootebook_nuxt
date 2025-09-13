export interface CreateLibraryResponse {
  msg: string
  library: CreateLibrary
}

export interface CreateLibrary {
  userId: string
  title: string
  averageLevel: number
  librarySize: number
  onQuiz: boolean
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}
