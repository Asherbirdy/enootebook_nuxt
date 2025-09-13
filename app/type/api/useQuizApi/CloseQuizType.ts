export interface CloseQuizPayload {
  libraryId: string
}

export interface CloseQuizResponse {
  msg: string
  lib: CloseQuizLibrary
  deleteQuiz: DeleteLibraryQuiz
}

export interface CloseQuizLibrary {
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

export interface DeleteLibraryQuiz {
  acknowledged: boolean
  deletedCount: number
}
