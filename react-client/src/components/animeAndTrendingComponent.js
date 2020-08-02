import React, {Component} from 'react';
import {Card,CardBody,CardImg,CardTitle,Button,CardSubtitle} from 'reactstrap';

import {Link} from 'react-router-dom';
import '../css/home.css';


function RenderAnimeItem({item, animeImport,fetchAnimeReviews, fetchAnimeEpisodes, fetchAnimeStreamingLinks}){

    function handleOnClick(animeId){
        fetchAnimeReviews(animeId);
        fetchAnimeEpisodes(animeId);
        fetchAnimeStreamingLinks(animeId);
    }


    return(
        <div>
           
            <Card height="700px" >
                <CardImg height="500px" src={item.attributes.posterImage.original} alt="poster" />
                <CardBody >
                    <CardTitle styl={{fontSize: '25px'}}>{item.attributes.canonicalTitle}</CardTitle>
    <CardSubtitle className="text-muted" style={{fontSize: '12px'}}>Episode: {item.attributes.episodeCount}/ Age rating: {item.attributes.ageRatingGuide}</CardSubtitle>
                    <div className="container mt-4 mb-2">
                        <div className="row justify-content-between">
                            <div>
                                <a href={`https://www.youtube.com/watch?v=${item.attributes.youtubeVideoId}`}>
                                <Button style={{background: 'white', color: 'Red'}} className="btn btn-outline-danger">Watch Trailer</Button>
                                </a>
                                
                            </div>
                            <div>
                                {animeImport? 
                                    <Link to={`/anime/${item.id}`}>
                                        <Button  value={item.id} onClick= {e => handleOnClick(e.target.value)} className="btn btn-danger">More Details</Button>
                                    </Link>
                                :
                                    <Link to={`/trending/${item.id}`}>
                                        <Button value={item.id} onClick= {e => handleOnClick(e.target.value)}  className="btn btn-danger">More Details</Button>
                                    </Link>
                                }
                            </div>
                        </div>

                    </div>
                </CardBody>
            </Card>
           
        </div>
    );
}

function RenderItems({trending,anime, fetchAnimeReviews,fetchAnimeEpisodes,fetchAnimeStreamingLinks}){
    if(anime.isImport === false)
        {if(trending.isLoading === true){
            return(
                <div className="row justify-content-center">
                    <h4>Loading Trending.....</h4>
                </div>
                
            );
           }
           else{
              return  trending.trending.data.map((item)=>{
                return(
                    <div className="col-12 col-sm-6 col-lg-4 mb-5" key={item.id}>
                        <RenderAnimeItem item = {item} animeImport = {anime.isImport} 
                                fetchAnimeReviews = {fetchAnimeReviews}
                                fetchAnimeEpisodes = {fetchAnimeEpisodes}
                                fetchAnimeStreamingLinks = {fetchAnimeStreamingLinks}
                        />
                    </div> 
                    
                );
               })
            
           }}
           else{
            if(anime.isLoading === true){
                return(
                    <div className="row justify-content-center">
                        <h4 >Loading Animes.....</h4>
                    </div>
                    
                );
               }
               else{
                  return  anime.anime.data.map((item)=>{
                    return(
                        <div className="col-12 col-sm-2 col-md-4 mb-5" key={item.id}>
                            <RenderAnimeItem item = {item} animeImport = {anime.isImport}
                                fetchAnimeReviews = {fetchAnimeReviews}
                                fetchAnimeEpisodes = {fetchAnimeEpisodes}
                                fetchAnimeStreamingLinks = {fetchAnimeStreamingLinks}
                            />
                        </div> 
                        
                    );
                   })
                
               }}
           }
    

function LoadTitle({animeImport, anime}){
    if(animeImport === false){
        return(
            <h1 className="mt-5 mb-5" >Trending Anime</h1>
        );
    }
    else{
        if(anime.isLoading === true)
        {return(
            <h1 className="mt-5 mb-5" >

            </h1>
        );}
        else{
            return(
                <h1 className="mt-5 mb-5">
                    {anime.anime.data[0].attributes.canonicalTitle}
                </h1>
            );
        }
    }
   
}


function RenderAnime({trending, anime,fetchAnimeReviews, fetchAnimeEpisodes, fetchAnimeStreamingLinks}){
    return(
        <>
            <div className="row justify-content-center">
                <LoadTitle animeImport={anime.isImport}  anime={anime}/>
                
            </div>
            <div className="row">
                <RenderItems trending={ trending} anime={anime} 
                    fetchAnimeReviews = {fetchAnimeReviews}
                    fetchAnimeEpisodes = {fetchAnimeEpisodes}
                    fetchAnimeStreamingLinks = {fetchAnimeStreamingLinks}

                />
            </div>
        </>
    );
}

export default RenderAnime;