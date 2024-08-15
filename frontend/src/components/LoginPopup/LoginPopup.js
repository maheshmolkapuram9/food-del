import { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/Storecontext";
import axios from "axios";

const LoginPopup = ({setShowLogin}) => {
    const {url, setToken} = useContext(StoreContext);
    const [currentState, setCurrentState] = useState("Login");

    const [data, setData] = useState({
        name : "",
        email : "",
        password : ""
    })

    const onChangeHandler = (e)=>{
        const {name, value} = e.target;
        setData((prev)=>(
            {...prev,
                [name] : value
            }
        ))
    }

    const onLogin = async(e)=>{
        e.preventDefault();
        let newUrl = url;
        if (currentState === "Login"){
            newUrl += "/api/user/login"
        } else {
            newUrl += "/api/user/register"
        }
        const response = await axios.post(newUrl, data);
        if (response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
        } else {
            alert(response.data.message)
        }
    }

    return ( 
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="cross icon" />
                </div>
                <div className="login-popup-inputs">
                    {currentState==="Sign Up" && 
                    <input 
                        type="text" 
                        name="name" 
                        onChange={onChangeHandler} 
                        value={data.name} 
                        placeholder="your name" 
                        required
                    /> 
                    }
                    <input 
                        type="email" 
                        name="email" 
                        onChange={onChangeHandler} 
                        value={data.email} 
                        placeholder="your email" 
                        required 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        onChange={onChangeHandler} 
                        value={data.password}
                        placeholder="your password" 
                        required 
                    />
                </div>
                <button type="submit">{currentState==="Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & privacy policy</p>
                </div>
                {currentState==="Sign Up" ? 
                <p>Already have an account <span onClick={()=>setCurrentState("Login")}>Login here</span></p> : 
                <p>Create a new account? <span onClick={()=>setCurrentState("Sign Up")}>click here</span></p>
                }
            </form>
        </div>
     );
}
 
export default LoginPopup;