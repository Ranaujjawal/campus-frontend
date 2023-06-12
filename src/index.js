import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Main from './Main';
import {
  createBrowserRouter,
  RouterProvider,
}
from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
  },
  {
    path: "App",
    element: <App/>
  }
  
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='app'><RouterProvider router={router}  /></div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))

