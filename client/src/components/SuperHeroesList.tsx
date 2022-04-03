import React from 'react';
import {superHeroAPI} from "../services/SuperHeroService";
import SuperHeroListItem from "./SuperHeroListItem";

function SuperHeroesList() {
  const {data: superHeroesResponse, error} = superHeroAPI.useFetchAllSuperHeroesQuery(5)
  return (
    <div>
        <div className={'post__list'}>
          {superHeroesResponse?.docs && superHeroesResponse.docs.map(superHero=><SuperHeroListItem key={superHero._id} {...superHero} />)}
          {error && <h1>Error </h1>}
        </div>
    </div>
  );
}

export default SuperHeroesList;