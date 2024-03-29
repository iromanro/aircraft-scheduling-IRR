import { useDispatch } from 'react-redux';

import { Icon } from '@iconify/react';

import {
  addFlightToSchedule,
  removeFlightFromSchedule,
} from '../../app/actions/scheduler';
import { updateFlights } from '../../app/actions/flights';

export default function FlightList({ flights, removable = false }) {
  const dispatch = useDispatch();

  const handleSelectFlight = (flight) => () => {
    dispatch(addFlightToSchedule(flight));
  };

  const handleRemoveFlight = (flight) => async () => {
    const result = await dispatch(removeFlightFromSchedule(flight));
    const { scheduleFlights } = result;

    if (scheduleFlights) dispatch(updateFlights(scheduleFlights));
  };

  return (
    <div className="my-2 max-h-[360px] overflow-scroll">
      {flights?.map((flight) => (
        <div className="relative group">
          {removable && (
            <div
              className="hidden items-center justify-center absolute bg-red-500 h-[108px] w-full group-hover:flex group-hover:cursor-pointer z-10 text-3xl"
              onClick={handleRemoveFlight(flight)}
            >
              Remove
            </div>
          )}
          <div
            className={`flex flex-col justify-between  p-2 my-1 border-2 cursor-pointer hover:bg-slate-200 ${
              removable && 'bg-green-500'
            }`}
            onClick={handleSelectFlight(flight)}
          >
            <div className="flex flex-row justify-between">
              <div className="p-1 mr-2 text-xs">Flight #{flight.ident}</div>
            </div>
            <div className="flex justify-between items-center p-1">
              <div className="min-w-[80px]">
                <div className="text-2xl font-bold">{flight.origin}</div>
                <div>{flight.readable_departure}</div>
              </div>
              <Icon
                icon="ion:airplane"
                width={48}
                className="relative bottom-2.5"
              />
              <div className="min-w-[80px]">
                <div className="text-2xl font-bold text-end">
                  {flight.destination}
                </div>
                <div className="text-end">{flight.readable_arrival}</div>
              </div>
            </div>
            <div className="ml-2 justify-self-end font-bold">{flight.base}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
