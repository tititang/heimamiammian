export function settoken(value) {
    localStorage.setItem('token', value)
}
export function gettoken() {
    return localStorage.getItem('token')
}
export function removetoken() {
    localStorage.removeItem('token')
}