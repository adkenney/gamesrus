import GameListView from './components/GameListView';
import AddGameForm from './components/AddGameForm';
import Main from './components/Layout/Main';
import NavBar from './components/Layout/NavBar';

function App() {
  return (
    <div className="grid grid-cols-auto p-4 gap-2 h-screen text-black">
      <NavBar />
      <Main>
        <GameListView />
        {/* <AddGameForm /> */}
      </Main>
    </div>
  );
}

export default App;
