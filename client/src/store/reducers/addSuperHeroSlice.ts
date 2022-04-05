import {createSlice, PayloadAction} from "@reduxjs/toolkit";




interface IInitialState {
  nickname: string,
  real_name: string,
  origin_description: string,
  superpowers: string,
  catch_phrase: string,
  profileImageLocalUrl: null | string,
  images: string[],
}

const initialState: IInitialState = {
  nickname: '',
  real_name: '',
  origin_description: '',
  superpowers: '',
  catch_phrase: '',
  profileImageLocalUrl: null,
  images: []
}

export const AddSuperHeroSlice = createSlice({
  name: 'addSuperHero',
  initialState,
  reducers: {
    nickNameHandleChange: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload
    },
    realNameHandleChange: (state, action: PayloadAction<string>) => {
      state.real_name = action.payload
    },
    originDescriptionHandleChange: (state, action: PayloadAction<string>) => {
      state.origin_description = action.payload
    },
    superPowersHandleChange: (state, action: PayloadAction<string>) => {
      state.superpowers = action.payload
    },
    catchPhraseHandleChange: (state, action: PayloadAction<string>) => {
      state.catch_phrase = action.payload
    },
    profileImageLocalUrlHandleChange: (state, action: PayloadAction<string>) => {
      state.profileImageLocalUrl = action.payload
    },
    additionalImagesHandleChange: (state, action: PayloadAction<string[]>) => {
      state.images = action.payload
    },

  }

})

export default AddSuperHeroSlice.reducer