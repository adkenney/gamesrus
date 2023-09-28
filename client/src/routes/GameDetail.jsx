import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useMutation, useQueryClient } from 'react-query';
import UpdateGameForm from '../components/UpdateGameForm';

export default function Game() {
  const [toggleEdit, setToggleEdit] = useState(false);
  const queryClient = useQueryClient();
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

  if (data) {
    return (
      <>
        <h1>{data.title}</h1>
        <p>{data.summary}</p>
        <div className="button-container">
          <button onClick={() => deleteGame.mutate(gameId)}>Delete</button>
          <button onClick={() => setToggleEdit(!toggleEdit)}>Edit</button>
        </div>
        {toggleEdit && <UpdateGameForm game={data} />}
      </>
    );
  }
}
