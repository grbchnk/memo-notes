const notes = [
  {
    title: "Пароли",
    memo: "rambler:\n\nbody.philosophy@rambler.ru \nvjDVmv756c",
    color: "#793af4",
    selectedCheckbox: 1,
  },
  {
    title: "Имена",
    memo: "Август, Августин, Авраам, Аврора, Агата, Агафон, Агнесса, Агния, Ада, Аделаида, Аделина, Адонис, Акайо, Акулина, Алан, Алевтина, Александр, Александра, Алексей, Алена, Алина, Алиса, Алла, Алсу, Альберт, Альбина, Альфия, Альфред, Амалия, Амелия, Анастасий, Анастасия, Анатолий, Ангелина, Андрей, Анжела, Анжелика, Анисий, Анна, Антон, Антонина, Анфиса, Аполлинарий, Аполлон, Ариадна, Арина, Аристарх, Аркадий, Арсен, Арсений, Артем, Артемий, Артур, Архип, Ася, Беатрис, Белла, Бенедикт, Берта, Богдан, Божена, Болеслав, Борис, Борислав, Бронислав, Бронислава, Булат, Вадим, Валентин, Валентина, Валерий, Валерия, Ванда, Варвара, Василий, Василиса, Венера, Вениамин, Вера, Вероника, Викентий, Виктор, Виктория, Вилен, Виолетта, Виссарион, Вита, Виталий, Влад, Владимир, Владислав, Владислава, Владлен, Вольдемар, Всеволод, Вячеслав, Габриэлла, Гавриил, Галина, Гарри, Гелла, Геннадий, Генриетта, Георгий, Герман, Гертруда, Глафира, Глеб, Глория, Гордей, Грейс, Грета, Григорий, Гульмира.",
  },
  {
    title: "Не забыть!",
    memo: "Сергею\n200 евро\n\nАнтохе\n105р",
  },
]
const notesContainer = document.querySelector(".note-container")
const miniNotesContainer = document.querySelector(".mini-note-container")

let activeMiniNotes = []

document.onclick = myClickHandler

function myClickHandler() {
  if (document.activeElement !== input && input.value) {
    const newNote = {
      title: input.value,
      memo: "",
    }
    notes.push(newNote)
    renderMiniNotesList()
  } else if (document.activeElement !== input && !input.value) {
    title.style.display = "block"
    input.style.display = "none"
    input.blur()
  }
}

class Note {
  constructor(title, memo) {
    this.title = title
    this.memo = memo
    this.color = "white"
    this.selectedCheckbox = null
  }
}

function renderMiniNotesList() {
  miniNotesContainer.innerHTML = ""
  for (const note of notes) {
    const miniNoteElement = document.createElement("div")

    miniNoteElement.classList.add("mini-note")
    if (activeMiniNotes.includes(note)) {
      miniNoteElement.classList.add("mini-note--active")
    }
    miniNoteElement.setAttribute("id", notes.indexOf(note))
    miniNoteElement.innerHTML = `
      <div class="mini-note__title">${note.title}</div>
    `
    miniNoteElement.style.backgroundColor = note.color
    miniNotesContainer.appendChild(miniNoteElement)
  }

  const newNoteElement = document.createElement("div")
  newNoteElement.classList.add("mini-note", "new-note")
  newNoteElement.innerHTML = `
    <div class="mini-note__title">+</div>
    <input
      class="new-note__input"
      type="text"
      maxlength="30"
    />
  `
  miniNotesContainer.appendChild(newNoteElement)

  const newNote = document.querySelector(".new-note")
  input = newNote.querySelector(".new-note__input")

  input.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
      if (input.value) {
        const newNote = {
          title: input.value,
          memo: "",
        }
        notes.push(newNote)
        renderMiniNotesList()
      }
    }
  })

  inputAutoWidth(input)
  title = newNote.querySelector(".mini-note__title")

  newNote.onclick = function () {
    title.style.display = "none"
    input.style.display = "block"
    input.focus()
  }

  const miniNotes = document.querySelectorAll(".mini-note:not(.new-note)")

  miniNotes.forEach((note) => {
    note.addEventListener("click", () => {
      if (!note.classList.contains("new-note")) {
        note.classList.toggle("mini-note--active")

        if (note.classList.contains("mini-note--active")) {
          activeMiniNotes.push(notes[note.id])
        } else {
          const index = activeMiniNotes.indexOf(notes[note.id])
          if (index !== -1) {
            activeMiniNotes.splice(index, 1)
          }
        }
      }

      renderNotes()
      const notesList = document.querySelectorAll(".note")

      if (activeMiniNotes.length - 1 !== -1) {
        notesList[activeMiniNotes.length - 1].scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }
    })
  })
}

function renderNotes() {
  notesContainer.innerHTML = ""

  for (const note of activeMiniNotes) {
    const noteElement = document.createElement("div")
    if (!note.memo) {
      note.memo = ""
    }
    noteElement.classList.add("note")
    noteElement.setAttribute("id", activeMiniNotes.indexOf(note))
    noteElement.innerHTML = `
    <div class="note__title">
    
    <h1>${note.title}</h1>
    <div class="color-picker_inner">
      <input type="checkbox" id="checkbox1" onclick="changeColor(1, this)" />
      <input type="checkbox" id="checkbox2" onclick="changeColor(2, this)" />
      <input type="checkbox" id="checkbox3" onclick="changeColor(3, this)" />
      <input type="checkbox" id="checkbox4" onclick="changeColor(4, this)" />
    </div>
  </div>
  <div class="note__desc-inner">
    <textarea class="note__input" oninput="updateNoteMemo(${activeMiniNotes.indexOf(
      note
    )}, this)">${note.memo}</textarea>
  </div>
    `

    const noteInput = noteElement.querySelector(".note__input")
    noteInput.style.backgroundColor = note.color
    const checkboxes = noteElement.querySelectorAll('input[type="checkbox"]')

    checkboxes.forEach((checkbox, checkboxId) => {
      checkbox.checked = checkboxId + 1 === note.selectedCheckbox
    })

    notesContainer.appendChild(noteElement)
  }

  const notesList = document.querySelectorAll(".note")

  notesList[notesList.length - 1].style.marginRight = "15%"
  notesList[0].style.marginLeft = "15%"

  notesList.forEach((item) => {
    item.addEventListener("click", function () {
      item.scrollIntoView({ behavior: "smooth", block: "center" })
    })
  })
}

function changeColor(checkboxId, checkbox) {
  const noteId = checkbox.parentNode.parentNode.parentNode.id
  const note = activeMiniNotes[noteId]

  if (checkboxId === note.selectedCheckbox) {
    note.selectedCheckbox = null
    note.color = "white"
  } else {
    note.selectedCheckbox = checkboxId

    switch (checkboxId) {
      case 1:
        note.color = "#793af4"
        break
      case 2:
        note.color = "#f5c640"
        break
      case 3:
        note.color = "#01cfef"
        break
      case 4:
        note.color = "#ee4f51"
        break
      default:
        break
    }
  }
  renderMiniNotesList()
  renderNotes()
}

function updateNoteMemo(noteId, textarea) {
  const note = activeMiniNotes[noteId]
  note.memo = textarea.value
}

function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "..."
  } else {
    return str
  }
}

renderMiniNotesList()
