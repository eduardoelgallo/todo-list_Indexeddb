import { createContext } from "react";
import Database from "../Services/Database";

interface DatabaseContextType {
    database: Database;
    insert: (source: string, data: any) => Promise<any>;
    select: (source: string) => Promise<any>;
    remove: (source: string, key: string) => Promise<any>;
    cursor: (source: string) => Promise<any>;
    update: (source: string, data: any) => Promise<any>;
}

let database = new Database("");

const DatabaseContext = createContext<DatabaseContextType>({
    database: database,
    insert: database.insert,
    select: database.selectAll,
    remove: database.delete,
    cursor: database.cursor,
    update: database.update
});

export default DatabaseContext;