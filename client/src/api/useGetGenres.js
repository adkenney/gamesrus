import { useQuery } from 'react-query';

const getGenreData = async () => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/genres`);
  return response.json();
};

export function useGetGenres() {
  const { data } = useQuery({
    queryKey: ['genre'],
    queryFn: getGenreData,
  });
  return data;
}
