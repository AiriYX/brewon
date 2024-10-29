import { Link, useHref } from "react-router-dom";
import "./SideBar.css";

const ROUTES = [
  { href: "/", title: "Dashboard" },
  { href: "/search", title: "Search" },
  { href: "/about", title: "About" },
];

const SideBar = () => {
  const href = useHref();

  return (
    <div className="navbar">
      <img src="/images/brand.png" className="brand" />

      <div className="routes-container">
        {ROUTES.map((r) => (
          <Link
            className={`link-container${
              href === r.href ? ` link-container-active` : ""
            }`}
            key={r.href}
            to={r.href}
          >
            <div className="link-item">{r.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
