import "../css/MovieList.css";
import {Link} from "react-router-dom"


function MovieList(props){
    return(
        <section className="moviesList" style={props.setColor!==null ? props.setColor : {} }>
            <h2>{props.sectionType}</h2>
            <div className="allMovies">
                {
                    props.movies?.map((ele,ind)=>{
                        let marginLogic =ind===0? 'eachMovie no-margin' : 'eachMovie';
                        return(
                            
                            <div className={marginLogic} key={ind} >
                                <img src={ele.posterUrl} alt="moviePoster" />
                                <div className="movie-overlay">
                                    <div className="movie_details">
                                        <h2 className="movie-title">{ele.name.length>21 ? ele.name.substr(0,21) +".." : ele.name }</h2>
                                        <div className="movie-action">
                                            <Link to={`/play/${ele._id}`}>
                                                <button className="movie-watch-now-btn">WATCH NOW</button>
                                            </Link>
                                            <div className="rattings">
                                                {ele.imdbRate} <i className="fa-solid fa-star star"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                
                

            </div>
        </section>
    )
}

export default MovieList