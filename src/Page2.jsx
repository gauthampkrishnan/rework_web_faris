import React, { useState } from "react";
import './index.css'

function PageTwo(){

    return(<>
      <html class="h-full bg-white">
  <body class="h-full">
  <h1 className="text-center text-2xl font-bold leading-8 tracking-tight text-gray-900">Welcome To Sitar Catering Order Service </h1>
     <div class="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-90 w-auto" src="Image02.jpg" alt="Your Company"/>
    <h2 class="mt-2 text-center text-2xl  leading-6 tracking-tight text-gray-900">Event Information !</h2>
  </div>

  <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" action="#" method="POST">
      <div>
    
      <div class="flex items-center justify-between">
          <label for="eventype" class="block text-sm font-medium leading-6 text-gray-900">Event Type</label>
        </div>
        <div class="mt-1">
        <select name="eventTypes" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        <option value="sample1" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">Samples1</option>
        <option value="sample1" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">Samples2</option>
        <option value="sample1" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">Samples3</option>
        </select>
          
        </div>
        <div class="flex items-center justify-between mt-2">
          <label for="location" class="block text-sm font-medium leading-6 text-gray-900">Location</label>
        </div>
        <div class="mt-1">
          <input id="location" name="location" type="email" autocomplete="location" required class="block w-full rounded-md border-0 py-8 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
        <div class="flex items-center justify-between">
          <label for="number" class="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
        </div>
        <div class="mt-1">
          <input id="number" name="number" type="number" autocomplete="number" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>

        <div class="flex items-center justify-between">
          <label for="number" class="block text-sm font-medium leading-6 text-gray-900">Date</label>
        </div>
        <div class="mt-1">
          <input id="number" name="number" type="date" autocomplete="number" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>


        <div class="flex items-center justify-between mt-2">
          <label for="number" class="block text-sm font-medium leading-6 text-gray-900">Time</label>
        </div>
        <div class="mt-1">
          <input id="number" name="number" type="time" autocomplete="number" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>


        <div class="flex items-center justify-between">
          <label for="number" class="block text-sm font-medium leading-6 text-gray-900">Planned Budget</label>
        </div>
        <div class="mt-1">
          <input id="plannedBudget" name="plannedBudget" type="number" autocomplete="number" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>

        <div class="flex items-center justify-between">
          <label for="number" class="block text-sm font-medium leading-6 text-gray-900">Per Head - Tray Based</label>
        </div>
        <div class="mt-1">
          <input id="number" name="number" type="checkbox" autocomplete="checkbox" required class="block w-11 h-6 rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>

        <div class="flex items-center justify-between">
          <label for="number" class="block text-sm font-medium leading-6 text-gray-900">Per Head Count</label>
        </div>
        <div class="mt-1">
          <input id="plannedBudget" name="plannedBudget" type="number" autocomplete="number" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>

      </div>

   

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Next</button>
      </div>
    </form>
  </div>
</div>
</body>
</html>
        </>
        
    )
}

export default PageTwo;