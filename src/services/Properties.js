import React from 'react';
import $ from 'jquery';
import { API_URL } from '../utils/config';

class Property extends React.Component {
  async list() {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        url: 'https://api.imbapano.com/api/properties',
        contentType: 'application/json',
        cache: false,
        processData: false,
        success: function (response) {
          resolve(response);
        },
        error: function (xhr, error, status) {
          reject(error);
        },
      });
    });
  }

  async getProperty(id) { // retrieve a single property by id
    const url = `${API_URL}/properties/${id}`;
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        console.error('Error:', data);
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  }
}

export default Property;
