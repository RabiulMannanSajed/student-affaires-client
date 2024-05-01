import { useQuery } from "@tanstack/react-query";

const useMessage = () => {
  const {
    isPending,
    data: messages = [],
    refetch,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/messages");
      return res.json();
    },
  });
  return [messages, refetch, isPending];
};

export default useMessage;
