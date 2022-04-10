//
//
import { useContext } from "react";
import { menuOptionsContext } from "../../contexts/changeMenuContext";
import go from "./gameOptions.module.css";
//
//
//
//
const gameOptions = () => {
  const { switchOptions, setSwitchOptions } = useContext(menuOptionsContext);
  return (
    <div className={go.gameOptionsContainer}>
      <div className={go.gameOptions}>
        <h1 className={go.h1}>Welcome to code name</h1>
        <div
          className={go.createGameBTN}
          onClick={() => setSwitchOptions("createGame")}
        >
          Create a game
        </div>
        <div
          className={go.joinGame}
          onClick={() => setSwitchOptions("joinGame")}
        >
          Join game
        </div>
      </div>
    </div>
  );
};
export default gameOptions;
