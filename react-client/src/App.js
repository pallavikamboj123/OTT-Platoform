import React, {Component} from 'react';
import './App.css';
 import Main from './components/mainComponent';

 import {Provider} from 'react-redux';
 import {ConfigureStore} from './redux/configureStore';
 


const store = ConfigureStore();

class App  extends Component{
  render(){
    return (
     
      <Provider store= {store}>
            <Main />
      </Provider>
        
    );
  }}
 
    

  
    


 export default App;
