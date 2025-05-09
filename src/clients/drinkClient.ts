import axios from "axios";

export const fetchRandomCocktail = async () => {
  const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
  return response.data;
};

export const fetchRandomCocktailImage = async () => {
  const response = await axios.get(`/images/media/drink/vrwquq1478252802.jpg/small`);
  return response.data;
};

const SEARCH_API = "https://www.thecocktaildb.com/api/json/v1/1/search.php?";
export const fetchByCocktailName = async (cocktail: any) => {
  const response = await axios.get(`${SEARCH_API}s=${cocktail}`);
  return response.data;
};

export const fetchByIngredientName = async (ingredient: any) => {
  const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  return response.data;
};

export const fetchNonAlcoholic = async () => {
  const response = await axios.get("www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic");
  return response.data;
}

export const fetchByFirstLetter = async (search: any) => {
  const response = await axios.get(`${SEARCH_API}f=${search.charAt(0)}`);
  return response.data;
};

const LOOKUP_API = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?";
export const fetchById = async (id: any) => {
  const response = await axios.get(`${LOOKUP_API}i=${id}`); 
  return response.data; 
}