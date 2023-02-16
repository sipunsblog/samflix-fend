import "../css/Register.css";
import {useRef} from "react";
import {useNavigate,Link} from "react-router-dom";
import Message from "../components/Message";
import { useState } from "react";
const banner = require("../images/loginRegBanner.png");


function ForgetPw(){
    let myform = useRef();
    let loginUserObj = {};
    let navigateToLocation = useNavigate();
    let [message,setMessage] = useState(false);
    let [messageval,setMessageVal] = useState({});
    function putDynamicValue(property,val){
        loginUserObj[property] = val;
    }
    function loginRequest(){
        fetch("http://localhost:8000/users/sendOtp",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(loginUserObj)
        })
        .then(data=>data.json())
        .then(loginRes=>{
            if(loginRes.status===200){
                setMessage(true);
                setMessageVal({status:200,message:"Otp Sent Successfully"});
            }else{
                setMessage(false);
                myform.current.reset();
                setMessageVal({status:204,message:"Phone number not found"})
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
                navigateToLocation("/resetPW");
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
                        <h3>Reset Password Form</h3>
                    </div>
                    <div className="registration_action">
                        <form ref={myform}>
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input type="phone" className="form-control" id="phone" onChange={(event)=>{ putDynamicValue("userPhone",event.target.value); }}  placeholder="Enter Your phone number" />
                            </div>
                            <button  type="button" onClick={()=>{ loginRequest() }} className="register-btn">Generate Otp</button>
                           <p> Already exist! <Link to="/login"> Login </Link> !!</p>
                        </form>
                    </div>
                </div>
            </div>
            
        </section>
    )
}

export default ForgetPw;