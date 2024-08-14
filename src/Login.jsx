import React from "react";

function Login() {
  const handleGoogleLogin = () => {
    const redirectUrl = "http://localhost:5174/onebox";
    const googleLoginUrl = `https://hiring.reachinbox.xyz/api/v1/auth/google-login?redirect_to=${encodeURIComponent(
      redirectUrl
    )}`;
    window.location.href = googleLoginUrl;
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <form className="bg-white p-8 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <input
            className="w-full mb-4 p-2 border rounded"
            type="text"
            placeholder="Email"
            required
          />
          <input
            className="w-full mb-4 p-2 border rounded"
            type="password"
            placeholder="Password"
            required
          />
          <button
            className="w-full bg-blue-500 text-white p-2 rounded mb-4"
            type="submit"
          >
            Login
          </button>
          <button
            className="w-full bg-red-500 text-white p-2 rounded"
            type="button"
            onClick={handleGoogleLogin}
          >
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
