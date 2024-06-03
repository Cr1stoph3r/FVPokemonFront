import { useState } from "react";
import PokemonFilters from "./PokemonFilters";
import PokemonList from "./PokemonList";

import "./style.css";


//Principal component of the home page
const HomePage = () => {
    const [filters, setFilters] = useState({
        types: [],
        habitats: [],
        order: 'asc',
        orderBy: null
    });
    const [searchValue, setSearchValue] = useState('');
    return (
        <div className="container-home-page">
            <h1>Bienvenido a la pokedex</h1>
            <PokemonFilters filters={filters} setFilters={setFilters} searchValue={searchValue} setSearchValue={setSearchValue}/>
            <PokemonList filters={filters} searchValue={searchValue} />
        </div>
    );
};

export default HomePage;