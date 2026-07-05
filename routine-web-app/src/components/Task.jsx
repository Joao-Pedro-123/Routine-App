import { useState, useEffect } from "react";

export default function Task({ task, taskId, setTasks, tasks, generalDate, setGeneralDate, date }) {
    
    useEffect(() => {
        const intervalo = setInterval(() => {
            setGeneralDate(new Date());
        }, 5000);

        return () => clearInterval(intervalo);
    }, []);

    const listAtualizada = tasks.map((element) => {
        if (generalDate.getDay() > element.taskEndDate){
            return
        };

        return element;
    })
    
    function endTask() {
        // Usamos o .map para criar uma nova lista modificando apenas a task atual
        const listaAtualizada = tasks.map((element) => {
            if (element.task === task.task && task.status == "on") {
                // Retorna uma cópia do elemento com o status alterado
                return { ...element, status: "off" };
            } else if (element.task === task.task && task.status == "off"){
                return { ...element, status: "on" };
            }
            // Retorna o elemento sem alterações
            return element;
        });

        // Atualiza o estado global das tasks diretamente
        setTasks(listaAtualizada);
    }

    return (
        <div style={{ backgroundColor: "lightblue", color: "black", display: "flex", width: "100%", height: "25%", alignItems: "center", gap: "10px" }}>
            <button onClick={endTask} style={{ background: "none", border: "none", cursor: "pointer" }}> 
                <div className={task.status === "on" ? "btn-empty" : "btn-full"}> </div> 
            </button>
            <span> {task.task} - status: {task.status} - dI: {task.startDate} dF: {task.taskEndDate} </span>
        </div>
    );
}