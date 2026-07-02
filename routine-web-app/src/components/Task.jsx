export default function Task({ task, key, setTask}) {
    function endTask() {
        // alert(JSON.stringify(props));
        
    };

    return (
        <div style={{ backgroundColor: "lightblue", color: "black", display: "flex", width: "100%", height: "25%" }}>
            <button onClick={endTask}> <div style={{ backgroundColor: "none", border: "black 3px solid", borderRadius: "100%", width: "1em", height: "1em" }}> </div> </button>
            <span> {task.task} status: {task.status} </span>
        </div>
    )
}