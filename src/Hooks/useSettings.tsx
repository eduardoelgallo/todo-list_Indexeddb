import { useContext } from "react"
import { SettingsContext } from "../Context/SettingsContext";


const useSettings = () => {

    const settings = useContext(SettingsContext);

    return {
        ...settings
    }
}

export default useSettings;