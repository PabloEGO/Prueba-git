import create from "zustand";
import apiCall from "../../api";

const usePokemonsStore = create((set, get) => ({
  getPokemons: async () => {
    try {
      set({ hasError: false, errorMessage: "", isLoading: false });
      console.log("Llamando pokemon desde zustand")
      const pokemonResult = await apiCall({
        url: "https://pokeapi.co/api/v2/pokemon?limit=100",
      });
      set({ pokemons: pokemonResult.results });
    } catch (error) {
      set({
        pokemons: [],
        hasError: true,
        errorMessage: "Algo ha pasado, verifica tu conexión",
      });
    } finally {
      set({ isLoading: false });
    }
  },
  pokemons: [],
  getPokemonDetail: async (id) => {
    if (!id) Promise.reject("ID es requerido");
    try {
      set({ hasError: false, errorMessage: "", isLoading: false });
      console.log("Llamando pokemon desde zustand")
      const pokemonDetail = await apiCall({
        url: `https://pokeapi.co/api/v2/pokemon/${id}`,
      });
      set({ pokemonDetail });
    } catch (error) {
      set({
        pokemonDetail: {},
        hasError: true,
        errorMessage: "Algo ha pasado, verifica tu conexión",
      });
    } finally {
      set({ isLoading: false });
    }
  },
  pokemonDetail: {},
  isLoading: false,
  errorMessage: "",
  hasError: false,
}));

export default usePokemonsStore;

// if (!id) Promise.reject("ID es requerido")
// try {
//     setIsLoading(true);
//     setErrorMessage("");
//     setHasError(false);
//     throw new Error("Hey");
//    const pokemonDetail = await apiCall({ url:`https://pokeapi.co/api/v2/pokemon/${id}`})
//    setPokemonDetail(pokemonDetail);
// } catch(error){
//     setPokemonDetail({});
//     setErrorMessage("Algo ha pasado,verifica tu conexión")
//     setHasError(true);
// }finally{
//     setIsLoading(false);
// }

// try{
//
//     const pokemonResult = await apiCall({
//         url: "https://pokeapi.co/api/v2/pokemon?limit=100"});
//         setPokemons(pokemonResult.results);

// }catch(error){
//     setPokemons([]);
//     setErrorMessage("Algo ha pasado,verifica tu conexión")
//     setHasError(true);

// }finally{
//     setIsLoading(false);
// }
