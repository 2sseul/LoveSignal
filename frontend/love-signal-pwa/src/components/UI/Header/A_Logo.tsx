import { useNavigate } from "react-router-dom";
import style from "./A_Logo.module.scss";
import { motion } from "framer-motion";

const A_Logo = () => {
  const navigate = useNavigate();

  //로고를 눌렀을때 이성팀 찾기 페이지로 이동합니다.
  const goMain = () => {
    navigate("/OtherGender");
  };

  return (
    <motion.div
      className={style.logo}
      whileTap={{
        scale: 1.15,
        transition: { type: "spring", stiffness: 200, damping: 10 },
      }}
    >
      <img src="/assets/logo.png" onClick={goMain} alt="로고" />
    </motion.div>
  );
};

export default A_Logo;
