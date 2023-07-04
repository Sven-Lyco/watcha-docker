export async function getWatchedMovies(): Promise<any> {
  return await fetch('/api/watchedMovies')
    .then(res => res.json())
    .catch(error => {
      console.error('Error:', error);
    });
}

export async function deleteWatchedMovies(
  deleteId: string | undefined
): Promise<any> {
  await fetch(`/api/watchedMovies/${deleteId}`);
}

export async function addWatchedMovies(watchedMovie: {
  movieId: string | undefined;
  title: string;
}): Promise<any> {
  const { movieId, title } = watchedMovie;
  await fetch(`/api/watchedMovies/${movieId}/${title}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ movieId, title }),
  });
}
