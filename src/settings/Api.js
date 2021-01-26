import axios from 'axios';

export const apiUrl = 'http://localhost:3001';

export const getRecipes = async () => {
  const response = await axios.get(`${apiUrl}/recipes`);
  return response.data;
};

export const getRecipe = async (id) => {
  const response = await axios.get(`${apiUrl}/recipes/${id}`);
  return response.data;
}

export const postRecipe = async (values) => {
  return await axios.post(`${apiUrl}/recipes`, values);
};

export const getSpecials = async () => {
  const response = await axios.get(`${apiUrl}/specials`);
  return response.data;
};