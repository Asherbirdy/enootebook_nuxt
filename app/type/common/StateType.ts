export interface StateType<
  DataType,
  // QueryType,
  FeatureType,
> {
  // 畫面資料
  data: DataType
  // 例如 線讚組建
  // 查詢資料
  // query: QueryType
  // 功能資料
  feature: FeatureType
}
