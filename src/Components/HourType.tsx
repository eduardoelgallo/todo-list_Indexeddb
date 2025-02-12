import { Box, FormControlLabel, Switch } from '@mui/material';
import React from 'react';

const HourType: React.FC<{value: boolean, onChange: any}> = ({value = false, onChange}) => {

    return (
        <Box>
            <FormControlLabel 
                control={
                    <Switch checked={value} onChange={onChange}/>
                }
                label={value ? "24 horas" : "12 horas"}
            />
        </Box>
    );
};

export default HourType;