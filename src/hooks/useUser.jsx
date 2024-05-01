import { useQuery } from "@tanstack/react-query";

const useUser = () => {
  const {
    isPending,
    data: user = [],
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/user");
      return res.json();
    },
  });
  return [user, refetch, isPending];
};

export default useUser;
