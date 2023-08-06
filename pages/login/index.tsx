import { useAuth } from "hooks/useAuth";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const Login: NextPage = () => {
  const router = useRouter();
  const { setToken, setUsername } = useAuth();
  const [error, setError] = useState(false);
  const onSubmit = (e: any) => {
    e.preventDefault();
    setError(false);
    const username = e.target?.username?.value;
    const password = e.target?.password?.value;
    if (!username || !password) return;
    fetch(`/api/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if ("statusCode" in res && res.statusCode != 200) setError(true);
        if ("bearer_token" in res && "username" in res) {
          setToken(res.bearer_token);
          setUsername(res.username);
          router.push("/manager");
        }
      })
      .catch((e) => setError(true));
  };

  return (
    <div className="bg-neutral-700 h-screen flex items-center">
      <form className="mx-auto bg-white p-4 rounded-2xl" onSubmit={onSubmit}>
        <div className="m-4">
          <label className="sr-only">Username</label>
          <input
            className="border-solid border border-gray-400 rounded px-2 py-3"
            id="username"
            placeholder="Username"
            required
          />
        </div>
        <div className="m-4">
          <label className="sr-only">Password</label>
          <input
            className="border-solid border border-gray-400 rounded px-2 py-3"
            type="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="m-4 flex items-center">
          <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold w-full py-3" type="submit">
            Sign in
          </button>
        </div>
        {error && (
          <div className="m-4 flex items-center">
            <div>Login failed</div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
