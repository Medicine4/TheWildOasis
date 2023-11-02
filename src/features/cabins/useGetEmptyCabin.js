import { useQuery } from "@tanstack/react-query";
import { getNotEmptyCabin } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";
import { dateToISO } from "../../utils/helpers";

export function useGetNotEmptyCabin() {
  const [searchParams] = useSearchParams();

  // 从搜索参数获取日期，转timestamp格式，以便于和supabase里面的数据直接进行对比
  const startDate = dateToISO(new Date(searchParams.get("startDate")));
  const endDate = dateToISO(new Date(searchParams.get("endDate")));

  const { data, error, isLoading } = useQuery({
    queryFn: () => getNotEmptyCabin(startDate, endDate),
    queryKey: ["notEmptyCabins", startDate, endDate],
  });

  return { data, error, isLoading };
}
