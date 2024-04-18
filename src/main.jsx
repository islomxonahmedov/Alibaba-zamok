import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store/index.js'
import Cardinfo from './pages/Cardinfo.jsx'
import Katalog from './pages/Katalog.jsx'
import Basket from './pages/Basket.jsx'
import Like from './pages/ Like.jsx'

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
        path: ":id",
        element: <Cardinfo />,
      },
      {
        path: "katalog",
        element: <Katalog />,
      },
      {
        path: "basket",
        element: <Basket />,
      },
      {
        path: "like",
        element: <Like />,
      }

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)