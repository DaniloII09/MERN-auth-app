import { motion } from "framer-motion";

const LoadingSpinner = () => {
	return (
		<div className='min-h-screen bg-linear-to-br from-zinc-900 via-yellow-950 to-yellow-800 flex items-center justify-center relative overflow-hidden'>
			<motion.div
				className='w-16 h-16 border-4 border-t-4 border-t-dortmund-yellow border-yellow-200 rounded-full'
				animate={{ rotate: 360 }}
				transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
			/>
		</div>
	);
};

export default LoadingSpinner;