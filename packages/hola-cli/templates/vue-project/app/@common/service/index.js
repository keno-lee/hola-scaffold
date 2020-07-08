/**
 * axios 数据请求服务
 * @module src/utils/server/service
 * @author keren
 */
import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
})

// 拦截器
service.interceptors.request.use(
  requestConfig => {
    const customHeader = {
      'Third-APP': 'eday',
      'Accept-Language': getLang(),
      'Third-Signature': getSign(),
      'X-UDID': getUdid()
    }
    const businessHeader = {
      'Accept-Language': getLang(),
      Authorization: getAuthorization(),
      'X-UDID': getUdid()
    }
    requestConfig.headers = Object.assign(
      requestConfig.headers,
      window.location.href.indexOf('custom') > 0 ? customHeader : businessHeader
    )
    return requestConfig
  },
  error => Promise.error(error)
)
/**
 * 统一请求错误处理,axios拦截器
 */
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      // 上报错误
      const errObj = {
        error: error.response,
        uri: error.response.request.responseURL
      }
      report('dsq-web ajax error', JSON.stringify(errObj))
      layer.warning('网络异常，请稍后重试!')
    } else if (error.request) {
      console.log(error.request)
      layer.warning('网络异常，请稍后重试!')
    } else {
      layer.warning('网络异常，请稍后重试!')
    }
    return Promise.reject(error)
  }
)

export default service
