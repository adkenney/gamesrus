import './App.css';
import GameListView from './components/GameListView';
import AddGameForm from './components/AddGameForm';

function App() {
  // const deleteGame = useMutation({
  //   mutationFn: async id => {
  //     let deleteCode = prompt('Enter code to delete');
  //     if (deleteCode === import.meta.env.VITE_SECRET_CODE) {
  //       await fetch(`${baseUrl}/api/games/${id}`, {
  //         method: 'DELETE',
  //       });
  //     } else {
  //       alert("Sorry, you don't have permission to delete");
  //     }
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['game'] });
  //   },
  // });

  return (
    <main>
      <GameListView />
      <AddGameForm />
    </main>
  );
}

export default App;
