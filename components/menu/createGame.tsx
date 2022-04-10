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
    game: "", // game ID so i can fetch the users with hes game
    adminName: "", // admin name
    gameID: "null",
  });
  const createGame = async () => {
    const reqGame = await fetch("http://localhost:3001/games", {
      method: "POST",
      body: JSON.stringify({
        language: menuOptions.language,
        adminName: menuOptions.adminName,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const createGame = await reqGame.json();
    setMenuOptions((prev: Menu) => ({ ...prev, gameID: createGame?._id }));

    if (createGame && menuOptions.gameID !== "null") {
      const reqUser = await fetch("http://localhost:3001/users", {
        method: "POST",
        body: JSON.stringify({
          isOn: true,
          name: menuOptions?.adminName,
          game: menuOptions?.gameID,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const createUser = await reqUser.json();
      console.log(createUser);
    }
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
              <Link href="/game">
                <a>Create game</a>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default menuSelections;
