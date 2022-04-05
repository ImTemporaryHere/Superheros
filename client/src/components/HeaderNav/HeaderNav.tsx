import React from 'react';
import {Box, Grid, Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";



const HeaderNav = () => {
  return (<Box sx={{
    zIndex: 10,
    position: 'sticky',
    top: '0px',
    opacity: 1,
    backgroundColor: 'white',
    marginBottom: '20px',
    padding: '10px',
    borderBottom: '1px solid',
    borderColor: 'primary.dark'
  }}>

    <Grid container justifyContent={'space-between'} alignItems={'center'}>
      <Grid xs={6} item container gap={2}>
        <Link to={'/'}>
          <Typography variant={'h3'}>
            SuperHeroes
          </Typography>
        </Link>
      </Grid>

      <Grid xs={6} justifyContent={'flex-end'} item container gap={2}>


        <Link to={'/add-super-hero'}>
          <Button variant={'contained'} color={'primary'}>
            Add SuperHero
          </Button>
        </Link>


        <Link to={'/'}>
          <Button variant={'contained'} color={'primary'} >
            List of The SuperHeroes
          </Button>
        </Link>
      </Grid>
    </Grid>

  </Box>)
};

export default HeaderNav;
