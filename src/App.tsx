import { useEffect, useState } from "react";
import "./App.css";
import { Button, Typography } from "@mui/material";
import useTasks from "./Hooks/useTasks";
import CreateTaksForm from "./Components/CreateTaskForm";
import DisplayLog from "./Components/DisplayLog";
import TasksContainer from "./Components/TasksContainer";
import useNotifications from "./Hooks/useNotifications";
import Task from "./Domain/Task";


function App() {
	
    let [appLog, setAppLog] = useState<String[]>([]);

    let { databaseLog, addTask, deleteTask, list} = useTasks();

    let { hasPermission, askPermission} = useNotifications();
    
    let log = [...appLog, ...databaseLog];

    useEffect(() => {
        setAppLog([...appLog, "App loaded"])
    }, [])

	return (
		<>

            <Typography variant="h2" gutterBottom sx={{ textAlign: "center" }}>
                Lista de tareas
            </Typography>

            <TasksContainer
                list={list}
                onDelete={(task: Task) => {
                    deleteTask(task)
                }}
            ></TasksContainer>

            <CreateTaksForm
                addTask={addTask}
            />

           {
                !hasPermission && <Button onClick={() => askPermission()}>Activar notificaciones</Button>
           }

            <DisplayLog
                log={log}
            />
		</>
	);
}

export default App;
