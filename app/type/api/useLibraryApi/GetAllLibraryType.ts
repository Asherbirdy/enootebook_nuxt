export interface GetAllLibraryResponse {
  msg: string
  count: number
  library: Library[]
}

export interface Library {
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
