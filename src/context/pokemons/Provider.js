//utiliza el contexto.
//Dentro de app se va a ocupar a Provider
import PokemonContext from "./index"
import apiCall from "../../api"
import {useState} from "react"
export default function PokemonProvider({children}){
    const [pokemons, setPokemons] = useState([]);
    const [pokemonDetail, setPokemonDetail] = useState({});
    const [isLoading, setIsLoading]= useState(false);
    const [hasError,setHasError]= useState(false);
    const[errorMessage,setErrorMessage]= useState("");
    const getPokemons= async () =>{
        try{
            setIsLoading(true);
            setErrorMessage("");
            setHasError(false);
            const pokemonResult = await apiCall({
                url: "https://pokeapi.co/api/v2/pokemon?limit=100"});
                setPokemons(pokemonResult.results);
            
        }catch(error){
            setPokemons([]);
            setErrorMessage("Algo ha pasado,verifica tu conexión")
            setHasError(true);

        }finally{
            setIsLoading(false);
        }
    }

    const getPokemonDetail = async (id) =>{
        if (!id) Promise.reject("ID es requerido")
        try {
            setIsLoading(true);
            setErrorMessage("");
            setHasError(false);
            //   throw new Error("Hey");
           const pokemonDetail = await apiCall({ url:`https://pokeapi.co/api/v2/pokemon/${id}`})
           setPokemonDetail(pokemonDetail);
        } catch(error){
            setPokemonDetail({});
            setErrorMessage("Algo ha pasado,verifica tu conexión")
            setHasError(true);
        }finally{
            setIsLoading(false);
        }
    }
    return(
<PokemonContext.Provider value={{getPokemons,pokemons,getPokemonDetail,pokemonDetail,isLoading,errorMessage,hasError}}>
    {children}
</PokemonContext.Provider>
    )
}