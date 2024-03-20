import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store/index.js'
import Basket from './pages/Basket.jsx'
import ProfileStatus from './pages/ProfileStatus.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "basket",
        element: <Basket />,
      },
      {
        path: "profile-status",
        element: <ProfileStatus />
      },

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)