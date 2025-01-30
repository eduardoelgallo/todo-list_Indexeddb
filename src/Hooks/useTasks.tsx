import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import DataBase from "../Services/Database";
import Task from "../Domain/Task";
import TaskFactory from "../Services/Factories/TaskFactory";

const useTasks = () => {

    let [database, setDatabase] = useState<DataBase>(new DataBase(""));
    let [databaseLog, setDatabaseLog] = useState<string[]>([]);
    let [list, setList] = useState<Task[]>([]);

    useEffect(() => {
        const databaseObj = new DataBase((db: IDBDatabase) => {

            db.onerror = (event) => {
                setDatabaseLog([...databaseLog, "Error loading database."])
            };

            const objectstore = db.createObjectStore("toDolist", { keyPath: "title"});

            objectstore.createIndex("hour", "hours", {unique: false});
            objectstore.createIndex("minutes", "minutes", {unique: false});
            objectstore.createIndex("day", "day", {unique: false});
            objectstore.createIndex("month", "month", {unique: false});
            objectstore.createIndex("year", "year", {unique: false});

            objectstore.createIndex("notified", "notified", {unique: false});

            setDatabaseLog([...databaseLog, "Object store created successfully"])
        });

        setDatabase(databaseObj);

        databaseObj.createDatabase("todolist").then((db) => {
            setDatabaseLog([...databaseLog, "Database opened successfully"])

            setDatabase(databaseObj);

            recoverAllList(databaseObj);

        }).catch((error) => {
            setDatabaseLog([...databaseLog, "Error loading database."])
        })

    
        let intervalId = setInterval(checkdeadlines, 1000);

        return () => {
            clearInterval(intervalId);
        }
    }, [database.name])

    
    const addTask = (task: Task) => {
        database.insert("toDolist", task).then(() => {
            setDatabaseLog((log) => [...log, "Task added to database sucessfull."]);
            recoverAllList();
        }).catch((err) => {
            console.log(err)
            setDatabaseLog((log) => [...log, "Error adding task to database."]);
        });
    }

    const recoverAllList = (db: DataBase | null = null) => {

        database = database || db;

        setList([]);

        database.selectAll("toDolist").then((remoteTasks) => {
            console.log(remoteTasks)
            setDatabaseLog((log) => [...log, "Entries all displayed."])

            let tasks = TaskFactory.createTasks(remoteTasks);

            setList(tasks);
        }).catch((error) => {
            console.log(error)
        })
    }

    const deleteTask = (task: Task) => {
        database.delete("toDolist", task.title).then(() => {
            recoverAllList();
            setDatabaseLog((log) => [...log, "Task deleted."]);
        }).catch((error) => {
            console.log(error)
            setDatabaseLog((log) => [...log, "Can't delete."]);
        })
        
    }

    const checkdeadlines = () => {
        database.cursor("toDolist").then((next) => {

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

        database.update("toDolist", task).then(() => {

            const notification = new Notification("To do List", {body: text, icon: img});

            recoverAllList();
        }).catch((error) => {
            console.log(error);
            setDatabaseLog((log) => [...log, "Can't delete."]);
        });
    }

    return {
        databaseLog,
        addTask,
        deleteTask,
        list,
        recoverAllList,
        database: database
    }
}


export default useTasks;