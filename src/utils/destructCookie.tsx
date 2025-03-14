import Cookies from "js-cookie"

export const destructCookie = (cookie: string) => {
  Cookies.remove(cookie)
  return
}