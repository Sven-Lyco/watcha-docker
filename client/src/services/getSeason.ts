export default async function getSeason(
  id: string | undefined,
  seasonNumber: number | undefined
): Promise<any> {
  return await fetch(`/api/series/${id}/season/${seasonNumber}`)
    .then(res => res.json())
    .catch(error => console.error(error));
}
