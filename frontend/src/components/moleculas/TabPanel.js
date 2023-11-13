import { Box } from '@mui/material';

function TabPanel({ children, value, index }) {
    return (
      <div style={{flexGrow:1, overflow:'auto', position:'relative'}} role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
        {value === index && (
          <Box p={3} style={{position:'absolute'}}>
            {children}
          </Box>
        )}
      </div>
    );
}

export default TabPanel;