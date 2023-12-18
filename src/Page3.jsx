import React, { useState, useEffect } from 'react';
import './index.css';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import DataContext from './DataContext';
import { useContext } from 'react';
function PageThree() {
  let navigate = useNavigate();

  const handleBack = () => {
    navigate('/page-two');
  };
  const handleDownload = async () => {
    console.log('Submitting data:', data);
    try {
      const response = await fetch(
        `https://server-faris-a02ca80e363b.herokuapp.com/generate-pdf`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );

      if (response.ok) {
        // Assuming the server sends back a PDF file as a response
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'data.pdf'; // You can name the download as you wish
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(downloadUrl);
        a.remove();
      } else {
        // Handle any errors returned by the server here
        console.error('Server responded with a status:', response.status);
      }
    } catch (error) {
      // Handle the error here
      console.error('An error occurred:', error);
    }
  };
  const { data, handleSetData } = useContext(DataContext);

  const [selectedItem, setSelectedItem] = useState('');
  const [datum, setData] = useState('');
  const [checkboxStatus, setCheckboxStatus] = useState([false]);
  const [dishes, setDishes] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [pendingBudget, setPendingBudget] = useState(0);
  const [belowZero, setBelowZero] = useState(false);

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
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  };

  const handleDelete = (dishId) => {
    const dishTobeRemoved = dishes.find((dish) => dish.id === dishId);
    if (dishTobeRemoved) {
      const value =
        pendingBudget + dishTobeRemoved.cost * dishTobeRemoved.quantity;
      if (value > 0 && belowZero) {
        setBelowZero(false);
      }
      setPendingBudget(value);
      setTotalBudget(
        totalBudget - dishTobeRemoved.cost * dishTobeRemoved.quantity,
      );
    }
    setDishes((currentDishes) =>
      currentDishes.filter((dish) => dish.id !== dishId),
    );
    const filteredData = dishes.filter((dish) => dish.id !== dishId);
    handleSetData('dishes', filteredData);
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
      <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-90 w-auto"
            src="Image03.png"
            alt="Your Company"
          />
          <h2 className="mt-2 text-center text-2xl  leading-6 tracking-tight text-gray-900">
            Menu
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  id="appetizer"
                  name="appetizer"
                  type="checkbox"
                  autoComplete="off"
                  checked={selectedItem === 'Appetizer'}
                  onChange={() => handleCheckBoxSelected('Appetizer')}
                  required
                  className="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                />
                <label
                  htmlFor="appetizer"
                  className="text-sm font-medium text-gray-900 truncate"
                >
                  Appetizer
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="chicken"
                  name="chicken"
                  type="checkbox"
                  autoComplete="off"
                  required
                  checked={selectedItem === 'Chicken'}
                  onChange={() => handleCheckBoxSelected('Chicken')}
                  className="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                />
                <label
                  htmlFor="chicken"
                  className="text-sm font-medium text-gray-900 truncate"
                >
                  Chicken
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="beverages"
                  name="beverages"
                  type="checkbox"
                  autoComplete="off"
                  required
                  checked={selectedItem === 'Beverages'}
                  onChange={() => handleCheckBoxSelected('Beverages')}
                  className="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                />
                <label
                  htmlFor="beverages"
                  className="text-sm font-medium text-gray-900 truncate"
                >
                  Beverages
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="seafoods"
                  name="seafoods"
                  type="checkbox"
                  autoComplete="off"
                  required
                  checked={selectedItem === 'Seafoods'}
                  onChange={() => handleCheckBoxSelected('Seafoods')}
                  className="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                />
                <label
                  htmlFor="seafoods"
                  className="text-sm font-medium text-gray-900 truncate"
                >
                  Seafoods
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="desserts"
                  name="desserts"
                  type="checkbox"
                  autoComplete="off"
                  required
                  checked={selectedItem === 'Deserts'}
                  onChange={() => handleCheckBoxSelected('Deserts')}
                  className="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                />
                <label
                  htmlFor="desserts"
                  className="text-sm font-medium text-gray-900 truncate"
                >
                  Desserts
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="breakfast"
                  name="breakfast"
                  type="checkbox"
                  autoComplete="off"
                  required
                  checked={selectedItem === 'Breakfast'}
                  onChange={() => handleCheckBoxSelected('Breakfast')}
                  className="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                />
                <label
                  htmlFor="breakfast"
                  className="text-sm font-medium text-gray-900 truncate"
                >
                  Breakfast
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="soup"
                  name="soup"
                  type="checkbox"
                  autoComplete="off"
                  checked={selectedItem === 'Soup'}
                  onChange={() => handleCheckBoxSelected('Soup')}
                  className="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                />
                <label
                  htmlFor="soup"
                  className="text-sm font-medium text-gray-900 truncate"
                >
                  Soup
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="maincourse"
                  name="maincourse"
                  type="checkbox"
                  autoComplete="off"
                  checked={selectedItem === 'Main Course'}
                  onChange={() => handleCheckBoxSelected('Main Course')}
                  className="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                />
                <label
                  htmlFor="maincourse"
                  className="text-sm font-medium text-gray-900 truncate"
                >
                  Main Course
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="southindianspecial"
                  name="southindianspecial"
                  type="checkbox"
                  autoComplete="off"
                  required
                  checked={selectedItem === 'South Indian Special'}
                  onChange={() =>
                    handleCheckBoxSelected('South Indian Special')
                  }
                  className="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                />
                <label
                  htmlFor="southindianspecial"
                  className="text-sm font-medium text-gray-900 truncate"
                >
                  South Indian Special
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  id="chefspecial"
                  name="chefspecial"
                  type="checkbox"
                  autoComplete="off"
                  required
                  checked={selectedItem === 'Chef Special'}
                  onChange={() => handleCheckBoxSelected('Chef Special')}
                  className="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                />
                <label
                  htmlFor="chefspecial"
                  className="text-sm font-medium text-gray-900 truncate"
                >
                  Chef Special
                </label>
              </div>
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
                onClick={handleDownload}
                className="flex  justify-center  rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Download Reciept
              </button>
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <div className="flex flex-row">
              {/* Column 1: Iterated Data */}
              {Array.isArray(datum) && datum.length > 0 ? (
                <div className="flex-1 p-16 ml-5 mr-5 border border-indigo-600 rounded-md shadow-xl relative">
                  {datum.map((item, index) => (
                    <div key={index}>
                      <div className="flex flex-row items-center justify-center ">
                        <div className="flex flex-row">
                          <div className="flex">
                            <input
                              className="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                              type="checkbox"
                              value={item['Dish']}
                              checked={checkboxStatus[index]}
                              onChange={(e) =>
                                handleSelect(index, e, item['Cost'])
                              }
                            />
                          </div>
                          <div className="flex">
                            <p className="text-sm font-medium ml-1 text-gray-900">
                              {item['Dish']}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {/* Column 2: Welcome Message */}
              {Array.isArray(datum) && datum.length > 0 && (
                <div className="flex flex-col items-center border border-indigo-600 rounded-md shadow-xl  ml-5 p-16 mr-5">
                  <div>
                    {dishes.map((dish) => (
                      <div key={dish.id}>
                        <p key={dish.id}>{dish['item']}</p>
                        <div className="space-x-1">
                          <button
                            className="bg-indigo-600 px-1 text-sm  text-white rounded"
                            onClick={() => handleDelete(dish.id)}
                          >
                            Delete
                          </button>
                          <input
                            type="number"
                            placeholder="Quantity"
                            className="w-16 px-2 py-1 border  border-gray-400 rounded"
                            onChange={(e) => handleQuantityChange(e, dish.id)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="inset-x-0 bottom-0 flex justify-center gap-4 mt-8">
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
          </div>
        </div>
      </div>
    </>
  );
}

export default PageThree;
