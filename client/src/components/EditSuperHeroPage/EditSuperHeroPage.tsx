import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, {useEffect, useState} from "react";
import {Grid, Modal, Skeleton, styled, TextField} from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {AddSuperHeroSlice} from "../../store/reducers/addSuperHeroSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {superHeroAPI} from "../../services/SuperHeroService";
import {Link, useParams} from "react-router-dom";
import {EditSuperHeroSlice, ILocalImageUrlFromFile} from "../../store/reducers/editSuperHeroSlice";
import {ISuperHeroImage} from "../../models/ISuperHeroImage";


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






const EditSuperHeroPage = () => {

  const { superHeroId } = useParams();
  const {data: originalSuperHeroData,isLoading: isLoadingOriginDataSuperHero,error: LoadingOriginDataSuperHero} = superHeroAPI.useGetSuperHeroDataByIdQuery(superHeroId as string)


  const {
    nickname,
    catch_phrase,
    images,
    origin_description,
    real_name,
    superpowers
  } = useAppSelector(state => state.EditSuperHero);

  const dispatch = useAppDispatch();

  const {
    nickNameHandleChange,
    catchPhraseHandleChange,
    realNameHandleChange,
    superPowersHandleChange,
    originDescriptionHandleChange,
    additionalImagesHandleChange
  } = EditSuperHeroSlice.actions;

  const [createSuperHero,{isLoading,error: updateSuperHeroError, data: responseOnCreateRequest}] = superHeroAPI.useUpdateSuperHeroDataMutation()


  const [openModalResults, setOpenModalResults] = React.useState(false);
  const handleClose = () => setOpenModalResults(false);


  const handleProfileImageChange = (event: React.ChangeEvent) => {
    event.preventDefault();
    const { files } = event.target as HTMLInputElement;
    if (files) {
      const localImageUrl = window.URL.createObjectURL(files[0]);
      //dispatch(profileImageLocalUrlHandleChange({name: files[0].name, url: localImageUrl}))
    }
  }

  const handleAdditionalImagesChangeInputValue = (event: React.ChangeEvent) => {
    event.preventDefault();
    const { files } = event.target as HTMLInputElement;
    if (files) {
      const imagesUrls = [...images];

      for(let file of Array.from(files)) {
        const localImageUrl = window.URL.createObjectURL(file);
        imagesUrls.push({name: file.name, url: localImageUrl})
      }

      dispatch(additionalImagesHandleChange(imagesUrls))
    }
  }


  const handleRemoveImageFromState = (img: (ISuperHeroImage | ILocalImageUrlFromFile)) => {
    let allFilteredImages: (ISuperHeroImage | ILocalImageUrlFromFile)[] = []
    if('path' in img) {
      const filteredImages = images.filter(imgInArray=>{

       if('path' in imgInArray) {
         return  imgInArray.path !== img.path
       }
       else {
         return  true
       }
      })
      allFilteredImages.push(...filteredImages)
    }
    if('url' in img) {
      const filteredImages = images.filter(imgInArray=>{
        if('url' in imgInArray) {
          return imgInArray.url !== img.url
        }
        else {
          return true
        }
      })
      allFilteredImages.push(...filteredImages)
    }


    dispatch(additionalImagesHandleChange(allFilteredImages))
  }



  const handleSaveToDB = async () => {

    try {
      // if(!profileImageLocalUrl) {
      //   return
      // }

      const formData = new FormData();
      formData.append('nickname',nickname)
      formData.append('real_name',real_name)
      formData.append('origin_description',origin_description)
      formData.append('superpowers',superpowers)
      formData.append('catch_phrase',catch_phrase)

      // const profileImageFile = await getFileFromUrl(profileImageLocalUrl.url,profileImageLocalUrl.name)
      // formData.append('profileImage',profileImageFile)


      // for (let img of images) {
      //   const imgFile = await getFileFromUrl(img.url,img.name)
      //   formData.append('images',imgFile)
      // }



      //await createSuperHero(formData)

      setOpenModalResults(true)
    }
    catch (e) {
      setOpenModalResults(true)
    }
  }




  useEffect(()=>{

    if(originalSuperHeroData) {
      dispatch(nickNameHandleChange(originalSuperHeroData.nickname))
      dispatch(catchPhraseHandleChange(originalSuperHeroData.catch_phrase))
      dispatch(realNameHandleChange(originalSuperHeroData.real_name))
      dispatch(superPowersHandleChange(originalSuperHeroData.superpowers))
      dispatch(originDescriptionHandleChange(originalSuperHeroData.origin_description))
      dispatch(additionalImagesHandleChange(originalSuperHeroData.images))
    }

  },[originalSuperHeroData])







  return (
    <div>
      <Modal
        open={openModalResults}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          {updateSuperHeroError && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Error
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {updateSuperHeroError}
              </Typography>
            </>
          )}

          {
            responseOnCreateRequest && (
              <>
                <Typography id="modal-modal-title" variant="h6" gutterBottom>
                  Saved !
                </Typography>
                <Typography id="modal-modal-description">
                  go to

                  <Link to={`/`}>
                    <Typography sx={{ml: '20px', mr: '20px'}} variant={'h4'} component={'span'}>
                      Link
                    </Typography>
                  </Link>

                  to see the saved Hero
                </Typography>

              </>
            )}


        </Box>
      </Modal>



      <Box>
        <Grid container justifyContent={'center'} gap={1}>
          <Grid justifyContent={'center'} xs={5} item container>

            <Grid item container xs={12}>
              <Typography variant={'h3'}>
                Edit field below
              </Typography>
            </Grid>

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
                originalSuperHeroData ?

                  <img src={process.env.REACT_APP_BASE_URL + '/' + originalSuperHeroData?.profileImagePath} height={118} alt=""/>

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

              <ImageList gap={40} sx={{ width: 500, height: 300 }} cols={3} rowHeight={164}>
                {images.map((item) => {

                  if ('url' in item ) {
                    return (
                      <ImageListItem key={item.url}>
                        <img
                          src={item.url}
                          loading="lazy"
                        />
                        <Button
                          onClick={()=>{handleRemoveImageFromState(item)}}
                          size={"small"}
                          variant={'contained'}
                          color={'warning'}
                        >
                          remove
                        </Button>
                      </ImageListItem>
                    )
                  } else {
                    return (
                      <ImageListItem key={item.path}>
                        <img
                          src={process.env.REACT_APP_BASE_URL + '/' + item.path}
                          loading="lazy"
                        />
                        <Button
                          onClick={()=>{handleRemoveImageFromState(item)}}
                          size={"small"}
                          variant={'contained'}
                          color={'warning'}
                        >
                          remove
                        </Button>
                      </ImageListItem>
                    )
                  }



                })}
              </ImageList>



              <label htmlFor="upload-multiple">
                <Input
                  onChange={handleAdditionalImagesChangeInputValue}
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

export default EditSuperHeroPage;
