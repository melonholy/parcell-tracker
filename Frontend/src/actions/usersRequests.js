import axios from "axios";

export const searchCurrentUser = userId => {
  return axios
    .get(`/api/users/${userId}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return err.response;
    });
};

export const addParcellToUser = parcell => {
  return axios
    .post(`/api/users/addParcell`, parcell)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return err.response;
    });
};

export const searchParcellsFromUser = id => {
  return axios
    .get(`/api/users/parcell/${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return err.response;
    });
};

export const deleteParcellsFromUser = parcell => {
  return axios
    .delete(`/api/users/deleteParcell`, { data: parcell })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return err.response;
    });
};


export const checkStatus = () => {
  axios
    .get(`/api/users/checkStatus`)
};
