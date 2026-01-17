import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

const ThemeController = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
      <label className="flex items-center gap-2 cursor-pointer">
        <Sun />
        <input
          type="checkbox"
          className="toggle toggle-sm"
          checked={theme === "dark"}
          onChange={() => {
            setTheme(theme === "light" ? "dark" : "light");
          }}
        />
        <Moon />
      </label>
  );
};

export default ThemeController;
