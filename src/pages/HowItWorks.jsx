import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import steps from "../data/howItWorks";

export default function HowItWorks() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="relative bg-gray-50 py-16 px-4 md:px-8">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-20">
        How ReBook Hub Works
      </h2>

      <div className="relative max-w-6xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 h-full z-0 hidden md:block"></div>

        {/* Steps */}
        <div className="space-y-32 relative z-10">
          {steps.map((step, index) => (
            <StepBlock
              step={step}
              index={index}
              key={index}
              onImageClick={setSelectedImage}
            />
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            src={selectedImage}
            alt="Preview"
            className="max-w-full max-h-[90%] rounded-lg shadow-2xl"
            initial={{ scale: 0.7 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.7 }}
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </section>
  );
}

function StepBlock({ step, index, onImageClick }) {
  const isLeft = index % 2 === 0;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const controls = useAnimation();
  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [controls, isInView]);

  const variants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="relative">
      {/* Curved Line (desktop only) */}
      {index < steps.length - 1 && (
        <svg
          className="absolute left-1/2 transform -translate-x-1/2 top-full z-0 hidden md:block"
          width="2"
          height="120"
        >
          <path
            d={`M1,0 C1,60 1,60 1,120`}
            stroke="#d1d5db"
            strokeWidth="2"
            fill="transparent"
          />
        </svg>
      )}

      <motion.div
        ref={ref}
        className={`flex flex-col-reverse md:flex-row items-center gap-6 md:gap-8 ${
          isLeft ? "md:flex-row" : "md:flex-row-reverse"
        }`}
        initial="hidden"
        animate={controls}
        variants={variants}
      >
        {/* Dot */}
        <div className="w-5 h-5 bg-blue-600 rounded-full absolute left-1/2 transform -translate-x-1/2 z-20 shadow-md border-4 border-white hidden md:block"></div>

        {/* Image */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center cursor-pointer"
          variants={variants}
          onClick={() => onImageClick(step.image)}
        >
          <img
            src={step.image}
            alt={step.title}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          className="w-full md:w-1/2 px-2 sm:px-4 md:px-6"
          variants={variants}
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
            {step.title}
          </h3>
          <p className="text-gray-600 text-sm sm:text-base">
            {step.description}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
