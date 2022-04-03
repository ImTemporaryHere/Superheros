import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {baseUrl} from "../api";
import {ISuperHero} from "../models/ISuperHero";
import {PaginateResult} from "../models/PaginateResult";


export const superHeroAPI = createApi({
  reducerPath: 'superHeroAPI',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (build)=> ({
    fetchAllSuperHeroes: build.query<PaginateResult<ISuperHero>,number>({
      query: (limit=5) => ({
        url: '/api/superheroes',
        params: {
          limit
        }
      })
    })
  })

})