import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

export const fetchRandomCocktail = async () => {
  const response = await axiosWithCredentials.get(`www.thecocktaildb.com/api/json/v1/1/random.php`);
  return response.data;
};

export const fetchRandomCocktailImage = async () => {
  const response = await axiosWithCredentials.get(`/images/media/drink/vrwquq1478252802.jpg/small`);
  return response.data;
};

const SEARCH_API = "www.thecocktaildb.com/api/json/v1/1/search.php?";
export const fetchByCocktailName = async (cocktail: any) => {
  const response = await axiosWithCredentials.get(`${SEARCH_API}s=${cocktail}`);
  return response.data;
};

export const fetchByIngredientName = async (ingredient: any) => {
  const response = await axiosWithCredentials.get(`${SEARCH_API}i=${ingredient}`);
  return response.data;
};

export const fetchByFirstLetter = async (search: any) => {
  const response = await axiosWithCredentials.get(`${SEARCH_API}f=${search.charAt(0)}`);
  return response.data;
};

const LOOKUP_API = "www.thecocktaildb.com/api/json/v1/1/lookup.php?";
export const fetchById = async (id: any) => {
  const response = await axiosWithCredentials.get(`${LOOKUP_API}i=${id}`); 
  return response.data; 
}