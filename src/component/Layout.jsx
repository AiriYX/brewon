import "./Layout.css";
import SideBar from "./sidebar/SideBar";

export const Layout = ({ children }) => {
  return (
    <div className="page">
      <div className="navbar-container">
        <SideBar />
      </div>
      {/*this is the content of the page */}
      <div className="content">{children}</div>
      {/* over here we will leave empty for now, might add some more data? but we know that here will put someone on the right side */}
    </div>
  );
};
