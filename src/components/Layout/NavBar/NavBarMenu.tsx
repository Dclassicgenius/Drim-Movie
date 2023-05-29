import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export type MenuItem = {
  id: number;
  name: string;
  to: string;
};

type NavBarMenuProps = {
  header: string;
  menuItem: MenuItem[];
  mediaType: "movie" | "tv" | "people";
};

export default function NavBarMenu({
  header,
  menuItem,
  mediaType,
}: NavBarMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const location = useLocation();
  useEffect(() => {
    setAnchorEl(null);
  }, [location]);

  return (
    <div>
      <Button
        id="Navbar-menu-button"
        aria-controls={open ? "NavBar-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {header}
      </Button>
      <Menu
        id="Navbar-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "Navbar-menu-button",
        }}
      >
        {menuItem &&
          menuItem.map((menu) => (
            <Link
              key={menu.id}
              to={`${mediaType}/${menu.to.toLocaleLowerCase()}`}
            >
              <MenuItem onClick={handleClose}>{menu.name}</MenuItem>
            </Link>
          ))}
      </Menu>
    </div>
  );
}
