import React from 'react';
import { Alert, Stack } from "@mui/material";
import {DateTime} from 'luxon';
import Task from '../Domain/Task';


const TasksContainer: React.FC<{list: Task[], onDelete: (task: Task) => void}> = ({list, onDelete}) => {

    return (
        <Stack spacing={1}>
                        {
                list.map((task: Task, index: number) => (
                    <Alert 
                        key={index} 
                        variant="filled"
                        severity={task.isNotified() ? "success" : "info"}
                        onClose={() => {
                            onDelete(task)
                        }}
                    >
                        {task.title} {(DateTime.fromFormat(`${task.year}-${task.month}-${task.day} ${task.hour}:${task.minutes}:00`, "y-m-d hh:mm:ss", {locale: "es"})).toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)}
                    </Alert>
                ))
            }
        </Stack>
    );
};

export default TasksContainer;