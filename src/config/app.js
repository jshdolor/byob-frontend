module.exports = {
    bottlePerMl: 500,
    amountPrecision: 2,
    bottlePrice: 20,
    refillableOptions: [
        {
            value: 250,
            text: '250ml',
        },
        {
            value: 500,
            text: '500ml',
        },
        {
            value: 1000,
            text: '1L',
        },
        {
            value: 2000,
            text: '2L',
        },
    ],
    defaultRefillableValue: 250,
    orderHistoryProductShow: 2,
    availableLockers: 15,
    itemsPerLocker: 10,
};
