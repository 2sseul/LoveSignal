import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
import ATKFilter from "../../Filter/ATKFilter";
import GetMyInfo from "../../Filter/GetMyInfo";

import { contentVariants } from "../../atoms/Common/contentVariants";

import style from "./styles/Mypage.module.scss";

import M_Image_Type from "../../molecules/Common/M_Image_Type";
import MyInfo from "../../templates/Mypage/MyInfo";

import { inquireMember } from "../../../api/auth";
import { changeMyImg } from "../../../api/file";

import { footerIdx } from "../../../atom/footer";
import { kid, myMemberUUID } from "../../../atom/member";
import { myatk } from "../../../atom/member";
import AlertBtn from "../../atoms/Common/AlertBtn";

const Mypage = () => {
  const [, setIdx] = useRecoilState<number>(footerIdx);
  const [myAge, setMyAge] = useState<number>(0);
  const [myImg, setMyImg] = useState<string>("");
  const [changeImg, setChangeImg] = useState<boolean>(false); //changeImg가 true면 이미지 바뀐것. 언젠간 쓰지않을까.
  const [myNickName, setMyNickName] = useState<string>("");
  const [myDescription, setMyDescription] = useState<string>("");
  const [myAlarm, SetMyAlarm] = useState<boolean>(false);
  const [myCropImage, setMyCropImage] = useState<FormData>(new FormData());
  const [start, setStart] = useState<boolean>(false);

  const [UUID] = useRecoilState<string>(myMemberUUID);
  const [atk] = useRecoilState<string>(myatk);
  const [kID] = useRecoilState<string>(kid);

  const [name, setName] = useState<string>("");

  useEffect(() => {
    setIdx(3);
    //수정할 내 정보들을 가져와서 보여주기.
    inquireMember(UUID, atk, kID).then((MyInfo) => {
      setMyAge(MyInfo.data.body.age);
      setMyImg(MyInfo.data.body.profileImage);
      setMyNickName(MyInfo.data.body.nickname);
      setMyDescription(MyInfo.data.body.description);
      SetMyAlarm(MyInfo.data.body.receiveAlarm);
    });
    if (window.location.hostname === "localhost") {
      setName("/local");
    }
  }, [UUID, atk, kID]);

  useEffect(() => {
    if (start) {
      alert(myCropImage);
      changeMyImg(UUID, myCropImage, atk, kID)
        .then((res) => {
          alert("나는 성공했어" + res);
        })
        .catch((err) => {
          alert("나는 이미지야." + err);
        });
    } else {
      setStart(true);
    }
  }, [myCropImage]);

  return (
    <ATKFilter>
      <GetMyInfo>
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          // exit="exit"
          className={style.myPageContainer}
        >
          {/* <AlertBtn /> */}
          <div className={style.scrollContainer}>
            <M_Image_Type
              myImg={myImg}
              marginTop="8px"
              setMyImage={setMyCropImage}
              setChangeImg={setChangeImg}
            />
            <MyInfo
              age={myAge}
              mynickname={myNickName}
              description={myDescription}
              setNick={setMyNickName}
              setDesc={setMyDescription}
            />
            <AlertBtn
              UUID={UUID}
              myNick={myNickName}
              atk={atk}
              kID={kID}
              myAlarm={myAlarm}
              setMyAlarm={SetMyAlarm}
            />
            <motion.div
              whileTap={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 200, damping: 10 },
              }}
              className={style.logout}
            >
              <Link
                to={`${process.env.REACT_APP_API_AUTH}/auth/kakao/logout${name}`}
                className={style.link}
              >
                로그아웃
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </GetMyInfo>
    </ATKFilter>
  );
};

export default Mypage;
