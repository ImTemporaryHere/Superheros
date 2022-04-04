import {Router} from 'express';
import {SuperHero} from '../models/SuperHero';
import {SuperHeroImage} from '../models/SuperHeroImage';
import fse from 'fs-extra'
import fs from 'fs/promises'
import path from 'path'
const router = Router();
import multer from 'multer';
const upload = multer();



router.get(
  '/',
  async (req, res) => {
  try {

    const {page,limit} = req.query

    const options = {
      page: page || 1,
      limit: limit || 5,
      //select: 'nickname profileImagePath',
      lean: true,
      leanWithId: false,
      populate: {path: 'images', model: SuperHeroImage}
    };


    const superHeroesListWithPagination = await SuperHero.paginate({}, options);

    res.status(200).json(superHeroesListWithPagination)

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get(
  '/:superHeroId',
  async (req, res) => {
    try {

      const {superHeroId} = req.params;

      const superHero = await SuperHero.findOne({_id: superHeroId}).populate({path: 'images', model: SuperHeroImage});

      res.status(200).json(superHero)



    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })


router.post(
    '/',
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'images', maxCount: 10 }
  ]),
    async (req, res) => {
      try {

        const superHero = req.body;

        const newSuperHero = new SuperHero(superHero);


        const pathToSaveImages = `public/super-hero-images/${newSuperHero._id}`


        await fse.ensureDir(pathToSaveImages)


        const newProfileImage = new SuperHeroImage();

        const newProfileImagePath = path.join(pathToSaveImages,newProfileImage._id.toString() + '.' + req.files.profileImage[0].originalname.split('.').pop())

        newProfileImage.path = (newProfileImagePath).split(path.sep).slice(1,).join('/')
        newProfileImage.superHeroId = newSuperHero._id

        await fs.writeFile(newProfileImagePath, req.files.profileImage[0].buffer);


        await newProfileImage.save()


        newSuperHero.profileImagePath = newProfileImage.path;


        newSuperHero.images = [newProfileImage._id];


        const images = []

        for (let superHeroImage of req.files['images']) {
          const newGalleryImage = new SuperHeroImage();

          const newGalleryImagePath = path.join(pathToSaveImages,newGalleryImage._id.toString() + '.' + superHeroImage.originalname.split('.').pop())


          await fs.writeFile(newGalleryImagePath, superHeroImage.buffer);

          newGalleryImage.path = newGalleryImagePath.split(path.sep).slice(1,).join('/');

          newGalleryImage.superHeroId = newSuperHero._id;

          await newGalleryImage.save()

          images.push(newGalleryImage._id)

        }

        newSuperHero.images.push(...images)


        await newSuperHero.save()

        res.status(201).json({message: 'saved', id: newSuperHero._id})

      } catch (e) {
        res.status(500).json({ message: `error occurred, info - ${e.message}` })
      }
    })




router.delete(
    '/:superHeroId',
    async (req, res) => {
      try {
        const superHeroId = req.params.superHeroId;


        await fse.remove(`public/super-hero-images/${superHeroId}`)

        await SuperHero.findOneAndDelete({_id: superHeroId})

        await SuperHeroImage.deleteMany({superHeroId})

        res.status(200).json({message: 'deleted'})

      } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
      }
    })



router.put(
  '/:superHeroId',
  async (req, res) => {
    try {
      const superHeroId = req.params.superHeroId;

      const newFieldsOfSuperHero = req.body;

      console.log(newFieldsOfSuperHero)

      await SuperHero.findOneAndUpdate({_id: superHeroId}, newFieldsOfSuperHero)

      res.status(200).json({message: 'updated'})

    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })




router.post(
    '/:superHeroId/images',
  upload.fields([
    { name: 'images', maxCount: 10 }
  ]),
    async (req, res) => {
      try {

        const superHeroId = req.params.superHeroId;

        const superHero = await SuperHero.findOne({_id: superHeroId});

        if(!superHero) {
          res.status(500).json({ message: 'no superHero exist with provided id' });
          return;
        }


        const pathToSaveImages = `public/super-hero-images/${superHeroId}`;


        const images = []

        for (let superHeroImage of req.files['images']) {
          const newGalleryImage = new SuperHeroImage();

          const newGalleryImagePath = path.join(pathToSaveImages,newGalleryImage._id.toString() + '.' + superHeroImage.originalname.split('.').pop())


          await fs.writeFile(newGalleryImagePath, superHeroImage.buffer);

          newGalleryImage.path = newGalleryImagePath.split(path.sep).slice(1,).join('/');

          newGalleryImage.superHeroId = superHeroId;

          await newGalleryImage.save()

          images.push(newGalleryImage._id)

        }

        superHero.images.push(...images)

        await superHero.save()


        res.status(201).json({message: 'images saved'})

      } catch (e) {
        console.log(e)
        res.status(500).json({ message: e.message })
      }
    })



router.delete(
  '/:superHeroId/images/:imageId',

  async (req, res) => {
    try {

      const superHeroId = req.params.superHeroId;
      const imageIdToRemove = req.params.imageId;

      const superHero = await SuperHero.findOne({_id: superHeroId});

      if(!superHero) {
        res.status(500).json({ message: 'no superHero exist with provided id' });
        return;
      }

      const imageToBeRemoved = await SuperHeroImage.findOne({_id: imageIdToRemove})

      await fse.remove(path.join('public',imageToBeRemoved.path))

      await SuperHeroImage.findOneAndDelete({_id: imageIdToRemove})

      superHero.images = [...superHero.images.filter(imageId => imageId.toString() !== imageIdToRemove)]

      await superHero.save()


      res.status(201).json({message: 'removed'})

    } catch (e) {
      console.log(e)
      res.status(500).json({ message: e.message })
    }
  })















export default router
