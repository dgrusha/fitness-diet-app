import React from 'react';
import TabPage from '../components/templates/TabPage';
import TableOfDataRatings from '../components/moleculas/TableOfDataRatings';
import TableOfDataCoaches from '../components/moleculas/TableOfDataCoaches';
import { Typography } from '@mui/material';

function Administration() {
    
    return (
        <TabPage 
            title={<Typography gutterBottom variant="title1">ADMINISTRATION PAGE</Typography>}
            body={[
                { name: "Coaches", content: <TableOfDataCoaches /> },
                { name: "Reviews", content: <TableOfDataRatings />}
            ]}
        />
    );
}


export default Administration;