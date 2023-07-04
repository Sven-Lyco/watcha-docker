export default async function getSeriesDetails(
  id: string | undefined
): Promise<any> {
  return await fetch(`/api/series/seriesdetails/${id}`)
    .then(res => res.json())
    .catch(error => console.error(error));
}
