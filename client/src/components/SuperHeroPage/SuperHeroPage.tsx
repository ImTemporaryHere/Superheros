import React from 'react';
import {useParams} from "react-router-dom";

const SuperHeroPage = () => {
  let { superHeroId } = useParams();
  return (
    <div>
     data {superHeroId}
    </div>
  );
};

export default SuperHeroPage;
