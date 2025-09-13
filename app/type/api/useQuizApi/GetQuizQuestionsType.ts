export interface GetQuizQuestionsResponse {
  msg: string
  quizQuestion: QuizQuestion[]
  quizId: string
  libraryId: string
  quiz: QuizDetail
}

export interface QuizQuestion {
  index: number
  translation: string
  test: string
}

export interface QuizDetail {
  _id: string
  userId: string
  libraryId: string
  quizVocabularyIds: string[]
  createdAt: string
  updatedAt: string
  __v: number
  vocabularyDetails: VocabularyDetail[]
}

export interface VocabularyDetail {
  _id: string
  translation: string
  proficiencyLevel: number
  timesTested: number
  libraryId: string
  userId: string
  testFormat: QuizDetailTestFormat[]
  __v: number
}

export interface QuizDetailTestFormat {
  firstLetter: string
  lastLetter: string
  middleDash: number
  _id: string
}
