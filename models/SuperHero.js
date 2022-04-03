import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const {Schema, model,Types}  = mongoose;

const schema = new Schema({
  nickname: String,
  real_name: String,
  origin_description: String,
  superpowers: String,
  catch_phrase: String,
  profileImagePath: String,
  images: [Types.ObjectId]

})

schema.plugin(mongoosePaginate);

export const SuperHero = model('superhero', schema)

