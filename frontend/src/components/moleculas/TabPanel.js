import { Box } from '@mui/material';

function TabPanel({ children, value, index }) {
    return (
      <div style={{flexGrow:1, overflow:'auto', position:'relative'}} role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
        {value === index && (
          <Box style={{position:'absolute', width:'100%'}}>
            {children}
          </Box>
        )}
      </div>
    );
}

export default TabPanel;