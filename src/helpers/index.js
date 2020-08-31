const isObject = (item) => {
    return item && typeof item === 'object' && !Array.isArray(item);
};

const mergeDeep = (target, source) => {
    let output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach((key) => {
            if (isObject(source[key])) {
                if (!(key in target))
                    Object.assign(output, {
                        [key]: source[key],
                    });
                else output[key] = mergeDeep(target[key], source[key]);
            } else {
                Object.assign(output, {
                    [key]: source[key],
                });
            }
        });
    }
    return output;
};

const distinctObjByColumn = (arr, uniqueField) => {
    return arr.filter(
        (thing, index, self) =>
            index ===
            self.findIndex((t) => t[uniqueField] === thing[uniqueField])
    );
};

const combineDistinctCartItems = (cart, item) => {
    const itemIsInCart = cart.find(
        (cartItem) => cartItem.product_id === item.product_id
    );

    if (itemIsInCart) {
        return cart.map((cartItem) => {
            if (cartItem.product_id === item.product_id) {
                cartItem.qty += item.qty;
            }
            return cartItem;
        });
    }

    return [...cart, item];
};

const validURL = (str) => {
    var pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$',
        'i'
    ); // fragment locator
    return !!pattern.test(str);
};

export { mergeDeep, distinctObjByColumn, combineDistinctCartItems, validURL };
