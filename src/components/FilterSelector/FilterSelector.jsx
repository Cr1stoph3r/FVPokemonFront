import { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const FilterSelector = ({ filters = [], selectedFilter, onChange }) => {
    const [expanded, setExpanded] = useState(false);

    const handleFilterClick = (filterId) => {
        onChange(filterId);
        setExpanded(false); // Cerrar la lista después de seleccionar un filtro
    };

    const toggleExpansion = () => {
        setExpanded(!expanded);
    };

    return (
        <div className='container-filter-selector'>
            <div className="head-filter-selector" onClick={toggleExpansion}>
                <h3>{selectedFilter ? 'Ordenado por: ' : 'Ordenar por: '}<span>{selectedFilter && `${filters.find(filter => filter.id === selectedFilter)?.name}`}</span></h3>
                <div className={`arrow-filter-selector ${expanded ? 'up' : ''}`}></div>
            </div>
            <div className={`body-filter-selector ${expanded ? 'expanded' : ''}`}>
                {filters.map(filter => (
                    <div key={filter.id} className={`filter-item ${selectedFilter === filter.id ? 'selected' : ''}`} onClick={() => handleFilterClick(filter.id)}>
                        <span>{filter.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

FilterSelector.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string.isRequired,
        max_value: PropTypes.number
    })),
    selectedFilter: PropTypes.number,
    onChange: PropTypes.func.isRequired
};

export default FilterSelector;
