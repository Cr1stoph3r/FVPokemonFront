import PropTypes from 'prop-types';
import './Pagination.css';

const getPaginationNumbers = (currentPage, totalPages) => {
    const numbers = [];

    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
            numbers.push(i);
        }
    } else {
        numbers.push(1);
        if (currentPage <= 4) {
            for (let i = 2; i <= 5; i++) {
                numbers.push(i);
            }
            numbers.push('...');
        } else if (currentPage >= totalPages - 3) {
            numbers.push('...');
            for (let i = totalPages - 4; i <= totalPages - 1; i++) {
                numbers.push(i);
            }
        } else {
            numbers.push('...');
            for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                numbers.push(i);
            }
            numbers.push('...');
        }
        numbers.push(totalPages);
    }

    return numbers;
}

const Pagination = ({ currentPage, totalPages, totalItems, ITEMS_PER_PAGE, onChangePage }) => {
    const firstItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const lastItem = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);
    return (
        <div className="pagination-container">
            <div className="pagination-info">
                {totalItems > 0 ? (
                    <p>Mostrando registros del {firstItem} al {lastItem} de un total de {totalItems} registros.</p>
                ) : (
                    <p>Sin registros</p>
                )}
            </div>
            <div className="pagination-controls">
                {totalPages > 1 && (
                    <>
                        <button 
                            className="pagination-button" 
                            onClick={() => currentPage > 1 && onChangePage(currentPage - 1)}>
                            Anterior
                        </button>
                        <div className="pagination-numbers">
                            {getPaginationNumbers(currentPage, totalPages).map((number, i) => (
                                <button 
                                    key={i} 
                                    className={`pagination-number ${number === currentPage ? 'active' : ''} ${number === '...' ? 'dots' : ''}`} 
                                    onClick={() => number !== '...' && onChangePage(number)}>
                                    {number}
                                </button>
                            ))}
                        </div>
                        <button 
                            className="pagination-button" 
                            onClick={() => currentPage < totalPages && onChangePage(currentPage + 1)}>
                            Siguiente
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

Pagination.propTypes = {
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    totalItems: PropTypes.number,
    ITEMS_PER_PAGE: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChangePage: PropTypes.func
}

export default Pagination;
