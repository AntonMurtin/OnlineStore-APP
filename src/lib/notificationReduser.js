export const notificationReduser = (state, action) => {
    switch (action.type) {
        case 'ADD_NOTIFICATION':
            return [...state, { ...action.payload }];

        case 'REMOVE_NOTIFICATION':
            return state.filter(x => x.id !== action.id);

        default:
            return state;
    }
}