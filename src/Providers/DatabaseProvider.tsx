import React, { useEffect, useState } from "react";
import DatabaseContext from "../Context/DatabaseContext";
import Database from "../Services/Database";


const DatabaseProvider: React.FC<{children: any}> = ({children}) => {

    let [database, setDatabase] = useState<Database>(new Database(""));
    let [loadStatus, setLoadStatus] = useState<boolean>(false);
    
    useEffect(() => {
        const databaseObj = new Database((db: IDBDatabase) => {

            db.onerror = (event) => {
                //addLog("Error loading database.")
            };

            const objectstore = db.createObjectStore("toDolist", { keyPath: "title"});

            objectstore.createIndex("hour", "hours", {unique: false});
            objectstore.createIndex("minutes", "minutes", {unique: false});
            objectstore.createIndex("day", "day", {unique: false});
            objectstore.createIndex("month", "month", {unique: false});
            objectstore.createIndex("year", "year", {unique: false});

            objectstore.createIndex("notified", "notified", {unique: false});

            //addLog("Object store created successfully")
        });

        databaseObj.start("todolist").then((db) => {
            //addLog("Database opened successfully")

            setDatabase(databaseObj);

            setLoadStatus(true);

        }).catch((error) => {
            //addLog("Error loading database.")
        })

        //let intervalId = setInterval(checkdeadlines, 1000);

        return () => {
            //clearInterval(intervalId);
        }
    }, [database.name])


    let providerValues = {
        database,
        insert: database.insert.bind(database),
        select: database.selectAll.bind(database),
        remove: database.delete.bind(database),
        cursor: database.cursor.bind(database),
        update: database.update.bind(database)
    }

    return (
        <DatabaseContext.Provider value={providerValues}>
           
            {
                !loadStatus ? <div>Loading...</div> :  children
            }

        </DatabaseContext.Provider>
    )
};

export default DatabaseProvider;