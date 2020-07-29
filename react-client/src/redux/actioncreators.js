import * as ActionTypes from './actionTypes';


export const signUp = (firstname, lastname, username,password) => (dispatch)=>{
   const newUser = {
      firstname: firstname,
      lastname:lastname,
      username:username,
      password: password
   };

  
   console.log(newUser);

   newUser.date = new Date().toISOString();
   return fetch('http://localhost:5000/users/signup',{
      method:'POST',
      body: JSON.stringify(newUser),
      headers:{
         'Content-Type': 'application/json'
      },


   })
   .then(response=>{
      if(response.ok){
         return response;
      }
      else{
         var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
      }
   },error => {
      throw error;
   })
   .then(response => response.json())
   .then(response => alert(response + ' you are successfully signed up!'))
   .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};



export const requestLogin = (creds) => {
   return {
      type: ActionTypes.LOGIN_REQUEST,
      creds
   }
}

export const receiveLogin = (response) =>{
   return {
      type: ActionTypes.LOGIN_SUCCESS,
      token:  response.token
   }
}

  
export const loginError = (message) => {
   return {
       type: ActionTypes.LOGIN_FAILURE,
       message
   }
}

export const loginUser = (creds) => (dispatch)=>{
   
   dispatch(requestLogin(creds));
   console.log("creds are ",creds);
   return fetch('http://localhost:5000/users/login', {
      method: 'POST',
      headers:{
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(creds)
   })
   .then(response=>{
      console.log("inside response");
      if(response.ok){
         return response;
      }
      else {
         var error = new Error('Error ' + response.status + ': ' + response.statusText);
         error.response = response;
         console.log("error is  ", error);
         alert(response.status+" because of "+response.err);
         throw error;
     }
   },
   error => {
      console.log(error);
       throw error;
   })
   .then(response => response.json())
   .then(response => {
      console.log("inside response");
      console.log(response.status);
      if(response.success){
         localStorage.setItem('token', response.token);
         localStorage.setItem('creds', JSON.stringify(creds));
         dispatch(receiveLogin(response));
      }
      else{
         var error = new Error('Error '+ response.status );
         error.response = response;
         throw error;
      }
   })
   .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
   return {
     type: ActionTypes.LOGOUT_REQUEST
   }
}
 
export const receiveLogout = () => {
   return {
     type: ActionTypes.LOGOUT_SUCCESS
   }
}


export const logoutUser = () => (dispatch) => {
   dispatch(requestLogout())
   localStorage.removeItem('token');
   localStorage.removeItem('creds');
   // dispatch(favoritesFailed("Error 401: Unauthorized"));
   dispatch(receiveLogout())
}


// https://mydramalist.github.io/MDL-API/#introduction