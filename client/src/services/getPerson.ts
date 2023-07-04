export async function getPerson(personId: string | undefined): Promise<any> {
  return await fetch(`/api/person/${personId}`)
    .then(res => res.json())
    .catch(error => {
      console.error('Error:', error);
    });
}
