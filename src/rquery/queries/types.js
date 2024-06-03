import { useQuery } from "@tanstack/react-query"; 
import { 
    fetchTypesSelect
} from "../services/types";

export const useGetTypesSelect = ({options}) =>
    useQuery({
        queryKey:['typesSelect'], 
        queryFn: () => fetchTypesSelect(), 
        ...options
    });