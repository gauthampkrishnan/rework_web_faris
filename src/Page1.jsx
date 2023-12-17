import React, { useState } from "react";
import './index.css'

function PageOne(){

    return(<>
      <html class="h-full bg-white">
  <body class="h-full">
  <h1 className="text-center text-2xl font-bold leading-8 tracking-tight text-gray-900">Welcome To Sitar Catering Order Service </h1>
     <div class="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-90 w-auto" src="Image.png" alt="Your Company"/>
    <h2 class="mt-2 text-center text-2xl  leading-6 tracking-tight text-gray-900">Please enter the details !</h2>
  </div>

  <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" action="#" method="POST">
      <div>
      <div class="flex items-center justify-between">
          <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
        </div>
        <div class="mt-1">
          <input id="name" name="name" type="text" autocomplete="text" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
        <div class="flex items-center justify-between mt-2">
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email ID</label>
        </div>
        <div class="mt-1">
          <input id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
        <div class="flex items-center justify-between">
          <label for="number" class="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
        </div>
        <div class="mt-1">
          <input id="number" name="number" type="number" autocomplete="number" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
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

export default PageOne;