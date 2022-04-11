//
//
import m from "./createGame.module.css";
import { useState, useContext, useEffect } from "react";
import { menuOptionsContext } from "../../contexts/changeMenuContext";
import gsap from "gsap";
import Link from "next/link";
import { useRouter } from "next/router";
//
//
//
//
//
const menuSelections = () => {
  const { setSwitchOptions } = useContext(menuOptionsContext);
  const router = useRouter();
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
    gameLink:
      Math.floor(Math.random() * 9999999999) *
        Math.floor(Math.random() * 9999999999) +
      Math.floor(Math.random() * 9999),
    createOn: false,
  });
  console.log(menuOptions);

  //===============================================================================
  //===============================================================================
  console.log(menuOptions.adminName.length);

  const createGame = async () => {
    if (menuOptions.adminName === "" || menuOptions.language === "") {
      console.log("err");
    } else {
      setMenuOptions((prev: any) => ({
        ...prev,
        createOn: !menuOptions.createOn,
      }));
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
      const player = await reqUser.json();
      //======================================================================
      await fetch("http://localhost:3001/games", {
        method: "POST",
        body: JSON.stringify({
          language: menuOptions.language,
          adminName: menuOptions.adminName,
          gameLink: menuOptions.gameLink,
          team: player?._id,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      router.push("/game/" + menuOptions.gameLink);
    }
  };
  return (
    <div className={m.menuContainer}>
      <div className={m.card}>
        <button onClick={() => setSwitchOptions("gameOptions")}>X</button>
        <h1 style={{ color: "white" }}>Code name</h1>
        <div className={m.cardOptions}>
          <div className={m.nameLangInputs}>
            <div className={m.chooseName}>Choose Name</div>
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
                gsap.to("." + m.langFrancais, { height: "100px" });
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
                gsap.to("." + m.langEnglish, { height: "100px" });
                gsap.to("." + m.langFrancais, { height: "30px" });
              }}
            ></div>
          </div>
          <div className={m.createGameBTNContainer}>
            <button onClick={() => createGame()} className={m.createGameBTN}>
              Create game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default menuSelections;
