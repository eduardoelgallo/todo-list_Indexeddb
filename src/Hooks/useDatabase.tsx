import { useContext } from "react";
import DatabaseContext from "../Context/DatabaseContext";

const useDatabase = () => {

    const database = useContext(DatabaseContext);

    return database;
}

export default useDatabase;