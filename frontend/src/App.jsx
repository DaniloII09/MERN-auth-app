import FloatingShape from "./components/FloatingShape";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div
      className="min-h-screen bg-linear-to-br 
    from-zinc-900 via-yellow-950 to-yellow-800
    flex items-center justify-center relative overflow-hidden"
    >
      <FloatingShape
        color="bg-yellow-400"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-amber-500"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-dortmund-yellow"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />

      <Routes>
        <Route path="/" element={"Home"} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
