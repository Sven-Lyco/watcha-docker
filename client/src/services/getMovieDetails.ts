export default async function getMovieDetails(
  id: string | undefined
): Promise<any> {
  return await fetch(`/api/movies/moviedetails/${id}`)
    .then(res => res.json())
    .catch(error => console.error(error));
}
