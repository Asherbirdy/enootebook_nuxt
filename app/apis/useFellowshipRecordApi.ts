import { PublicRequestUrl } from '~/enum'

export const useFellowshipRecordApi = {
  checkOrCreate: async () => await useRequestApi(
    PublicRequestUrl.FellowshipRecordCheckOrCreate,
    {
      method: 'GET',
      server: false,
      lazy: true,
    },
  ),
  edit: async () => await useRequestApi(
    PublicRequestUrl.FellowshipRecordEdit,
    {
      method: 'GET',
      server: false,
      lazy: true,
    },
  ),
}
