import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ThemeSelector from './ThemeSelector';
import HourType from './hourType';
import useSettings from '../Hooks/useSettings';

const MainAppBar: React.FC<any> = ({}) => {

    const {isTwentyFourHours, onChangeHourType} = useSettings();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography  variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Mis tareas
                </Typography>

                <HourType
                    value={isTwentyFourHours}
                    onChange={onChangeHourType}
                />

                <ThemeSelector />
            </Toolbar>
        </AppBar>
    );
}

export default MainAppBar;