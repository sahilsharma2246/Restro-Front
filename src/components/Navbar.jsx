import { Link } from "react-router-dom";
export default function Navbar(){
 return(
  <nav>
    <Link to="/">Home</Link>
    <Link to="/cart">Cart</Link>
    <Link to="/orders">Orders</Link>
    <Link to="/admin">Admin</Link>
  </nav>
 )
}
