"use client";
import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center py-50"
    >
      <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent to-[#66a109]/30" />
      <div className="w-1.5 h-1.5 rotate-45 bg-[#66a109]/40 mx-3" />
      <div className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent to-[#66a109]/30" />
    </motion.div>
  );
}
