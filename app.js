const formAdd = document.querySelector('.add-form')
const formSearch = document.querySelector('.search-form')
const todoList = document.querySelector('.todo-list')
const clearSearch = document.querySelector('.fa-eraser')

let input = ''
let todoClass = ''

const inputTarget = (event) => input = event.target
const todoClassList = (todo) => todoClass = todo.classList

const addTodo = (inputValue) => {
  const date = new Date()
  const dateToShow = `${date.getDate()}/${date.getMonth()+1}`
  
  todoList.innerHTML += `
    <li class="todo list-group-item d-flex align-items-center justify-content-between" data-trash="${inputValue}">
      <span>${inputValue}</span>
      <div class="organization">
        <span class="px-3 ps-0">${dateToShow}</span>
        <i class="fas fa-trash-alt"></i>
      </div>
    </li>
  `
}

const showSearchedTodos = (inputValue) => {
  const todos = Array.from(todoList.children)

  todos.forEach(todo => {
    todoClassList(todo)
    const searchIsNotValid = !todo.textContent.toLocaleLowerCase().includes(inputValue)

    if(searchIsNotValid) {
      todoClass.remove('d-flex')
      todoClass.add('d-none')
      return
    }

    todoClass.remove('d-none')
    todoClass.add('d-flex')
  })
}

const clearSearchedTodos = () => {
  const todos = Array.from(todoList.children)
  
  formSearch.firstElementChild.value = ''
  
  todos.forEach(todo => {
    todoClassList(todo)
    const todoIsHidden = todoClass.value.includes('d-none')
    
    if (todoIsHidden){
      todoClass.remove('d-none')
      todoClass.add('d-flex')
    }
  })
}

const clearFormSearch  = () => {
  isFormSearchEmpty = formSearch.firstElementChild.value !== ''

  if(isFormSearchEmpty){
    clearSearchedTodos()
  }
}

formAdd.addEventListener('submit', event => {
  event.preventDefault()

  inputTarget(event)
  const inputValue = input.add.value.trim()
  
  clearFormSearch()

  addTodo(inputValue)
  input.reset()
})

formSearch.addEventListener('submit', event => {
  event.preventDefault()

  inputTarget(event)
  const inputValue = input.search.value.toLowerCase()

  showSearchedTodos(inputValue)
})

clearSearch.addEventListener('click', clearSearchedTodos)

todoList.addEventListener('click', event => {
  inputTarget(event)
  const trashIcon = Array.from(input.classList).includes('fas')

  if(trashIcon){
    input.parentElement.parentElement.remove()
  }

  clearFormSearch()
})
