import { Form, Checkbox, Collapse } from 'antd';
import { useState, useEffect, Fragment } from 'react';
import ProductsService from '~/services/Product';

const sortFilters = (a, b) => {
    const sortA = a.sort;
    const sortB = b.sort;

    if (sortA > sortB) {
        return 1;
    } else if (sortA < sortB) {
        return -1;
    }
    return 0;
};

const Filter = () => {
    const [filterValues, setFilterValues] = useState({
        Brands: [],
        Types: [],
        'Price Range': [],
    });

    useEffect(() => {
        (async () => {
            const products = await ProductsService.getAll();

            const filters = {
                Type: products
                    .map((o) => o['type'])
                    .filter(
                        (thing, index, self) =>
                            index === self.findIndex((t) => t.id === thing.id)
                    ),
                Brand: products
                    .map((o) => o['brand'])
                    .filter(
                        (thing, index, self) =>
                            index === self.findIndex((t) => t.id === thing.id)
                    )
                    .sort(sortFilters),
                'Product Category': products
                    .map((o) => o['category'])
                    .filter(
                        (thing, index, self) =>
                            index === self.findIndex((t) => t.id === thing.id)
                    )
                    .sort(sortFilters),
            };

            setFilterValues(filters);
        })();
    }, []);

    return (
        <div className='filter-container'>
            {Object.keys(filterValues).map((filter, filterKey) => {
                return (
                    <Fragment key={filterKey}>
                        <div
                            key={filterKey}
                            className='byob-title byob-text-small'
                        >
                            {filter}
                        </div>
                        {filterValues[filter].map((type, i) => (
                            <Form.Item key={i}>
                                <Checkbox name={filter}>
                                    <span className='byob-text-small byob-text-secondary'>
                                        {type.name}
                                    </span>
                                </Checkbox>
                            </Form.Item>
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
};

export default Filter;
