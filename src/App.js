import {BrowserRouter,Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App(){
 return(
  <BrowserRouter>
   <Navbar/>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/orders" element={<ProtectedRoute><MyOrders/></ProtectedRoute>}/>
    <Route path="/admin" element={<ProtectedRoute admin={true}><AdminDashboard/></ProtectedRoute>}/>
    <Route path="/admin/orders" element={<ProtectedRoute admin={true}><AdminOrders/></ProtectedRoute>}/>
   </Routes>
  </BrowserRouter>
 )
}
