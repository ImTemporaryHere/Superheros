import React, {FC} from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {ISuperHeroImage} from "../../../models/ISuperHeroImage";

const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => e.preventDefault();




interface IImagesCarouselProps {
  images: ISuperHeroImage[]
}


const ImagesCarousel: FC<IImagesCarouselProps> = ({images}) => {
   return (
     <AliceCarousel mouseTracking items={images.map(image=>(
       <img src={process.env.REACT_APP_BASE_URL + '/' + image.path} onDragStart={handleDragStart}/>
     ))} />
   )
}

export default ImagesCarousel;
