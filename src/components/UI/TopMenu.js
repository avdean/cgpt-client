import { HiMenu, HiSun, HiMoon } from "react-icons/hi";

const TopMenu = (props) => {
    return (
               <div className="topmenu">
          <div className="sidemenu-button" onClick={props.toggleSideMenu}>
            <HiMenu />
          </div>
          <p>{currentModel}</p>
          {props.theme === "light" ? (
            <div className="sidemenu-button" onClick={props.switchTheme}>
              <HiSun />
            </div>
          ) : (
            <div className="sidemenu-button" onClick={props.switchTheme}>
              <HiMoon />
            </div>
          )}
        </div>
    )
}

export default TopMenu