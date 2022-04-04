import React from 'react';
import {Box, Grid, Button, Typography} from "@mui/material";
import {
  Link
} from "react-router-dom";
import AddSuperHeroModal from "../AddSuperHeroModal/AddSuperHeroModal";












const HeaderNav = () => {
  return (<Box sx={{
    position: 'sticky',
    top: '0px',
    backgroundColor: 'white',
    marginBottom: '20px',
    padding: '10px'
  }}>

    <Grid container justifyContent={'space-between'} alignItems={'center'}>
      <Grid xs={6} item container gap={2}>
        <Typography variant={'h3'}>
          SuperHeroes
        </Typography>
      </Grid>

      <Grid xs={6} justifyContent={'flex-end'} item container gap={2}>

        <AddSuperHeroModal></AddSuperHeroModal>

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
