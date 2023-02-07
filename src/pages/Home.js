import Banner from "../components/Banner";
import Bar from "../components/Bar";
import MovieList from "../components/MovieList";
import {useEffect,useState} from "react";

function Home(){
    let [dramaMovie,setDramaMovie] = useState();
    let [sciFiMovie,setsciFiMovie] = useState();
    let [popularityMovie,setPopularityMovie] = useState();
    let [topMovie,setTopMovie] = useState();
    useEffect(()=>{
        let mySamflixToken =JSON.parse(localStorage.getItem("samflixTokenId"));

        fetch("http://localhost:8000/movies/",{
            headers:{
                "Authorization":`Bearer ${mySamflixToken.token}`
            }
        })
        .then(data=>data.json())
        .then(allMovies=>{
            let allDramaMovies = allMovies.filter((ele)=>ele.genre.includes("Drama"));
            let allSciFiMovies = allMovies.filter((ele)=>ele.genre.includes("Sci-fi"));
            let moviesByPopularity = allMovies.sort((a,b)=>a.views-b.views);
            let top_movie = allMovies.find((ele)=>ele.top===1);
            setDramaMovie(allDramaMovies);
            setsciFiMovie(allSciFiMovies);
            setPopularityMovie(moviesByPopularity.splice(0,6));
            setTopMovie(top_movie);
        })
    
    },[])

    return(
        <div className="home">
            <Bar />
            <Banner topMovie = {topMovie} buttonStatus = {"WATCH NOW"} />
            <MovieList sectionType="TOP TRENDING" movies={popularityMovie} />
            <MovieList sectionType="SCI-FI" movies={sciFiMovie} />
            <MovieList sectionType="BEST OF ALL TIME" movies={dramaMovie} />
        </div>
    )
}
export default Home;