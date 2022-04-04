import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, {useState} from "react";
import {Grid, Skeleton, styled, TextField} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const Input = styled('input')({
  display: 'none',
});

const AddSuperHeroModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen} variant={'contained'} color={'primary'}>
        Add SuperHero
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Grid container justifyContent={'center'} gap={1}>
              <Grid justifyContent={'center'} xs={5} item container>
                <Grid justifyContent={'space-between'} xs={12} item container>
                  <TextField fullWidth id="input-nickname" label="nickname of the SuperHero" variant="outlined" />
                </Grid>

                <Grid justifyContent={'space-between'} xs={12} item container>
                  <TextField fullWidth id="input-realName" label="realName of the SuperHero" variant="outlined" />
                </Grid>

                <Grid justifyContent={'space-between'} xs={12} item container>
                  <TextField
                    id="superhero-description"
                    label="origin description of the  super hero"
                    multiline
                    rows={4}
                    fullWidth
                  />
                </Grid>

                <Grid justifyContent={'space-between'} xs={12} item container>
                  <TextField
                    id="superhero-superpowers"
                    label="super powers"
                    multiline
                    rows={2}
                    fullWidth
                  />
                </Grid>

                <Grid justifyContent={'space-between'} xs={12} item container>
                  <TextField fullWidth id="input-realName" label="catch phrase" variant="outlined" />
                </Grid>
              </Grid>

              <Grid justifyContent={'center'} gap={1} item container xs={5}>
                <Grid alignItems={'center'} justifyContent={'space-evenly'} xs={12} item container>

                  <Typography variant={'body1'}>
                    Profile image
                  </Typography>


                  <Skeleton variant="rectangular" width={210} height={118} />


                  <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" />
                    <Button variant="contained" component="span" endIcon={<PhotoCamera />}>
                      Upload
                    </Button>
                  </label>
                </Grid>


                <Grid alignItems={'center'} justifyContent={'space-evenly'} xs={12} gap={2} item container>

                  <ImageList sx={{ width: 500, height: 300 }} cols={3} rowHeight={164}>
                    {itemData.map((item) => (
                      <ImageListItem key={item.img}>
                        <img
                          src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                          srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                          alt={item.title}
                          loading="lazy"
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>



                  <label htmlFor="upload-multiple">
                    <Input  multiple={true} accept="image/*" id="upload-multiple" type="file" />
                    <Button variant="contained" component="span" endIcon={<PhotoCamera />}>
                      Upload additional images
                    </Button>
                  </label>
                </Grid>
              </Grid>

            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];

export default AddSuperHeroModal;
