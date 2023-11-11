import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
  return (
    <Box style={{ display: 'flex', alignItems: 'center' }}>
      <Box style={{ width: '100%', marginRight: '8px' }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box style={{ minWidth: '35px' }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function LinearWithValueLabel() {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box style={{ width: '100%' }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}
