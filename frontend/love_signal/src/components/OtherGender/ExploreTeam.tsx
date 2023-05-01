import { useState, useEffect } from "react";
import style from "./ExploreTeam.module.scss";
import { useRecoilState } from "recoil";
import { footerIdx } from "../../atom/footer";
import Codepen from "../UI/Loading/codepen";
import Modal_portal from "../UI/Modal/Modal_portal";
import CheckTeam from "../UI/Modal/CheckTeam";
import { member, team } from "../../types/member";
import OtherTeamDesc from "./OtherTeamDesc";
import PictureBox from "./OtherTeamPicture";
import ListBoxWithImgTitle from "../UI/Common/ListBoxWithImgTitle";
import RedHeartLine from "../UI/Common/RedHearLine";
import Footer from "../UI/Footer/Footer";
import { fetchList } from "../../api/othergender";

const ExploreTeam = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  //팀 코드를 저장해줄 변수입니다.(또는 그 팀의 배열 위치?)
  const [teamNumber, setTeamNumber] = useState<number>(0);
  const [team, setTeam] = useState<team[]>([]);
  const [idx, setIdx] = useRecoilState<number>(footerIdx);
  const [uuidList, setuuidList] = useState<string[]>([]);
  let [receiveList, setReceiveList] = useState<number>(10); //받아올 리스트 수.

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 100);
    setIdx(0);

    getList();
  }, []);

  useEffect(() => {
    console.log(uuidList);
  }, [uuidList]);

  //리스트를 받아올 axios 함수입니다.
  const getList = async () => {
    await fetchList("M", receiveList, uuidList)
      .then((res) => {
        addmemberList(res.data.body);
        adduuidList(res.data.body);
        setIsLoading(true);
        setReceiveList(receiveList + 10);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const adduuidList = (teamList: team[]) => {
    teamList.forEach((item) => {
      setuuidList((uuidList) => [...uuidList, item.teamUUID]);
    });
  };

  const addmemberList = (teamList: team[]) => {
    teamList.forEach((item) => {
      setTeam((team) => [...team, item]);
    });
  };

  //상세보기 모달창을 띄워주는 함수입니다.
  const viewDetail = (idx: number) => {
    //여기서 내가 팀이 있는지 없는지 체크를 해서 팀이 있으면 상세보기로 없으면 팀을 구성하라는 모달을 띄워주어야합니다.
    setTeamNumber(idx);
    setVisible(!visible);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    console.log("나 동작언제함?");

    const isEnd =
      Math.round(target.scrollTop + target.clientHeight) >
      target.scrollHeight - 20;
    if (isEnd) {
      getList();
    }
  };

  if (isLoading) {
    return (
      <>
        {visible && (
          <>
            <div className={style.otherContainer} onScroll={handleScroll}>
              <OtherTeamDesc />
              {team.map((item, idx) => (
                <>
                  <ListBoxWithImgTitle
                    title={
                      <>
                        <RedHeartLine />
                      </>
                    }
                    type="red"
                  >
                    <PictureBox
                      viewDetail={viewDetail}
                      idx={idx}
                      item={item.members}
                    />
                  </ListBoxWithImgTitle>
                </>
              ))}
            </div>
            <Modal_portal>
              <CheckTeam
                setVisible={setVisible}
                visible={visible}
                member={team[teamNumber].members}
              />
            </Modal_portal>
          </>
        )}
        {!visible && (
          <div className={style.backColor}>
            <div className={style.otherContainer} onScroll={handleScroll}>
              <OtherTeamDesc />
              {team.map((item, idx) => (
                <>
                  <ListBoxWithImgTitle
                    title={
                      <>
                        <RedHeartLine />
                      </>
                    }
                    type="red"
                  >
                    <PictureBox
                      viewDetail={viewDetail}
                      idx={idx}
                      item={item.members}
                    />
                  </ListBoxWithImgTitle>
                </>
              ))}
            </div>
            <Footer />
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        <Codepen />
      </>
    );
  }
};

export default ExploreTeam;
