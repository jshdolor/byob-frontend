import { Form, Checkbox, Collapse } from 'antd';
import { useState, useEffect, Fragment } from 'react';

const { Panel } = Collapse;

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

let filters = [];

const Filter = ({ products, handle }) => {
    const handleFilter = (filter, type, e) => {
        const includeToFilters = e.target.checked;

        if (includeToFilters) {
            filters = [...filters, { [filter]: type }];
        } else {
            filters = filters.filter((f) => f[filter]?.id !== type.id);
        }

        if (filters.length > 0) {
            const filteredProducts = products
                .filter((product) => {
                    const types = filters
                        .map((f) => f['type']?.id)
                        .filter((d) => d);
                    if (types.length === 0) return true;

                    return types.find((data) => data === product.type.id);
                })
                .filter((product) => {
                    const brands = filters
                        .map((f) => f['brand']?.id)
                        .filter((d) => d);

                    if (brands.length === 0) return true;

                    return brands.find((data) => data === product.brand.id);
                })
                .filter((product) => {
                    const categories = filters
                        .map((f) => f['product category']?.id)
                        .filter((d) => d);

                    if (categories.length === 0) return true;

                    return categories.find(
                        (data) => data === product.category.id
                    );
                });

            handle(filteredProducts);
            return;
        }

        handle(products);
    };

    const [filterValues, setFilterValues] = useState({
        Brands: [],
        Types: [],
        'Price Range': [],
    });

    useEffect(() => {
        const groupedFilters = {
            Type: products
                .map((o) => o?.type)
                .filter(
                    (thing, index, self) =>
                        index === self.findIndex((t) => t.id === thing.id)
                ),
            Brand: products
                .map((o) => o?.brand)
                .filter(
                    (thing, index, self) =>
                        index === self.findIndex((t) => t.id === thing.id)
                )
                .sort(sortFilters),
            'Product Category': products
                .map((o) => o?.category)
                .filter(
                    (thing, index, self) =>
                        index === self.findIndex((t) => t.id === thing.id)
                )
                .sort(sortFilters),
        };

        setFilterValues(groupedFilters);
    }, [products]);

    return (
        <div className='filter-container'>
            <Collapse defaultActiveKey={['0', '1', '2']}>
                {Object.keys(filterValues).map((filter, filterKey) => {
                    return (
                        <Panel
                            key={filterKey}
                            className='byob-title byob-text-small'
                            header={filter}
                        >
                            {filterValues[filter].map((type, i) => (
                                <Form.Item key={i}>
                                    <Checkbox
                                        name={filter}
                                        onChange={(e) =>
                                            handleFilter(
                                                filter.toLowerCase(),
                                                type,
                                                e
                                            )
                                        }
                                    >
                                        <span className='byob-text-small byob-text-secondary'>
                                            {type.name}
                                        </span>
                                    </Checkbox>
                                </Form.Item>
                            ))}
                            {filterKey <
                            Object.keys(filterValues).length - 1 ? (
                                <hr></hr>
                            ) : (
                                ''
                            )}
                        </Panel>
                    );
                })}
            </Collapse>
        </div>
    );
};

export default Filter;
