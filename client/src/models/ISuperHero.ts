import {ISuperHeroImage} from "./ISuperHeroImage";

export interface ISuperHero {
  _id: string,
  nickname: string,
  real_name: string,
  origin_description: string,
  superpowers: string,
  catch_phrase: string,
  profileImagePath: string,
  images: ISuperHeroImage[],
}