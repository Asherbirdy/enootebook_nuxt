export interface IndexStateData {
  emailVerifiedModal: {
    OTP: string
  }
}

export interface IndexStateFeature {
  emailCountdown: {
    status: boolean
    time: number
    countdown: number
  }
}
