import React, { useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from './DataContext';
import Image1 from '../Image.png';
function PageOne() {
  const { data, handleSetData } = useContext(DataContext);
  let navigate = useNavigate();

  const handleInputChange = (event) => {
    handleSetData(event.target.name, event.target.value);
  };

  const handleNext = () => {
    navigate('/page-two');
  };
  return (
    <>
      <form onSubmit={handleNext}>
        <h1 className="text-center text-2xl font-bold leading-8 tracking-tight text-gray-900">
          Sitar Catering Order Service{' '}
        </h1>
        <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-90 w-auto"
              src={Image1}
              alt="Your Company"
            />

            <h2 className="mt-2 text-center text-2xl  leading-6 tracking-tight text-gray-900">
              Please enter the details !
            </h2>
          </div>

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="text"
                    onChange={handleInputChange}
                    value={data.name}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email ID
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={handleInputChange}
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                    name="phoneNumber"
                    type="number"
                    onChange={handleInputChange}
                    value={data.phoneNumber}
                    autoComplete="number"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default PageOne;
