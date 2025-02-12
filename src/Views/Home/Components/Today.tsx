import { Typography } from '@mui/material';
import { DateTime } from 'luxon';
import React from 'react';
import useSettings from '../../../Hooks/useSettings';

const Today: React.FC<{}> = ({}) => {

    const { isTwentyFourHours } = useSettings();
    
    const today = DateTime.now().toLocaleString({...DateTime.DATETIME_MED_WITH_WEEKDAY, hour12: !isTwentyFourHours});


    return (
        <Typography
            variant="h5"
            gutterBottom
            sx={{ textAlign: "center" }}
        >
           { today }
        </Typography>
    );
};

export default Today;