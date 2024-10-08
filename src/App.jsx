import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos:
      newList}))
  }

function AddTodos(newTodo){
  const newTodoList = [...todos, newTodo]
  persistData(newTodoList)
  setTodos(newTodoList)
}

function DeleteTodo (index){
  const newTodoList = todos.filter((todo, todoIndex) => {
    return todoIndex !== index
  })
  persistData(newTodoList)
  setTodos(newTodoList)
}

function EditTodo(index) {
  const valueToEdit = todos[index]
  setTodoValue(valueToEdit)
  DeleteTodo(index)
}

useEffect(() => {
  if (!localStorage){
    return
  }
  let localTodos = localStorage.getItem('todos')
  if(!localTodos) {
    return
  }
  localTodos = JSON.parse(localTodos).todos
  setTodos(localTodos)
}, [] )

  return (
    <>
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} AddTodos={AddTodos}/>
      <TodoList EditTodo={EditTodo} DeleteTodo={DeleteTodo} todos={todos} />
    </>
  )
}

export default App
