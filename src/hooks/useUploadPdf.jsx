import { useQuery } from "@tanstack/react-query";

const useUploadPdf = () => {
  const {
    isPending,
    data: uploadFiles = [],
    refetch,
  } = useQuery({
    queryKey: ["uploadFiles"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/uploadFiles");
      return res.json();
    },
  });
  return [uploadFiles, refetch, isPending];
};

export default useUploadPdf;
