export async function getTopRatedSeries(): Promise<any> {
  return await fetch('/api/series/toprated')
    .then(res => res.json())
    .catch(error => {
      console.error('Error:', error);
    });
}

export async function getSeriesOnAir(): Promise<any> {
  return await fetch('/api/series/onair')
    .then(res => res.json())
    .catch(error => {
      console.error('Error:', error);
    });
}

export async function getPopularSeries(): Promise<any> {
  return await fetch('/api/series/popular')
    .then(res => res.json())
    .catch(error => {
      console.error('Error:', error);
    });
}
