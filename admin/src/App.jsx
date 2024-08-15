import Navbar from "./components/Navar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import {Route, Routes} from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const endPointUrl = "http://localhost:3123";

  return ( 
    <div>
    <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add endPointUrl={endPointUrl}/>}/>
          <Route path="/list" element={<List endPointUrl={endPointUrl}/>}/>
          <Route path="/orders" element={<Orders endPointUrl={endPointUrl}/>}/>
        </Routes>
      </div>
    </div>
   );
}
 
export default App;