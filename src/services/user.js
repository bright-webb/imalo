import React from 'react';
import $ from 'jquery';

class User extends React.Component {
    async get() {
      const token = localStorage.getItem('token');
      return new Promise((resolove, reject) =>{
        try {
          $.ajax({
            type: "GET",
            url: 'https://api.imbapano.com/api/user',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            success: function(response){
              resolove(response)
            }
          })
        } catch (error) {
          reject(error);
        }
      })
    }
  }
  
  export default User;
  