import React from 'react';
import {useParams} from "react-router-dom";
import {superHeroAPI} from "../../services/SuperHeroService";
import {Box, Grid, Skeleton, Table, TableBody, TableCell, TableRow, Typography} from "@mui/material";
import ImagesCarousel from "./ImagesCarousel/ImagesCarousel";


const baseUrl = process.env.REACT_APP_BASE_URL;

const SuperHeroPage = () => {
  const { superHeroId } = useParams();
  const {data,isLoading,error} = superHeroAPI.useGetSuperHeroDataByIdQuery(superHeroId as string)


  return (
    <Box sx={{paddingLeft: '50px',paddingRight: '50px'}}>
      <Grid container>
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


        <Grid item justifyContent={'center'} container xs={8}>
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
