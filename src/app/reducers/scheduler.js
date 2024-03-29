const aircraftsInitialState = {
  scheduleAircraft: null,
  scheduleDate: null,
  scheduleFlights: [],
  scheduleTimeline: [],
  utilization: 0,
};

export function scheduler(state = aircraftsInitialState, action) {
  switch (action.type) {
    case 'SELECT_DATE': {
      return {
        ...state,
        scheduleDate: action.date,
      };
    }
    case 'SELECT_AIRCRAFT': {
      return {
        ...state,
        scheduleAircraft: action.aircraft,
      };
    }
    case 'UNSELECT_AIRCRAFT': {
      return {
        ...state,
        scheduleAircraft: null,
      };
    }
    case 'ADD_FLIGHT': {
      const {
        scheduleFlights,
        scheduleTimeline,
        utilization: currentUtilization,
      } = state;
      const { flight } = action;
      const duration = flight.arrivaltime - flight.departuretime + 1200;
      const idleTime =
        scheduleFlights.length === 0
          ? flight.departuretime
          : flight.departuretime -
            scheduleTimeline[scheduleTimeline.length - 1].departuretime;

      scheduleTimeline.push({
        color: 'bg-gray-500',
        percent: Math.floor((idleTime / 86400) * 100),
      });
      scheduleTimeline.push({
        color: 'bg-green-500',
        percent: Math.floor(
          ((flight.arrivaltime - flight.departuretime) / 86400) * 100
        ),
        ident: flight.ident,
        duration,
      });
      scheduleTimeline.push({
        color: 'bg-purple-500',
        percent: 1,
        departuretime: flight.arrivaltime + 1200,
      });

      scheduleFlights.push(flight);
      const updatedUtilization = currentUtilization + duration;

      return {
        ...state,
        scheduleFlights,
        scheduleTimeline,
        utilization: updatedUtilization,
      };
    }
    case 'REMOVE_FLIGHT': {
      const { scheduleFlights, scheduleTimeline } = state;
      const { flight } = action;
      const flightIdx = scheduleFlights.indexOf(flight);
      let utilization = 0;
      scheduleFlights.length = flightIdx;

      // Update the timeline and also keep turnaround time
      if (scheduleFlights.length > 0) {
        // TODO: Update util amount
        const timelineIdx = scheduleTimeline.findIndex(
          (item) =>
            item.ident === scheduleFlights[scheduleFlights.length - 1].ident
        );
        scheduleTimeline.length = timelineIdx + 2;
        scheduleTimeline.forEach(
          (item) => (utilization += item?.duration || 0)
        );
      } else {
        scheduleTimeline.length = 0;
      }

      return {
        ...state,
        utilization,
      };
    }
    default:
      return state;
  }
}
