import {FC} from "react";
import {ISuperHero} from "../../../models/ISuperHero";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";



const SuperHeroListItem: FC<ISuperHero> = ({nickname,profileImagePath,_id}) => {


  return (
    <Link to={`/superheroes/${_id}`}>
      <Card>
        <CardMedia
          component="img"
          image={process.env.REACT_APP_BASE_URL+'/'+profileImagePath}
          alt={nickname + ' ' + 'picture'}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {nickname.slice(0,15)}...
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}


export default SuperHeroListItem;
