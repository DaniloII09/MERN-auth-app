import FloatingShape from "./components/FloatingShape";

function App() {
  return (
    <div
      className="min-h-screen bg-linear-to-br 
    from-zinc-900 via-neutral-900 to-black 
    flex justify-center relative overflow-hidden"
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
    </div>
  );
}

export default App;
