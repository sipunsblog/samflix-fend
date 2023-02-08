import "../css/Register.css";
import { useNavigate,Link } from "react-router-dom";
import {useRef,useState} from "react";
import Message from "../components/Message";
const banner = require("../images/loginRegBanner.png");
function Register(){
    let navigateToLocation = useNavigate();
    let register = {};
    let myform = useRef();
    let [message,setMessage] = useState(false);
    let [messageval,setMessageVal] = useState({});
    function putDynamicValue(property,value){
        register[property] = value;
    }
   async function registerUser(){
        if(Object.keys(register).length===4){
            let xx = await fetch("https://famous-panama-hat-worm.cyclic.app/users/",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(register)
            })
            let yy = await xx.json();
            if(yy.status===200){
                myform.current.reset();
                setMessage(true);
                setMessageVal(yy);
            }else{
                setMessage(true);
                setMessageVal(yy);
                myform.current.reset();
            }
        }else{
            setMessage(true);
            myform.current.reset();
            setMessageVal({message:"All fields are mandatory"});
        }
    }
    if(message){
            setTimeout(()=>{
                setMessage(false);
                if(messageval.status===200 ){
                    navigateToLocation("/login");
                }
            },3000)
    }
    return(
        <section className="registration-bg">
            {
                message?
                (
                    <Message displayMessage={messageval.message} />
                )
                :
                null
            }
            <img id="background" alt="background" src={String(banner)} />
            <div className="register-overlaay">
                <div className="registration-text">
                    <h1>
                    Introducing SAMFLIX 
                    </h1>
                    <br />
                    The New Era Of Watching Movies , Webseries , Tv-Shows ..
                </div>
                <div className="register">
                    <div>
                        <h3>Registration</h3>
                    </div>
                    <div className="registration_action">
                        <form ref={myform}>
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input type="text" required className="form-control" id="name" onChange={(event)=>{ putDynamicValue("name",event.target.value); }} placeholder="Enter Your Name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userid">User ID</label>
                                <input type="text" required className="form-control" id="userid" onChange={(event)=>{ putDynamicValue("userName",event.target.value); }}  placeholder="Enter Your userid" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="emailid">Email Id</label>
                                <input type="email" required className="form-control" id="emailid" onChange={(event)=>{ putDynamicValue("emailID",event.target.value); }}  placeholder="Enter Your emailid" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" required className="form-control" id="password" onChange={(event)=>{ putDynamicValue("password",event.target.value); }}  placeholder="Enter Your password" />
                            </div>
                            <button onClick={()=>{
                                registerUser()
                            }} type="button" className="register-btn">Register</button>
                           <p> Already a user <Link to="/login"> Login </Link> </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register;