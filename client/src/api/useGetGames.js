import { useQuery } from 'react-query';

const getGameData = async () => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/games`);
  return response.json();
};

export function useGetGames() {
  const { data } = useQuery({
    queryKey: ['game'],
    queryFn: getGameData,
  });
  return data;
}
