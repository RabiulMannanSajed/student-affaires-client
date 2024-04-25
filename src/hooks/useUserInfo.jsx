import { useQuery } from "@tanstack/react-query";

const useUserInfo = () => {
  const {
    isPending,
    data: userInfos = [],
    refetch,
  } = useQuery({
    queryKey: ["userInfos"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/userInfos");
      return res.json();
    },
  });
  return [userInfos, refetch, isPending];
};

export default useUserInfo;
