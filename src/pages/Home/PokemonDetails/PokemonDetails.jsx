import PropTypes from 'prop-types';
import './style.css';
import { useGetPokemonWithEvolutions } from '../../../rquery/queries/pokemon';
import { useEffect, useState } from 'react';
import { useGetStatsSelect } from '../../../rquery/queries/stats';
import Loader from '../../../components/Loader/Loader';

const PokemonDetails = ({ closeModal, pokemonId }) => {
    const { data: stats = [] } = useGetStatsSelect({ options: { enabled: true } });
    const { data: pokemon, isLoading: isLoadingPokemon } = useGetPokemonWithEvolutions({pokemonId, options: {enabled: true}});
    const [selectedPokemon, setSelectedPokemon] = useState({});
    const [cantEvolutions, setCantEvolutions] = useState(1);
    const [currentPokemon, setCurrentPokemon] = useState(1);

    useEffect(() => {
        if (pokemon) {
            setSelectedPokemon(pokemon);
            setCantEvolutions((pokemon.evolutions?.length || 0) + 1);
            setCurrentPokemon(1);
        }
    }, [pokemon]);

    const handleChangePokemon = (newPokemon) => {
        if (newPokemon < 1) {
            setCurrentPokemon(cantEvolutions);
            setSelectedPokemon(pokemon.evolutions[cantEvolutions - 2] || pokemon);
            return;
        }
        if (newPokemon > cantEvolutions) {
            setCurrentPokemon(1);
            setSelectedPokemon(pokemon);
            return;
        }
        setCurrentPokemon(newPokemon);
        setSelectedPokemon(newPokemon === 1 ? pokemon : pokemon.evolutions[newPokemon - 2]);
    };

    return(
        <div className='container-pokemon-details'>
            {isLoadingPokemon && <Loader />}
            <div className="container-card-pokemon-details">
                <div className="head-card-details">
                    <h3>Detalles del pokemon: <span style={selectedPokemon?.color ? {color: `var(--pokemon-color-${selectedPokemon?.color})`} : {color: 'var(--pokemon-background-black)'}}>{selectedPokemon.name}</span></h3>
                    <button onClick={closeModal}>
                        <img src="X.svg" alt="Close img"/>
                    </button>
                </div>
                <div className="container-seccions-details">
                    <div className="container-arrow">
                        <button onClick={() => handleChangePokemon(currentPokemon - 1)}>
                            <div className="arrow-left"/>
                        </button>
                    </div>
                    <div className="body-card-details">
                        <div className="body-card-details-pt1">
                            <img src={selectedPokemon?.url_img} alt={selectedPokemon.name} />
                            <div className="pokemon-info-power">
                                <p>
                                    <img src="Hp.png" alt="Imagen hp" />
                                    <progress 
                                        id="hp" 
                                        value={selectedPokemon?.hp || 0} 
                                        max={stats.find(stat => stat.name === 'HP')?.max_value || 100}
                                        style={{ '--pokemon-progress-color': selectedPokemon?.color ? `var(--pokemon-color-${selectedPokemon?.color})` : 'var(--pokemon-color-black)' }}
                                    />
                                    <span>{`${selectedPokemon?.hp}/${stats.find(stat => stat.name === 'HP')?.max_value || 100}`}</span>
                                </p>
                                <p>
                                    <img src="Attack.png" alt="Imagen attack" />
                                    <progress 
                                        id="attack" 
                                        value={selectedPokemon?.attack || 0} 
                                        max={stats.find(stat => stat.name === 'Attack')?.max_value || 100}
                                        style={{ '--pokemon-progress-color': selectedPokemon?.color ? `var(--pokemon-color-${selectedPokemon?.color})` : 'var(--pokemon-color-black)' }}
                                    />
                                    <span>{`${selectedPokemon?.attack}/${stats.find(stat => stat.name === 'Attack')?.max_value || 100}`}</span>
                                </p>
                                <p>
                                    <img src="Defense.png" alt="Imagen defense" />
                                    <progress 
                                        id="defense" 
                                        value={selectedPokemon?.defense || 0} 
                                        max={stats.find(stat => stat.name === 'Defense')?.max_value || 100}
                                        style={{ '--pokemon-progress-color': selectedPokemon?.color ? `var(--pokemon-color-${selectedPokemon?.color})` : 'var(--pokemon-color-black)' }}
                                    />
                                    <span>{`${selectedPokemon?.defense}/${stats.find(stat => stat.name === 'Defense')?.max_value || 100}`}</span>
                                </p>
                                <p>
                                    <img src="Special-Attack.png" alt="Imagen special attack" />
                                    <progress 
                                        id="special-attack" 
                                        value={selectedPokemon?.special_attack || 0} 
                                        max={stats.find(stat => stat.name === 'Special Attack')?.max_value || 100}
                                        style={{ '--pokemon-progress-color': selectedPokemon?.color ? `var(--pokemon-color-${selectedPokemon?.color})` : 'var(--pokemon-color-black)' }}
                                    />
                                    <span>{`${selectedPokemon?.special_attack}/${stats.find(stat => stat.name === 'Special Attack')?.max_value || 100}`}</span>
                                </p>
                                <p>
                                    <img src="Special-Defense.png" alt="Imagen special defense" />
                                    <progress 
                                        id="special-defense" 
                                        value={selectedPokemon?.special_defense || 0} 
                                        max={stats.find(stat => stat.name === 'Special Defense')?.max_value || 100}
                                        style={{ '--pokemon-progress-color': selectedPokemon?.color ? `var(--pokemon-color-${selectedPokemon?.color})` : 'var(--pokemon-color-black)' }}
                                    />
                                    <span>{`${selectedPokemon?.special_defense}/${stats.find(stat => stat.name === 'Special Defense')?.max_value || 100}`}</span>
                                </p>
                                <p>
                                    <img src="Speed.png" alt="Imagen speed" />
                                    <progress 
                                        id="speed" 
                                        value={selectedPokemon?.speed || 0} 
                                        max={stats.find(stat => stat.name === 'Speed')?.max_value || 100}
                                        style={{ '--pokemon-progress-color': selectedPokemon?.color ? `var(--pokemon-color-${selectedPokemon?.color})` : 'var(--pokemon-color-black)' }}
                                    />
                                    <span>{`${selectedPokemon?.speed}/${stats.find(stat => stat.name === 'Speed')?.max_value || 100}`}</span>
                                </p>
                            </div>
                            <div className="pokemon-info">
                                <h4>Habitat</h4>
                                <p>{selectedPokemon?.habitat}</p>
                                <h4>Color</h4>
                                <p>{selectedPokemon?.color}</p>
                                <h4>Types</h4>
                                <div className="types-pokemon-card">
                                    {selectedPokemon?.types?.map((type, key) => (
                                        <span key={key} style={type ? {backgroundColor: `var(--pokemon-type-${type})`} : {backgroundColor: 'var(--pokemon-type-black)'}}>
                                            {type}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="body-card-details-pt2">
                            <div className="card-details-abilitys">
                                <h4>Habilidades: </h4>
                                <div className="items-details-ability">
                                    {selectedPokemon?.abilities
                                        ?.sort((a, b) => a.slot - b.slot)
                                        .map((ability, key) => (
                                            <p key={key}>{ability?.name} <span>{ability?.is_hidden ? '(Habilidad oculta)' : ''}</span></p>
                                    ))}
                                </div>
                            </div>
                            <div className="card-details-moves">
                                <h4>Movimientos</h4>
                                <div className="items-details-moves">
                                    {selectedPokemon?.moves?.map((move, key) => (
                                        <span key={key}>{move}</span>
                                    ))} 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-arrow">
                        <button onClick={() => handleChangePokemon(currentPokemon + 1)}>
                            <div className="arrow-right"/>
                        </button>
                    </div>
                </div>
            </div>
        </div> 
    );
};

PokemonDetails.propTypes = {
    closeModal: PropTypes.func.isRequired,
    pokemonId: PropTypes.number.isRequired,
};

export default PokemonDetails;
