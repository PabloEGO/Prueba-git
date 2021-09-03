import "./App.css";
import Routes from "./Routes";
import PokemonProvider from "./context/pokemons/Provider";
function App() {
  return (
    <PokemonProvider>
      <Routes />
    </PokemonProvider>
  );
}

export default App;
