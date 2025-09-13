export interface AnswerQuizPayload {
  quizId: string
  quizAnswer: string[]
}

export interface AnswerQuizResponse {
  msg: string
  score: AnswerQuizScore
  lib: AnswerQuizLib
  createQuizRecord: AnswerQuizCreateQuizRecord
}

export interface AnswerQuizScore {
  total: number
  scored: number
}

export interface AnswerQuizLib {
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

export interface AnswerQuizCreateQuizRecord {
  userId: string
  libraryId: string
  records: AnswerQuizRecord[]
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface AnswerQuizRecord {
  word: string
  translation: string
  userAnswer: string
  corrected: boolean
  originalProficiencyLevel: number
  updatedProficiencyLevel: number
  _id: string
}
