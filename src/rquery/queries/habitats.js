import { useQuery } from "@tanstack/react-query"; 
import { 
    fetchHabitatsSelect
} from "../services/habitats";

export const useGetHabitatsSelect = ({options}) =>
    useQuery({
        queryKey:['habitatsSelect'], 
        queryFn: () => fetchHabitatsSelect(), 
        ...options
    });