import type { Liff } from '@line/liff'
import type { Ref } from 'vue'
import type { CookieEnums } from '~/enum'

export interface LineProfile {
  displayName: string
  pictureUrl: string
  statusMessage: string
  userId: string
}
export interface LiffReturn {
  LIFF: Ref<Liff | null>
  LineProfile: Ref<LineProfile | null>
}

export interface LiffConfig {
  liffId: {
    dev: string // 開發環境的 liffId
    production?: string // 正式環境的 liffId
  }
  login: boolean // 是否需要登入
  liffInit: boolean // 是否需要初始化
  redirectUrl?: string // 重定向的 url
}

interface SetLiffStateToCookie {
  cookieName: CookieEnums
  expires: number
}

interface GetLiffFromCookie {
  cookieName: string
}

/**
 * 使用 LIFF ID 初始化 LIFF
 */
export const useLiff = (payload: LiffConfig): LiffReturn => {
  const LIFF = ref<Liff | null>(null)
  const LineProfile = ref<LineProfile | null>(null)

  const initLiff = async () => {
    const { liffId, login, liffInit, redirectUrl } = payload
    const config = useRuntimeConfig()

    const liffIdFromEnv = () => {
      if (config.public.ENVIRONMENT === 'development') {
        return liffId?.dev || ''
      }

      if (config.public.ENVIRONMENT === 'production') {
        return liffId?.production || ''
      }

      console.error('請補上環境變數', config.public.environment)
    }

    try {
      // eslint-disable-next-line no-console
      console.log('liffId', liffIdFromEnv())

      if (!liffInit) {
        return
      }

      const liff = (await import('@line/liff')).default
      await liff.init({
        liffId: liffIdFromEnv() || '',
      })

      LIFF.value = liff

      if (!login) {
        return
      }

      if (!LIFF.value.isLoggedIn()) {
        liff.login({
          redirectUri: redirectUrl,
        })
      }

      LIFF.value
        .getProfile()
        .then((profile) => {
          LineProfile.value = {
            displayName: profile.displayName,
            pictureUrl: profile.pictureUrl || '',
            statusMessage: profile.statusMessage || '',
            userId: profile.userId,
          }
        })
    }
    catch (error) {
      console.error('Failed to initialize LIFF:', error)
    }
  }

  onMounted(initLiff)
  return { LIFF, LineProfile }
}

// 因為 liff 的 state 是 url 的 query string(會打亂網址)，所以需要設定 cookie 的值
export const liffStateFromUrl = {
  setToCookie: setLiffStateToCookie,
  getFromCookie: getLiffFromCookie,
}

/*
  * 將網址的 query string 傳到 cookie 的值
*/
function setLiffStateToCookie(payload: SetLiffStateToCookie) {
  const urlParams = new URLSearchParams(window.location.search)
  const liffState = urlParams.get('liff.state')
  if (!liffState) {
    return
  }
  const cookie = useCookie(`${payload.cookieName}`, { expires: new Date(Date.now() + payload.expires) })
  cookie.value = liffState
}

/*
* 取得 cookie 的值
cookieName = ?domainName=xxxx.xxxx.com&sysUserId=3709&shareToGoLineId=U774567032dba185066e4da0b51b166b0
* 使用方式
const {
  domainName,
  sysUserId,
  shareToGoLineId,
} = liffStateCookie.get({ cookieName: CookieEnums.binding_index })
*/
function getLiffFromCookie(payload: GetLiffFromCookie) {
  const cookie = useCookie(`${payload.cookieName}`)
  const liffStateFromCookie = cookie.value?.replace(/^\?/, '')
  // 將 query string 轉成 object
  return Object.fromEntries(new URLSearchParams(liffStateFromCookie))
}
