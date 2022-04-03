import mongoose from 'mongoose';
const {Schema, model, Types}  = mongoose;

export const SuperHeroImageSchema = new Schema({
  path: String,
  superHeroId: Types.ObjectId
})

export const SuperHeroImage = model('superheroImage', SuperHeroImageSchema)

