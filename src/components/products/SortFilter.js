const dynamicSort = (property) => {
    let sortOrder = 1;
    if (property[0] === '-') {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        let result =
            a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
    };
};

const SortFilter = ({ products, handle }) => {
    const handleChange = (e) => {
        const sortType = e.target.value;

        let sorted = products;
        switch (sortType) {
            case '0':
                sorted = products.sort(dynamicSort('id'));
                break;
            case '1':
                sorted = products.sort(dynamicSort('-average_ratings'));
                break;
            case '2':
                sorted = products.sort(dynamicSort('price'));
                break;
            case '3':
                sorted = products.sort(dynamicSort('-price'));
                break;
        }
        handle([...sorted]);
    };

    return (
        <select className='form-control' onChange={handleChange}>
            <option value='1'>Popularity</option>
            <option value='2'>Price: Low - High</option>
            <option value='3'>Price: High - Low</option>
        </select>
    );
};

export default SortFilter;
