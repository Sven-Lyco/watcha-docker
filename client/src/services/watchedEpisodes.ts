export async function getWatchedEpisodes(): Promise<any> {
  return await fetch('/api/watchedEpisodes')
    .then(res => res.json())
    .catch(error => {
      console.error('Error:', error);
    });
}

export async function deleteWatchedEpisode(
  deleteId: string | undefined
): Promise<any> {
  await fetch(`/api/watchedEpisodes/${deleteId}`);
}

export async function addWatchedEpisode(watchedEpisode: {
  episodeId: string | undefined;
}): Promise<any> {
  const { episodeId } = watchedEpisode;
  await fetch(`/api/watchedEpisodes/${episodeId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ episodeId }),
  });
}
