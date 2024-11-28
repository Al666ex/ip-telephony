import axios from 'axios'

const $host = axios.create({
    baseURL : import.meta.env.VITE_BACKEND_URL
})

const $authHost = axios.create({
    baseURL : import.meta.env.VITE_BACKEND_URL
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}