function inputAutoWidth(input) {
  buffer = document.createElement("div")
  buffer.className = "buffer"
  input.parentNode.insertBefore(buffer, input.nextSibling)

  input.oninput = function () {
    this.nextElementSibling.innerHTML = this.value
    this.style.width = this.nextElementSibling.clientWidth + "px"
  }
}
