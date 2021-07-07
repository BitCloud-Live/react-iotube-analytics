const Reducer = (state, action) => {
    switch (action.type) {
        case 'USE_ETHEREUM':
            return {
                ...state,
                network: 'ethereum'
            };
        case 'USE_BSC':
            return {
                ...state,
                network: 'bsc'
            };
        case 'USE_POLYGON':
            return {
                ...state,
                network: 'polygon'
            };
        default:
            return state;
    }
};

export default Reducer;