import { useState } from 'react'
import './App.css'
import Task from './components/Task';

function App() {
  const [task, setTask] = useState({
    task: "",
    type: "",
    status: ""
  })

  const [tasks, setTasks] = useState([{task: "Ler a Bíblia", type: "day", status: "on"}, {task: "Orar", type: "day", status: "on"}]);

  function showFormDialog(){
    setTasks([...tasks, {task: "Exercícios", type: "day", status: "on"}])
  }

  return (
    <>
    <div style={{backgroundColor: "lightgray", width: "20em", height: "10em", borderRadius: "1em"}}>
    {tasks.map((item, i) => (<Task taskId={i} key={i} setTasks={setTasks} task={item} tasks={tasks}/>))}

    <button className='adicionarTarefa' onClick={showFormDialog}> Adicionar tarefa </button>
    </div>
    </>
  )
}

export default App
