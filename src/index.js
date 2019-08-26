import service from 'service-api'
import { formatJSON, configService, getQueryString } from './utils'

const typeMap = {
  form: 'application/x-www-form-urlencoded;charset=utf-8',
  formdata: 'multipart/form-data',
  json: 'application/json;charset=utf-8'
}

configService()

const isParentNode = (parentNode, ele) => {
  if (ele) {
    if (ele.parentNode === parentNode || ele === parentNode) {
      return true
    }
    return isParentNode(parentNode, ele.parentNode)
  }
}

let respDescMap = {}

let descTimer

window.onload = () => {
  let mockData = APIDATA
  let metaMap = {}
  mockData.forEach((mockConfig) => {
    let project = mockConfig.path
    let rules = mockConfig.rules
    rules.forEach((ruleConfig) => {
      let prefix = ruleConfig.name
      let apis = ruleConfig.apis
      apis.forEach((apiConfig) => {
        let path = apiConfig.path
        metaMap[project + prefix + path] = apiConfig
      })
    })
  })
  let result = document.getElementById('result')
  document.querySelectorAll('.folder').forEach((ele) => {
    ele.onclick = (e) => {
      if (e.target === ele.firstChild) {
        ele.classList.toggle('closed')
      }
    }
  })

  document.querySelectorAll('.view').forEach((ele) => {
    ele.onclick = (e) => {
      e.stopPropagation()
      e.preventDefault()
      if (e.target === ele) {
        let data = ele.dataset
        let uuid = data.id
        let meta = metaMap[uuid]
        respDescMap = meta.respDescMap
        let method = document.querySelector('[name="' + uuid + '"]:checked').value
        let paramsTextarea = document.getElementById(uuid + '-textarea')
        let params
        if (paramsTextarea) {
          params = paramsTextarea.value.trim()
          if (params) {
            if (/^\{/.test(params)) {
              try {
                params = Function('return ' + params)()
              } catch (e) {}
            } else {
              params = getQueryString(params)
            }
          }
        }
        let context = {
          context: document.body
        }
        let headersTextarea = document.getElementById(uuid + '-headers')
        let headers = {}
        if (headersTextarea) {
          headers = headersTextarea.value.trim()
          if (headers) {
            if (/^\{/.test(headers)) {
              try {
                headers = Function('return ' + headers)()
              } catch (e) {}
            } else {
              headers = getQueryString(headers)
            }
          }
        }
        if (meta.type) {
          headers['Content-Type'] = typeMap[meta.type]
        }
        context.headers = headers
        service[method](meta.path, params, context).then((resp) => {
          result.innerHTML = formatJSON(resp)
          result.classList.remove('hide')
          result.style.marginLeft = -result.clientWidth / 2 + 'px'
          result.style.marginTop = -result.clientHeight / 2 + 'px'
        })
      }
    }
  })

  document.getElementById('result').onmouseover = (e) => {
    if (e.target.classList.contains('json-object-key')) {
      let desc = respDescMap[e.target.innerHTML.replace(/^"|"$/g, '')]
      if (desc) {
        clearTimeout(descTimer)
        let nd = document.getElementById('desc')
        nd.innerHTML = desc
        nd.style.cssText = `left:${e.x}px;top:${e.y}px;`
        nd.classList.remove('hide')
        descTimer = setTimeout(() => {
          nd.classList.add('hide')
        }, 3000)
      }
    }
  }

  document.getElementById('result').onmouseout = (e) => {
    if (e.target === e.currentTarget) {
      document.getElementById('desc').classList.add('hide')
    }
  }

  document.onclick = (e) => {
    if (isParentNode(result, e.target)) {
      return
    }
    result.classList.add('hide')
  }
}