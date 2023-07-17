import axios from 'axios';

const API_KEY = '36926934-069e003b546c638e37e68c3ce';
axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
  
};

export const getImage = async ({ query, page }) => {
  const response = await axios.get(`?q=${query}&page=${page}`);
  return response;
};

