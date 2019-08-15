window.onload = () => {
  document.querySelectorAll('.folder').forEach((ele) => {
    ele.ondblclick = (e) => {
      e.stopPropagation()
      ele.classList.toggle('hide')
    }
  })
}