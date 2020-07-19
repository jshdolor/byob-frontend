import { Form } from 'react-bootstrap';
import { Fragment } from 'react';

const filterValues = {
    Brands: ['All', 'Datu Puti', 'Golden Fiesta', 'Jufran'],
    Types: ['All', 'Packaged', 'Refill'],
    'Price Range': ['All', '1-20', '21-40', '41-60', '61-80', '81-100'],
};

const Filter = () => (
    <div className='filter-container'>
        {Object.keys(filterValues).map((filter, filterKey) => {
            return (
                <Fragment>
                    <div className='byob-title byob-text-small'>{filter}</div>
                    {filterValues[filter].map((type, i) => (
                        <Form.Check
                            className='my-2 byob-text-small byob-text-secondary'
                            key={i}
                            name={filter}
                            type='radio'
                            label={`${type}`}
                        />
                    ))}
                    {filterKey < Object.keys(filterValues).length - 1 ? (
                        <hr></hr>
                    ) : (
                        ''
                    )}
                </Fragment>
            );
        })}
    </div>
);

export default Filter;
