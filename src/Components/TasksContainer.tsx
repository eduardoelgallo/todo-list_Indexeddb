import React from 'react';
import { Alert, Stack } from "@mui/material";
import Task from '../Interfaces/Task';
import {DateTime} from 'luxon';


const TasksContainer: React.FC<{list: Task[], onDelete: any}> = ({list, onDelete}: any) => {

    return (
        <Stack spacing={1}>
                        {
                list.map((task: any, index: any) => (
                    <Alert 
                        key={index} 
                        variant="filled"
                        severity={task.notified == "yes" ? "success" : "info"}
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