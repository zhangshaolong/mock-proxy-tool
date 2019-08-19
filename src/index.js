import service from 'service-api'
import { formatJSON, configService } from './utils'

configService()

const isParentNode = (parentNode, ele) => {
  if (ele) {
    if (ele.parentNode === parentNode || ele === parentNode) {
      return true
    }
    return isParentNode(parentNode, ele.parentNode)
  }
}

window.onload = () => {
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
      if (e.target === e.currentTarget) {
        service.get(ele.dataset.path, null, {
          context: document.body
        }).then((resp) => {
          result.innerHTML = formatJSON(resp)
          result.classList.remove('hide')
          result.style.marginLeft = -result.clientWidth / 2 + 'px'
          result.style.marginTop = -result.clientHeight / 2 + 'px'
        })
      }
    }
  })

  document.querySelectorAll('.postman').forEach((ele) => {
    ele.onclick = (e) => {
      e.stopPropagation()
      e.preventDefault()
      if (e.target === e.currentTarget) {
        console.log(ele.dataset.path)
        console.log(ele.dataset.type)
        console.log(ele.dataset.method)
        console.log(ele.dataset.params)
      }
    }
  })

  document.onclick = (e) => {
    if (isParentNode(result, e.target)) {
      return
    }
    result.classList.add('hide')
  }
}