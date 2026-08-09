import { GithubIcon, LinkedInIcon, MailIcon } from "../icons/PortfolioIcons";
import { pages } from "../../data/portfolioPages";
import { useSiteSettings } from "../../context/SiteSettingsContext";

type AtlasHeaderProps = {
  activeIndex: number;
  openSection: (index: number) => void;
};

export default function AtlasHeader({
  activeIndex,
  openSection,
}: AtlasHeaderProps) {
  const { announcementBanner } = useSiteSettings();

  return (
    <>
      {/* Global Top Announcement Banner */}
      {announcementBanner.enabled && announcementBanner.text && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-neutral-950 text-[11px] font-bold py-1 px-4 text-center tracking-wide shadow-md flex items-center justify-center gap-2">
          <span>{announcementBanner.text}</span>
        </div>
      )}

      <header className={`atlas-header ${announcementBanner.enabled && announcementBanner.text ? "mt-6" : ""}`}>
        <button
          className="brand"
          onClick={() => openSection(0)}
          aria-label="Go to overview"
        >
          <img
            src="/images/profile_image.png"
            alt="Muhammad Usman"
            className="w-8 h-8 rounded-full object-cover border border-amber-400/50 shadow-sm"
          />
          <span>MU</span>
        </button>

        <nav className="desktop-nav" aria-label="Portfolio sections">
          {pages.map((page, index) => (
            <button
              key={page.id}
              onClick={() => openSection(index)}
              className={index === activeIndex ? "active" : ""}
            >
              {page.nav}
            </button>
          ))}
        </nav>

        <div className="header-actions">

          <a
            href="/resume.pdf"
            download="Usman-Shamsi-Resume.pdf"
            className="resume-btn"
            aria-label="Download resume PDF"
          >
            Resume ↓
          </a>

          <a
            href="mailto:m.usman.shamsi.pak@gmail.com"
            className="header-icon-link"
            aria-label="Send email"
          >
            <MailIcon />
          </a>

          <a
            href="https://www.linkedin.com/in/musmanshamsi"
            target="_blank"
            rel="noreferrer"
            className="header-icon-link"
            aria-label="Open LinkedIn profile"
          >
            <LinkedInIcon />
          </a>

          <a
            href="https://github.com/musmanshamsi"
            target="_blank"
            rel="noreferrer"
            className="header-icon-link"
            aria-label="Open GitHub"
          >
            <GithubIcon />
          </a>
        </div>
      </header>
    </>
  );
}