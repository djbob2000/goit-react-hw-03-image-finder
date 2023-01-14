import axios from 'axios';

const KEY = '31182736-3dd78a34c786b70675da4185d';

const fetchImage = async (searchQuery, page) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};

export default fetchImage;
