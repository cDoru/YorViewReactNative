function getHis(state={
	past:'',
	fetching: false,
	fetched: false,
	error: null,
}, action) {
	switch(action.type) {
		case "FETCH_HIST": {
			return {...state,fetching: true}
		}
		case "FETCH_HIST_REJECTED": {
			return {...state,fetching:false, error: action.payload}
		}
		case "FETCH_HIST_FULFILLED": {
			return {
				...state,
				fetching: false,
				fetched: true,
				past: action.payload,
			}
		}
	}
      return state
}
export default getHis