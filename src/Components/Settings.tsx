
import React from 'react';
import { SettingsContext } from '../Context/SettingsContext';

const Settings: React.FC<{children: any}> = ({children}) => {

    let [isTwentyFourHours, setIsTwentyFourHours] = React.useState(false);

    let [logs, setLogs] = React.useState<String[]>([]);

    return (
        <SettingsContext.Provider value={{
            isTwentyFourHours,
            onChangeHourType: () => {
                setIsTwentyFourHours(!isTwentyFourHours);
            },
            logs,
            addLog: (log: String) => {
                setLogs((logs ) => [...logs, log]);
            }
        }}>
            {children}
        </SettingsContext.Provider>
    );
};

export default Settings;