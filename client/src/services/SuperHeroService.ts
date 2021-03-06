import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ISuperHero} from "../models/ISuperHero";
import {PaginateResult} from "../models/PaginateResult";
import {ISuperHeroImage} from "../models/ISuperHeroImage";

const apiUrl = process.env.REACT_APP_BASE_API_URL;


type Keys = keyof ISuperHero;
type Values =  ISuperHero[Keys]; //



export const superHeroAPI = createApi({
  reducerPath: 'superHeroAPI',
  baseQuery: fetchBaseQuery({baseUrl: apiUrl}),
  tagTypes: ['superHero'],
  endpoints: (build)=> ({
    fetchAllSuperHeroes: build.query<PaginateResult<ISuperHero>,{limit: number, page: number}>({
      query: ({limit=5, page=1}) => ({
        url: '/api/superheroes',
        params: {
          limit,
          page
        }
      }),
      providesTags: result => ['superHero']

    }),

    addNewSuperHero: build.mutation<{message: string, id: string},{[key: string]: any}>({
      query: (formData)=> ({
        url: '/api/superheroes',
        method: 'POST',
        body: formData
      }),
      invalidatesTags: result => ['superHero']

    }),

    getSuperHeroDataById: build.query<ISuperHero,string>({
      query: (id) => ({
        url: `/api/superheroes/${id}`,
        method: 'GET'
      }),
      providesTags: result => ['superHero']
    }),

    updateSuperHeroData: build.mutation<{message: string},{newSuperHero: {[key in Keys]: Values},id: string}>({
      query: ({newSuperHero, id})=> {

        return ({
          url: `/api/superheroes/${id}`,
          method: 'PUT',
          body: newSuperHero
        })
      },
      invalidatesTags: result => ['superHero']

    }),


    addNewImagesToSuperHero: build.mutation<{message: string},{formData: {[key: string]: any},id: string}>({
      query: ({formData, id})=> ({
        url: `/api/superheroes/${id}/images`,
        method: 'POST',
        body: formData
      }),
      invalidatesTags: result => ['superHero']

    }),



    deleteImageFromSuperHero: build.mutation<{message: string},{arrayOfImagesToBeRemoved: ISuperHeroImage[]}>({
      query: ({arrayOfImagesToBeRemoved})=> ({
        url: `/api/superheroes-images`,
        method: 'DELETE',
        body: arrayOfImagesToBeRemoved
      }),
      invalidatesTags: result => ['superHero']

    }),


    deleteSuperHero: build.mutation<{message: string},{id: string}>({
      query: ({id})=> ({
        url: `/api/superheroes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: result => ['superHero']

    }),







  })

})