import type { CreateQuizPayload, CreateQuizResponse, GetQuizQuestionsResponse, GetQuizResponse } from '~/type'
import { useRequestApi } from '~/composables'
import { PublicRequestUrl } from '~/enum'

export const useQuizApi = {

  /*
    * 建立 quiz
  */
  create: async (payload: CreateQuizPayload) => {
    return await useRequestApi<CreateQuizResponse, any>(
      `${PublicRequestUrl.Dev}?libraryId=${payload.libraryId}&quizQuantity=${payload.quizQuantity}`,
      {
        method: 'POST',
        server: false,
        lazy: true,
      },
    )
  },

  /*
    * 取得 current quiz
  */
  currentQuiz: async () => {
    return await useRequestApi<GetQuizResponse, any>(PublicRequestUrl.Dev, {
      method: 'GET',
      server: false,
      lazy: true,
    })
  },

  /*
    * 取得 quiz 問題
  */
  getQuizQuestions: async (libraryId: string) => {
    return await useRequestApi<GetQuizQuestionsResponse, any>(
      `${PublicRequestUrl.Dev}?libraryId=${libraryId}`,
      {
        method: 'GET',
        server: false,
        lazy: true,
      },
    )
  },
  closeQuiz: async () => {
    return await useRequestApi(PublicRequestUrl.Dev, {
      method: 'GET',
      server: false,
      lazy: true,
    })
  },
  answerQuiz: async () => {
    return await useRequestApi(PublicRequestUrl.Dev, {
      method: 'GET',
      server: false,
      lazy: true,
    })
  },
}
