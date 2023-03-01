import { HiX, HiPlus, HiSun, HiMoon } from "react-icons/hi";

const SideMenu = (props) => {
  return (
    <>
      <aside
        className={props.showSidemenu ? "sidemenu show" : "sidemenu"}
        initial={{ x: 1 }}
        animate={{ x: 0 }}
        key="aside"
      >
        <div className="sidemenuInner">
          {props.showSidemenu && (
            <div className="sidemenu-button" onClick={props.toggleSideMenu}>
              <HiX />
              Close Menu
            </div>
          )}
          <div className="sidemenu-button" onClick={props.clearChat}>
            <HiPlus />
            New chat
          </div>
          <div>
            <h3>Models</h3>
            <select
              className="dropdown"
              onChange={(e) => {
                props.setCurrentModel(e.target.value);
                localStorage.setItem(props.setCurrentModel, e.target.value);
                console.log(props.currentModel);
              }}
              value={props.currentModel}
            >
              <option value="text-davinci-003">Text - Davinci 3</option>
              <option value="text-davinci-002">Text - Davinci 2</option>
              <option value="text-davinci">Text - Davinci 1</option>
              <option value="text-ada">Text - Ada</option>
              <option value="code-cushman-001">Code - Cushman</option>
            </select>
          </div>
        </div>
        {props.theme === "light" ? (
          <div className="sidemenu-button" onClick={props.switchTheme}>
            <HiSun />
            Light Mode
          </div>
        ) : (
          <div className="sidemenu-button" onClick={props.switchTheme}>
            <HiMoon />
            Dark Mode
          </div>
        )}
      </aside>
    </>
  );
};

export default SideMenu;
