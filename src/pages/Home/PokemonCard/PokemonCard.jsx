import PropTypes from 'prop-types';
import './style.css';



const PokemonCard = ({ pokemon, stats = [], handleSelectPokemon }) => {
    const { id, name, url_img, hp, attack, defense, color, types } = pokemon;

    const maxHp = stats.find(stat => stat.name === 'HP')?.max_value || 100;
    const maxAttack = stats.find(stat => stat.name === 'Attack')?.max_value || 100;
    const maxDefense = stats.find(stat => stat.name === 'Defense')?.max_value || 100;

    return (
        <div className='container-pokemon-card'>
            <div className='img-pokemon-card' style={color ? {backgroundColor: `var(--pokemon-color-${color})`} : {backgroundColor: 'var(--pokemon-background-black)'}}>
                <img src={url_img} alt="imagen pokemon"/>
                <div className="overlay">
                    <button onClick={() => handleSelectPokemon(id)}>Ver más</button>
                </div>
            </div>
            <div className="details-pokemon-card">
                <h2 style={color ? {color: `var(--pokemon-color-${color})`} : {color: 'var(--pokemon-color-black)'}}>{name}</h2>
                <p>HP: 
                    <progress 
                        id="hp" 
                        value={hp} 
                        max={maxHp}
                        style={{ '--pokemon-progress-color': color ? `var(--pokemon-color-${color})` : 'var(--pokemon-color-black)' }}
                    />
                    <span>{`${hp}/${maxHp}`}</span>
                </p>                
                <p>Attack: 
                    <progress 
                        id="attack" 
                        value={attack} 
                        max={maxAttack}
                        style={{ '--pokemon-progress-color': color ? `var(--pokemon-color-${color})` : 'var(--pokemon-color-black)' }}
                    />
                    <span>{`${attack}/${maxAttack}`}</span>
                </p>
                <p>Defense: 
                    <progress 
                        id="defense" 
                        value={defense} 
                        max={maxDefense}
                        style={{ '--pokemon-progress-color': color ? `var(--pokemon-color-${color})` : 'var(--pokemon-color-black)' }}
                    />
                    <span>{`${defense}/${maxDefense}`}</span>
                </p>
                <div className="types-pokemon-card">
                    {types?.map((type, key) => (
                        <span key={key} style={type ? {backgroundColor: `var(--pokemon-type-${type})`} : {backgroundColor: 'var(--pokemon-type-black)'}}>
                            {type}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};


PokemonCard.propTypes = {
    pokemon: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        url_img: PropTypes.string,
        hp: PropTypes.number,
        attack: PropTypes.number,
        defense: PropTypes.number,
        color: PropTypes.string,
        types: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    stats: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        max_value: PropTypes.number,
    })),
    handleSelectPokemon: PropTypes.func,
};

export default PokemonCard;
