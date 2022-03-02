export function toSetLocalStroage (name, value) {
  window.localStorage.setItem(name, value)
}
export function toGetLocalStroage (name) {
  window.localStorage.getItem(name)
}
export function toRemoveLocalStroage (name) {
  window.localStorage.removeItem(name)
}
export function toClearLocalStroage () {
  window.localStorage.clear()
}
