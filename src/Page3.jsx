import React, { useState, useEffect } from 'react';
import './index.css';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import Image3 from '../Image03.png';
import DataContext from './DataContext';
import { useContext } from 'react';
function PageThree() {
  let navigate = useNavigate();

  const handleBack = () => {
    navigate('/page-two');
  };

  const handleNext = () => {
    navigate('/page-four');
  };

  const { data, handleSetData } = useContext(DataContext);

  const [selectedItem, setSelectedItem] = useState('');
  const [datum, setData] = useState('');
  const [checkboxStatus, setCheckboxStatus] = useState([false]);
  const [dishes, setDishes] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [pendingBudget, setPendingBudget] = useState(0);
  const [belowZero, setBelowZero] = useState(false);
  const [cart, setCartOrderNumber] = useState(0);

  const handleCheckBoxSelected = (dataType) => {
    setSelectedItem(dataType === selectedItem ? '' : dataType);
    let URL =
      `https://server-faris-a02ca80e363b.herokuapp.com/dishes/` + `${dataType}`;
    if (dataType === selectedItem) {
      setData('');
    } else {
      fetch(URL)
        .then((res) => res.json())
        .then((json) => {
          setData(json['result']);
          console.log(json);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  };

  const AddToCart = (e, cartData) => {
    let existingItemIndex = data.dishes.findIndex(
      (item) => item.Dish === cartData.Dish,
    );
    if (existingItemIndex !== -1) {
      if (data.dishes[existingItemIndex].hasOwnProperty('quantity')) {
        data.dishes[existingItemIndex].quantity += 1;
      } else {
        data.dishes[existingItemIndex].quantity = 2;
      }
    } else {
      cartData.quantity = 1;
      data.dishes.push(cartData);
    }
    setCartOrderNumber(data.dishes.length);
  };

  // Handle changes to budgetValue
  useEffect(() => {
    setPendingBudget(data.plannedBudget);
  }, [data.plannedBudget]);

  const handleQuantityChange = (event, index) => {
    const value = event.target.value;
    const dishV = dishes.find((dish) => dish.id === index);
    if (dishV) {
      const cost = dishV.cost;
      const totalCost = value * cost;
      // Update the individual dish cost
      const updatedDishes = [...dishes];
      dishV.quantity = value; // Add quantity to the dish object
      dishV.totalCost = totalCost; // Add totalCost to the dish object
      setDishes(updatedDishes);
      handleSetData('dishes', [updatedDishes]);
      // Update total budget
      const newTotalBudget = dishes.reduce(
        (acc, dish) => acc + (dish.quantity || 0) * dish.cost,
        0,
      );
      setTotalBudget(newTotalBudget);
      if (data.plannedBudget - newTotalBudget < 0) {
        setBelowZero(true);
        setPendingBudget(data.plannedBudget - newTotalBudget);
      } else {
        setPendingBudget(data.plannedBudget - newTotalBudget);
      }
    }
  };

  const handleSelect = (index, e, cost) => {
    if (e.target.checked) {
      setDishes((currentDishes) => [
        ...currentDishes,
        { id: uuidv4(), item: e.target.value, cost: cost },
      ]);
    }
    // Update checkbox status
    const updatedStatus = [...checkboxStatus];
    updatedStatus[index] = !updatedStatus[index];
    setCheckboxStatus(updatedStatus);
  };

  useEffect(() => {
    if (datum) {
      setCheckboxStatus(Array.from({ length: datum.length }, () => false));
    }
  }, [datum]);

  return (
    <>
      <h1 className="text-center text-2xl font-bold leading-8 tracking-tight text-gray-900">
        Sitar Catering Order Service{' '}
      </h1>
      <div class="fixed top-3 right-4 md:top-4 md:right-4">
        <div class="fixed top-4 right-8">
          <div class="relative">
            <svg
              fill="#000000"
              height="20px"
              width="20px"
              viewBox="0 0 455.297 455.297"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <circle cx="65.993" cy="417.586" r="35" />
                <path d="M30.993,322.586v30h182.879c-5.914-9.267-10.676-19.335-14.094-30H30.993z" />
                <path
                  d="M323.059,183.727c-54.826,0-99.431,44.604-99.431,99.429s44.604,99.429,99.431,99.429
                    c54.825,0,99.429-44.604,99.429-99.429S377.884,183.727,323.059,183.727z M384.559,298.157h-46.5v46.5h-30v-46.5h-46.5v-30h46.5
                    v-46.5h30v46.5h46.5V298.157z"
                />
                <path
                  d="M393.673,2.711l-12.294,75H0l25.888,158.454c2.833,17.282,19.479,31.422,36.992,31.422h131.688
                    c7.715-64.052,62.392-113.859,128.49-113.859c26.887,0,51.884,8.244,72.6,22.333l23.496-143.349h36.142v-30H393.673z"
                />
                <path
                  d="M323.059,412.586c-12.147,0-23.907-1.686-35.062-4.829c-0.912,3.118-1.404,6.416-1.404,9.829c0,19.33,15.67,35,35,35
                    c19.33,0,35-15.67,35-35c0-3.145-0.421-6.19-1.2-9.089C345.054,411.166,334.219,412.586,323.059,412.586z"
                />
              </g>
            </svg>
            <span class="absolute -top-2 -right-1 bg-indigo-600 text-white text-xs rounded-full px-1">
              {cart}
            </span>
          </div>
        </div>
      </div>
      <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-90 w-auto"
            src={Image3}
            alt="Your Company"
          />
          <h2 className="mt-2 text-center text-2xl  leading-6 tracking-tight text-gray-900">
            Menu
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-lg flex flex-col align-center justify-center">
          <div className="space-y-6 w-full text-center">
            <div class="grid grid-cols-4 gap-4">
              <label class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
                <input
                  type="radio"
                  name="size-choice"
                  value="XXS"
                  class="sr-only"
                  aria-labelledby="size-choice-0-label"
                  checked={selectedItem === 'Appetizer'}
                  onChange={() => handleCheckBoxSelected('Appetizer')}
                  required
                />
                <span id="size-choice-0-label">Appetizer</span>

                <span
                  class="pointer-events-none absolute -inset-px rounded-md"
                  aria-hidden="true"
                ></span>
              </label>

              <label class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
                <input
                  type="radio"
                  name="size-choice"
                  value="XXS"
                  class="sr-only"
                  aria-labelledby="size-choice-0-label"
                />
                <span id="size-choice-0-label">Chicken</span>
                <span
                  class="pointer-events-none absolute -inset-px rounded-md"
                  aria-hidden="true"
                ></span>
              </label>

              <label class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
                <input
                  type="radio"
                  name="size-choice"
                  value="XXS"
                  class="sr-only"
                  aria-labelledby="size-choice-0-label"
                />
                <span id="size-choice-0-label">Beverages</span>

                <span
                  class="pointer-events-none absolute -inset-px rounded-md"
                  aria-hidden="true"
                ></span>
              </label>

              <label class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
                <input
                  type="radio"
                  name="size-choice"
                  value="XXS"
                  class="sr-only"
                  aria-labelledby="size-choice-0-label"
                />
                <span id="size-choice-0-label">Seafoods</span>

                <span
                  class="pointer-events-none absolute -inset-px rounded-md"
                  aria-hidden="true"
                ></span>
              </label>

              <label class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
                <input
                  type="radio"
                  name="size-choice"
                  value="XXS"
                  class="sr-only"
                  aria-labelledby="size-choice-0-label"
                />
                <span id="size-choice-0-label">Desserts</span>

                <span
                  class="pointer-events-none absolute -inset-px rounded-md"
                  aria-hidden="true"
                ></span>
              </label>

              <label class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
                <input
                  type="radio"
                  name="size-choice"
                  value="XXS"
                  class="sr-only"
                  aria-labelledby="size-choice-0-label"
                />
                <span id="size-choice-0-label">Breakfast</span>

                <span
                  class="pointer-events-none absolute -inset-px rounded-md"
                  aria-hidden="true"
                ></span>
              </label>

              <label class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
                <input
                  type="radio"
                  name="size-choice"
                  value="XXS"
                  class="sr-only"
                  aria-labelledby="size-choice-0-label"
                />
                <span id="size-choice-0-label">Soup</span>

                <span
                  class="pointer-events-none absolute -inset-px rounded-md"
                  aria-hidden="true"
                ></span>
              </label>

              <label class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
                <input
                  type="radio"
                  name="size-choice"
                  value="XXS"
                  class="sr-only"
                  aria-labelledby="size-choice-0-label"
                />
                <span id="size-choice-0-label">Main course</span>

                <span
                  class="pointer-events-none absolute -inset-px rounded-md"
                  aria-hidden="true"
                ></span>
              </label>

              <label class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
                <input
                  type="radio"
                  name="size-choice"
                  value="XXS"
                  class="sr-only"
                  aria-labelledby="size-choice-0-label"
                />
                <span id="size-choice-0-label">South iNDIAN SPECIAL</span>

                <span
                  class="pointer-events-none absolute -inset-px rounded-md"
                  aria-hidden="true"
                ></span>
              </label>

              <label class="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm">
                <input
                  type="radio"
                  name="size-choice"
                  value="XXS"
                  class="sr-only"
                  aria-labelledby="size-choice-0-label"
                />
                <span id="size-choice-0-label">Chef special</span>

                <span
                  class="pointer-events-none absolute -inset-px rounded-md"
                  aria-hidden="true"
                ></span>
              </label>
            </div>
          </div>

          <div className="mt-5">
            <div className="flex flex-col md:flex-row justify-center gap-4">
              {Array.isArray(datum) && datum.length > 0
                ? datum.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col border border-indigo-600 p-8 rounded-md shadow-xl items-center justify-center w-full md:w-auto mb-3 flex-grow"
                      style={{ minWidth: '250px' }} // Minimum width to prevent the boxes from getting too small
                    >
                      <label className="text-sm font-medium text-gray-900">
                        Dish: {item['Dish']}
                      </label>
                      <label className="text-sm font-medium text-gray-900">
                        Cost: {item['Cost']}
                      </label>
                      <input
                        type="button"
                        value="Add to Cart"
                        className="w-24 h-8 mt-1 border border-indigo-600 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
                        onClick={(e) => AddToCart(e, item)}
                      />
                      {/* <input
                        type="number"
                        placeholder="Qty"
                        className="w-16 px-1 py-1 border border-gray-400 rounded mt-2"
                        onChange={(e) => handleQuantityChange(e, item.id)}
                      /> */}
                    </div>
                  ))
                : null}
            </div>
          </div>

          <div className="flex flex-row gap-4 align-center justify-center mt-8">
            <div className="flex ">
              <button
                type="submit"
                onClick={handleBack}
                className="flex  justify-center  rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go Back
              </button>
            </div>
            <div className="flex ">
              <button
                type="submit"
                onClick={handleNext}
                className="flex  justify-center  rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go to Cart
              </button>
            </div>
          </div>
          {/* <div className="inset-x-0 bottom-0 flex justify-center gap-4 mt-8">
            <div className="flex flex-col items-center justify-center border  border-indigo-600 rounded shadow-xl   p-8">
              <p className="text-gray-900 font-md ">Pending Budget</p>
              <h1 className="text-center">
                ${pendingBudget < 0 ? 0 : pendingBudget}
              </h1>
            </div>
            <div className="flex flex-col items-center justify-center border border-indigo-600 rounded shadow-xl  p-8">
              <p className="text-gray-900 font-md ">Total Budget</p>
              <h1 className="text-center">${data.plannedBudget}</h1>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default PageThree;
