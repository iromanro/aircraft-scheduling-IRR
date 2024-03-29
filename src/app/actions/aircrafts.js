import axios from 'axios';

export const getAircrafts = () => async (dispatch) => {
  try {
    dispatch({
      type: 'REQUEST_AIRCRAFTS',
      requestedAt: Date.now(),
    });

    const result = await axios.get(
      'https://recruiting-assessment.alphasights.com/api/aircrafts'
    );

    return dispatch({
      type: 'RECEIVE_AIRCRAFTS',
      receivedAt: Date.now(),
      data: result.data,
    });
  } catch (error) {
    dispatch({
      type: 'RECEIVE_AIRCRAFTS_ERROR',
      receivedAt: Date.now(),
      error,
    });
  }
};
