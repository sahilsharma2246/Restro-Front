import { useAuth } from "../context/AuthContext";

export default function Login(){
 const {login}=useAuth();
 return <button onClick={()=>login({name:"user"})}>Login</button>
}
