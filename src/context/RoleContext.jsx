import React, { createContext, useContext, useState, useMemo } from "react";
import { INITIAL_PROVIDERS } from "../data/providers";
import { INITIAL_VERIFICATIONS } from "../data/verifications";
import { INITIAL_CAMPAIGNS } from "../data/followUpCampaigns";
import { TRAINEE_PROFILES } from "../data/traineeProfiles";
import { INITIAL_COURSES } from "../data/courses";

const RoleContext = createContext(null);

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState("government"); // "government" | "trainee"
  const [activeTraineeId, setActiveTraineeId] = useState("TR-2024-8831");
  const [traineeList, setTraineeList] = useState(TRAINEE_PROFILES);
  const [providers, setProviders] = useState(INITIAL_PROVIDERS);
  const [verifications, setVerifications] = useState(INITIAL_VERIFICATIONS);
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [toasts, setToasts] = useState([]);

  // Course Creation Modal state for linking from Skill-Gap Panel
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [courseModalPreFill, setCourseModalPreFill] = useState(null);

  // Global Government Filters
  const [govFilters, setGovFilters] = useState({
    scheme: "all",
    sector: "All Sectors",
    district: "all",
    batchYear: "2024"
  });

  const activeTrainee = useMemo(() => {
    return traineeList.find((t) => t.id === activeTraineeId) || traineeList[0];
  }, [traineeList, activeTraineeId]);

  const showToast = (message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Trainee actions
  const updateTraineeStatus = (updatedFields) => {
    setTraineeList((prev) =>
      prev.map((t) => {
        if (t.id === activeTraineeId) {
          const newWage = Number(updatedFields.currentMonthlyWage) || t.currentMonthlyWage;
          const newWageHistory = [...t.wageHistory];
          if (newWage > 0 && (!t.wageHistory.length || t.wageHistory[t.wageHistory.length - 1].wage !== newWage)) {
            newWageHistory.push({
              month: "Latest Update",
              wage: newWage,
              event: updatedFields.jobTitle ? `${updatedFields.jobTitle} (Self-Reported)` : "Self-Reported Update"
            });
          }

          return {
            ...t,
            ...updatedFields,
            wageHistory: newWageHistory,
            lastVerifiedDate: "Just now (Pending Employer Audit)"
          };
        }
        return t;
      })
    );
    showToast("Employment status updated! Submitted to MSInS Verification Desk.", "success");
  };

  const updateTraineeContact = (contactData) => {
    setTraineeList((prev) =>
      prev.map((t) => (t.id === activeTraineeId ? { ...t, ...contactData } : t))
    );
    showToast("Contact details updated successfully in State Skill Registry.", "success");
  };

  const toggleTraineeConsent = (key) => {
    setTraineeList((prev) =>
      prev.map((t) => {
        if (t.id === activeTraineeId) {
          const updatedConsent = { ...t.consent, [key]: !t.consent[key] };
          return { ...t, consent: updatedConsent };
        }
        return t;
      })
    );
    showToast("Privacy & consent preferences updated.", "info");
  };

  // Government actions
  const toggleProviderFlag = (providerId, reason) => {
    setProviders((prev) =>
      prev.map((p) => {
        if (p.id === providerId) {
          const isCurrentlyFlagged = p.status === "flagged_for_review";
          return {
            ...p,
            status: isCurrentlyFlagged ? "good_standing" : "flagged_for_review",
            flagReason: isCurrentlyFlagged ? null : reason || "Flagged for district audit review",
            flaggedAt: isCurrentlyFlagged ? null : new Date().toISOString().split("T")[0]
          };
        }
        return p;
      })
    );
    showToast("Provider compliance status updated.", "info");
  };

  const updateVerificationStatus = (verificationId, newStatus, reviewerNotes = "") => {
    setVerifications((prev) =>
      prev.map((item) => {
        if (item.id === verificationId) {
          return {
            ...item,
            status: newStatus,
            verifiedAt: new Date().toISOString().split("T")[0],
            employerVerifiedBy: newStatus === "confirmed" ? "MSInS Audit Cell Verified" : item.employerVerifiedBy,
            disputeNotes: newStatus === "disputed" ? reviewerNotes || "Discrepancy flagged by audit officer" : item.disputeNotes
          };
        }
        return item;
      })
    );
    showToast(`Verification status updated to: ${newStatus.toUpperCase()}`, newStatus === "confirmed" ? "success" : "warning");
  };

  const dispatchAssistedCampaign = (campaignId) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === campaignId) {
          return {
            ...c,
            assistedCallCenterActive: true,
            status: "active",
            callCenterDispatchedCount: c.nonResponders,
            lastDispatchDate: new Date().toISOString().split("T")[0]
          };
        }
        return c;
      })
    );
    showToast("Assisted Call Center campaign dispatched for non-responders.", "success");
  };

  const createNewCourse = (newCourseData) => {
    const courseObj = {
      id: `CRS-MH-2025-0${courses.length + 1}`,
      createdAt: new Date().toISOString().split("T")[0],
      enrolledSeats: 0,
      status: "Active",
      ...newCourseData
    };
    setCourses((prev) => [courseObj, ...prev]);
    showToast(`New Course Created: "${newCourseData.name}" has been launched statewide!`, "success");
  };

  const openCreateCourseWithPreFill = (gapData) => {
    setCourseModalPreFill({
      name: gapData?.tag ? `${gapData.tag} Technician Certification` : "",
      sector: gapData?.sector || "Automotive & EV",
      duration: "120 Hours (4 Weeks)",
      targetDistricts: ["Pune", "Nashik"],
      schemeTag: "MMYY",
      seats: 60,
      eligibility: "10th / 12th Pass or ITI holder",
      skillTags: gapData?.tag ? [gapData.tag] : [],
      addressedSkillGap: gapData?.tag || ""
    });
    setIsCourseModalOpen(true);
  };

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        activeTrainee,
        activeTraineeId,
        setActiveTraineeId,
        traineeList,
        providers,
        verifications,
        campaigns,
        courses,
        createNewCourse,
        isCourseModalOpen,
        setIsCourseModalOpen,
        courseModalPreFill,
        openCreateCourseWithPreFill,
        toasts,
        showToast,
        removeToast,
        govFilters,
        setGovFilters,
        updateTraineeStatus,
        updateTraineeContact,
        toggleTraineeConsent,
        toggleProviderFlag,
        updateVerificationStatus,
        dispatchAssistedCampaign
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};
