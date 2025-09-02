import React, { useState } from "react";
import { AuthInfo } from "../types";
import { useTheme } from "../theme/ThemeContext";

type Props = {
  onAdd: () => void;
  onExport: () => void;
  exporting: boolean;
  auth: {
    info: AuthInfo;
    login: (name: string) => void;
    logout: () => void;
  };
};

export const NavBar: React.FC<Props> = ({ onAdd, onExport, exporting, auth }) => {
  const theme = useTheme();
  const [name, setName] = useState("");

  return (
    <header className="navbar">
      <div className="app-title">
        <span className="brand-dot" />
        <span style={{ color: theme.primary }}>Video</span>
        <span style={{ color: theme.secondary }}>Notes</span>
      </div>
      <div className="nav-actions">
        <button className="btn" onClick={onAdd} title="Add note">
          + New Note
        </button>
        <button className="btn-accent btn" onClick={onExport} disabled={exporting} title="Export video">
          {exporting ? "Exporting..." : "Export Video"}
        </button>
        <span className="tag">
          <span className="brand-dot" style={{ background: theme.accent }} />
          Light
        </span>
        {auth.info.isLoggedIn ? (
          <>
            <span>Hello, {auth.info.userName}</span>
            <button className="btn" onClick={auth.logout}>Logout</button>
          </>
        ) : (
          <>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="input"
              style={{ width: 140 }}
            />
            <button className="btn-primary btn" onClick={() => auth.login(name || "Guest")}>
              Login
            </button>
          </>
        )}
      </div>
    </header>
  );
};
