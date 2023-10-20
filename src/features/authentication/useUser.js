import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  if (error) console.log(error);

  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}
