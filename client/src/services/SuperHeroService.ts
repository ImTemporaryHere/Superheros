import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ISuperHero} from "../models/ISuperHero";
import {PaginateResult} from "../models/PaginateResult";

const apiUrl = process.env.REACT_APP_BASE_API_URL;

export const superHeroAPI = createApi({
  reducerPath: 'superHeroAPI',
  baseQuery: fetchBaseQuery({baseUrl: apiUrl}),
  endpoints: (build)=> ({
    fetchAllSuperHeroes: build.query<PaginateResult<ISuperHero>,{limit: number, page: number}>({
      query: ({limit=5, page=1}) => ({
        url: '/api/superheroes',
        params: {
          limit,
          page
        }
      })
    }),

    addNewSuperHero: build.mutation<{message: string, id: string},{[key: string]: any}>({
      query: (formData)=> ({
        url: '/api/superheroes',
        method: 'POST',
        body: formData
      })

    })
  })

})