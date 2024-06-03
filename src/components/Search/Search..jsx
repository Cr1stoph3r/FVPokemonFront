import PropTypes from 'prop-types';
import './style.css';

const Search = ({ onChange, value, viewType = 1, placeholder = 'Buscar por nombre' }) => {
    return (
        <div className="div-main">
            <input
                className={`input-search view-type-${viewType}`}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            />
            <img
                className={`search-icon-img view-type-${viewType}`}
                src='SearchIcon.svg'
                alt="Icono de buscar"
            />
        </div>
    );
};

Search.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    viewType: PropTypes.number,
    placeholder: PropTypes.string,
};

export default Search;
