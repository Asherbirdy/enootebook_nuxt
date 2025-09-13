export interface CreateQuizPayload {
  libraryId: string
  quizQuantity: number
}

export interface CreateQuizResponse {
  msg: string
  createQuiz: CreateQuiz
}

export interface CreateQuiz {
  userId: string
  libraryId: string
  quizVocabularyIds: string[]
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}
