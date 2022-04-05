import React from 'react';
import {Box, CircularProgress} from "@mui/material";


const styles = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  zIndex: '20',
  top: 0,
  position: 'absolute',
  height: '100vh',
  alignItems: 'center',
  opacity: 0.9,
  backgroundColor: 'rgba(165,213,231,0.29)'

}


const CircularLoader = () => {
  return (
    <Box sx={styles}>
      <CircularProgress color="secondary"/>
    </Box>
  );
};

export default CircularLoader;
