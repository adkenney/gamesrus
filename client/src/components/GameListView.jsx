import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { useGetGames } from '../api/useGetGames';
import UpdateGameForm from './UpdateGameForm';

export default function GameListView() {
  const games = useGetGames();
  const [selectedGame, setSelectedGame] = useState(null);
  const queryClient = useQueryClient();
  const deleteGame = useMutation({
    mutationFn: async id => {
      let deleteCode = prompt('Enter code to delete');
      if (deleteCode === import.meta.env.VITE_SECRET_CODE) {
        await fetch(`${import.meta.env.VITE_BASE_URL}/api/games/${id}`, {
          method: 'DELETE',
        });
      } else {
        alert("Sorry, you don't have permission to delete");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['game'] });
    },
  });

  const handleEdit = game => {
    setSelectedGame(game);
  };

  return games ? (
    <section>
      {games &&
        games.map(game => {
          return (
            <div key={game._id}>
              <h2>
                <Link to={`/games/${game._id}`}>{game.title}</Link>
              </h2>
              <p>{game.summary}</p>
              <p>Release date: {game.release_date}</p>
              <ul>
                {game.genre.map(genre => {
                  return <li key={genre._id}>{genre.name}</li>;
                })}
              </ul>
              <ul>
                {game.platform.map(platform => {
                  return <li key={platform._id}>{platform.name}</li>;
                })}
              </ul>
              <p>{game.publisher.name}</p>
              <p>{game.price === 0 ? 'Free' : `$${game.price}`}</p>
              <button onClick={() => deleteGame.mutate(game._id)}>
                Delete
              </button>
              <button onClick={() => handleEdit(game)}>Edit</button>
              {selectedGame && selectedGame._id === game._id && (
                <UpdateGameForm game={selectedGame} />
              )}
            </div>
          );
        })}
    </section>
  ) : null;
}
