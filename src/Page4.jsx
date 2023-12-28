import React, { useContext, useState } from 'react';
import Image4 from '../Image04.png';
import DataContext from './DataContext';
// Assuming you're using react-router-dom for navigation
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function PageFour() {
  const navigate = useNavigate();
  const { data, handleSetData } = useContext(DataContext);
  const [totalCost, setTotalCost] = useState(0);
  const [remainingCost, setRemainingCost] = useState(0);

  const handleBack = () => {
    navigate('/page-three');
  };

  const handleIncreaseQuantity = (dishId) => {
    const updatedDishes = data.dishes.map((dish, index) => {
      if (index === dishId) {
        return { ...dish, quantity: dish.quantity + 1 };
      }
      return dish;
    });

    // Now, update only the dishes field
    handleSetData('dishes', updatedDishes);
  };

  const handleDecreaseQuantity = (dishId) => {
    const updatedDishes = data.dishes.map((dish, index) => {
      if (index === dishId && dish.quantity !== 1) {
        return { ...dish, quantity: dish.quantity - 1 };
      }
      return dish;
    });

    // Now, update only the dishes field
    handleSetData('dishes', updatedDishes);
  };

  const [forceUpdate, setForceUpdate] = useState(false);

  const handleDelete = (dish) => {
    const updatedDishes = data.dishes.filter((item) => item.Dish !== dish.Dish);
    data.dishes = [];
    data.dishes.push(...updatedDishes); // Important to use spread operator here
    setForceUpdate((f) => !f); // Toggling the state to force re-render
  };

  const sendOrder = async () => {
    console.log('Hi');
    console.log('welcome');
    // console.log('Submitting data:', data);
    // try {
    //   const response = await fetch(
    //     `https://server-faris-a02ca80e363b.herokuapp.com/generate-pdf`,
    //     {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(data),
    //     },
    //   );

    //   if (response.ok) {
    //     // Assuming the server sends back a PDF file as a response
    //     const blob = await response.blob();
    //     const downloadUrl = window.URL.createObjectURL(blob);
    //     const a = document.createElement('a');
    //     a.href = downloadUrl;
    //     a.download = 'data.pdf'; // You can name the download as you wish
    //     document.body.appendChild(a);
    //     a.click();
    //     window.URL.revokeObjectURL(downloadUrl);
    //     a.remove();
    //   } else {
    //     // Handle any errors returned by the server here
    //     console.error('Server responded with a status:', response.status);
    //   }
    // } catch (error) {
    //   // Handle the error here
    //   console.error('An error occurred:', error);
    // }
  };

  useEffect(() => {
    let cost = 0;
    for (let i = 0; i < data.dishes.length; i++) {
      cost = cost + data.dishes[i].quantity * data.dishes[i].Cost;
    }

    setRemainingCost(data.plannedBudget - cost);
    setTotalCost(cost);
  }, [data.dishes, totalCost]);

  return (
    <>
      <h1 className="text-center text-2xl font-bold leading-8 tracking-tight text-gray-900">
        Sitar Catering Order Service
      </h1>
      <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-90 w-auto"
            src={Image4}
            alt="Your Company"
          />
          <h2 className="mt-2 mb-4 text-center text-2xl leading-6 tracking-tight text-gray-900">
            Order Cart
          </h2>
        </div>
        <div className="w-full bg-gray-100 pt-20">
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {data.dishes.map((dish, dishIndex) => (
                <div key={dishIndex} className="space-y-4">
                  <div
                    key={dishIndex}
                    className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                  >
                    <img
                      src="https://static01.nyt.com/images/2023/11/29/multimedia/ND-Biryani-zpkh/ND-Biryani-zpkh-threeByTwoMediumAt2X.jpg"
                      alt="product-image"
                      className="w-full rounded-lg sm:w-40"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">
                          {dish['Dish']} {/* Replace with dynamic content */}
                        </h2>
                        <p className="mt-1 text-xs text-gray-700">
                          {'Some text'}
                        </p>{' '}
                        {/* Dynamic size */}
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                          <span
                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50 "
                            onClick={() => handleIncreaseQuantity(dishIndex)}
                          >
                            +
                          </span>
                          <input
                            className="h-8 w-12 border bg-white text-center text-xs outline-none"
                            type="number"
                            value={dish['quantity'] ?? 1}
                            min="1"
                          />
                          <span
                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                            onClick={() => handleDecreaseQuantity(dishIndex)}
                          >
                            -
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="text-sm">{dish['Cost']} $</p>{' '}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                            onClick={() => handleDelete(dish)}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar or additional content */}
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Total Budget</p>
                <p className="text-gray-700">{data.plannedBudget}</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-gray-700">Remaining Budget</p>
                <p className="text-gray-700">{remainingCost}</p>
              </div>

              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">${totalCost} USD</p>
                  {/* <p class="text-sm text-gray-700">including VAT</p> */}
                </div>
              </div>
              <button
                className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
                onClick={() => sendOrder()}
              >
                Send Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex w-full flex-col items-center justify-center px-4 sm:px-0">
        <button
          type="button"
          onClick={handleBack}
          className="mt-4 w-full rounded-md bg-indigo-600 py-2 px-4 text-sm font-semibold text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
        >
          Go Back
        </button>
      </div>
    </>
  );
}

export default PageFour;
