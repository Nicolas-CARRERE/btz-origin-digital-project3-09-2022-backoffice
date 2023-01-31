import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { TUser } from "../../../src/types/types";
import userFetcher from "../../../services/userFetcher";

export default function User() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState<TUser | null>();

  useEffect(() => {
    if (router.query.id) {
      userFetcher
        .getUserById(router.query.id as string)
        .then((response) => setUser(response));
      setIsLoading(false);
    }
  }, [router]);

  return (
    <div>
      {isLoading || !user ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{user.firstname}</h1>
          <h1>{user.lastname}</h1>
          <h1>{user.username}</h1>
          <h1>{user.email}</h1>
          <h1>{user.role}</h1>
        </div>
      )}
    </div>
  );
}