//
//
import red from "./redTeam.module.css";
import gsap from "gsap";
import { useState } from "react";
//
// post the Players inside of the game and change hes team color
//
const RedTeam = ({ players }: any) => {
  console.log(players.getTeammates.team);

  const [ifJoin, setIfJoin] = useState<boolean>();
  const joinRedTeam = (id: String) => {
    if (id === "redTeamID") {
      console.log(123);
    }
  };
  return (
    <div className={red.redTeamPlayersContainer}>
      <div className={red.redTeamPlayersCard}>
        <div className={red.photoNumberContainer}>
          <div className={red.photoRedTeam}></div>
          <div className={red.numberRedTeam}>0</div>
        </div>
        <div className={red.joinRedTeamContainer}>
          <div>
            {1 !== 1 ? (
              ifJoin
            ) : (
              <div
                className={red.joinRedTeamBTN}
                onClick={() => joinRedTeam("redTeamID")}
              >
                join red team
              </div>
            )}
          </div>
          <div className={red.joinSpyMasterContainer}>
            {1 !== 1 ? (
              "123"
            ) : (
              <div className={red.joinSpyMasterBTN}>join spy master</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default RedTeam;
