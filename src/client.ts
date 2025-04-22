/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

// for database
export const fetchAllUsers = async () => {
    const response = await axios.get(`${REMOTE_SERVER}/api/users`);
    return response.data;
  };  
export const fetchUserById = async (id: any) => {
  const response = await axios.get(`${REMOTE_SERVER}/api/users/${id}`);
  return response.data;
}
export const postUsers = async () => {
const response = await axios.post(`${REMOTE_SERVER}/api/users`);
return response.data;
};  
export const deleteUser = async (id: any) => {
  const response = await axios.delete(`${REMOTE_SERVER}/api/users/${id}`);
  return response.data;
};
export const updateUser = async (id: any) => {
  const response = await axios.put(`${REMOTE_SERVER}/api/users/${id}`, id);
  return response.data;
};  
export const postSignup = async () => {
  const response = await axios.post(`${REMOTE_SERVER}/api/users/signup`);
  return response.data;
}
export const postSignin = async () => {
  const response = await axios.post(`${REMOTE_SERVER}/api/users/signin`);
  return response.data;
}
export const postSignout = async () => {
  const response = await axios.post(`${REMOTE_SERVER}/api/users/signout`);
  return response.data;
}
export const postProfile = async () => {
  const response = await axios.post(`${REMOTE_SERVER}/api/users/profile`);
  return response.data;
}

// for cocktail api
export const fetchRandomCocktail = async () => {
  const response = await axios.get(`www.thecocktaildb.com/api/json/v1/1/random.php`);
  return response.data;
};
export const fetchRandomCocktailImage = async () => {
  const response = await axios.get(`/images/media/drink/vrwquq1478252802.jpg/small`);
  return response.data;
};
const SEARCH_API = "www.thecocktaildb.com/api/json/v1/1/search.php?";
export const fetchByCocktailName = async (cocktail: any) => {
  const response = await axios.get(`${SEARCH_API}/s=${cocktail}`);
  return response.data;
};
export const fetchByIngredientName = async (ingredient: any) => {
  const response = await axios.get(`${SEARCH_API}/i=${ingredient}`);
  return response.data;
};
export const fetchByFirstLetter = async (search: any) => {
  const response = await axios.get(`${SEARCH_API}/f=${search.charAt(0)}`);
  return response.data;
};
  