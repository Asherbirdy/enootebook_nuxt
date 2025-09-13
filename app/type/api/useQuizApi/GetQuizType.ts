export interface GetQuizResponse {
  msg: string
  count: number
  getQuiz: GetQuiz[]
}

export interface GetQuiz {
  _id: string
  userId: string
  libraryId: GetQuizLibraryId
  quizVocabularyIds: string[]
  createdAt: string
  updatedAt: string
  __v: number
}

export interface GetQuizLibraryId {
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
