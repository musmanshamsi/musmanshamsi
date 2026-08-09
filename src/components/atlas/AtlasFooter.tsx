import type { Page } from "../../data/portfolioPages";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons/PortfolioIcons";

type AtlasFooterProps = {
  activePage: Page;
  goPrev: () => void;
  goNext: () => void;
};

export default function AtlasFooter({
  activePage,
  goPrev,
  goNext,
}: AtlasFooterProps) {
  return (
    <footer className="atlas-footer">
      <div className="counter">
        <span>{activePage.number}</span>
        <span>/</span>
        <span>07</span>
      </div>

      <div className="controls">
        <button onClick={goPrev} aria-label="Previous page">
          <ChevronLeftIcon />
        </button>

        <button onClick={goNext} aria-label="Next page">
          <ChevronRightIcon />
        </button>
      </div>
    </footer>
  );
}