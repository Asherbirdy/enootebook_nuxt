export interface DeleteLibraryResponse {
  msg: string
  deleteVocabulary: DeleteVocabulary
  deleteQuizByLibraryId: DeleteQuizByLibraryId
}

export interface DeleteVocabulary {
  acknowledged: boolean
  deletedCount: number
}

export interface DeleteQuizByLibraryId {
  acknowledged: boolean
  deletedCount: number
}
