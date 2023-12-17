import * as React from "react";
import './index.css'
import DataContext from "./DataContext";
import { useContext } from "react";

function PersonalInfo() {
    const { data, handleSetData } = useContext(DataContext);

    const handleInputChange = (event) =>{
        console.log("event",event.target.name,event.target.value)

        handleSetData(event.target.name,event.target.value);
    }

    return (
        <div className="mt-8">
            <h1 className=" font-semibold text-lg ml-5 mb-3">Personal Information</h1>
            <div className="bg-red-100 p-16 ml-5 mr-5">
                <div className="flex flex-col md:flex-row items-center justify-around">
                    <div className="m-4 w-full md:w-auto">
                        <h1>Name</h1>
                        <input type="text" name="name" value={data.name} onChange={handleInputChange} className="bg-neutral-300 py-1 px-2 w-full" />
                    </div>

                    <div className="m-4 w-full md:w-auto">
                        <h1>Email</h1>
                        <input type="text" name="email" value={data.email} onChange={handleInputChange}  className="bg-neutral-300 py-1 px-2 w-full" />
                    </div>

                    <div className="m-4 w-full md:w-auto">
                        <h1>Phone Number</h1>
                        <input type="text" value={data.phoneNumber} name="phoneNumber" onChange={handleInputChange}  className="bg-neutral-300 py-1 px-2 w-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalInfo;