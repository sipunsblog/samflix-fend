import "../css/Banner.css";
import {Link} from "react-router-dom"


function Banner(props){
    // function userMovieModelCheck(){
    //     fetch("http://localhost:8000/movies/movieplayed/",{
    //         method:"POST",
    //         "Content-Type":"application/json",
    //     })
    //     .then(data=>data.json())
    //     .then(data=>{
    //     })
    //     .catch(err=>{
    //     })
    // }
    // function playMovie(status){
        
    // }
    return(
        <section className="bannerComp">
            <div className="bannerWrapeer">
                <img src={props.topMovie?.posterUrl} alt="top-movie" />
                <div className="banner-overlay" >
                    <div className="banner-content">
                        <h1> {props.topMovie?.name} </h1>
                        <p>
                            {props.topMovie?.description?.substr(0,150)+" ....."}
                        </p>
                        <Link to={`/play/${props.topMovie?._id}`}>
                            <button>WATCH NOW</button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner;