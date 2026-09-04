import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/auth.store";
import Input from "../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword, error, errors, clearError } =
    useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const succes = await forgotPassword(email);
      if (succes) setIsSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    clearError();
  }, [clearError]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-zinc-800/50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-linear-to-r from-dortmund-yellow to-amber-500 text-transparent bg-clip-text">
          Forgot Password
        </h2>

        {isSubmitted ? (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-16 h-16 bg-dortmund-yellow rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Mail className="h-8 w-8 text-dortmund-black" />
            </motion.div>
            <p className="text-zinc-300 mb-6">
              If an account exists for {email}, you will receive a password
              reset link shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="text-zinc-300 mb-6 text-center">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
            <Input
              icon={Mail}
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <p className="text-red-500 font-semibold">{error}</p>}
            {errors && errors.length > 0 && (
              <ul className="mt-2 space-y-1">
                {errors.map((err, i) => (
                  <li
                    key={i}
                    className="text-red-500 text-sm font-semibold mb-2"
                  >
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
            >
              {isLoading ? (
                <Loader className="size-6 animate-spin mx-auto" />
              ) : (
                "Send Reset Link"
              )}
            </motion.button>
          </form>
        )}
      </div>
      <div className="px-8 py-4 bg-zinc-900/50 flex justify-center">
        <Link
          to={"/login"}
          className="text-sm text-dortmund-yellow hover:underline flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
        </Link>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordPage;
