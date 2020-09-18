export function handleLoginData (data, username, password) {
  const { account: { id }, token, cookie, profile: { nickname, avatarUrl } } = data
  document.cookie = cookie
  window.localStorage.setItem('token', token)
  window.localStorage.setItem('account', username)
  window.localStorage.setItem('password', password)
  window.localStorage.setItem('userInfo', JSON.stringify({
    account: username,
    password,
    uid: id,
    nickname,
    avatarUrl
  }))
}
