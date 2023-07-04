export async function getWatchlist(): Promise<any> {
  return await fetch('/api/watchlist')
    .then(res => res.json())
    .catch(error => {
      console.error('Error:', error);
    });
}

export async function deleteFromWatchlist(deleteId: string): Promise<any> {
  await fetch(`/api/watchlist/${deleteId}`)
    .then(res => res.json())
    .catch(error => {
      console.error('Error:', error);
    });
}

export async function addMovieToWatchlist(watchedMovie: {
  id: string | undefined;
  title: string;
  posterPath: string;
  category: string;
}): Promise<any> {
  const { id, title, category } = watchedMovie;
  await fetch(`/api/watchlist/movie/${id}/${title}/${category}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(watchedMovie),
  })
    .then(res => res.json())
    .catch(error => {
      console.error('Error:', error);
    });
}

export async function addSeriesToWatchlist(watchedSeries: {
  id: string | undefined;
  name: string;
  posterPath: string;
  category: string;
}): Promise<any> {
  const { id, name, category } = watchedSeries;
  await fetch(`/api/watchlist/series/${id}/${name}/${category}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(watchedSeries),
  })
    .then(res => res.json())
    .catch(error => {
      console.error('Error:', error);
    });
}
