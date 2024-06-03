import { useQuery } from "@tanstack/react-query"; 
import { 
    fetchPokemoList,
    fetchPokemonWithEvolutions
} from "../services/pokemon";

export const useGetPokemonList = ({data, options}) =>
    useQuery({
        queryKey:['pokemonList'], 
        queryFn: () => fetchPokemoList(data), 
        ...options
    });

export const useGetPokemonWithEvolutions = ({pokemonId, options}) =>
    useQuery({
        queryKey:['pokemonWithEvolutions', pokemonId], 
        queryFn: () => fetchPokemonWithEvolutions(pokemonId), 
        ...options
    });