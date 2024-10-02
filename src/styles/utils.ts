export const setThemeCookie = (theme: string) => {
  document.cookie =
    `theme=${theme};expires=` +
    new Date(new Date().getTime() + 400 * 24 * 60 * 60 * 1000).toUTCString()
  // Set the data-theme attribute for <html>
  document.documentElement.setAttribute('data-theme', theme)
}
