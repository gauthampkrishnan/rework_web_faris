import React, { useState, useEffect, useContext } from "react";
import {v4 as uuidv4} from 'uuid';
import './index.css';
import DataContext from "./DataContext";

function Quotationlogic({ messageFromParent, budgetValue }) {
    const { data, handleSetData } = useContext(DataContext)
    const [messageParent,setMessageFromParent] = useState([])
    const [pendingBudget, setPendingBudget] = useState(0); // Initialize with budgetValue or 0
    const [totalBudget, setTotalBudget] = useState(0);
    const [dishes, setDishes] = useState([]);
    const [checkboxStatus, setCheckboxStatus] = useState([]);
    const [belowZero, setBelowZero] = useState(false);


    useEffect(()=>{
        setMessageFromParent(messageFromParent)
    },[messageFromParent])

    useEffect(() => {
        setCheckboxStatus(Array.from({ length: messageFromParent.length }, () => false));
    }, [messageFromParent]);

    // Handle changes to budgetValue
    useEffect(() => {
        setPendingBudget(budgetValue);
    }, [budgetValue,data.plannedBudget]);

    const handleSelect = (index, e, cost) => {
            setDishes(currentDishes=>[...currentDishes,{ id:uuidv4(),'item': e.target.value, 'cost': cost}]);
        // Update checkbox status
        const updatedStatus = [...checkboxStatus];
        updatedStatus[index] = !updatedStatus[index];
        setCheckboxStatus(updatedStatus);
    };
    const handleDelete = (dishId) => {
        const dishTobeRemoved = dishes.find(dish=>dish.id===dishId)
        if(dishTobeRemoved){
            const value = pendingBudget + dishTobeRemoved.cost * dishTobeRemoved.quantity;
            if(value>0 && belowZero){

                setBelowZero(false)
            }
            setPendingBudget(value);
            setTotalBudget(totalBudget-dishTobeRemoved.cost * dishTobeRemoved.quantity)
            
        }
        setDishes(currentDishes => currentDishes.filter(dish => dish.id !== dishId))
        const filteredData = dishes.filter(dish => dish.id !== dishId)
        handleSetData('dishes',filteredData);
    }

    const handleQuantityChange = (event, index) => {
        const value = event.target.value;
        const dishV = dishes.find(dish=>dish.id===index)
        if(dishV){
            const cost = dishV.cost;
            const totalCost = value * cost;
            // Update the individual dish cost
        const updatedDishes = [...dishes];
        dishV.quantity = value; // Add quantity to the dish object
        dishV.totalCost = totalCost; // Add totalCost to the dish object
        setDishes(updatedDishes);
        handleSetData('dishes',[updatedDishes])
        // Update total budget
        const newTotalBudget = dishes.reduce((acc, dish) => acc + (dish.quantity || 0) * dish.cost, 0);
        setTotalBudget(newTotalBudget);
        if(budgetValue - newTotalBudget < 0 ){
            setBelowZero(true)
            setPendingBudget(budgetValue - newTotalBudget)
        }else{
            setPendingBudget(budgetValue - newTotalBudget); 
        }
        }
    };

    return (
        <>
            <div className="flex flex-row justify-center">
                {Array.isArray(messageParent) && messageParent.length > 0 ? (
                    <div className="flex-1 bg-red-100 p-16 ml-5 mr-5 relative">
                        {messageParent.map((item, index) => (
                            <div key={index}>
                                <input
                                    className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                    type="checkbox"
                                    value={item['Dish']}
                                    checked={checkboxStatus[index]}
                                    onChange={(e) => handleSelect(index, e, item['Cost'])}
                                />
                                <p>{item['Dish']}</p>
                            </div>

                        ))}
                    </div>
                ) : (
                    null
                )}

                <div className="flex-1 bg-red-100 p-16 ml-5 mr-5 relative">
                    <h2 className="absolute top-0 left-1/2 transform -translate-x-1/2 font-bold">
                        QUOTATION CALCULATOR
                    </h2>
                    <div className="flex flex-row justify-center align-middle">
                        <div className="bg-green-100 p-20 flex-1 relative">
                            <p className="top-0 left-1/2 -translate-x-1/2 font-bold absolute">
                                Pending Budget
                            </p>
                            <h1 className="text-center">${belowZero?'0':pendingBudget}</h1>
                        </div>
                        <div className="bg-orange-100 p-20 flex-1 relative">
                            <p className="top-0 left-1/2 -translate-x-1/2 font-bold absolute">
                                Total
                            </p>
                            <h1 className="text-center text-xm">{totalBudget}</h1>
                        </div>
                    </div>
                    <div>
                        {dishes.map((dish) => (
                            <div key={dish.id} >

                                <p key={dish.id}>{dish['item']}</p>
                                <div className="space-x-1">
                                    <button className="bg-red-500 text-white" onClick={() => handleDelete(dish.id)}>Delete</button>
                                    <input type="number"  placeholder="Quantity" className="w-16 px-2 py-1 border  border-gray-400 rounded" onChange={(e) => handleQuantityChange(e, dish.id)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Quotationlogic;