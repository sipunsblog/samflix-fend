import "../css/Register.css";
import {useRef} from "react";
import {useNavigate,Link} from "react-router-dom";
import Message from "../components/Message";
import { useState } from "react";
const banner = require("../images/loginRegBanner.png");

function Login(){
    let myform = useRef();
    let loginUserObj = {};
    let navigateToLocation = useNavigate();
    let [message,setMessage] = useState(false);
    let [messageval,setMessageVal] = useState({});
    function putDynamicValue(property,val){
        loginUserObj[property] = val;
    }
    function loginRequest(){
        fetch("http://localhost:8000/users/logIN",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(loginUserObj)
        })
        .then(data=>data.json())
        .then(loginRes=>{
            if(loginRes.status===200){
                let userTokenID = JSON.stringify({userID:loginRes.userid,token:loginRes.token});
                localStorage.setItem("samflixTokenId",userTokenID);
                setMessage(true);
                setMessageVal({status:200,message:"Login Sucessfull"});
            }else{
                setMessage(true);
                localStorage.setItem("samflixTokenId","");
                myform.current.reset();
                setMessageVal({status:204,message:"Id and password doesnot match"})

            }
            
        })
    }
    let x = 1000;
    if(messageval.status!==200){
        x=4000;
    }

    if(message){
        setTimeout(()=>{
            setMessage(false);
            if(messageval.status===200 ){
                navigateToLocation("/home");
            }
        },x)
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
                    <span>The New Era Of Watching Movies , Webseries , Tv-Shows ...</span>
                </div>
                <div className="register loginExtra">
                    <div>
                        <h3>Login Form</h3>
                    </div>
                    <div className="registration_action">
                        <form ref={myform}>
                            <div className="form-group">
                                <label htmlFor="emailid">Email Id</label>
                                <input type="email" className="form-control" id="emailid" onChange={(event)=>{ putDynamicValue("emailID",event.target.value); }}  placeholder="Enter Your emailid" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" onChange={(event)=>{ putDynamicValue("password",event.target.value); }}  placeholder="Enter Your password" />
                            </div>
                            <button  type="button" onClick={()=>{ loginRequest() }} className="register-btn">Login</button>
                           <p> Create one <Link to="/register"> Register </Link> !!</p>
                        </form>
                    </div>
                </div>
            </div>
            
        </section>
    )
}

export default Login;