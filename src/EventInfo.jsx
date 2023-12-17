
import './index.css'
import React, { useContext, useState } from "react";
import Menu from "./Menu";
import DataContext from './DataContext';
function EventInfo() {
    const [budget, setBudget] = useState(0);
    const { data,handleSetData } = useContext(DataContext)

    const handleChange = (event) => {
        setBudget(event.target.value);
    }

    const handleInputChange = (event) =>{
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        handleSetData(name, value);
    }
    return (
        <>
            <div className="mt-8">
                <h1 className=" font-semibold text-lg ml-5 mb-3">Event Information</h1>
                <div className="bg-red-100 p-16 ml-5 mr-5">
                    <div className="flex flex-col md:flex-row items-center justify-around">
                        <div className="w-11/12 md:w-auto mb-4 md:mb-0">
                            <div>
                                <h1>Event Type</h1>
                                <select name="eventTypes" onChange={handleInputChange} className="px-16 bg-neutral-300" id="event-names" value={data.eventTypes}>
                                    <option value="sample1">Samples</option>
                                    <option value="sample2">Samples1</option>
                                    <option value="sample3">Samples2</option>
                                </select>
                            </div>
                            <div>
                                <h1>Location</h1>
                                <input type="text" className="p-8" onChange={handleInputChange} name="eventLocation" value={data.eventLocation}/>
                            </div>
                        </div>

                        <div className="w-11/12 md:w-auto mb-4 md:mb-0">
                            <div>
                                <h1>Date & Time</h1>
                                <input type="date" id="birthday" onChange={handleInputChange} className="bg-neutral-300" name="birthday" value={data.birthday} />
                            </div>
                            <div>
                                <h1>Planned Budget</h1>
                                <input type="number" value={data.plannedBudget} required onChange={handleInputChange} name="plannedBudget" className="bg-neutral-300 py-1 px-2" />
                            </div>
                        </div>

                        <div className="w-11/12 md:w-auto mb-4 md:mb-0">
                            <div>
                                <h1>Phone Number</h1>
                                <input type="tel" className="bg-neutral-300 py-1 px-2" name="eventPhone" value={data.eventPhone} onChange={handleInputChange}/>
                            </div>
                            <div>
                                <h1>Per Head - Tray Based</h1>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" checked={data.perHead}  className="sr-only peer" name="perHead" onChange={handleInputChange}/>
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                            <div>
                                <h1>Per Head Count</h1>
                                <input type="number" className="bg-neutral-300 py-1 px-2" value={data.perHeadCount} name="perHeadCount" onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            {data.plannedBudget >0 && <Menu budgetProp={data.plannedBudget} />}
        </>

    )
}

export default EventInfo;