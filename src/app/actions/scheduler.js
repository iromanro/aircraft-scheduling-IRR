import axios from 'axios';
import { aircrafts } from '../reducers/aircrafts';

export const selectDate = (date) => (dispatch) => {
  dispatch({
    type: 'SELECT_DATE',
    date,
  });
};

export const selectAircraft = (aircraft) => (dispatch) => {
  dispatch({
    type: 'SELECT_AIRCRAFT',
    aircraft,
  });
};

export const unselectAircraft = (aircraft) => (dispatch) => {
  dispatch({
    type: 'UNSELECT_AIRCRAFT',
    aircraft,
  });
};

export const addFlightToSchedule = (flight) => (dispatch, getState) => {
  const {
    flights: { availableFlights },
  } = getState();

  dispatch({
    type: 'ADD_FLIGHT',
    availableFlights,
    flight,
  });
};

export const removeFlightFromSchedule = (flight) => (dispatch, getState) => {
  const {
    flights: { availableFlights },
    scheduler: { scheduleFlights },
  } = getState();

  return dispatch({
    type: 'REMOVE_FLIGHT',
    availableFlights,
    scheduleFlights,
    flight,
  });
};
