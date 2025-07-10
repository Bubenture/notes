const inputElement = document.getElementById('title')
const createBtn = document.getElementById('create')
const listElement = document.getElementById('list')

const notes = [
  { title: '1 существующая заметка', completed: false },
  { title: '2 существующая заметка', completed: true },
]

function render() {
  listElement.innerHTML = ''
  if (notes.length === 0) {
    listElement.innerHTML = `<p>Заметок нет</p>`
  }
  for (let i = 0; i < notes.length; i++) {
    listElement.insertAdjacentHTML('beforeend', getNote(notes[i], i))
  }
}
render()

createBtn.onclick = function () {
  if (inputElement.value.length === 0) {
    return
  }
  const newNote = {
    title: inputElement.value,
    completed: false,
  }
  notes.push(newNote)
  render()
  inputElement.value = ''
}

function getNote(note, i) {
  return `         <li
          class="list-group-item d-flex justify-content-between algin-items-center"
        >
          <span class="${
            note.completed ? 'text-decoration-line-through' : ''
          }">${note.title}</span>
          <span>
            <span class="btn btn-small btn-${
              note.completed ? 'warning' : 'success'
            }"data-index="${i}" data-type="toggle">&check;</span>
            <span class="btn btn-small btn-danger" data-index="${i}" data-type="remove">&times;</span>
          </span>
        </li>`
}

listElement.onclick = function (event) {
  if (event.target.dataset.index) {
    const index = event.target.dataset.index
    const type = event.target.dataset.type
    if (type === 'toggle') {
      notes[index].completed = !notes[index].completed
    }
    if (type === 'remove') {
      notes.splice(index, 1)
    }
    render()
  }
}
