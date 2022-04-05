import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, {useState} from "react";
import {Grid, Modal, Skeleton, styled, TextField} from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {AddSuperHeroSlice} from "../../store/reducers/addSuperHeroSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {superHeroAPI} from "../../services/SuperHeroService";
import {Link} from "react-router-dom";


async function getFileFromUrl(url: string, name: string, defaultType = 'image/jpeg'){
  const response = await fetch(url);
  const data = await response.blob();
  return new File([data], name, {
    type: data.type || defaultType,
  });
}



const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};





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

  const [createSuperHero,{isLoading,error: createError, data: responseOnCreateRequest}] = superHeroAPI.useAddNewSuperHeroMutation()


  const [openModalResults, setOpenModalResults] = React.useState(false);
  const handleClose = () => setOpenModalResults(false);


  const handleProfileImageChange = (event: React.ChangeEvent) => {
    event.preventDefault();
    const { files } = event.target as HTMLInputElement;
    if (files) {
      const localImageUrl = window.URL.createObjectURL(files[0]);
      dispatch(profileImageLocalUrlHandleChange({name: files[0].name, url: localImageUrl}))
    }
  }

  const handleAdditionalImagesChange = (event: React.ChangeEvent) => {
    event.preventDefault();
    const { files } = event.target as HTMLInputElement;
    if (files) {
      const imagesUrls = [];

      for(let file of Array.from(files)) {
        const localImageUrl = window.URL.createObjectURL(file);
        imagesUrls.push({name: file.name, url: localImageUrl})
      }

      dispatch(additionalImagesHandleChange(imagesUrls))
    }
  }


  const handleSaveToDB = async () => {

    try {
      if(!profileImageLocalUrl) {
        return
      }

      const formData = new FormData();
      formData.append('nickname',nickname)
      formData.append('real_name',real_name)
      formData.append('origin_description',origin_description)
      formData.append('superpowers',superpowers)
      formData.append('catch_phrase',catch_phrase)

      const profileImageFile = await getFileFromUrl(profileImageLocalUrl.url,profileImageLocalUrl.name)
      formData.append('profileImage',profileImageFile)


      for (let img of images) {
        const imgFile = await getFileFromUrl(img.url,img.name)
        formData.append('images',imgFile)
      }



      await createSuperHero(formData)

      setOpenModalResults(true)
    }
    catch (e) {
      setOpenModalResults(true)
    }
  }

  return (
    <div>
      <Modal
        open={openModalResults}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          {createError && (
           <>
             <Typography id="modal-modal-title" variant="h6" component="h2">
               Error
             </Typography>
             <Typography id="modal-modal-description" sx={{ mt: 2 }}>
               {createError}
             </Typography>
           </>
          )}

          {
            responseOnCreateRequest && (
              <>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Saved !
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                   go to <Link to={`/superheroes/${responseOnCreateRequest.id}`}>Link</Link> to see saved Hero
                </Typography>
              </>
            )}


        </Box>
      </Modal>



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

                  <img src={profileImageLocalUrl.url} height={118} alt=""/>

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
                  <ImageListItem key={item.url}>
                    <img
                      src={item.url}
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
            <Button onClick={handleSaveToDB} variant="contained" component="span" >
              save superHero to Database
            </Button>
          </Grid>

        </Grid>
      </Box>
    </div>
  );
};


export default AddSuperHeroPage;
