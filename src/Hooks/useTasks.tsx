import { useEffect, useState } from "react";
import Task from "../Interfaces/Task";

const useTasks = () => {

    let [database, setDatabase] = useState<IDBDatabase | null>(null);
    let [databaseLog, setDatabaseLog] = useState<string[]>([]);
    let [list, setList] = useState<Task[]>([]);

    useEffect(() => {
        const databaseRequest: IDBOpenDBRequest = indexedDB.open("todolist")

        databaseRequest.onsuccess = (event: Event): any => {

            setDatabaseLog([...databaseLog, "Database opened successfully"])

            let db = (event.target as IDBOpenDBRequest).result

            let objectStore  = db.transaction("toDolist").objectStore("toDolist")

            console.log({
                indexNames: objectStore.indexNames,
                keyPath: objectStore.keyPath,
                name: objectStore.name,
                transaction: objectStore.transaction,
                autoIncrement: objectStore.autoIncrement
            })

            setDatabase(db);
            recoverAllList(db);
        }

        databaseRequest.onerror = (event: Event): any => {
            setDatabaseLog([...databaseLog, "Error loading database."])
            console.log(event)
        }

        databaseRequest.onupgradeneeded = (event: IDBVersionChangeEvent): any => {
            let db = (event.target as IDBOpenDBRequest).result;

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

            setDatabase(db)
            
            recoverAllList(db);
            
            setDatabaseLog([...databaseLog, "Object store created successfully"])
        }
    }, [])

    
    const addTask = (task: Task) => {

        if (!database) {
            setDatabaseLog((log) => [...log, "Database no founded."])
            return;
        }

        let transaction = database.transaction("toDolist", "readwrite");

        transaction.oncomplete= (event: any) => {
            setDatabaseLog((log) => [...log, "Task added to database."])
        }

        transaction.onerror= (event: Event) => {
            setDatabaseLog((log) => [...log, "Error adding task to database."])
        }

        let objectstore = transaction.objectStore("toDolist");

        let objectStoreRequest = objectstore.add(task);

        objectStoreRequest.onsuccess = (event: any) => {
            recoverAllList();
            setDatabaseLog((log) => [...log, "Request sucessfull."])
        }
    }

    const recoverAllList = (db: IDBDatabase | null = null) => {
        database = database || db;

        if (!database) {
            return;
        }

        setList([]);

        const objectStore = database.transaction("toDolist").objectStore("toDolist");

        objectStore.openCursor().onsuccess = (event: Event) => {
            let cursor: IDBCursorWithValue = (event.target as IDBRequest).result;

            if (!cursor) {
                setDatabaseLog((log) => [...log, "Entries all displayed."])
                return;
            }

            setList((list) => [...list, cursor.value]);

            cursor.continue();
        }
    }

    const deleteTask = (task: Task) => {

        if (!database) {
            return;
        }

        let transaction = database.transaction("toDolist", "readwrite")
        console.log(transaction)
        
        transaction.objectStore("toDolist").delete(task.title);

        transaction.oncomplete = (event: Event) => {
            recoverAllList();
            setDatabaseLog((log) => [...log, "Task deleted."]);
        };
    }

    return {
        databaseLog,
        addTask,
        deleteTask,
        list,
        recoverAllList
    }
}


export default useTasks;