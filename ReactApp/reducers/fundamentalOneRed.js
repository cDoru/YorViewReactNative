function getFund(state={
	stocks:'',
	fetching: false,
	fetched: false,
	error: null,
}, action) {
	switch(action.type) {
		case "FETCH_STOCK": {
			return {...state,fetching: true}
		}
		case "FETCH_STOCK_REJECTED": {
			return {...state,fetching:false, error: action.payload}
		}
		case "FETCH_STOCK_FULFILLED": {
			return {
				...state,
				fetching: false,
				fetched: true,
				stocks: action.payload,
			}
		}
	}
      return state
}
export default getFund