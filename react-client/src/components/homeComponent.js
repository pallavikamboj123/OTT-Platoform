import React, {Component} from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink ,
 Button, ModalHeader, ModalBody,
Modal, Label, Card, CardImg,
CardTitle, CardBody, Row, Col} from 'reactstrap';
import {LocalForm,Control} from 'react-redux-form';
import {Link} from 'react-router-dom';
import '../css/home.css';
import Search from './searchComponent';



function RenderItem({item}){
    // console.log(item);
    return(
        <div>
        <Card >
            <Link to={`/movies/${item.id}`}>
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
          </Link>
        </Card>
      </div>
    );
}

function RenderAnimeItem({item}){
    return(
        <div>
            <Card>
                <CardImg height="500px" src={item.attributes.posterImage.original} alt="poster" />
                <CardBody>
                    <CardTitle><h3>{item.attributes.canonicalTitle}</h3></CardTitle>
                    <div className="container mt-4 mb-2">
                        <div className="row justify-content-between">
                            <div>
                                <Button className="btn btn-danger">Watch now</Button>
                            </div>
                            <div>
                                <Button className="btn btn-danger">Add to watchlist</Button>
                            </div>
                        </div>

                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderItems({trending}){
    
//    console.log(trending.trending.data);
        //    console.log(trending," inside home");
           if(trending.isLoading === true){
            return(
                <h4>Loading something</h4>
            );
           }
           else{
              return  trending.trending.data.map((item)=>{
                return(
                    <div className="col-12 col-sm-4 mb-5" key={item.id}>
                        <RenderAnimeItem item = {item} />
                    </div> 
                    
                );
               })
            
           }
               
         
    
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
                        <Search />
                    </div>
                <div className="container-fluid mt-5" id="render-items" >
                    <div className="row justify-content-center">
                        <h1 className="mt-5 mb-5" >Trending Anime</h1>
                        </div>
                    
                    <div className="row">
                        
                           <RenderItems trending={this.props.trending} />
                       
                     </div>
                </div>
                </div>
               
            
            
           
            
        </>
        );
    }
}

export default Home;