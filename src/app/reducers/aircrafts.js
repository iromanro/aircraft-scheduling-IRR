const aircraftsInitialState = {
  aircrafts: [],
};

export function aircrafts(state = aircraftsInitialState, action) {
  switch (action.type) {
    case 'REQUEST_AIRCRAFTS': {
      return {
        ...state,
        aircraftsRequestedAt: action.requestedAt,
        aircraftsIsFetching: true,
      };
    }
    case 'RECEIVE_AIRCRAFTS': {
      const { data: aircrafts } = action;

      return {
        ...state,
        aircraftsReceivedAt: action.receivedAt,
        aircraftsIsFetching: false,
        aircrafts,
      };
    }
    case 'RECEIVE_AIRCRAFTS_ERROR': {
      return {
        ...state,
        aircraftsReceivedAt: action.receivedAt,
        aircraftsIsFetching: false,
        aircraftsError: action.error,
      };
    }
    default:
      return state;
  }
}
