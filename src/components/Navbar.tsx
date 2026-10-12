interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

function Navbar({ isDarkMode, onToggleTheme }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo">B4F</div>
        <div>
          <h1>B4F Hub</h1>
          <p>Community & Opportunities space</p>
        </div>
      </div>

      <button 
        type="button" 
        className="theme-toggle-btn" 
        onClick={onToggleTheme}
      >
        {isDarkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </nav>
  );
}

export default Navbar;
