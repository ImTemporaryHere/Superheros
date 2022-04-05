import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, {useState} from "react";
import {Grid, Skeleton, styled, TextField} from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {AddSuperHeroSlice} from "../../store/reducers/addSuperHeroSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";


const Input = styled('input')({
  display: 'none',
});

const AddSuperHeroPage = () => {
  const {
    nickname,
    catch_phrase,
    images,
    origin_description,
    profileImageLocalUrl,
    real_name,
    superpowers
  } = useAppSelector(state => state.AddSuperHero)
  const dispatch = useAppDispatch()
  const {
    nickNameHandleChange,
    catchPhraseHandleChange,
    realNameHandleChange,
    superPowersHandleChange,
    originDescriptionHandleChange,
    profileImageLocalUrlHandleChange,
    additionalImagesHandleChange
  } = AddSuperHeroSlice.actions


  const handleProfileImageChange = (event: React.ChangeEvent) => {
    event.preventDefault();
    const { files } = event.target as HTMLInputElement;
    if (files) {
      const localImageUrl = window.URL.createObjectURL(files[0]);
      dispatch(profileImageLocalUrlHandleChange(localImageUrl))
    }
  }

  const handleAdditionalImagesChange = (event: React.ChangeEvent) => {
    event.preventDefault();
    const { files } = event.target as HTMLInputElement;
    if (files) {
      const imagesUrls = [];

      for(let file of Array.from(files)) {
        const localImageUrl = window.URL.createObjectURL(file);
        imagesUrls.push(localImageUrl)
      }

      dispatch(additionalImagesHandleChange(imagesUrls))
    }
  }


  const handleSaveToDB = () => {

  }

  return (
    <div>
      <Box>
        <Grid container justifyContent={'center'} gap={1}>
          <Grid justifyContent={'center'} xs={5} item container>
            <Grid justifyContent={'space-between'} xs={12} item container>
              <TextField
                value={nickname}
                onChange={(e)=>{
                  dispatch(nickNameHandleChange(e.target.value))
                }}
                fullWidth id="input-nickname" label="nickname of the SuperHero" variant="outlined"
              />
            </Grid>

            <Grid justifyContent={'space-between'} xs={12} item container>
              <TextField
                value={real_name}
                onChange={(e)=>{
                  dispatch(realNameHandleChange(e.target.value))
                }}
                fullWidth id="input-realName" label="realName of the SuperHero" variant="outlined"
              />
            </Grid>

            <Grid justifyContent={'space-between'} xs={12} item container>
              <TextField
                value={origin_description}
                onChange={(e)=>{
                  dispatch(originDescriptionHandleChange(e.target.value))
                }}
                id="superhero-description"
                label="origin description of the  super hero"
                multiline
                rows={4}
                fullWidth
              />
            </Grid>

            <Grid justifyContent={'space-between'} xs={12} item container>
              <TextField
                value={superpowers}
                onChange={(e)=>{
                  dispatch(superPowersHandleChange(e.target.value))
                }}
                id="superhero-superpowers"
                label="super powers"
                multiline
                rows={2}
                fullWidth
              />
            </Grid>

            <Grid justifyContent={'space-between'} xs={12} item container>
              <TextField
                value={catch_phrase}
                onChange={(e)=>{
                  dispatch(catchPhraseHandleChange(e.target.value))
                }}
                fullWidth id="input-realName" label="catch phrase" variant="outlined"
              />
            </Grid>
          </Grid>

          <Grid justifyContent={'center'} gap={1} item container xs={5}>
            <Grid alignItems={'center'} justifyContent={'space-evenly'} xs={12} item container>

              <Typography variant={'body1'}>
                Profile image
              </Typography>


              {
                profileImageLocalUrl ?

                  <img src={profileImageLocalUrl} height={118} alt=""/>

                  :

                  <Skeleton variant="rectangular" width={210} height={118} />
              }


              <label htmlFor="icon-button-file">
                <Input
                  onChange={handleProfileImageChange}
                  accept="image/*" id="icon-button-file" type="file"
                />
                <Button variant="contained" component="span" endIcon={<PhotoCamera />}>
                  Upload
                </Button>
              </label>
            </Grid>

            <Typography variant={'h5'}>
              Gallery images
            </Typography>


            <Grid alignItems={'center'} justifyContent={'space-evenly'} xs={12} gap={2} item container>

              <ImageList sx={{ width: 500, height: 300 }} cols={3} rowHeight={164}>
                {images.map((item) => (
                  <ImageListItem key={item}>
                    <img
                      src={item}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>



              <label htmlFor="upload-multiple">
                <Input
                  onChange={handleAdditionalImagesChange}
                  multiple={true}
                  accept="image/*" id="upload-multiple" type="file"
                />
                <Button variant="contained" component="span" endIcon={<PhotoCamera />}>
                  Upload additional images
                </Button>
              </label>
            </Grid>
          </Grid>


          <Grid item container xs={12} gap={3} justifyContent={'center'}>
            <Button onCLick={handleSaveToDB} variant="contained" component="span" >
              save superHero to Database
            </Button>
          </Grid>

        </Grid>
      </Box>
    </div>
  );
};


export default AddSuperHeroPage;
