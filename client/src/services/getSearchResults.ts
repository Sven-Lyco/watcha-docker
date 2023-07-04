export async function getSearchResults(query: any, page: any): Promise<any> {
  return await fetch(`/api/searchResults/${query}/${page}`)
    .then(res => res.json())
    .catch(error => {
      console.error(error);
    });
}
