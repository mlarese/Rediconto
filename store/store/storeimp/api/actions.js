import axios from 'axios'
import {mockApp, baseURL} from './api-properties'
import Vue from 'vue'
import {getSchema} from "../../../assets/helpers";

if (mockApp) require('./mocks')

const scheme = getSchema()
const getToken = () => Vue.localStorage.get(`auth._token.${scheme}`)

export const notifyError = (err, translate = null) => {
    let text = 'Error'
    let title = 'Error'
    let type = 'error'

    if (err.response.data && err.response.data.error_message) {
        text = err.response.data.error_message
    } else if (err.response.statusText) {
        text = err.response.statusText
    } else if (err.message) {
        text = err.message
    }

    if (translate) {
        title = translate(title)
        text = translate(text)
    }
    return {title, text, type}
}

export const notifySuccess = ({title, text}) => ({title, text, type: 'success'})

const instance = axios.create({
    baseURL,
    timeout: 90000,
    headers: {'Content-Type': 'application/json'},
    withCredentials: false
})

export const actions = {
    init ({commit}) {
        commit('error')
        commit('hasError')
    },
    get ({commit, getters, rootGetters}, {url, options = {}, debug = false}) {
        commit('isAjax', true)
        commit('error')
        commit('hasError')

        if (!options.headers)  options.headers = {}
        options.headers.Authorization = getToken()

        // console.log(baseURL + url, options)

        return instance.get(url, options)
            .then(res => {
                commit('isAjax')
                return res
            })
            .catch(err => {
                console.dir(err)

                commit('isAjax')
                commit('error', err)
                commit('hasError', true)
                commit('notification', notifyError(err))
                return Promise.reject(err)
            })
    },
    post ({commit, getters, rootGetters}, {url, data = {}, options = {}}) {
        commit('isAjax', true)
        commit('error')
        commit('hasError')

        if (!options.headers)  options.headers = {}
        options.headers.Authorization = getToken()

        return instance.post(url, data, options)
            .then(res => {
                commit('isAjax')
                return res
            })
            .catch(err => {
                console.log(err)
                commit('isAjax')
                commit('error', err)
                commit('hasError', true)
                commit('notification', notifyError(err))
                return Promise.reject(err)
            })
    },
    put ({commit, getters, rootGetters}, {url, data, options = {}}) {
        commit('isAjax', true)
        commit('error')
        commit('hasError')

        if (!options.headers)  options.headers = {}
        options.headers.Authorization = getToken()

        return instance.put(url, data, options)
            .then(res => {
                commit('isAjax')
                return res
            })
            .catch(err => {
                console.log(err)
                commit('isAjax')
                commit('error', err)
                commit('hasError', true)
                commit('notification', notifyError(err))
                return Promise.reject(err)
            })
    },
    delete ({commit, getters, rootGetters}, {url, options = {}}) {
        commit('isAjax', true)
        commit('error')
        commit('hasError')
        if (!options.headers)  options.headers = {}
        options.headers.Authorization = getToken()

        return instance.delete(url, options)
            .then(res => {
                commit('isAjax')
                return res
            })
            .catch(err => {
                console.log(err)
                commit('isAjax')
                commit('error', err)
                commit('hasError', true)
                commit('notification', notifyError(err))
                return Promise.reject(err)
            })
    }
}
