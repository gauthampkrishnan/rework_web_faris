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

    const { data, handleSetData } = useContext(DataContext)
    console.log("Printing data", data)

    const [selectedItem, setSelectedItem] = useState('');
    const [datum, setData] = useState('');
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
        handleSetData('dishes', filteredData);
    };

    const handleQuantityChange = (event, index) => {
        const value = event.target.value;
        const dishV = dishes.find(dish => dish.id === index)
        if (dishV) {
            const cost = dishV.cost;
            const totalCost = value * cost;
            // Update the individual dish cost
            const updatedDishes = [...dishes];
            dishV.quantity = value; // Add quantity to the dish object
            dishV.totalCost = totalCost; // Add totalCost to the dish object
            setDishes(updatedDishes);
            handleSetData('dishes', [updatedDishes])
            // Update total budget
            const newTotalBudget = dishes.reduce((acc, dish) => acc + (dish.quantity || 0) * dish.cost, 0);
            setTotalBudget(newTotalBudget);
            if (budgetValue - newTotalBudget < 0) {
                setBelowZero(true)
                setPendingBudget(budgetValue - newTotalBudget)
            } else {
                setPendingBudget(budgetValue - newTotalBudget);
            }
        }
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

    // useEffect(() => {
    //     setCheckboxStatus(Array.from({ length: datum.length }, () => false));
    // }, [datum]);

    return (
        <>


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
                                    required
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
                                    required
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
                                Send Email
                            </button>
                        </div>
                        <div className="flex ">
                            <button
                                type="submit"
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
                                <div className="flex-1 bg-red-100 p-16 ml-5 mr-5 relative">
                                    <h1>Please choose the course</h1>
                                    {datum.map((item, index) => (
                                        <div key={index}>
                                            <div className="flex flex-row items-center justify-center ">
                                                <input
                                                    className="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
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
                            {Array.isArray(datum) && datum.length > 0 && (
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

                    <div className="fixed inset-x-0 bottom-0 flex justify-center gap-4 mt-4">
                        <div className="flex flex-col items-center justify-center bg-green-100 p-8">
                            <p>Pending Budget</p>
                            <h1 className="text-center">${pendingBudget}</h1>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-orange-100 p-8">
                            <p>Total Budget</p>
                            <h1 className="text-center">${totalBudget}</h1>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default PageThree;
