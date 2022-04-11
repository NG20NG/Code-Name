//
//
import g from "../../components/game/globalGameStyle.module.css";
//
import { useEffect, useState } from "react";
import { playersGame } from "../../contexts/changeMenuContext";
//
import RedTeam from "../../components/game/redTeam/redTeam";
import BlueTeam from "../../components/game/blueTeam/blueTeam";
//
//
//
export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:3001/games", {
    method: "GET",
  });
  const data = await res.json();
  const paths = data.map((e: any) => {
    return {
      params: { id: e.gameLink.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps = async (context: any) => {
  const link = context.params.id;
  const res = await fetch("http://localhost:3001/games/" + link);
  const data = await res.json();
  return {
    props: {
      links: data,
    },
  };
};

//
//============================================================================================
//
const Game = ({ links }: any) => {
  const [getWordsState, setGetWordsState] = useState<any>(undefined);
  const [getTeammates, setGetTeammate] = useState<any>();

  //==========================================================
  const getGameTeam = async () => {
    const res = await fetch("http://localhost:3001/games");
    const dataTeam = await res.json();
    setGetTeammate(dataTeam[0]?.team);
  };
  //==========================================================
  const getWords = async () => {
    const res = await fetch("http://localhost:3001/words");
    const data = await res.json();
    setGetWordsState(data[0].english[0]);
  };
  //==========================================================
  //==========================================================
  //==========================================================
  //==========================================================
  //==========================================================
  //==========================================================
  useEffect(() => {
    getWords();
    getGameTeam();
  }, []);
  return (
    <div className={g.game}>
      <playersGame.Provider value={{}}>
        <div className={g.gameContainer}>
          <div className={g.redTeam}>
            <RedTeam players={{ getTeammates }} />
          </div>
          <div className={g.gameBoard}>
            <div className={g.gameCardsContainer}>
              <div>
                {getWordsState === undefined
                  ? console.log({ message: "err fetching the data" })
                  : getWordsState?.map((e: any, index: number) => {
                      return (
                        <div key={index} className={g.gameCards}>
                          <div className={g.selectCardBTN}>
                            <div></div>
                          </div>
                          <div className={g.playerSuggestionBTN}></div>
                          <div className={g.showWordBTN}>{e}</div>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
          <div className={g.blueTeam}>
            <BlueTeam players={getTeammates} />
          </div>
        </div>
      </playersGame.Provider>
    </div>
  );
};
export default Game;
