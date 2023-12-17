import React, { useState } from "react";
import './index.css'

function PageThree(){

    return(<>
      <html class="h-full bg-white">
  <body class="h-full">
  <h1 className="text-center text-2xl font-bold leading-8 tracking-tight text-gray-900">Welcome To Sitar Catering Order Service </h1>
     <div class="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-90 w-auto" src="Image03.png" alt="Your Company"/>
    <h2 class="mt-2 text-center text-2xl  leading-6 tracking-tight text-gray-900">Menu</h2>
  </div>

  
  <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-lg">
    <form class="space-y-6" action="#" method="POST">
        <div class="grid grid-cols-4 gap-4">
            <div class="flex items-center space-x-2">
                <input id="appetizer" name="appetizer" type="checkbox" autocomplete="off" required class="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"/>
                <label for="appetizer" class="text-sm font-medium text-gray-900 truncate">Appetizer</label>
            </div>
            <div class="flex items-center space-x-2">
                <input id="chicken" name="chicken" type="checkbox" autocomplete="off" required class="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"/>
                <label for="chicken" class="text-sm font-medium text-gray-900 truncate">Chicken</label>
            </div>
            <div class="flex items-center space-x-2">
                <input id="beverages" name="beverages" type="checkbox" autocomplete="off" required class="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"/>
                <label for="beverages" class="text-sm font-medium text-gray-900 truncate">Beverages</label>
            </div>
            <div class="flex items-center space-x-2">
                <input id="seafoods" name="seafoods" type="checkbox" autocomplete="off" required class="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"/>
                <label for="seafoods" class="text-sm font-medium text-gray-900 truncate">Seafoods</label>
            </div>
            <div class="flex items-center space-x-2">
                <input id="desserts" name="desserts" type="checkbox" autocomplete="off" required class="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"/>
                <label for="desserts" class="text-sm font-medium text-gray-900 truncate">Desserts</label>
            </div>
            <div class="flex items-center space-x-2">
                <input id="breakfast" name="breakfast" type="checkbox" autocomplete="off" required class="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"/>
                <label for="breakfast" class="text-sm font-medium text-gray-900 truncate">Breakfast</label>
            </div>
            <div class="flex items-center space-x-2">
                <input id="soup" name="soup" type="checkbox" autocomplete="off" required class="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"/>
                <label for="soup" class="text-sm font-medium text-gray-900 truncate">Soup</label>
            </div>
            <div class="flex items-center space-x-2">
                <input id="maincourse" name="maincourse" type="checkbox" autocomplete="off" required class="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"/>
                <label for="maincourse" class="text-sm font-medium text-gray-900 truncate">Main Course</label>
            </div>
            <div class="flex items-center space-x-2">
                <input id="southindianspecial" name="southindianspecial" type="checkbox" autocomplete="off" required class="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"/>
                <label for="southindianspecial" class="text-sm font-medium text-gray-900 truncate">South Indian Special</label>
            </div>
            <div class="flex items-center space-x-2">
                <input id="chefspecial" name="chefspecial" type="checkbox" autocomplete="off" required class="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"/>
                <label for="chefspecial" class="text-sm font-medium text-gray-900 truncate">Chef Special</label>
            </div>
        </div>
       
    </form>


    <div className="flex flex-row gap-4 align-center justify-center mt-8">
            <div className="flex ">
                 <button type="submit" class="flex  justify-center  rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Send Email</button>
                </div>
                <div className="flex ">
                 <button type="submit" class="flex  justify-center  rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Download Reciept</button>
                </div>  
    </div>

    <div class="fixed inset-x-0 bottom-0 flex justify-center gap-4">
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
        
    )
}

export default PageThree;