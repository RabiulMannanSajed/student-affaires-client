import { useQuery } from "@tanstack/react-query";

const useComments = () => {
  const {
    isPending,
    data: comments = [],
    refetch,
  } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/comments");
      return res.json();
    },
  });
  return [comments, refetch, isPending];
};
export default useComments;
