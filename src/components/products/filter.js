import { Form } from 'react-bootstrap';

const brands = ['all', 'datu puti', 'golden fiesta', 'jufran'];
const types = ['all', 'packaged', 'refill'];
const priceRange = ['all', '1-20', '21-40', '41-60', '61-80', '81-100'];

const filter = () => (
    <div className='filter-container'>
        <div>Types</div>
        {types.map((type, i) => (
            <Form.Check
                className='byob-text-small'
                key={i}
                name='types'
                type='radio'
                label={`${type}`}
            />
        ))}
        <hr></hr>
        <div>Brands</div>
        {brands.map((brand, i) => (
            <Form.Check
                className='byob-text-small'
                key={i}
                name='brands'
                type='radio'
                label={`${brand}`}
            />
        ))}
        <hr></hr>
        <div>Price Range</div>
        {priceRange.map((priceR, i) => (
            <Form.Check
                className='byob-text-small'
                key={i}
                name='priceRange'
                type='radio'
                label={`${priceR}`}
            />
        ))}
    </div>
);

export default filter;
