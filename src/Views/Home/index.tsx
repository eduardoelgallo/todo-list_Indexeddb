import { useEffect, useState } from "react";
import {
	Button,
	Container,
	useColorScheme,
} from "@mui/material";
import useTasks from "../../Hooks/useTasks";
import CreateTaksForm from "./Components/CreateTaskForm";
import DisplayLog from "../../Components/DisplayLog";
import TasksContainer from "./Components/TasksContainer";
import useNotifications from "../../Hooks/useNotifications";
import Task from "../../Domain/Task";
import MainAppBar from "../../Components/MainAppBar";
import Today from "./Components/Today";
import useSettings from "../../Hooks/useSettings";

export const Home: React.FC = () => {
	const { mode } = useColorScheme();

	if (!mode) {
		return null;
	}

	let {logs, addLog} = useSettings();

	let { addTask, deleteTask, list } = useTasks();

	let { hasPermission, askPermission } = useNotifications();


	useEffect(() => {
		addLog("App loaded");
	}, []);


	return (
		<>
			<MainAppBar/>
			<Container maxWidth="sm">

				<Today/>

				<TasksContainer
					list={list}
					onDelete={(task: Task) => {
						deleteTask(task);
					}}
				></TasksContainer>

				<CreateTaksForm addTask={addTask}/>

				{!hasPermission && (
					<Button onClick={() => askPermission()}>
						Activar notificaciones
					</Button>
				)}

				<DisplayLog
					log={logs}
					sx={{ mt: 2 }}
				/>
			</Container>
		</>
	);
};
