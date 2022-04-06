import {Router} from 'express';
import {SuperHero} from "../models/SuperHero";
import {SuperHeroImage} from "../models/SuperHeroImage";
import fse from "fs-extra";
import path from "path";
const router = Router()





router.delete(
  '/',

  async (req, res) => {
    try {

      const imagesToBeRemoved = req.body;

      if(imagesToBeRemoved.length < 1) {
        res.status(500).json({ message: 'provide images to be remoded' })
      }


      const superHero = await SuperHero.findOne({_id: imagesToBeRemoved[0].superHeroId});

      for (const imageToBeRemoved of imagesToBeRemoved) {

        const imageToBeRemovedOnServer = await SuperHeroImage.findOne({_id: imageToBeRemoved._id})

        await fse.remove(path.join('public',imageToBeRemovedOnServer.path))

        await SuperHeroImage.findOneAndDelete({_id: imageToBeRemovedOnServer._id})

        superHero.images = [...superHero.images.filter(imageId => imageId.toString() !== imageToBeRemovedOnServer._id)]


      }


      await superHero.save()


      res.status(201).json({message: 'removed'})

    } catch (e) {
      console.log(e)
      res.status(500).json({ message: e.message })
    }
  })



export default router