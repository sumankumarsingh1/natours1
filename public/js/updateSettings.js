/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

// Type : 'password' or 'data'
export const updateSettings = async (data, type) => {
  try{
    const url = type === 'password' 
    ? '/api/v1/users/updateMyPassword'
    : '/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    console.log(res.data.status);
    if (res.data.status === 'success'){
      showAlert('success', `${type.toUpperCase()} updated successfully`);
    } 
  } catch (err) {
    console.log(err.response.data.message);
    showAlert('error', err.response.data.message);
  }
};

