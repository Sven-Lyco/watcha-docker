export async function getUpcommingMovies(): Promise<any> {
  return await fetch('/api/movies/upcoming')
    .then(res => res.json())
    .catch(error => {
      console.error('Error:', error);
    });
}

export async function getMoviesOnCinema(): Promise<any> {
  return await fetch('/api/movies/now-playing')
    .then(res => res.json())
    .catch(error => {
      console.error('Error:', error);
    });
}

export async function getPopularMovies(): Promise<any> {
  return await fetch('/api/movies/popular')
    .then(res => res.json())
    .catch(error => {
      console.error('Error:', error);
    });
}
