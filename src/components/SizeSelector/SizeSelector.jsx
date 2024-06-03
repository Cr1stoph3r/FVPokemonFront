import PropTypes from 'prop-types';
import './style.css';

const SizeSelector = ({ onChange, value }) => {
  return (
    <div className="div-size-selector">
      <span className="span-1">Mostrar</span>
      <select value={value} onChange={onChange}>
        <option value={4}>4</option>
        <option value={8}>8</option>
        <option value={12}>12</option>
        <option value={16}>16</option>
        <option value={20}>20</option>
      </select>
      <span className="span-2">elementos</span>
    </div>
  );
}

SizeSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default SizeSelector;