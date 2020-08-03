import React from 'react';
import {Card, CardImg,CardTitle} from 'reactstrap';



function RenderLeadEpisodes({item,streamingLinks}){
    // console.log(streamingLinks[0].attributes);
    const link = streamingLinks[0].attributes.url;
    return(
        <>
            <div key={item.id} className="col-12 col-md-3 mb-3 mt-3">
                <a href={link} style={{color:'black', listStyle: 'none'}}>
                    <Card>
                        <CardTitle style={{textAlign: 'center'}}>
                            {item.attributes.canonicalTitle}
                        </CardTitle>
                        <CardImg src={item.attributes.thumbnail.original} alt="thumbnail"></CardImg>
                    </Card>
                </a>
            </div>
        
        </>
    );
}

function RenderItem({episodes,streamingLinks}){
    if(episodes && streamingLinks){
        return episodes.map((item)=>{
            return(
                
                   
                    <RenderLeadEpisodes item = {item} streamingLinks={streamingLinks} />
               
                
            );
        })
    }
    else{
        return(
            <div>
                <h2>Loading Episodes</h2>
            </div>
        );
    }
}

function RenderEpisodes({episodes,streamingLinks}){
    return(
        <>
            <div className="col-12 mb-5" >
                <h2 style={{fontWeight: 'bold', textAlign: 'center'}} className="mt-4 mb-5 ml-5">Episodes</h2>
                <div className="container">
                    <div className="row  mb-5">
                        <RenderItem 
                            episodes={episodes}
                            streamingLinks = {streamingLinks}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
export default RenderEpisodes;