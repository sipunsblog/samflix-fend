import Bar from "../components/Bar";
import { useParams,Navigate,useNavigate } from "react-router-dom";
import {useEffect, useState,useRef} from "react";



function Streampage(props){
    let gotoPage = useNavigate();

    let mySamflixToken =JSON.parse(localStorage.getItem("samflixTokenId"));

    let movieID = useParams();
    let [playMovie,setPlayMovie] = useState({});
    let [moviePlayStatus , setMoviePlayStatus] = useState(false);
    let [closedvdo,setClosedvdo] = useState();
    let vdo = useRef();
    function setCloseTimePlayer(){
        let bodyDta = JSON.stringify({watched:vdo.current?.currentTime});
        fetch(`http://localhost:8000/movies/stream/close/${closedvdo}`,{
            method:"PUT",
            headers:{
                "Authorization":`Bearer ${mySamflixToken.token}`,
                "Content-Type":"application/json"
            },
            body:bodyDta
        })
        .then(prom=>prom.json())
        .then(data=>{
        })
        .catch(err=>{
        })

    }
    useEffect(()=>{


        fetch(`http://localhost:8000/movies/${movieID.id}`,{
        headers:{
            "Authorization":`Bearer ${mySamflixToken.token}`
        }
        })
        .then(data=>data.json())
        .then(allMovies=>{
            // gotoPage(`/play/${movieID.id}`);
            setMoviePlayStatus(false);
            setPlayMovie(allMovies.results)
        })
        .catch((err)=>console.log(err))

    },[movieID.id])

    useEffect(()=>{
        if(moviePlayStatus === true ){
            vdo.current.currentTime =2

            // vdo.current.currentTime = playMovie.watchTime;
            // vdo.current.currentTime = playMovie?.watchTime;
        }
    },[moviePlayStatus])
    function userMovieModelCheck(){
        let mySamflixToken =JSON.parse(localStorage.getItem("samflixTokenId"));
        let bodyData = {
            userID:mySamflixToken.userID,
            movieID:movieID.id
        }
        fetch("http://localhost:8000/movies/movieplayed/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${mySamflixToken.token}`
            },
            body:JSON.stringify(bodyData)
        })
        .then(data=>data.json())
        .then(data=>{
            if(data.status===200){
                setMoviePlayStatus(true); //,movid:data.movieid
                // playMoviePlayer(data.movieid);
                setClosedvdo(data.movieid);
            }else{
                setMoviePlayStatus(false)
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    function closePlayer(){
        setCloseTimePlayer();
        setMoviePlayStatus(false);
    }
    


    return(
        <>  
            <Bar  />
            {
            moviePlayStatus ? 
            
            (
                <section className="bannerComp">
                    <div className="bannerWrapeer">
                        <div className="closePlayer" >
                            <i onClick={()=>{ closePlayer() }} className="fa-solid fa-circle-xmark">❌</i>
                        </div>
                        <video ref={vdo}  controls className="videoPlayer" autoPlay={true} >
                            <source src={`http://localhost:8000/movies/stream/play/${movieID.id}`} />
                        </video>
                    </div>
                </section>
            )
            
            :
        
            (
                <>
                    <section className="bannerComp ">
                        <div className="bannerWrapeer">
                            <img src={playMovie.posterUrl} alt="top-movie" />
                            <div className="banner-overlay" >
                                <div className="banner-content">
                                    <h1> {playMovie.name}</h1>
                                    <p>
                                        {playMovie.description?.substr(0,150)+" ....."}
                                    </p>
                                        <button onClick={()=>{ userMovieModelCheck() }} >PLAY MOVIE</button>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="movieDetails">
                        <div className="movieDetails-Footer">
                            <h3>MOVIE DESCRIPTION</h3><i className="fa-solid fa-circle-info info"></i>
                            <p>
                                {playMovie.description}
                            </p>
                        </div>
                        <div className="movieDetails-Footer">
                            <h3>TOTAL VIEWS</h3><br />
                            <p> {playMovie.views} </p> <i className="fa-solid fa-eye star-css"></i><br />
                            
                            <h3>IMDB RATE</h3><br />
                            <p>
                                {playMovie.imdbRate} 
                            </p><i className="fa-solid fa-star star-css"></i>
                        </div>
                        <div className="movieDetails-Footer">
                            <h3>RELEASE DATE</h3><br />
                            <p> {playMovie.releaseDate} </p><br />
                            <h3>GENRES</h3><br />
                            <p>
                                {playMovie.genre}
                            </p><br />
                        </div>
                        <div className="movieDetails-Footer">
                            <h3>STAR CAST</h3><br />
                            <p> {playMovie.starCast} </p>
                        </div>
                    </div>
                </>
            )
        
        
            }
            
        </>
        
    )
}

export default Streampage;