import style from "./styles/A_CopyText.module.scss";
import { motion, AnimatePresence } from "framer-motion";
type PropsType = {
  children: any;
};

const A_CopyText: React.FC<PropsType> = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.6,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            ease: "easeOut",
            duration: 0.3,
          },
        }}
        className={style.container}
      >
        <div className={style.text}>{children}</div>
      </motion.div>
    </AnimatePresence>
  );
};

export default A_CopyText;
