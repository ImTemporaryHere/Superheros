import {FC} from "react";
import {ISuperHero} from "../models/ISuperHero";


const SuperHeroListItem: FC<ISuperHero> = ({nickname,profileImagePath,_id}) => {
  return (
    <div>
      {nickname},, {profileImagePath}, , {_id}

    </div>
  );
};

export default SuperHeroListItem;
