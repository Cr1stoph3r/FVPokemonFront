import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import PokemonCard from "./PokemonCard/PokemonCard";
import './style.css';
import Pagination from '../../components/Pagination/Pagination';
import { useGetPokemonList } from '../../rquery/queries/pokemon';
import { useGetStatsSelect } from '../../rquery/queries/stats';
import Loader from '../../components/Loader/Loader';
import SizeSelector from '../../components/SizeSelector/SizeSelector';
import PokemonDetails from './PokemonDetails/PokemonDetails';
const PokemonList = ({ filters ,searchValue }) => {
    const { data: stats } = useGetStatsSelect({options: {enabled: true}});
    const [ITEMS_PER_PAGE, setITEMS_PER_PAGE] = useState(8); 
    const [currentPage, setCurrentPage] = useState(1);
    
    const {
        data: {total: totalItems = 0, results: pokemons = []} = {}, 
        isLoading: isLoadingPokemon,
        refetch
    } = useGetPokemonList(
        {
            data: {
                limit: ITEMS_PER_PAGE,
                current_page: currentPage,
                filters: {
                    habitats: filters?.habitats?.map(habitat => habitat.split('-')[1]),
                    types: filters?.types?.map(type => type.split('-')[1]),
                },
                orderBy: filters?.orderBy,
                order: filters?.order,
                search: searchValue
            },
            options: {enabled: true}
        }
    );

    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    
    useEffect(() => {
        refetch();
    }, [currentPage,refetch]);
    
    useEffect(() => {
        refetch();
        setCurrentPage(1);
    }, [ITEMS_PER_PAGE,filters, searchValue, refetch]);

    const [selectedPokemonId, setSelectedPokemonId] = useState({});
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = (id) => {
        setSelectedPokemonId(id);
        setShowModal(true);
    }
    return (
        <>
        {isLoadingPokemon && <Loader />}
        <SizeSelector onChange={(e) => setITEMS_PER_PAGE(e.target.value)} value={ITEMS_PER_PAGE} />
        <div className="container-pokemons-list">
            {pokemons?.map((pokemon) => (
                <PokemonCard 
                    key={pokemon.id} 
                    pokemon={pokemon} 
                    stats={stats} 
                    handleSelectPokemon={handleOpenModal}
                />
            ))}
        </div>
        <Pagination             
            currentPage={currentPage} 
            totalPages={totalPages} 
            totalItems={totalItems} 
            ITEMS_PER_PAGE={ITEMS_PER_PAGE} 
            onChangePage={setCurrentPage}
        />
        {showModal && <PokemonDetails closeModal={() => setShowModal(false)} pokemonId={selectedPokemonId} />}
        </>
    );
};

PokemonList.propTypes = {
    filters: PropTypes.shape({
        habitats: PropTypes.arrayOf(PropTypes.string),
        types: PropTypes.arrayOf(PropTypes.string),
        orderBy: PropTypes.string,
        order: PropTypes.string,
    }),
    searchValue: PropTypes.string,
};


export default PokemonList;