import { Link } from 'react-router-dom';
import { useGetGames } from '../api/useGetGames';
import Card from './Card';
import AddGameForm from './AddGameForm';

export default function GameListView() {
  const games = useGetGames();

  if (games) {
    return (
      <section className="grid grid-cols-3 gap-6 p-2 h-full bg-blue-100 rounded-lg">
        {games.map(game => {
          return (
            <Card key={game._id}>
              <h2>
                <Link to={`/games/${game._id}`}>{game.title}</Link>
              </h2>
              <p>Release date: {game.release_date.slice(0, 4)}</p>
              <ul className="flex gap-2">
                {game.genre.map(genre => {
                  return <li key={genre._id}>{genre.name}</li>;
                })}
              </ul>
              <ul className="flex gap-2">
                {game.platform.map(platform => {
                  return <li key={platform._id}>{platform.name}</li>;
                })}
              </ul>
              <p>{game.price === 0 ? 'Free' : `$${game.price}`}</p>
            </Card>
          );
        })}
        <AddGameForm />
      </section>
    );
  }
}
