//
import blue from "./blueTeam.module.css";
//
//
//
//

const BlueTeam = ({ getTeammates }: any) => {
  return (
    <div className={blue.blueTeamPlayersContainer}>
      <div className={blue.blueTeamPlayersCard}>
        <div className={blue.photoNumberContainer}>
          <div className={blue.numberBlueTeam}>0</div>
          <div className={blue.photoBlueTeam}></div>
        </div>
        <div className={blue.joinBlueTeamContainer}>
          <div>
            {1 !== 1 ? (
              "123"
            ) : (
              <div className={blue.joinBlueTeamBTN}>join blue team</div>
            )}
          </div>
          <div className={blue.joinSpyMasterContainer}>
            {1 !== 1 ? (
              "123"
            ) : (
              <div className={blue.joinSpyMasterBTN}>join spy master</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlueTeam;
