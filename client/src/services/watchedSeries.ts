export async function getWatchedSeries(): Promise<any> {
  return await fetch('/api/watchedSeries')
    .then(res => res.json())
    .catch(error => {
      console.error('Error:', error);
    });
}

export async function deleteWatchedSeries(deleteId: string): Promise<any> {
  await fetch(`/api/watchedSeries/${deleteId}`);
}

export async function addWatchedSeries(watchedSerie: {
  seriesId: string | undefined;
  name: string;
}): Promise<any> {
  const { seriesId, name } = watchedSerie;
  await fetch(`/api/watchedSeries/${seriesId}/${name}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ seriesId, name }),
  });
}
