import { motion } from "framer-motion";
import Input from "../components/Input";
import { Mail, Lock, Loader } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error, errors, clearError } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {}
  };

  useEffect(() => {
    clearError();
  }, [clearError]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-zinc-800/50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
			overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-linear-to-r from-dortmund-yellow to-amber-500 text-transparent bg-clip-text">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin}>
          <Input
            icon={Mail}
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center mb-6">
            <Link
              to={"/forgot-password"}
              className="text-sm text-dortmund-yellow hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          {error && <p className="text-red-500 font-semibold mb-2">{error}</p>}
          {errors && errors.length > 0 && (
            <ul className="mt-2 space-y-1">
              {errors.map((err, i) => (
                <li key={i} className="text-red-500 text-sm font-semibold">
                  {err.message}
                </li>
              ))}
            </ul>
          )}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 bg-linear-to-r from-dortmund-yellow to-amber-500 text-dortmund-black font-bold rounded-lg shadow-lg hover:from-amber-400 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-dortmund-yellow focus:ring-offset-2 focus:ring-offset-zinc-900 transition duration-200 hover:cursor-pointer"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin mx-auto" />
            ) : (
              "Login"
            )}
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-black/40 flex justify-center">
        <p className="text-zinc-300 text-sm">
          Don't have an account?
          <Link
            to={"/signup"}
            className="text-dortmund-yellow hover:underline ml-1"
          >
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginPage;
