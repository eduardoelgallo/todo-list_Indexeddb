import { useEffect, useState } from "react";
import "./App.css";
import { Box, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import useTasks from "./Hooks/useTasks";
import CreateTaksForm from "./Components/CreateTaskForm";
import DisplayLog from "./Components/DisplayLog";
import TasksContainer from "./Components/TasksContainer";


function App() {
	

    let [appLog, setAppLog] = useState<String[]>([]);

    let { databaseLog, addTask, deleteTask, list} = useTasks();

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
                onDelete={(task: any) => {
                    deleteTask(task)
                }}
            ></TasksContainer>

            <CreateTaksForm
                addTask={addTask}
            />

            <DisplayLog
                log={log}
            />
		</>
	);
}

export default App;
