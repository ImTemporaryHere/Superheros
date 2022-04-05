import React, {ChangeEvent, useState} from 'react';
import {superHeroAPI} from "../../services/SuperHeroService";
import SuperHeroListItem from "./SuperHeroListItem/SuperHeroListItem";
import styles from './styles.module.scss'
import TablePagination from '@mui/material/TablePagination';

function SuperHeroesList() {
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);



  const {data: {docs,totalPages,totalDocs}={}, error} = superHeroAPI.useFetchAllSuperHeroesQuery({page, limit: itemsPerPage})


  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage+1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };





  return (
    <div className={styles['super-heroes-page']}>
        <div className={styles['super-heroes-list']}>
          {docs && docs.map(
            superHero=>(
              <SuperHeroListItem key={superHero._id} {...superHero} />
            )
          )}


          {error && <h1>Error </h1>}
        </div>

        <div className={styles['super-heroes-list__pagination']}>
          {
            totalDocs &&
            <TablePagination
              labelRowsPerPage={'heroes per page'}
              rowsPerPageOptions={[5,10,25]}
              component="div"
              count={totalDocs}
              page={page-1}
              onPageChange={handleChangePage}
              rowsPerPage={itemsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          }
        </div>
    </div>
  );
}

export default SuperHeroesList;