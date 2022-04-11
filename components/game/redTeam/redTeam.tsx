//
//
import red from "./redTeam.module.css";
import gsap from "gsap";
import { useState } from "react";
//
// post the Players inside of the game and change hes team color
//
const RedTeam = ({ players }: any) => {
  if (players?.getTeammates === undefined) {
    console.log("nothing");
  } else {
    console.log(players.getTeammates);
  }

  const [ifJoin, setIfJoin] = useState<any>({
    redPlayers: false,
    spyMaster: false,
    inGame: false,
  });

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
              <div className={red.redTeamPlayersJoinBTNContainer}>
                <div className={red.redTeamJoinBTNPlayers}>{ifJoin.player}</div>
              </div>
            ) : (
              <div className={red.joinRedTeamBTN}>join red team</div>
            )}
          </div>
          <div className={red.joinSpyMasterContainer}>
            {ifJoin.ifJoin === "spyMaster" || ifJoin.inGame === true ? (
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
