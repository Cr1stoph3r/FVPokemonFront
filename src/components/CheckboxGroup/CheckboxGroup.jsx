    import { useState } from 'react';
    import PropTypes from 'prop-types';
    import './style.css';

    const CheckboxGroup = ({ filters = [], selectedFilters, onChange, title }) => {
        const [expanded, setExpanded] = useState(false);

        const toggleExpansion = () => {
            setExpanded(!expanded);
        };

        const handleDivClick = (filterId) => {
            onChange(selectedFilters.includes(filterId) ? 
            selectedFilters.filter(item => item !== filterId) : 
            [...selectedFilters, filterId]);
        };

        return (
            <div className='container-checkbox-group'>
                <div className="head-checkbox-group" onClick={toggleExpansion}>
                    {title && <h3>{title}</h3>}
                    <div className={`arrow-checkbox-group ${expanded ? 'up' : ''}`} />
                </div>
                <div className={`body-checkbox-group ${expanded ? 'expanded' : ''}`}>
                    {filters.map((filter) => (
                        <div key={filter.id} className="checkbox-group" onClick={() => handleDivClick(filter.id)}>
                            <input
                                type="checkbox"
                                id={`checkbox-${filter.id}`}
                                value={filter.id}
                                checked={selectedFilters.includes(filter.id)}
                                readOnly
                            />
                            <label htmlFor={`checkbox-${filter.id}`}>{filter.name}</label>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    CheckboxGroup.propTypes = {
        filters: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })),
        selectedFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
        onChange: PropTypes.func.isRequired,
        title: PropTypes.string,
    };

    export default CheckboxGroup;
