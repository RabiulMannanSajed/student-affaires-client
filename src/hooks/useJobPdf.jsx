import { useQuery } from "@tanstack/react-query";

const useJobPdf = () => {
  const {
    isPending,
    data: JobPdfFiles = [],
    refetch,
  } = useQuery({
    queryKey: ["JobPdfFiles"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/JobPdfFiles");
      return res.json();
    },
  });
  return [JobPdfFiles, refetch, isPending];
};

export default useJobPdf;
