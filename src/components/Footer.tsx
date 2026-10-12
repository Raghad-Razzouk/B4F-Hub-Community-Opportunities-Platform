interface FooterProps {
  totalPosts: number;
  totalLikes: number;
  totalApplied: number;
}

function Footer({ totalPosts, totalLikes, totalApplied }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <p>© 2026 B4F Hub. All rights reserved.</p>
          <span>Final Take-Home Assessment Project</span>
        </div>

        <div className="footer-right">
          <div className="stat-item">
            <span className="stat-label">📝 Posts</span>
            <span className="stat-number">{totalPosts}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">❤️ Likes</span>
            <span className="stat-number">{totalLikes}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">💼 Applied</span>
            <span className="stat-number">{totalApplied}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;