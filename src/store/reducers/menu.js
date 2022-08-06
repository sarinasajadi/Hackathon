import * as actionType from '../actions';

const initialState= {
    menuItem: [],
}

const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_TO_MENU:
            const arrIndex = state.menuItem.findIndex(item => String(item.key) === String(action.id));
            if (arrIndex >= 0) {
                const newArr = [...state.menuItem];
                newArr[arrIndex].label = action.value;
                return {
                    ...state,
                    menuItem: newArr,
                }  
            }
            return {
                ...state,
                menuItem: state.menuItem.concat({key: action.id, label: action.value}),
            }
        case actionType.REMOVE_FROM_MENU:
            const newArr = state.menuItem.filter(item => item.key !== action.id);
            return {
                ...state,
                menuItem: newArr,
            }     
    }
    return state;
}

export default menuReducer;
