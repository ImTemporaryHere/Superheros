import {FC} from "react";
import {ISuperHero} from "../models/ISuperHero";


const SuperHeroListItem: FC<ISuperHero> = ({nickname,profileImagePath,_id}) => {
  return (
    <div>
      <div>{nickname}</div>
      <img width={200} src={'/'+profileImagePath} alt=""/>
      <div>{_id}</div>

    </div>
  );
};

export default SuperHeroListItem;
