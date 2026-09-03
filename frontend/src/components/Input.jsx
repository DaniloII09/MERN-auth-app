const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-dortmund-yellow" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-3 py-2 bg-zinc-800/50 rounded-lg border border-zinc-700 focus:border-dortmund-yellow focus:ring-2 focus:ring-dortmund-yellow text-white placeholder-zinc-400 transition duration-200"
      />
    </div>
  );
};

export default Input;