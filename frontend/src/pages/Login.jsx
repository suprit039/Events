

const Login = () => {
  const handleGoogleLogin = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
    window.location.href = `${API_BASE_URL.replace('/api', '')}/api/auth/google`;
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Admin Login</h1>

      <button
        onClick={handleGoogleLogin}
        className="px-6 py-3 bg-black text-white rounded-lg"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
