import { useQuery } from "@tanstack/react-query"; 
import { 
    fetchStatsSelect
} from "../services/stats";

export const useGetStatsSelect = ({options}) =>
    useQuery({
        queryKey:['statsSelect'], 
        queryFn: () => fetchStatsSelect(), 
        ...options
    });