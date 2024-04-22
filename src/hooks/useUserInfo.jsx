import { useQuery } from '@tanstack/react-query';
import React from 'react';

const useUserInfo = () => {
    const {
        isPending,
        data: users = [],
        refetch,
      } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
          const res = await fetch("https://uiueateryserver.onrender.com/users");
          return res.json();
        },
      });
      return [users, refetch, isPending];
    };
    

export default useUserInfo;