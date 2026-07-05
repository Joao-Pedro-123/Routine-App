import { useState, useEffect } from 'react'
import './App.css'
import Task from './components/Task';



function App() {
  const [generalDate, setGeneralDate] = useState(new Date());
  const [date, setDate] = useState(`${generalDate.getFullYear()}-${generalDate.getMonth()}-${generalDate.getDay()}`);
  const [taskName, setTaskName] = useState("");
  const [taskEndDate, setTaskEndDate] = useState("");
  const [water, setWater] = useState(0);
  // const [taskStartDate, setTaskStartDate] = useState("");

  const dispararNotificacao = () => {
    const titulo = "Beba Água";
    const opcoes = {
      body: "Já se passou uma hora desde que você bebeu água!",
      icon: "/assets/vite.svg"
    };
    const notificacao = new Notification(titulo, opcoes);

    notificacao.onclick = () => {
      window.focus();
    };
  };



  // const [date, setDate] = useState(new Date())

  useEffect(() => {
    const intervalo = setInterval(() => {
      setGeneralDate(new Date());
      
      if (localStorage.getItem('hour') != null) {
        const actualHour = generalDate.getMinutes() < 10 ? `${generalDate.getHours()}0${generalDate.getMinutes()}` : `${generalDate.getHours()}${generalDate.getMinutes()}`;
        console.log(Number(`${generalDate.getHours()}${generalDate.getMinutes()}`));
        console.log((Number(localStorage.getItem('hour')) - Number(`${generalDate.getHours()}${generalDate.getMinutes()}`)) < Number(localStorage.getItem('hour')));
        if ((Number(localStorage.getItem('hour')) - Number(`${generalDate.getHours()}${generalDate.getMinutes()}`)) > Number(localStorage.getItem('hour'))) {
          // dispararNotificacao();
          localStorage.setItem('hour', `${generalDate.getHours()}${generalDate.getMinutes()}`);
        }
      }

    }, 5000);

    return () => clearInterval(intervalo);
  }, []);

  function adicionarTarefa(event) {
    event.preventDefault()
    setGeneralDate(new Date());
    setDate(`${generalDate.getFullYear()}-${generalDate.getMonth()}-${generalDate.getDay()}`); //Data completa contendo dia, mês e ano; Formatada no padrão internacional.
    alert(`${taskName} ${taskEndDate}`);

    setTasks([...tasks, { task: taskName, type: "day", status: "on", startDate: date, taskEndDate: taskEndDate }]); //Obter a data atual da criação.
  }

  // Verifica se o navegador suporta notificações



  function openForms() {
    console.log("Uhull!");

    alert(localStorage.getItem("hour"));
    console.log(`${localStorage.getItem('hour')}-${generalDate.getHours()}${generalDate.getMinutes()}` + (Number(localStorage.getItem('hour')) - Number(`${generalDate.getHours()}${generalDate.getMinutes()}`)) < Number(localStorage.getItem('hour')));

  }

  const [task, setTask] = useState({
    task: "",
    type: "",
    status: "",
    startData: ""
  })

  function drinkWater() {
    if (water == 2000) {
      setWater(water);
    } else if (water < 2000) {
      setWater(water + 250);  
    }

    localStorage.setItem('hour', generalDate.getMinutes() < 10 ? `${generalDate.getHours()}0${generalDate.getMinutes()}` : `${generalDate.getHours()}${generalDate.getMinutes()}`);
  }

  const [tasks, setTasks] = useState([{ task: "Ler a Bíblia", type: "day", status: "on", startDate: "2026-05-06", taskEndDate: "2026-05-04" }, { task: "Orar", type: "day", status: "on", startDate: "2026-05-06", taskEndDate: "23/07/2026" }]);

  return (
    <>
      <div style={{ backgroundColor: "lightgray", width: "20em", height: "10em", borderRadius: "1em" }}>
        {tasks.map((item, i) => (<Task taskId={i} key={i} setTasks={setTasks} task={item} tasks={tasks} generalDate={generalDate} setGeneralDate={setGeneralDate} />))} {/* A propriedade task contém a informação da tarefa individualmente e o tasks contém todas as tarefas. */}

        <button className='openForms' onClick={openForms}> Adicionar tarefa </button>
      </div>
      <form onSubmit={adicionarTarefa}>
        <label htmlFor="taskName"> Nome: </label>
        <input type="text" name="taskName" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
        <label htmlFor="tasktaskEndDate"> Data: </label>
        <input type="date" name="taskEndDate" value={taskEndDate} onChange={(e) => setTaskEndDate(e.target.value)} />
        <input type="submit" value="Confirmar" />
      </form>
      <div style={{ background: `linear-gradient(90deg, rgba(0, 175, 245, 1) ${(water * 100) / 2000}%, rgba(217, 217, 217, 1) 0%)`, width: "20em", height: "10em", borderRadius: "1em", marginTop: "2em" }}>
        <button style={{ cursor: "pointer" }} onClick={drinkWater}> Beber Água (+250ml) </button>
      </div>
    </>
  )
}

export default App
