import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useGuests() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // 1) SoryBy
  const sortByRaw = searchParams.get("SortBy") || "fullName-asc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // 2) Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // 3) Find by name
  const searchFullName = searchParams.get("fullName") || "";

  // 4) Find by tel
  const searchTel = searchParams.get("tel") || "";

  // 5) Query
  const {
    isLoading,
    data: { data: guests, count } = {},
    error,
  } = useQuery({
    queryKey: ["guests", sortBy, page, searchFullName, searchTel],
    queryFn: () => getGuests({ sortBy, page, searchFullName, searchTel }),
  });

  // 6) Pre-Fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["guests", sortBy, page + 1, searchFullName, searchTel],
      queryFn: () =>
        getGuests({ sortBy, page: page + 1, searchFullName, searchTel }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["guests", sortBy, page - 1, searchFullName, searchTel],
      queryFn: () =>
        getGuests({ sortBy, page: page - 1, searchFullName, searchTel }),
    });
  }

  return { isLoading, error, guests, count };
}
