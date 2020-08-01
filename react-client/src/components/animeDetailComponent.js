import React, {Component} from 'react';
import { Card, CardImg} from 'reactstrap';
import '../css/animeDetail.css'




class AnimeDetail extends Component{
    constructor(props){
        super(props);
    }
    render(){
       
        const anime=  this.props.anime;

        return(
            <div >
                <div  >
                    <div className="animeDetail" style={{backgroundImage:` linear-gradient(to right bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),url(${anime.attributes.coverImage.original})`}}> 
                        <div  style={{height: "300px"}}></div>
                        <div className="animeContainer ">
                            <div className="container-fluid">
                                <div className="row mt-5">
                                    <div className="col col-md-4 mt-3">
                                        <Card >
                                            <CardImg src={anime.attributes.posterImage.original} alt="anime poster" />
                                        </Card>
                                    </div>
                               
                                <div className="col col-md-8">
                              
                                <div className="container-fluid">
                                    <div className="row justify-content-center">
                                        <div className="col mt-4">
                                            <h3 style={{color: "rgb(255,0,0)"}}>
                                                {anime.attributes.canonicalTitle}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="row justify-content-around">
                                        <p className="text-muted">Favourite Count: <p style={{color: 'black'}}>{anime.attributes.favoritesCount}</p></p>
                                        <p className="text-muted">Average Count: {anime.attributes.averageRating}</p>
                                    </div>
                                    <div className="row justify-content-space-around">
                                        <p className="text-muted">Favourite Count: ${anime.attributes.favoritesCount}</p>
                                        <p className="text-muted">Average Count: ${anime.attributes.averageRating}</p>
                                    </div>
                                </div>
                                      
                                </div>
                                </div>
                                
                            </div>
                        </div>
                        </div>
                        
                    
                </div>
            </div>
            
        );
    }
}

export default AnimeDetail;