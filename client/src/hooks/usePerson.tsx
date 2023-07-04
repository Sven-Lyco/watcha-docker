import { useState, useEffect } from 'react';
import { getPerson } from '../services/getPerson';

export default function usePerson(personId: string | undefined) {
  const [personDetails, setPersonDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function loadPerson() {
      getPerson(personId).then((data: any) => setPersonDetails(data));
      setIsLoading(false);
    }
    loadPerson();
  }, [personId]);

  return { personDetails, isLoading };
}
