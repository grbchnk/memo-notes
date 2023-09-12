function reFlexGrow() {
  const elements = miniNotesContainer.querySelectorAll(".mini-note")

  let lastRow = []
  let maxOffsetTop = 0

  elements.forEach((element) => {
    if (element.offsetTop > maxOffsetTop) {
      maxOffsetTop = element.offsetTop
    }
  })

  elements.forEach((element) => {
    if (element.offsetTop !== maxOffsetTop) {
      element.style.flexGrow = 1
    }
  })
}
reFlexGrow()
