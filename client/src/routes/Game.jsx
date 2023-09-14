import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
export default function Game() {
  const { gameId } = useParams();
  const getGameById = async gameId => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/games/${gameId}`
    );
    return response.json();
  };
  const { data } = useQuery({
    queryKey: ['game', gameId],
    queryFn: () => getGameById(gameId),
  });
  if (data) {
    return (
      <>
        <h1>Game Title: {data.title}</h1>
      </>
    );
  }
}
