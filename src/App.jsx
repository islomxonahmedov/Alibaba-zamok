import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

 
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default App