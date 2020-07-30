import React from 'react';
import {Card, CardImg,Button} from 'reactstrap';
import {Link} from 'react-router-dom';

const baseUrl = "http://localhost:3000/";
function RenderImages({item}){
    console.log("inside render images");
    return (
        <Card>
            <CardImg top width="100%" height="250px" src={baseUrl+item.image} alt="image" />
        </Card>
    );
}

function RenderGener({item}){
    console.log(item," inside gener");
    return(<div>
        {item.map((item)=>{
            return (
                <p>{item}</p>
            );
        })}    
    </div>);
    
   
}


function RenderDescription({item}){
    return(
        <ul className="list-unstyled">
            <li>
                <p>{item.name}</p>
                <p>{item.Description}</p>
                <h4>Lead Actor:- </h4>
                <p>{item.leadBoy}</p>
                <h4>Lead Actress:- </h4>
                <p>{item.leadGirl}</p>
                <h4>Geners:-</h4>
                <div>
                    <RenderGener item={item.geners} />
                </div>
                
            </li>
        </ul>
    );
}

const MovieDetail = (props) => {
    console.log(props.movie);
    return (
        <div className="container">
            <div className="row justify-content-center mt-5 mb-5">
               <h2> Description of {props.movie.name}</h2>
            </div>
            <div className="row">
                <div className="col-12 col-md-6">
                    <RenderImages item={props.movie} />
                </div>
                <div className="col-12 col-md-6">
                    <RenderDescription item={props.movie} />
                </div>
            </div>
            <div className="row justify-content-center">
                <Link to="/">
                    <Button className="danger" >Back to Homepage</Button>
                </Link>
            </div>
        </div>
    );

}

export default MovieDetail;