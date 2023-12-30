import React, { useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import DataContext from './DataContext';
import { useContext } from 'react';
import Image2 from '../Image02.jpg';
function PageTwo() {
  const { data, handleSetData } = useContext(DataContext);
  let navigate = useNavigate();

  const handleInputChange = (event) => {
    handleSetData(event.target.name, event.target.value);
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleNext = () => {
    navigate('/page-three');
  };

  return (
    <>
      <h1 className="text-center text-2xl  leading-8 tracking-tight text-gray-900">
        Sitar Catering Order Service{' '}
      </h1>

      <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-90 w-auto"
            src={Image2}
            alt="Your Company"
          />
          <h2 className="mt-2 text-center text-2xl  leading-6 tracking-tight text-gray-900">
            Event Information !
          </h2>
        </div>
        <form onSubmit={handleNext}>
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="eventype"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Event Type
                  </label>
                </div>
                <div className="mt-1">
                  <select
                    id="eventTypes"
                    name="eventTypes"
                    onChange={handleInputChange}
                    value={data.eventTypes}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option
                      value="Email Party"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      Birthday Party
                    </option>
                    <option
                      value="Wedding"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      Wedding
                    </option>
                    <option
                      value="Graduation Party"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      Graduation Party
                    </option>
                  </select>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Location
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    id="location"
                    name="eventLocation"
                    type="text"
                    autoComplete="location"
                    onChange={handleInputChange}
                    value={data.eventLocation}
                    required
                    className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="number"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone Number
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    id="number"
                    name="eventPhone"
                    type="number"
                    autoComplete="number"
                    onChange={handleInputChange}
                    value={data.eventPhone}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label
                    htmlFor="number"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Date
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    id="birthday"
                    name="birthday"
                    type="date"
                    autoComplete="number"
                    value={data.birthday}
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="flex items-center justify-between mt-2">
                  <label
                    htmlFor="number"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Time
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    id="number"
                    name="time"
                    type="time"
                    autoComplete="number"
                    onChange={handleInputChange}
                    value={data.time}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="number"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Planned Budget
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    id="plannedBudget"
                    name="plannedBudget"
                    type="number"
                    autoComplete="number"
                    onChange={handleInputChange}
                    value={data.plannedBudget}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label
                    htmlFor="number"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Per Head - Tray Based
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    id="number"
                    name="perHead"
                    type="checkbox"
                    autoComplete="checkbox"
                    value={data.perHead}
                    onChange={handleInputChange}
                    className="block w-11 h-6 rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label
                    htmlFor="number"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Per Head Count
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    id="perHeadCount"
                    name="perHeadCount"
                    type="number"
                    autoComplete="number"
                    value={data.perHeadCount}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex flex-row gap-4">
                <button
                  type="submit"
                  onClick={handleBack}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default PageTwo;
