import { motion } from "framer-motion";
import Input from "../components/Input";
import { Mail, User, Lock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
  };

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
          Create an Account
        </h2>

        <form onSubmit={handleSignup}>
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            icon={Mail}
            type="email"
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

          <PasswordStrengthMeter password={password} />

          <motion.button
            className="mt-5 w-full py-3 px-4 bg-linear-to-r from-dortmund-yellow to-amber-500 text-dortmund-black 
						font-bold rounded-lg shadow-lg hover:from-amber-400
						hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-dortmund-yellow focus:ring-offset-2
						 focus:ring-offset-zinc-900 transition duration-200 hover:cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
          >
            Sign Up
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-black/40 flex justify-center">
        <p className="text-zinc-300 text-sm">
          Already have an account?
          <Link to={"/login"} className="text-dortmund-yellow font-semibold hover:underline ml-1">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignupPage;