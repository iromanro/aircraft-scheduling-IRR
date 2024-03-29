import axios from 'axios';

export const getFlights = () => async (dispatch) => {
  try {
    dispatch({
      type: 'REQUEST_FLIGHTS',
      requestedAt: Date.now(),
    });

    const result = await axios.get(
      `https://recruiting-assessment.alphasights.com/api/flights/`
    );

    return dispatch({
      type: 'RECEIVE_FLIGHTS',
      receivedAt: Date.now(),
      data: result.data,
    });
  } catch (error) {
    dispatch({
      type: 'RECEIVE_FLIGHTS_ERROR',
      receivedAt: Date.now(),
      error,
    });
  }
};

export const updateFlights = (schedule) => (dispatch) => {
  dispatch({
    type: 'UPDATE_FLIGHTS',
    schedule,
  });
};
