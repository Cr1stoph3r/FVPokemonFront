import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import CheckboxGroup from '../../components/CheckboxGroup/CheckboxGroup';
import { useGetHabitatsSelect } from '../../rquery/queries/habitats';
import { useGetTypesSelect } from '../../rquery/queries/types';
import FilterSelector from '../../components/FilterSelector/FilterSelector';
import { useGetStatsSelect } from '../../rquery/queries/stats';
import Search from '../../components/Search/Search.';

const Filters = ({ isActive, closeFilters, buttonRef, setFilters, filters }) => {
    const filtersRef = useRef();
    const { data: stats = [] } = useGetStatsSelect({ options: { enabled: true } });
    const { data: habitats } = useGetHabitatsSelect({});
    const { data: types } = useGetTypesSelect({});

    const [selectedTypes, setSelectedTypes] = useState(filters?.types || []);
    const [selectedHabitats, setSelectedHabitats] = useState(filters?.habitats || []);
    const [selectedStat, setSelectedStat] = useState(filters?.orderBy || null);
    const [order, setOrder] = useState(filters?.order || 'asc');

    useEffect(() => {
        setFilters({ types: selectedTypes, habitats: selectedHabitats, orderBy: selectedStat, order });
    }, [selectedTypes, selectedHabitats, selectedStat, order, setFilters]);

    const handleOrderChange = useCallback((newOrder) => {
        setOrder(newOrder);
    }, []);

    const habitatsWithUniqueIds = habitats?.map(habitat => ({ ...habitat, id: `habitat-${habitat.id}` }));
    const typesWithUniqueIds = types?.map(type => ({ ...type, id: `type-${type.id}` }));

    const [statsList, setStatsList] = useState([]);

    useEffect(() => {
        const newStatsList = stats?.map(stat => ({ id: stat.name, name: stat.name }));
        newStatsList.unshift({ id: null, name: 'Ninguno' });

        setStatsList(newStatsList);
    }, [stats]);

    const className = `container-pokemon-filters ${isActive ? 'open' : ''}`;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!buttonRef.current.contains(event.target) && filtersRef.current && !filtersRef.current.contains(event.target)) {
                closeFilters();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeFilters, buttonRef]);

    const handleResetFilters = () => {
        setSelectedTypes([]);
        setSelectedHabitats([]);
        setSelectedStat(null);
        setOrder('asc');
    };

    return (
        <div ref={filtersRef} className={className}>
            <CheckboxGroup
                title='Habitats'
                filters={habitatsWithUniqueIds}
                selectedFilters={selectedHabitats}
                onChange={setSelectedHabitats}
                name='habitats'
            />
            <CheckboxGroup
                title='Tipos'
                filters={typesWithUniqueIds}
                selectedFilters={selectedTypes}
                onChange={setSelectedTypes}
                name='types'
            />
            <FilterSelector filters={statsList} selectedFilter={selectedStat} onChange={setSelectedStat} />
            <div className="buttons-order-filter">
                <h3>Tipo de orden</h3>
                <div className="container-buttons-order">
                    <button
                        className={order === 'asc' ? 'selected' : ''}
                        onClick={() => handleOrderChange('asc')}
                    >
                        Ascendente
                    </button>
                    <button
                        className={order === 'desc' ? 'selected' : ''}
                        onClick={() => handleOrderChange('desc')}
                    >
                        Descendente
                    </button>
                </div>
            </div>
            <div className="button-reset-filter">
                <button onClick={handleResetFilters}>
                    Resetear filtros
                </button>
            </div>
        </div>
    );
};


Filters.propTypes = {
    isActive: PropTypes.bool.isRequired,
    closeFilters: PropTypes.func.isRequired,
    buttonRef: PropTypes.object.isRequired,
    setFilters: PropTypes.func.isRequired,
    filters: PropTypes.shape({
        habitats: PropTypes.arrayOf(PropTypes.string),
        types: PropTypes.arrayOf(PropTypes.string),
        orderBy: PropTypes.string,
        order: PropTypes.string,
    }),
};

const PokemonFilters = ({ filters = [] ,setFilters, searchValue, setSearchValue }) => {
    const [showFilters, setShowFilters] = useState(false);
    const buttonRef = useRef();

    const handleToggleFilters = () => {
        setShowFilters(prev => !prev);
    };

    const handleCloseFilters = () => {
        setShowFilters(false);
    };

    return (
        <div className='container-options-filters'>
            <img src="filter.svg" alt="Filtro img" className='pokemon-filters' onClick={handleToggleFilters} ref={buttonRef} />
            <Search value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            <Filters isActive={showFilters} closeFilters={handleCloseFilters} buttonRef={buttonRef} filters={filters} setFilters={setFilters} />
        </div>
    );
};

PokemonFilters.propTypes = {
    filters: PropTypes.shape({
        habitats: PropTypes.arrayOf(PropTypes.string),
        types: PropTypes.arrayOf(PropTypes.string ),
    }),
    setFilters: PropTypes.func.isRequired,
    searchValue: PropTypes.string,
    setSearchValue: PropTypes.func.isRequired,
};

export default PokemonFilters;
