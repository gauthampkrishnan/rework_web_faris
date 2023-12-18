import React, { useState, useEffect } from 'react';
import './index.css';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

function PageThree() {
  let navigate = useNavigate();

  const handleBack = () => {
    // Any additional logic for the submit action

    // Navigate to the desired path
    navigate('/page-two');
  };
  // const { data, handleSetData } = useContext(DataContext)
  const [selectedItem, setSelectedItem] = useState('');
  const [data, setData] = useState('');
  const [checkboxStatus, setCheckboxStatus] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [pendingBudget, setPendingBudget] = useState(0);

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
    // handleSetData('dishes',filteredData);
  };

  const handleSelect = (index, e, cost) => {
    setDishes((currentDishes) => [
      ...currentDishes,
      { id: uuidv4(), item: e.target.value, cost: cost },
    ]);
    // Update checkbox status
    const updatedStatus = [...checkboxStatus];
    updatedStatus[index] = !updatedStatus[index];
    setCheckboxStatus(updatedStatus);
  };

  useEffect(() => {
    setCheckboxStatus(Array.from({ length: data.length }, () => false));
  }, [data]);

  return (
    <>
      <html className="h-full bg-white">
        <body className="h-full">
          <h1 className="text-center text-2xl font-bold leading-8 tracking-tight text-gray-900">
            Welcome To Sitar Catering Order Service{' '}
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

            <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-lg">
              <form class="space-y-6" action="#" method="POST">
                <div class="grid grid-cols-4 gap-4">
                  <div class="flex items-center space-x-2">
                    <input
                      id="appetizer"
                      name="appetizer"
                      type="checkbox"
                      autocomplete="off"
                      checked={selectedItem === 'Appetizer'}
                      onChange={() => handleCheckBoxSelected('Appetizer')}
                      required
                      class="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                    />
                    <label
                      for="appetizer"
                      class="text-sm font-medium text-gray-900 truncate"
                    >
                      Appetizer
                    </label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <input
                      id="chicken"
                      name="chicken"
                      type="checkbox"
                      autocomplete="off"
                      required
                      class="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                    />
                    <label
                      for="chicken"
                      class="text-sm font-medium text-gray-900 truncate"
                    >
                      Chicken
                    </label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <input
                      id="beverages"
                      name="beverages"
                      type="checkbox"
                      autocomplete="off"
                      required
                      class="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                    />
                    <label
                      for="beverages"
                      class="text-sm font-medium text-gray-900 truncate"
                    >
                      Beverages
                    </label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <input
                      id="seafoods"
                      name="seafoods"
                      type="checkbox"
                      autocomplete="off"
                      required
                      class="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                    />
                    <label
                      for="seafoods"
                      class="text-sm font-medium text-gray-900 truncate"
                    >
                      Seafoods
                    </label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <input
                      id="desserts"
                      name="desserts"
                      type="checkbox"
                      autocomplete="off"
                      required
                      class="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                    />
                    <label
                      for="desserts"
                      class="text-sm font-medium text-gray-900 truncate"
                    >
                      Desserts
                    </label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <input
                      id="breakfast"
                      name="breakfast"
                      type="checkbox"
                      autocomplete="off"
                      required
                      class="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                    />
                    <label
                      for="breakfast"
                      class="text-sm font-medium text-gray-900 truncate"
                    >
                      Breakfast
                    </label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <input
                      id="soup"
                      name="soup"
                      type="checkbox"
                      autocomplete="off"
                      required
                      class="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                    />
                    <label
                      for="soup"
                      class="text-sm font-medium text-gray-900 truncate"
                    >
                      Soup
                    </label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <input
                      id="maincourse"
                      name="maincourse"
                      type="checkbox"
                      autocomplete="off"
                      required
                      class="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                    />
                    <label
                      for="maincourse"
                      class="text-sm font-medium text-gray-900 truncate"
                    >
                      Main Course
                    </label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <input
                      id="southindianspecial"
                      name="southindianspecial"
                      type="checkbox"
                      autocomplete="off"
                      required
                      class="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                    />
                    <label
                      for="southindianspecial"
                      class="text-sm font-medium text-gray-900 truncate"
                    >
                      South Indian Special
                    </label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <input
                      id="chefspecial"
                      name="chefspecial"
                      type="checkbox"
                      autocomplete="off"
                      required
                      class="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                    />
                    <label
                      for="chefspecial"
                      class="text-sm font-medium text-gray-900 truncate"
                    >
                      Chef Special
                    </label>
                  </div>
                </div>
              </form>

              <div className="flex flex-row gap-4 align-center justify-center mt-8">
                <div className="flex ">
                  <button
                    type="submit"
                    onClick={handleBack}
                    class="flex  justify-center  rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Send Email
                  </button>
                </div>
                <div className="flex ">
                  <button
                    type="submit"
                    class="flex  justify-center  rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Download Reciept
                  </button>
                </div>
              </div>
              <div class="flex justify-center mt-5">
                <div class="flex flex-row">
                  {/* Column 1: Iterated Data */}
                  {Array.isArray(data) && data.length > 0 ? (
                    <div className="flex-1 bg-red-100 p-16 ml-5 mr-5 relative">
                      <h1>Please choose the course</h1>
                      {data.map((item, index) => (
                        <div key={index}>
                          <div className="flex flex-row items-center justify-center ">
                            <input
                              class="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                              type="checkbox"
                              value={item['Dish']}
                              checked={checkboxStatus[index]}
                              onChange={(e) =>
                                handleSelect(index, e, item['Cost'])
                              }
                            />
                            <p>{item['Dish']}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {/* Column 2: Welcome Message */}
                  {Array.isArray(data) && data.length > 0 && (
                    <div className="flex flex-col items-center bg-red-100 ml-5 p-16 mr-5">
                      <h1 className="w-full text-center">Menu</h1>
                      <div>
                        {dishes.map((dish) => (
                          <div key={dish.id}>
                            <p key={dish.id}>{dish['item']}</p>
                            <div className="space-x-1">
                              <button
                                className="bg-red-500 text-white"
                                onClick={() => handleDelete(dish.id)}
                              >
                                Delete
                              </button>
                              <input
                                type="number"
                                placeholder="Quantity"
                                className="w-16 px-2 py-1 border  border-gray-400 rounded"
                                onChange={(e) =>
                                  handleQuantityChange(e, dish.id)
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div class="fixed inset-x-0 bottom-0 flex justify-center gap-4 mt-4">
                <div class="flex flex-col items-center justify-center bg-green-100 p-8">
                  <p>Pending Budget</p>
                  <h1 class="text-center">$0</h1>
                </div>
                <div class="flex flex-col items-center justify-center bg-orange-100 p-8">
                  <p>Total Budget</p>
                  <h1 class="text-center">$0</h1>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    </>
  );
}

export default PageThree;
