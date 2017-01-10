'use strict';
export default function tradeReducer(state = 10000, action) {
    switch (action.type) {
        case 'PORT_INC':
            return state + action.count;
        case 'PORT_DECR':
            return state  - action.count;
        default:
            return state;
    }
}