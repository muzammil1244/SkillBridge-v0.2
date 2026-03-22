import { EyeIcon, ArrowLeft02Icon, PermanentJobIcon, UserSquareIcon, Mail01Icon, Profile02Icon, TimeQuarterPassIcon, StarIcon, NoteIcon } from "hugeicons-react";
import { useLocation, useNavigate } from "react-router-dom";

export const Review = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const job = location.state.job;
  const themetrue = location.state?.themtrue;

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric"
  });

  const statusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted": return { pill: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400", dot: "bg-green-500" };
      case "rejected": return { pill: "bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400", dot: "bg-red-500" };
      default: return { pill: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400", dot: "bg-amber-400" };
    }
  };

  const s = statusStyle(job.application?.status);

  return (
    <div
      data-theme={`${themetrue ? "dark" : ""}`}
      className="min-h-screen dark:bg-bg-dark bg-gray-50"
    >
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-white dark:bg-bg-dark border-b border-gray-100 dark:border-border-color px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate("/freelancer/application")}
          className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-secondary-text-color hover:text-gray-800 dark:hover:text-text-color transition-colors"
        >
          <ArrowLeft02Icon size={15} />
          Back
        </button>
        <h1 className="text-sm font-bold">
          <span className="text-purple-500 dark:text-white">Skill</span>
          <span className="text-blue-900 dark:text-accent-color">Bridge</span>
        </h1>
        <div className="w-16" />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-4">

        {/* Page Title */}
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-text-color">Application Review</h1>
          <p className="text-xs text-gray-400 dark:text-secondary-text-color mt-0.5">Full details of your submitted application</p>
        </div>

        {/* Job Info Card */}
        <div className="bg-white dark:bg-card-color border border-gray-100 dark:border-border-color rounded-2xl overflow-hidden">
          {/* Top strip */}
          <div className="h-1 w-full bg-gradient-to-r from-purple-400 to-blue-400" />

          <div className="p-5 flex flex-col gap-4">

            {/* Title + Status */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <PermanentJobIcon size={16} className="text-purple-500 dark:text-accent-color flex-shrink-0" />
                  <h2 className="text-base font-bold text-gray-800 dark:text-text-color capitalize truncate">
                    {job.title}
                  </h2>
                </div>
                <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full capitalize ${s.pill}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                  {job.application?.status}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-gray-400 dark:text-secondary-text-color flex-shrink-0">
                <TimeQuarterPassIcon size={12} />
                {formatDate(job.application?.appliedAt)}
              </div>
            </div>

            <div className="h-px bg-gray-100 dark:bg-border-color" />

            {/* Employer Info */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center flex-shrink-0">
                  <UserSquareIcon size={14} className="text-purple-500 dark:text-purple-300" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 dark:text-secondary-text-color uppercase tracking-wide font-medium">Employer</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-text-color capitalize">{job.employer?.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                  <Mail01Icon size={14} className="text-blue-500 dark:text-blue-300" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 dark:text-secondary-text-color uppercase tracking-wide font-medium">Email</p>
                  <p className="text-sm text-gray-700 dark:text-secondary-text-color">{job.employer?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Details Card */}
        <div className="bg-white dark:bg-card-color border border-gray-100 dark:border-border-color rounded-2xl p-5 flex flex-col gap-4">

          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-secondary-text-color">
            Your Submission
          </h3>

          {/* Resume */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <Profile02Icon size={13} className="text-gray-400 dark:text-secondary-text-color" />
              <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-secondary-text-color">Resume</span>
            </div>
            <a
              href={job.application?.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/30 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors group"
            >
              <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center flex-shrink-0">
                <Profile02Icon size={13} className="text-purple-600 dark:text-purple-300" />
              </div>
              <span className="text-xs text-purple-600 dark:text-purple-300 font-medium truncate flex-1">
                View Resume
              </span>
              <EyeIcon size={13} className="text-purple-400 group-hover:scale-110 transition-transform flex-shrink-0" />
            </a>
          </div>

          {/* Cover Letter */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <NoteIcon size={13} className="text-gray-400 dark:text-secondary-text-color" />
              <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-secondary-text-color">Cover Letter</span>
            </div>
            <div className="bg-gray-50 dark:bg-bg-dark border border-gray-100 dark:border-border-color rounded-xl px-4 py-3 text-sm text-gray-700 dark:text-secondary-text-color leading-relaxed max-h-48 overflow-y-auto">
              {job.application?.coverlater || "—"}
            </div>
          </div>

          {/* Rating */}
          {job.application?.rating && (
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <StarIcon size={13} className="text-gray-400 dark:text-secondary-text-color" />
                <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-secondary-text-color">Self Rating</span>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} width="16" height="16" viewBox="0 0 24 24"
                    fill={star <= job.application.rating ? "#f97316" : "none"}
                    stroke="#f97316" strokeWidth="2"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
                <span className="text-sm font-semibold text-orange-500 ml-1">{job.application.rating}/5</span>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};