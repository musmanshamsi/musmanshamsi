import { pages } from "../../data/portfolioPages";

type MobileNavProps = {
  activeIndex: number;
  openSection: (index: number) => void;
};

export default function MobileNav({ activeIndex, openSection }: MobileNavProps) {
  return (
    <nav className="mobile-nav" aria-label="Mobile portfolio navigation">
      <div className="mobile-nav-track">
        {pages.map((page, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={page.id}
              onClick={() => openSection(index)}
              className={`mobile-nav-btn ${isActive ? "active" : ""}`}
              aria-label={`Navigate to ${page.nav}`}
              title={page.nav}
            >
              <span className="mobile-nav-num">{page.number}</span>
              {isActive && <span className="mobile-nav-label">{page.nav}</span>}
            </button>
          );
        })}
      </div>
    </nav>
  );
}