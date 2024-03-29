const flightsInitialState = {
  allFlights: [],
  availableFlights: [],
  futureFlights: [],
};

export function flights(state = flightsInitialState, action) {
  switch (action.type) {
    case 'REQUEST_FLIGHTS': {
      return {
        ...state,
        flightsRequestedAt: action.requestedAt,
        flightsIsFetching: true,
      };
    }
    case 'RECEIVE_FLIGHTS': {
      const { data: flights } = action;

      const orderedFlights = flights.sort(
        (a, b) => a.departuretime - b.departuretime
      );

      return {
        ...state,
        flightsReceivedAt: action.receivedAt,
        flightsIsFetching: false,
        allFlights: orderedFlights,
        availableFlights: orderedFlights,
      };
    }
    case 'RECEIVE_FLIGHTS_ERROR': {
      return {
        ...state,
        flightsReceivedAt: action.receivedAt,
        flightsIsFetching: false,
        flightsError: action.error,
      };
    }
    case 'ADD_FLIGHT': {
      const { allFlights } = state;
      const { flight: latestFlight } = action;

      const futureFlights = allFlights.filter(
        (flight) =>
          latestFlight.destination === flight.origin &&
          flight.departuretime >= latestFlight.arrivaltime + 1200
      );

      return {
        ...state,
        availableFlights: futureFlights,
      };
    }
    case 'UNSELECT_AIRCRAFT': {
      return {
        ...state,
      };
    }
    case 'UPDATE_FLIGHTS': {
      const { allFlights } = state;
      const { schedule } = action;
      const latestFlight = schedule[schedule.length - 1];
      let futureFlights;

      if (latestFlight) {
        futureFlights = allFlights.filter(
          (flight) =>
            latestFlight.destination === flight.origin &&
            flight.departuretime >= latestFlight.arrivaltime + 1200
        );
      } else {
        futureFlights = allFlights;
      }

      return {
        ...state,
        availableFlights: futureFlights,
      };
    }
    default:
      return state;
  }
}
