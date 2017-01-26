'use strict';
import axios from 'axios';
export function getHistorical(stock, number) {
    return function(dispatch) {
        let url = "https://yorview.herokuapp.com/api/historical/" +stock +"/" +number
        axios.get(url)
        .then((response) => {
            dispatch({
                type: "FETCH_HIST_FULFILLED",
                payload: response.data
            })
        }).catch((err) => {
            if (err.response && error.response.data) {
                dispatch({
                    type: "FETCH_HIST_REJECTED",
                    payload: error.response
                });
            } else {
                this.setState({
                    type: "FETCH_HIST_REJECTED",
                    payload: error.message
                })
            }
        })
    }
}