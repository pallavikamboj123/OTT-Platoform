import React,{Component} from 'react';
import '../css/home.css';
import {Form, FormGroup, Input, Button} from 'reactstrap';
import {LocalForm,Control} from 'react-redux-form';


class Mainpagecontent extends Component{
    constructor(props){
        super(props);
        
    }

  
    render()
   { return (
        <div className="container mt-5">
                    <div className="row justify-content-center">
                        <h1 className="main-heading">Dramas to explore</h1>
                    </div>
                    <div className="row justify-content-center">
                        <p className="main-paragraph">search for your favorite drama <span className="d-none d-md-inline">and add them in your wishlist</span></p>
                    </div>
                    <div className="row mt-3  justify-content-center">
                        <div>
                            <LocalForm >
                                <FormGroup className="col-8 formgroup-main">
                                    <Control.text model=".searchInput" className="form-control pl-sm-5" name="search" id="searchInput" placeholder="search drama..."
                                        
                                    />
                                </FormGroup>
                                <Button className="col-3 col-sm-3 pl-sm-3 pr-sm-3" id="search-button">Search</Button>
                                
                            </LocalForm>
                        </div>
                    </div>
                </div>
    );}
}

export default Mainpagecontent;