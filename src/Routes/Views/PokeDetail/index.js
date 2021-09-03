import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
// import PokemonContext from "../../../context/pokemons";
import PokeStats from "./components/PokeStats";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import usePokemonsStore from "../../../zustand/stores/pokemon";

export default function PokeDetail() {
  const { id } = useParams();
  // const { getPokemonDetail, pokemonDetail, isLoading, hasError, errorMessage } =
  //   useContext(PokemonContext);
  const { getPokemonDetail, pokemonDetail, isLoading, hasError, errorMessage } = usePokemonsStore(state=>({getPokemonDetail: state.getPokemonDetail, pokemonDetail: state.pokemonDetail, isLoading: state.isLoading, hasError: state.hasError, errorMessage: state.errorMessage}))

  console.log(id);
  useEffect(() => {
    /*Cada que se cargue la pantalla o cada que cambie el
    id, solicitar el detalle del pokemon*/
    getPokemonDetail(id).catch(null);
  }, []);
  console.log(pokemonDetail);
  if (isLoading) {
    return <Loading title="Cargando Pokemon..." />;
  }
  return (
    <div>
      {hasError ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        <div>
          <h3 style={{ marginTop: 15, marginBottom: 15 }}>
            Información general
          </h3>

          <p>{`Name ${pokemonDetail?.name}`}</p>
          <p>{`Peso: ${pokemonDetail?.weight} kgs`}</p>
          <p>{`Altura ${pokemonDetail?.height} cm`}</p>
          <div>
            <h3 style={{ marginTop: 30, marginBottom: 15 }}>Habilidades</h3>
            <PokeStats stats={pokemonDetail?.stats ?? []} />
          </div>
        </div>
      )}
    </div>
  );
}
