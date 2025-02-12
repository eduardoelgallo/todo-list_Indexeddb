import React from 'react';
import { Alert, IconButton, List, ListItem, ListItemText, Stack } from "@mui/material";
import {DateTime} from 'luxon';
import Task from '../../../Domain/Task';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import useSettings from '../../../Hooks/useSettings';

const TasksContainer: React.FC<{list: Task[], onDelete: (task: Task) => void}> = ({list, onDelete}) => {

    const { isTwentyFourHours } = useSettings();    

    return (
        <Stack spacing={1}>
            <List>
                {
                    list.map((task: Task, index: number) => (
                        <ListItem 
                            key={index}
                            sx={{boxShadow: 1, mb: 1, borderLeftColor: task.isNotified() ? "green" : "blue", borderLeftWidth: 4, borderLeftStyle: 'solid' }}
                            
                            secondaryAction={
                                <IconButton edge="end" onClick={() => {
                                    onDelete(task)
                                }}
                            
                            >
                                <DeleteForeverIcon/>
                            </IconButton>
                           }
                        >
                            <ListItemText
                                primary={task.title}
                                secondary={(DateTime.fromFormat(`${task.year}-${task.month}-${task.day} ${task.hour}:${task.minutes}:00`, "y-m-d hh:mm:ss", {locale: "es"})).toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)}
                            />
                        </ListItem>
                    ))
                }
            </List>  
        </Stack>
    );
};

export default TasksContainer;