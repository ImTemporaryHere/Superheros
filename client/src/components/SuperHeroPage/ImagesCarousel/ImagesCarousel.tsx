import React, {FC} from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {ISuperHeroImage} from "../../../models/ISuperHeroImage";
import styles from './styles.module.scss'

const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => e.preventDefault();




interface IImagesCarouselProps {
  images: ISuperHeroImage[]
}


const ImagesCarousel: FC<IImagesCarouselProps> = ({images}) => {
   return (
     <AliceCarousel
       responsive={{0: {items: 3}}}
       animationType={'slide'}
       animationDuration={500}
       mouseTracking
       items={images.map(image=>(
          <div className={styles['slider-item-container']}>
            <img  src={process.env.REACT_APP_BASE_URL + '/' + image.path} height={400} onDragStart={handleDragStart} />
          </div>
       ))}

     />
   )
}

export default ImagesCarousel;
