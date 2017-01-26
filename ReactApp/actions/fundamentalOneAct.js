//gets the details for one specific stock;
import axios from 'axios';
export function getFund(stock) {
    return function(dispatch) {
        axios.get('https://yorview.herokuapp.com/api/fundamentals/' + stock)
        .then((response) => {
            dispatch({
                type: "FETCH_STOCK_FULFILLED",
                payload: response.data
            })
        }).catch((err) => {
            if (err.response && error.response.data) {
                dispatch({
                    type: "FETCH_STOCK_REJECTED",
                    payload: error.response.data.message
                });
            } else {
                this.setState({
                    type: "FETCH_STOCK_REJECTED",
                    payload: error.message
                })
            }
        })
    }
}