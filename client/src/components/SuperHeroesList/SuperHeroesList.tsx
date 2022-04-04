import React, {ChangeEvent, useState} from 'react';
import {superHeroAPI} from "../../services/SuperHeroService";
import SuperHeroListItem from "./SuperHeroListItem/SuperHeroListItem";
import styles from './styles.module.scss'
import TablePagination from '@mui/material/TablePagination';

function SuperHeroesList() {
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  const {data: {docs,totalPages}={}, error} = superHeroAPI.useFetchAllSuperHeroesQuery({page, limit: itemsPerPage})

  const handlePaginationChange = (e: ChangeEvent<unknown>, pageNumber: number) => {
    setPage(pageNumber)
  }
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
            totalPages &&
            <TablePagination
              rowsPerPageOptions={[5,10,25]}
              component="div"
              count={totalPages}
              page={page}
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