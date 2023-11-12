import PropTypes from "prop-types";
import React, { useState } from 'react';

import { Tab, Tabs, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { appTheme } from '../../helpers/themeProviderHelper';
import TabPanel from "../moleculas/TabPanel";

const TabPage = (props) => {
    const [tabValue, setTabValue] = useState(0);

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <ThemeProvider theme={appTheme}>
            <div style={{ backgroundColor: 'white', padding: '20px', height: '100%', textAlign: 'center' }}>
                <Typography variant="h5">
                    {props.title}
                </Typography>
                <Tabs value={tabValue} TabIndicatorProps={{ sx: { backgroundColor: "#9CD91B" } }} onChange={handleChange} centered>
                    {props.body.map((tab, index) => (
                        <Tab key={index} label={tab.name} />
                    ))}
                </Tabs>
                {props.body.map((tab, index) => (
                    <TabPanel key={index} value={tabValue} index={index}>
                        {tab.content}
                    </TabPanel>
                ))}
            </div>
        </ThemeProvider>
    );
};

TabPage.propTypes = {
    title: PropTypes.element.isRequired,
    body: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            content: PropTypes.element.isRequired,
        })
    ).isRequired,
};

TabPage.defaultProps = {};

export default TabPage;
