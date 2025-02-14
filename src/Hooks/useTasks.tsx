import { useEffect, useState } from "react";
import Task from "../Domain/Task";
import TaskFactory from "../Services/Factories/TaskFactory";
import useSettings from "./useSettings";
import useDatabase from "./useDatabase";

const useTasks = () => {

    let { insert, select, remove, cursor, update} = useDatabase();

    let { addLog } = useSettings();

    let [list, setList] = useState<Task[]>([]);

    useEffect(() => {
        recoverAllList();

        let intervalId = setInterval(checkdeadlines, 1000);

        return () => {
            clearInterval(intervalId);
        }
    }, [])

    
    const addTask = (task: Task) => {
        insert("toDolist", task).then(() => {
            addLog("Task added to database sucessfull.");
            recoverAllList();
        }).catch((err) => {
            addLog("Error adding task to database.");
        });
    }

    const recoverAllList = () => {

        setList([]);

        select("toDolist").then((remoteTasks) => {
            addLog("Entries all displayed.")

            let tasks = TaskFactory.createTasks(remoteTasks);

            setList(tasks);
        }).catch((error) => {
            console.log(error)
        })
    }

    const deleteTask = (task: Task) => {
        remove("toDolist", task.title).then(() => {
            recoverAllList();
            addLog("Task deleted.");
        }).catch((error) => {
            console.log(error)
            addLog("Can't delete.");
        })
    }

    const checkdeadlines = () => {
        cursor("toDolist").then((next) => {

            next((value: any) => {

                let task: Task = TaskFactory.createTask(value);

                if (task.isInDeadline()) {
                    if (Notification.permission == "granted") {
                        createNotification(task);
                    }
                }
            });
            
        }).catch((error) => {
            console.log(error)
        })
        
    }

    const createNotification = (task: Task) => {

        const img = '/to-do-notifications/img/icon-128.png';
        const text = `HEY! Your task "${task.title}" is now overdue.`;

        task.makeNotifed();

        update("toDolist", task).then(() => {

            const notification = new Notification("To do List", {body: text, icon: img});

            recoverAllList();
        }).catch((error) => {
            console.log(error);
            addLog("Can't delete.");
        });
    }

    return {
        addTask,
        deleteTask,
        list,
        recoverAllList
    }
}


export default useTasks;