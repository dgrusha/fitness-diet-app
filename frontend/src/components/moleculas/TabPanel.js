import { Box } from '@mui/material';

function TabPanel({ children, value, index }) {
    return (
      <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
        {value === index && (
          <Box p={3}>
            {children}
          </Box>
        )}
      </div>
    );
}

export default TabPanel;