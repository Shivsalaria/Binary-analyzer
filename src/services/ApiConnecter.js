// import axios from 'axios';
// const axiosInstance = axios.create({
//   withCredentials: true,
// });

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {

//     return Promise.reject(error.response);
//   },
// );


// export const apiConnecter = (method, url, bodyData = {}, headers = {}, params = {}) => {
//   return axiosInstance({
//     method: method,
//     url: url,
//     data: bodyData,
//     headers: headers,
//     params: params
//   });
// };



import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      return Promise.reject(error.response);
    } else if (error.request) {
      return Promise.reject(new Error('No response received from server'));
    } else {
      return Promise.reject(new Error(error.message));
    }
  },
);

export const apiConnecter = async (method, url, bodyData = {}, headers = {}, params = {}) => {
  try {
    const response = await axiosInstance({
      method: method,
      url: url,
      data: bodyData,
      headers: headers,
      params: params
    });
    return response;
  } catch (error) {
    // console.error('API Connector Error:', error);
    throw error;
  }
};