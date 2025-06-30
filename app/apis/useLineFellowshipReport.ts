import type { GetAllLineFellowshipReportResponse, LineFellowshipReportIdCreatePayload, LineFellowshipReportIdEditPayload } from '~/type'
import { UserRequestUrl } from '../enum'

export const useLineFellowshipReportApi = {
  getAll: async () =>
    await useRequestApi<GetAllLineFellowshipReportResponse, null>(
      UserRequestUrl.LineFellowshipReport,
      {
        method: 'GET',
        server: false,
      },
    ),
  create: async (payload: LineFellowshipReportIdCreatePayload) =>
    await useRequestApi(
      UserRequestUrl.LineFellowshipReport,
      {
        method: 'POST',
        server: false,
        body: payload,
        lazy: true,
        immediate: false,
        watch: false,
      },
    ),
  edit: async (payload: LineFellowshipReportIdEditPayload) =>
    await useRequestApi(
      UserRequestUrl.LineFellowshipReport,
      {
        method: 'PUT',
        server: false,
        body: payload,
        lazy: true,
        immediate: false,
        watch: false,
      },
    ),
}
