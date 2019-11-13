export function fetchAlbums() {
  const url = "https://jsonplaceholder.typicode.com/photos?_page=1&&_limit=10"
  return fetch(url)
  .then(res => res.json())
}