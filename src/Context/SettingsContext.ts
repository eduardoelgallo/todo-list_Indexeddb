

import { createContext } from 'react';


interface SettingsContextType {
    isTwentyFourHours: boolean;
    onChangeHourType: () => void;
    logs: String[];
    addLog: (log: String) => void;
}

export const SettingsContext = createContext<SettingsContextType>({
    isTwentyFourHours: false,
    onChangeHourType: () => {},
    logs: [],
    addLog: () => {},
})