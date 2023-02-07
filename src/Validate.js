import {Navigate} from "react-router-dom";
function Validate(props){
    let token = JSON.parse(localStorage.getItem("samflixTokenId"));
    if(localStorage.getItem("samflixTokenId")===null){
        return   <Navigate to="/login" /> 
    }else if(Array.isArray(token)){
        return Object.keys(token).length  !==0 ? props.children : <Navigate to="/login" /> ;
    }else{
        return  props.children ;
    }
}

export default Validate;