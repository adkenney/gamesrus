import { Link } from 'react-router-dom';
import { useGetGames } from '../api/useGetGames';
import Card from './Card';

export default function GameListView() {
  const games = useGetGames();

  if (games) {
    return (
      <section className="game-grid">
        {games.map(game => {
          return (
            <Card key={game._id}>
              <h2>
                <Link to={`/games/${game._id}`}>{game.title}</Link>
              </h2>
              <p>Release date: {game.release_date.slice(0, 4)}</p>
              <ul className="card-list">
                {game.genre.map(genre => {
                  return <li key={genre._id}>{genre.name}</li>;
                })}
              </ul>
              <ul className="card-list">
                {game.platform.map(platform => {
                  return <li key={platform._id}>{platform.name}</li>;
                })}
              </ul>
              <p>{game.price === 0 ? 'Free' : `$${game.price}`}</p>
            </Card>
          );
        })}
      </section>
    );
  }
}
