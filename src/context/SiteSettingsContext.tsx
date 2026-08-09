import React, { createContext, useContext, useState, useEffect } from "react";

export interface AnnouncementBanner {
  enabled: boolean;
  text: string;
  type: "info" | "success" | "warning";
}

interface SiteSettingsContextType {
  maintenanceMode: boolean;
  announcementBanner: AnnouncementBanner;
  blackoutDates: string[];
  disabledTimeSlots: Record<string, string[]>;
  toggleMaintenanceMode: (enabled: boolean) => void;
  updateAnnouncementBanner: (banner: AnnouncementBanner) => void;
  addBlackoutDate: (date: string) => void;
  removeBlackoutDate: (date: string) => void;
  toggleTimeSlotDisable: (date: string, slot: string) => void;
  isDateBlackedOut: (date: string) => boolean;
  isSlotDisabled: (date: string, slot: string) => boolean;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("usman_portfolio_maintenance");
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const [announcementBanner, setAnnouncementBanner] = useState<AnnouncementBanner>(() => {
    try {
      const saved = localStorage.getItem("usman_portfolio_announcement");
      return saved
        ? JSON.parse(saved)
        : {
            enabled: true,
            text: "Welcome to M. Usman Shamsi's Portfolio! Feel free to send a message or schedule a consultation.",
            type: "info",
          };
    } catch {
      return {
        enabled: true,
        text: "Welcome to M. Usman Shamsi's Portfolio! Feel free to send a message or schedule a consultation.",
        type: "info",
      };
    }
  });

  const [blackoutDates, setBlackoutDates] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("usman_portfolio_blackout_dates");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [disabledTimeSlots, setDisabledTimeSlots] = useState<Record<string, string[]>>(() => {
    try {
      const saved = localStorage.getItem("usman_portfolio_disabled_slots");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("usman_portfolio_maintenance", JSON.stringify(maintenanceMode));
  }, [maintenanceMode]);

  useEffect(() => {
    localStorage.setItem("usman_portfolio_announcement", JSON.stringify(announcementBanner));
  }, [announcementBanner]);

  useEffect(() => {
    localStorage.setItem("usman_portfolio_blackout_dates", JSON.stringify(blackoutDates));
  }, [blackoutDates]);

  useEffect(() => {
    localStorage.setItem("usman_portfolio_disabled_slots", JSON.stringify(disabledTimeSlots));
  }, [disabledTimeSlots]);

  const toggleMaintenanceMode = (enabled: boolean) => setMaintenanceMode(enabled);

  const updateAnnouncementBanner = (banner: AnnouncementBanner) => setAnnouncementBanner(banner);

  const addBlackoutDate = (date: string) => {
    if (!blackoutDates.includes(date)) {
      setBlackoutDates((prev) => [...prev, date]);
    }
  };

  const removeBlackoutDate = (date: string) => {
    setBlackoutDates((prev) => prev.filter((d) => d !== date));
  };

  const toggleTimeSlotDisable = (date: string, slot: string) => {
    setDisabledTimeSlots((prev) => {
      const current = prev[date] || [];
      const exists = current.includes(slot);
      const updated = exists ? current.filter((s) => s !== slot) : [...current, slot];
      return { ...prev, [date]: updated };
    });
  };

  const isDateBlackedOut = (date: string) => blackoutDates.includes(date);

  const isSlotDisabled = (date: string, slot: string) => {
    const slots = disabledTimeSlots[date] || [];
    return slots.includes(slot);
  };

  return (
    <SiteSettingsContext.Provider
      value={{
        maintenanceMode,
        announcementBanner,
        blackoutDates,
        disabledTimeSlots,
        toggleMaintenanceMode,
        updateAnnouncementBanner,
        addBlackoutDate,
        removeBlackoutDate,
        toggleTimeSlotDisable,
        isDateBlackedOut,
        isSlotDisabled,
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error("useSiteSettings must be used within a SiteSettingsProvider");
  }
  return context;
};
