import { useQuery } from 'react-query';

const getGenreData = async () => {
  const response = await fetch('http://localhost:8000/api/genres');
  return response.json();
};

export function useGetGenres() {
  const { data } = useQuery({
    queryKey: ['genre'],
    queryFn: getGenreData,
  });
  return data;
}
