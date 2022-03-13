export function toSetLocalStroage (name, value) {
  localStorage.setItem(name, value)
}
export function toGetLocalStroage (name) {
  localStorage.getItem(name)
}
export function toRemoveLocalStroage (name) {
  localStorage.removeItem(name)
}
export function toClearLocalStroage () {
  localStorage.clear()
}
