import React from 'react';
import {Link, useParams} from "react-router-dom";
import {superHeroAPI} from "../../services/SuperHeroService";
import {Box, Grid, Modal, Skeleton, Table, TableBody, TableCell, TableRow, Typography} from "@mui/material";
import ImagesCarousel from "./ImagesCarousel/ImagesCarousel";
import Button from "@mui/material/Button";


const baseUrl = process.env.REACT_APP_BASE_URL;

const SuperHeroPage = () => {
  const { superHeroId } = useParams();
  const {data,isLoading,error} = superHeroAPI.useGetSuperHeroDataByIdQuery(superHeroId as string)

  const [deleteSuperHero, {data: responseOnDeleteRequest}] = superHeroAPI.useDeleteSuperHeroMutation()


  return (
    <Box sx={{paddingLeft: '50px',paddingRight: '50px'}}>

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
            responseOnUpdateSuperHero && (
              <>
                <Typography id="modal-modal-title" variant="h6" gutterBottom>
                  Saved !
                </Typography>
                <Typography id="modal-modal-description">
                  go to

                  <Link to={'/' + `superheroes/${superHeroId}`}>
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







      <Grid container justifyContent={'space-between'}>
        <Grid item container alignItems={'flex-end'} gap={2} xs={3}>

          <Grid justifyContent={'center'} item container xs={12}>
            {
              data  ?
                <img src={baseUrl+'/'+data?.profileImagePath} height={'200px'} alt=""/>
                :
                <Skeleton variant={'rectangular'} height={'200px'}></Skeleton>
            }
          </Grid>

          <Table>
            <TableBody>
              <TableRow>
                <TableCell variant="head">
                  <Typography variant={'h6'}>
                    nickname :
                  </Typography>
                </TableCell>
                <TableCell>
                  {isLoading ?
                    <Skeleton width={'100%'} >
                      <Typography variant={'h6'} >.</Typography>
                    </Skeleton>
                    :
                    <Typography variant={'h6'}>{data?.nickname }</Typography>
                  }
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell variant="head">
                  <Typography variant={'h6'}>
                    real name :
                  </Typography>
                </TableCell>
                <TableCell>
                  {isLoading ?
                    <Skeleton width={'100%'} >
                      <Typography variant={'h6'} >.</Typography>
                    </Skeleton>
                    :
                    <Typography variant={'h6'}>{data?.real_name }</Typography>
                  }
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell variant="head">
                  <Typography variant={'h6'}>
                    description :
                  </Typography>
                </TableCell>
                <TableCell>
                  {isLoading ?
                    <Skeleton width={'100%'} >
                      <Typography variant={'h6'} >.</Typography>
                    </Skeleton>
                    :
                    <Typography variant={'h6'}>{data?.origin_description }</Typography>
                  }
                </TableCell>
              </TableRow>




              <TableRow>
                <TableCell variant="head">
                  <Typography variant={'h6'}>
                    superpowers :
                  </Typography>
                </TableCell>
                <TableCell>
                  {isLoading ?
                    <Skeleton width={'100%'} >
                      <Typography variant={'h6'} >.</Typography>
                    </Skeleton>
                    :
                    <Typography variant={'h6'}>{data?.superpowers }</Typography>
                  }
                </TableCell>
              </TableRow>


              <TableRow>
                <TableCell variant="head">
                  <Typography variant={'h6'}>
                    catch phrase :
                  </Typography>
                </TableCell>
                <TableCell width={'50%'}>
                  {isLoading ?
                    <Skeleton width={'100%'} >
                      <Typography variant={'h6'} >.</Typography>
                    </Skeleton>
                    :
                    <Typography variant={'h6'}>{data?.catch_phrase }</Typography>
                  }
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>


        <Grid item justifyContent={'center'} alignItems={'center'} gap={3} container xs={8}>

          <Grid gap={3} justifyContent={'center'} container item xs={12}>
              <Link to={`/edit-superhero/${data?._id}`}>
                <Button variant={'contained'} >
                  Edit SuperHero Data
                </Button>
              </Link>

            <Button variant={'contained'} color={'warning'} >
               Delete Super hero
            </Button>
          </Grid>

          {data?.images ?
            <ImagesCarousel images={data.images} />
            :
            <Skeleton variant={'rectangular'} width={'100%'}></Skeleton>

          }
        </Grid>

      </Grid>
    </Box>
  );
};

export default SuperHeroPage;
