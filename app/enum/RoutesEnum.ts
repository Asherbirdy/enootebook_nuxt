/* eslint-disable ts/prefer-literal-enum-member */

export enum PublicRoutes {
  Home = '/',
  Login = '/login',
  LandingPage = '/lands',

  LineOa = '/lineoa',
  LineOaRegister = '/lineoa/register',
}

export const ClientBase = '/C'

export enum ClientRoutes {
  Home = `${ClientBase}/`,
  User = `${ClientBase}/user`,

  LandingPage = `${ClientBase}/landingPage`,
  LandingPageEditor = `${ClientBase}/landingPage/editor`,

  Sheet = `${ClientBase}/sheet`,
  SerialNumber = `${ClientBase}/serialNumber`,

  MeetingCenter = `${ClientBase}/googleSheet/meetingCenter`,
  Blending = `${ClientBase}/googleSheet/blending`,

  District = `${ClientBase}/district`,

  // AttendanceAccount = `${ClientBase}/attendanceAccount`,

  HomeMeeting = `${ClientBase}/homeMeeting`,
  HomeMeetingSheep = `${ClientBase}/homeMeeting/sheep`,

  FellowshipCounting = `${ClientBase}/fellowshipCounting`,
  FellowshipCountingLineAccount = `${ClientBase}/fellowshipCounting/lineAccount`,
  FellowshipCountingReportGroup = `${ClientBase}/fellowshipCounting/reportGroup`,
}
