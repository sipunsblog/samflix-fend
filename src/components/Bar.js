import "../css/Bar.css";
import {useState} from "react";
import MovieList from "./MovieList";
import { Link,useNavigate } from "react-router-dom";

function Bar(){
    let [searchedMovies,setSearchedMovies] = useState([]);
    let [showOrNot,setShowOrNot] = useState(false);
    let [checkArr,setCheckArr]   = useState(false);
    let [searchHeading,setSearchHeading] = useState();

    let [logout,setLogout] = useState(false);

    let gotoPage = useNavigate();

    function searchMovies(val){
        let mySamflixToken =JSON.parse(localStorage.getItem("samflixTokenId")).token;
        fetch(`https://famous-panama-hat-worm.cyclic.app/movies/search/${val}`,{
            headers:{
                "Authorization":`Bearer ${mySamflixToken}`
            }
        })
        .then(data=>data.json())
        .then(allMovies=>{
            if(val.length>=1){
                setSearchedMovies(allMovies.results);
                setShowOrNot(true)
                if( allMovies.results.length === 0  ){
                    setCheckArr(false);
                    setSearchHeading("No Record Found");
                }else{
                    setCheckArr(true)
                    setSearchHeading("Searched Movies");
                }
            }else{
                setCheckArr(false);
                setSearchedMovies([]);
                setShowOrNot(true)

            }
        })
        .catch((err)=>console.log(err))
    }
    function logoutUser(){
        localStorage.setItem("samflixTokenId",'{}');
        gotoPage("/login")
    }
    return(
        <div className="headerParent">    
            <header className="headerBar">
                <a href="/home">
                    <h2>SAM FLIX</h2>
                </a>
                <div className="headerAction">
                    <div className="search-action">
                        <input type="text" onKeyUp={(event)=>searchMovies(event.target.value)} onBlur={()=>{ checkArr? setShowOrNot(true): setShowOrNot(false)}} /><i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <div className="user-icon">
                        <i onClick={()=>{ logout ? setLogout(false) : setLogout(true) }} className="setting">⚙️</i>
                    </div>
                    { logout ? 
                        (
                            <div className="logout">
                                <span onClick={()=>{ logoutUser() }} >Logout</span>
                            </div>
                        )
                        :
                        null
                
                    }
                    
                </div>
            </header>
            
            {
                showOrNot? 
                (
                    <div className="searchRes">
                        <MovieList sectionType={searchHeading} movies={searchedMovies} setColor = {{backgroundColor:'#2f2f3df5'}} />
                    </div>
                )
                :
                null
            }
        </div>
    )
}

export default Bar;