import { useDispatch, useSelector } from 'react-redux';

import { getFlights } from '../../app/actions/flights';
import { selectAircraft } from '../../app/actions/scheduler';

export default function AircraftList({ aircrafts }) {
  const { scheduleFlights } = useSelector(({ scheduler }) => scheduler);
  const dispatch = useDispatch();

  const handleSelectAircraft = (aircraft) => () => {
    dispatch(selectAircraft(aircraft));

    if (scheduleFlights.length === 0) dispatch(getFlights());
  };

  return (
    <div className="my-2 overflow-scroll">
      {aircrafts?.map((aircraft) => (
        <div
          className="flex justify-between items-center p-2 my-1 border-2 cursor-pointer hover:bg-slate-200"
          onClick={handleSelectAircraft(aircraft)}
        >
          <div className="flex items-center">
            <div className="p-1 mr-2 bg-blue-400 rounded-lg">
              {aircraft.ident}
            </div>
            <div>{aircraft.type}</div>
            <div className="ml-2 font-bold">{aircraft.economySeats} seats</div>
          </div>
          <div className="ml-2 justify-self-end font-bold">{aircraft.base}</div>
        </div>
      ))}
    </div>
  );
}
