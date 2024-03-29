import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './App.css';

import { getAircrafts } from './app/actions/aircrafts';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { selectDate, unselectAircraft } from './app/actions/scheduler';

import AircraftList from './components/aircraft_list/AircraftList';
import FlightList from './components/flight_list/FlightList';
import Spinner from './components/spinner/Spinner';

function App() {
  const dispatch = useDispatch();
  const { aircrafts, aircraftsIsFetching } = useSelector(
    ({ aircrafts }) => aircrafts
  );
  const { availableFlights, flightsIsFetching } = useSelector(
    ({ flights }) => flights
  );
  const {
    scheduleDate,
    scheduleAircraft,
    scheduleFlights,
    scheduleTimeline,
    utilization,
  } = useSelector(({ scheduler }) => scheduler);
  const aircraftUtilization = Math.floor((utilization / 86400) * 100);

  useEffect(() => {
    async function init() {
      dispatch(getAircrafts());
    }

    init();
  }, []);

  const handleDateChange = (date) => {
    dispatch(selectDate({ date }));
  };

  const handleRemoveAircraft = () => {
    dispatch(unselectAircraft());
  };

  const handleSave = () => {
    alert('Schedule saved');
    // TODO: Submit Schedule to BE
  };

  return (
    <div className="h-screen">
      <div className="container p-4 mx-auto mb-16">
        <div className="text-center">
          <h1>Aircraft Scheduler</h1>
        </div>
        <div className="flex flex-col lg:flex-row mt-4 justify-between items-center">
          <div className="flex flex-col items-center justify-center mt-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disablePast
                label="Select Date"
                onChange={handleDateChange}
              />
            </LocalizationProvider>
          </div>
          <div className="hidden lg:block">
            <Button
              variant="contained"
              className="h-[60px] w-[250px]"
              disabled={
                !(
                  scheduleDate &&
                  scheduleAircraft &&
                  scheduleFlights.length > 0
                )
              }
              onClick={handleSave}
            >
              Save schedule
            </Button>
          </div>
        </div>
        {aircraftsIsFetching ? (
          <Spinner />
        ) : (
          <div className="flex flex-col w-full mt-4">
            <h2>{scheduleAircraft ? 'Aircraft' : 'Aircrafts'}</h2>
            {scheduleAircraft ? (
              <div className="relative group">
                <div
                  className="hidden items-center justify-center absolute bg-red-500 h-[96px] w-full group-hover:flex group-hover:cursor-pointer z-10 text-xl"
                  onClick={handleRemoveAircraft}
                >
                  Change Aircraft
                </div>
                <div className="bg-slate-200 border-blue-200">
                  <div className="ml-2 pt-1 text-2xl font-bold">
                    {aircraftUtilization}% Utilization
                  </div>
                  <div className="flex justify-between items-center p-2 mb-1 border-2 cursor-pointer hover:bg-red-600">
                    <div className="flex items-center">
                      <div className="p-1 mr-2 bg-blue-400 rounded-lg">
                        {scheduleAircraft.ident}
                      </div>
                      <div>{scheduleAircraft.type}</div>
                      <div className="ml-2 font-bold">
                        {scheduleAircraft.economySeats} seats
                      </div>
                    </div>
                    <div className="ml-2 justify-self-end font-bold">
                      {scheduleAircraft.base}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <AircraftList aircrafts={aircrafts} />
            )}
          </div>
        )}
        <div className="flex flex-col mt-8 mx-8">
          <div className="flex justify-between -mx-5">
            <div className="">00:00</div>
            <div className="hidden lg:block">03:00</div>
            <div className="">06:00</div>
            <div className="hidden lg:block">09:00</div>
            <div className="">12:00</div>
            <div className="hidden lg:block">15:00</div>
            <div className="">18:00</div>
            <div className="hidden lg:block">21:00</div>
            <div className="">24:00</div>
          </div>
          <div className="relative">
            <div
              className={`overflow-hidden h-12 mb-4 text-xs flex rounded ${
                scheduleTimeline.length > 0 ? 'bg-gray-500' : 'bg-gray-200'
              }`}
            >
              {scheduleTimeline.map((item) => (
                <div
                  style={{ width: `${item.percent}%` }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${item.color}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
        {flightsIsFetching ? (
          <Spinner />
        ) : (
          <div className="flex flex-col lg:flex-row justify-between">
            {scheduleAircraft && (
              <div className="flex flex-col w-full lg:w-1/2 pr-0 lg:pr-4 mt-8">
                <div>
                  <h2>
                    Available Flights
                    {availableFlights.length > 0
                      ? ` (${availableFlights.length})`
                      : ''}
                  </h2>
                  <div className="text-xs">Click flight to add to rotation</div>
                  {availableFlights.length > 0 ? (
                    <FlightList flights={availableFlights} />
                  ) : (
                    <div className="text-center text-2xl mt-8">
                      No available flights
                    </div>
                  )}
                </div>
              </div>
            )}
            {scheduleAircraft && scheduleFlights.length > 0 && (
              <div className="flex flex-col w-fill lg:w-1/2 pl-0 lg:pl-4 mt-8">
                <div>
                  <h2>
                    Rotation - {scheduleAircraft.ident} - {aircraftUtilization}%
                  </h2>
                  <div className="text-xs">
                    Click flight to remove from rotation
                  </div>
                  <FlightList flights={scheduleFlights} removable />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="block lg:hidden">
        <Button
          variant="contained"
          className="!fixed bottom-0 w-full h-[60px]"
          disabled={
            !(scheduleDate && scheduleAircraft && scheduleFlights.length > 0)
          }
          onClick={handleSave}
        >
          Save schedule
        </Button>
      </div>
    </div>
  );
}

export default App;
