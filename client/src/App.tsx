import './reset.scss'
import './index.scss'
import SuperHeroesList from "./components/SuperHeroesList/SuperHeroesList";
import HeaderNav from "./components/HeaderNav/HeaderNav";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SuperHeroPage from "./components/SuperHeroPage/SuperHeroPage";
import AddSuperHeroPage from "./components/AddSuperHeroPage/AddSuperHeroPage";
import EditSuperHeroPage from "./components/EditSuperHeroPage/EditSuperHeroPage";






const App = () => {



    return (
        <Router >
            <HeaderNav />
          <Routes>
            <Route path="/" element={<SuperHeroesList/>} />
            <Route path="/add-super-hero" element={<AddSuperHeroPage/>} />
            <Route path="/superheroes/:superHeroId" element={<SuperHeroPage />} />
            <Route path="/edit-superhero/:superHeroId" element={<EditSuperHeroPage />} />
          </Routes>

        </Router>
    );
};

export default App;
