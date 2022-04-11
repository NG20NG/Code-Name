//
//
import m from "./createGame.module.css";
import { useState, useContext } from "react";
import { menuOptionsContext } from "../../contexts/changeMenuContext";
import gsap from "gsap";
import Link from "next/link";
//
//
//
//
//
const menuSelections = () => {
  const { setSwitchOptions } = useContext(menuOptionsContext);
  interface Menu {
    name: String;
    language: "french" | "english" | "";
    game: String;
    adminName: String;
    gameID: String;
  }
  const [menuOptions, setMenuOptions] = useState<Menu | any>({
    name: "", // name of the user so u can create a user account
    language: "", // language of the game
    adminName: "", // admin name
    userID: "null", // users ID so i can fetch a game With the team
    gameLink:
      Math.floor(Math.random() * 9999999999) *
        Math.floor(Math.random() * 9999999999) +
      Math.floor(Math.random() * 9999),
  });
  console.log(menuOptions);

  //===============================================================================
  //===============================================================================
  const createGame = async () => {
    const reqUser = await fetch("http://localhost:3001/users", {
      method: "POST",
      body: JSON.stringify({
        isOn: true,
        name: menuOptions?.adminName,
        color: "spectator",
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await reqUser.json();
    setMenuOptions((prev: Menu) => ({ ...prev, userID: data?._id }));

    //===============================================================================
    //===============================================================================

    const reqGame = await fetch("http://localhost:3001/games", {
      method: "POST",
      body: JSON.stringify({
        language: menuOptions.language,
        adminName: menuOptions.adminName,
        gameLink: menuOptions.gameLink,
        team: menuOptions.userID,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const createGame = await reqGame.json();
    console.log(createGame);
  };

  return (
    <div className={m.menuContainer}>
      <div className={m.card}>
        <button onClick={() => setSwitchOptions("gameOptions")}>X</button>
        <h1 style={{ color: "white" }}>Code name</h1>
        <div className={m.cardOptions}>
          <div className={m.nameLangInputs}>
            <div className={m.chooseName}>YOUR NAME</div>
            <input
              className={m.chooseNameInput}
              onChange={(e) => {
                setMenuOptions((prev: Menu) => ({
                  ...prev,
                  name: e.target.value,
                  adminName: e.target.value,
                }));
              }}
            />
            <div className={m.chooseLanguage}>Language</div>
            <div
              className={m.langFrancais}
              onClick={() => {
                setMenuOptions((prev: Menu) => ({
                  ...prev,
                  language: "french",
                }));

                gsap.to("." + m.langFrancais, { height: "60px" });
                gsap.to("." + m.langEnglish, { height: "30px" });
              }}
            ></div>
            <div
              className={m.langEnglish}
              onClick={() => {
                setMenuOptions((prev: Menu) => ({
                  ...prev,
                  language: "english",
                }));
                gsap.to("." + m.langEnglish, { height: "60px" });
                gsap.to("." + m.langFrancais, { height: "30px" });
              }}
            ></div>
          </div>
          <div className={m.createGameBTNContainer}>
            <button onClick={() => createGame()} className={m.createGameBTN}>
              {/* <Link href={"/game/" + menuOptions.gameLink}> */}
              <a>Create game</a>
              {/* </Link> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default menuSelections;
