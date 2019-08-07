# service api tool
ajax request and response a promise

    install
    npm install service-api --save

```javascript
  import service from 'service-api'

  // could set config
  service.config({
    showLoading: () => { to show loading },
    hideLoading: () => { to hide loading },
    dealError: (error) => {
      deal some error
    },
    checkStatus: (resp) => { // default code == 200 is success request, u can override method for your project
      return resp.code === 200
    }
  })

  service.get(path, {key: 'value'}, {
    context: document.body // with a loading at the html node
  }).then((resp) => {

  }).catch((error) => {

  })

  service.post(path, {key: 'value'}, {
    context: document.body
  }).then((resp) => {
    
  }).catch((error) => {

  })

  let defered = service.post(path, {key: 'value'}, {
    context: document.body
  })

  defered.then(() => {

  })

  // to cancel a ajax
  defered.cancel()

  // you can set responseType on the third arguments
  service.get(path, {key: 'value'}, {
    context: document.body,
    responseType: 'arraybuffer',
    timeout: 30000 // config timeout ms, default 60000ms
  }).then((resp) => {

  }).catch((error) => {

  })

  // to clear requests which has send and not received, like to a new page
  service.clear()
```

