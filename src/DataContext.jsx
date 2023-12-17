import React, { createContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    // Initialize all fields you expect to have in the context
    name: '',
    email: '',
    phoneNumber: '',
    eventTypes:'',
    eventLocation:'',
    birthday:"2023-01-01",
    plannedBudget:0,
    eventPhone:'',
    perHead:true,
    perHeadCount:'',
    dishes:[]
    // Add additional fields as needed
  });

  const handleSetData = (fieldName, value) => {
    console.log(data)
    setData((prevData) => ({ ...prevData, [fieldName]: value }));
    console.log(data)
  };

  return (
    <DataContext.Provider value={{ data, handleSetData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;