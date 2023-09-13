import { useQuery } from 'react-query';

const getGameData = async () => {
  const response = await fetch('http://localhost:8000/api/games');
  return response.json();
};

export function useGetGames() {
  const { data } = useQuery({
    queryKey: ['game'],
    queryFn: getGameData,
  });
  return data;
}
