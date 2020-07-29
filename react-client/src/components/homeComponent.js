import React, {Component} from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink ,
Form, FormGroup, Input, Button, ModalHeader, ModalBody,
Modal, Label, Card, CardImg,
CardTitle, CardBody, Row, Col} from 'reactstrap';
import {LocalForm,Control} from 'react-redux-form';
import '../css/home.css'



function Mainpagecontent(){
    return (
        <div className="container mt-5">
                    <div className="row justify-content-center">
                        <h1 className="main-heading">Dramas to explore</h1>
                    </div>
                    <div className="row justify-content-center">
                        <p className="main-paragraph">search for your favorite drama <span className="d-none d-md-inline">and add them in your wishlist</span></p>
                    </div>
                    <div className="row mt-3  justify-content-center">
                        <div>
                            <Form >
                                <FormGroup className="col-8 formgroup-main">
                                    <Input type="text" className="pl-sm-5" name="search" id="searchInput" placeholder="search drama..."></Input>
                                </FormGroup>
                                <Button className="col-3 col-sm-3 pl-sm-3 pr-sm-3" id="search-button">Search</Button>
                                
                            </Form>
                        </div>
                    </div>
                </div>
    );
}

function RenderItem({item}){
    // console.log(item);
    return(
        <div>
        <Card >
          <CardImg top width="100%" height="250px" src={item.image} alt="Card image cap" />
          <CardBody className="card-body">
            <CardTitle className="h5 text-center mt-3 mb-4">{item.name}</CardTitle>
            <div className="container">
                <div className="row justify-content-space-between">
                    <Button className="btn btn-danger">Watch trailer</Button>
                    <Button className="btn btn-danger ml-auto">Add to watchlist</Button>
                </div>
            </div>
            
          </CardBody>
        </Card>
      </div>
    );
}

     

class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            isNavOpen: false,
            isloginModalOpen: false,
            issignupModalOpen: false,
        
        }
        this.toggleNav = this.toggleNav.bind(this);
        this.logintoggleModal = this.logintoggleModal.bind(this);
        this.signuptoggleModal = this.signuptoggleModal.bind(this);
        this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    }

    toggleNav(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
    logintoggleModal(){
        this.setState({
            isloginModalOpen: !this.state.isloginModalOpen
        });
    }
    signuptoggleModal(){
        this.setState({
            issignupModalOpen: !this.state.issignupModalOpen
        });
    }

    handleSignUpSubmit(values){
        this.signuptoggleModal();
        this.props.signUp(values.firstname, values.lastname, values.username, values.password);
    }
    handleLoginsubmit(values){
        this.logintoggleModal();
        console.log("values are ", values);
        this.props.loginUser(values);
    }
    
    render(){
        
        const renderItems = this.props.trending.map((item) => {
            return(
         
                        <div className="col-12 col-sm-4 mb-5" key={item.id}>
                        <RenderItem item = {item} />
                    </div> 
              
            );
        })


        return(
            <>
            <div className="main-module">
            <Navbar expand="md" className="mb-4">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} className="toggler-main-module" >
                            <span className="fa fa-bars fa-lg"></span>
                        </NavbarToggler>
                        <NavbarBrand className="mr-auto nav-module-brand" href="#">
                            Korean-Drama
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {/* <Login isAuth = {this.props.auth.isAuthenticated}/>
                            <Signup isAuth = {this.props.auth.isAuthenticated} />
                            <Logout isAuth = {this.props.auth.isAuthenticated} /> */}
                            {!this.props.auth.isAuthenticated ?
                                <NavItem>
                                    <NavLink className="nav-link"  to="#">
                                        <Button  onClick= {this.logintoggleModal} className="nav-module">
                                            Login
                                        </Button>
                                        
                                    </NavLink>
                               </NavItem>
                            
                            
                            :
                                <NavItem>
                                    <NavLink className="nav-link" to="#">
                                        <Button   onClick = {this.props.logoutUser} className="nav-module">
                                            Logout
                                           
                                        </Button>
                                    </NavLink>
                                </NavItem>
                            }
                            {!this.props.auth.isAuthenticated ?
                            <NavItem>
                                <NavLink className="nav-link" to="#">
                                    <Button  onClick={this.signuptoggleModal} className="nav-module">
                                        Sign-up
                                    </Button>
                                </NavLink>
                            </NavItem>
                            :
                                <></>
                            }
                            <NavItem>
                                <NavLink className="nav-link" to="#">
                                    <Button  className="nav-module">
                                        Watchlist
                                    </Button>
                                </NavLink>
                            </NavItem>
                        </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Modal isOpen ={this.state.isloginModalOpen} contentClassName="modalmainpage" className="mt-5" toggle={this.logintoggleModal} >
                    <ModalHeader  className="modal-header" toggle={this.logintoggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values=> this.handleLoginsubmit(values)}>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="username">Username</Label>
                                    <Control.text className="form-control form-input-modal" type="text" id="username" model=".username" placeholder="Johndoe@gmail.com"/>
                                </Col>
                                
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="password">Password</Label>
                                    <Control.text className="form-control form-input-modal" type="password" id="password" model=".password" placeholder="your password"/>
                                </Col>
                               
                            </Row>
                            <Button type="submit" name="submit" color="danger">Login</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <Modal isOpen ={this.state.issignupModalOpen} toggle={this.signuptoggleModal} contentClassName="modalmainpage">
                    <ModalHeader contentClassName="modal-header" toggle={this.signuptoggleModal}>Sign-up</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSignUpSubmit(values)}>
                            <Row className="form-group">
                                <Col>
                              
                                <Label htmlFor="firstname">First Name</Label>
                                <Control.text className="form-control form-input-modal"  id="firstname"
                            
                                    placeholder="John" model=".firstname"/>
                                </Col>
                            </Row>
                        
                            <Row className="form-group">
                                <Col>
                                <Label htmlFor="lastname">Last Name</Label>
                                <Control.text className="form-control form-input-modal"  id="lastname" 

                                placeholder="Doe" model=".lastname"/>
                                </Col>
                                
                            </Row>
                            <Row className="form-group">
                            <Col>
                                <Label htmlFor="username">Username</Label>
                                <Control.text className="form-control form-input-modal"  id="username"  
                                 placeholder="Johndoe@gmail.com" 
                               
                                 model=".username"/>
                                 
                                </Col>
                            </Row>
                            <Row className="form-group">
                            <Col>
                                <Label htmlFor="password">Password</Label>
                                <Control.text className="form-control form-input-modal"  id="password" 
                                model=".password" 
                                 placeholder="your password"/>
                                </Col>
                            </Row>
                            {/* <FormGroup>
                                <Label htmlFor="confirmpassword">Confirm Password</Label>
                                <Input className="form-input-modal" type="password" id="confirmpassword" name="confirmpassword" placeholder="your password"/>  
                            </FormGroup> */}
                            <Button type="submit" name="submit" color="danger">Sign Up</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                <div class="row mb-5">
                        <Mainpagecontent />
                    </div>
                <div className="container-fluid mt-5" id="render-items" >
                    <div className="row justify-content-center">
                        <h1 className="mt-5 mb-5" >Trending Dramas</h1>
                        </div>
                    
                    <div className="row">
                        
                            {renderItems}
                       
                     </div>
                </div>
                </div>
               
            
            
           
            
        </>
        );
    }
}

export default Home;