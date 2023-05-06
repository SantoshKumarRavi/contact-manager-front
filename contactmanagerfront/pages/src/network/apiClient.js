import axios from 'axios';
export const axiosClient = axios.create({
    baseURL:process.env.NEXT_PUBLIC_BACKEND_DEPLOY||process.env.NEXT_PUBLIC_BACKEND_LOCAL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  axiosClient.interceptors.response.use(
    function (response) {
      return response;
    }, 
    function (error) {
      let res = error.response;
      if (res.status === 401) {
        window.location.href = `${process.env.REACT_APP_BACKEND_DEPLOY||process.env.REACT_APP_BACKEND_LOCAL}/login`
      }
      console.error("Looks like there was a problem. Status Code: " + res.status);
      return Promise.reject(error);
    }
  );