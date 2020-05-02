export const rowsPerPageItems = [20, 100]

let doMock = false
let url = '/api'

if (window.location.hostname === 'localhost') {
   url = 'http://api.test.eu.ngrok.io/api'
}

export const baseURL = url
export const mockApp = doMock
