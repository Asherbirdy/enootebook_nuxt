/*
 * 不需要 token 的 API
*/
export enum PublicRequestUrl {
  // DEV
  Dev = '/dev',

  // AUTH
  Login = '/auth/login',
  UserRegister = '/auth/userRegister',

  // LANDING PAGE
  LandingPageGetInfoById = '/landingPage/getLandingPageInfoById',

  // ATTENDANCE ACCOUNT
  AttendanceAccountActivate = '/attendanceAccount/activate',

  // FELLOWSHIP RECORD
  FellowshipRecordCheckOrCreate = '/fellowshipRecord/checkOrCreate',
  FellowshipRecordEdit = '/fellowshipRecord/edit',
}

/*
 * 需要 token 的 API
*/
export enum UserRequestUrl {
  // DEV
  Dev = '/dev',

  // AUTH
  CheckValidToken = '/auth/checkValidToken',
  SendOTP = '/auth/sendOTP',
  BindOTPEmail = '/auth/bindOTPEmail',

  // USER
  UserShowMe = '/users/showMe',
}
