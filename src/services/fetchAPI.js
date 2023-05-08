export const param = {
    key: '34315621-6b18059d5a6be575efaf0d130',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 12,
  }

export const fetchImagesWithQuery = (searchQuery, page=1) => {
const {per_page, orientation, image_type, key} = param;
    return fetch(`https://pixabay.com/api/?q=${searchQuery}&key=${key}&page=${page}&image_type=${image_type}&orientation=${orientation}&per_page=${per_page}`)
            .then(res => res.json())
            .then(data => data);

}