export interface GetAllDistrictResponse {
  msg: string
  districts: District[]
}

export interface District {
  _id: string
  name: string
  active: boolean
  __v: number
}
