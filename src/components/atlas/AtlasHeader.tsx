import { useEffect } from "react";
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
  const hasBanner = Boolean(announcementBanner.enabled && announcementBanner.text);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--banner-height",
      hasBanner ? "26px" : "0px"
    );
  }, [hasBanner]);

  return (
    <>
      {/* Global Top Announcement Banner */}
      {hasBanner && (
        <div className="announcement-banner bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-neutral-950 text-[11px] font-bold py-1 px-4 text-center tracking-wide shadow-md flex items-center justify-center gap-2">
          <span>{announcementBanner.text}</span>
        </div>
      )}

      <header className="atlas-header">
        <button
          className="brand"
          onClick={() => openSection(0)}
          aria-label="Go to overview"
        >
          <img
            src="/images/profile_image.png"
            alt="Muhammad Usman"
            className="w-full h-full rounded-full object-cover"
          />
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
            rel="noopener noreferrer"
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