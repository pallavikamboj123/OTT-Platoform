import React, {Component} from 'react';
import {Card,CardBody,CardTitle} from 'reactstrap';


function RenderSpoiler({spoiler}){
    if(spoiler === true){
        return(
            <div>
                <h5>Spolier</h5>
            </div>
        );

    }
    else{
        return(
            <div>
                <h5>No Spoiler</h5>
            </div>
        );
    }
}

function RenderItem({reviews}){
    if(reviews){

        
        return reviews.map((item)=> {
            var shortReview;
            if(item.attributes.contentFormatted.length > 100){
                shortReview = item.attributes.contentFormatted.replace(/<\/?[^>]+>/gi, '').substring(0,100)+'...𝙧𝙚𝙖𝙙 𝙢𝙤𝙧𝙚';
            }
            else{
                shortReview = item.attributes.contentFormatted.replace(/<\/?[^>]+>/gi, '');
            }
            return(
                <div key={item.id} className="col-12 col-md-4">
                    <Card>
                        <CardTitle >
                            <div className="row justify-space-between">
                                <div>
                                    <h5>{item.attributes.rating}</h5>
                                </div>
                                <div>
                                    <RenderSpoiler spoiler={item.attributes.spoiler} />
                                </div>
                            </div>
                        </CardTitle>
                        <CardBody>
                            {shortReview}
                        </CardBody>
                    </Card>
                </div>
            );
        })
    }
    else{
        return(
            <div>
                Loading Reviews
            </div>
        );
    }
    
}

function RenderReview({reviews}){
    return(
        <>
            <div className="col-12" style={{background: 'rgb(245, 244, 244'}}>
                <h3>Reviews</h3>
                <div className="container">
                    <div className="row">
                        <RenderItem reviews={reviews}/>
                    </div>
                </div>
            </div>
        </>
    );
}
export default RenderReview;