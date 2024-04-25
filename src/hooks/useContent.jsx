import { useQuery } from "@tanstack/react-query";

const useContent = () => {
  const {
    isPending,
    data: contents = [],
    refetch,
  } = useQuery({
    queryKey: ["contents"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/contents");
      return res.json();
    },
  });
  return [contents, refetch, isPending];
};

export default useContent;
