import { ArrowLeft02Icon, EyeIcon, Profile02Icon, TimeQuarterPassIcon, UserGroupIcon } from "hugeicons-react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Application = () => {
  const [data, setdata] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const themtrue = location.state?.themtrue;
  const theme = localStorage.getItem("theme");

  const getapplicationdata = async () => {
    console.log("yes one")
    try {
      const adata = await fetch(`${import.meta.env.VITE_API_URL}/api/freelancer/applied-jobs`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
          console.log("yes two")

          let data = await adata.json()
      setdata(data);
          console.log("yes three")
          console.log(data)

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { getapplicationdata(); }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit", month: "short", year: "numeric"
    });
  };

  const statusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted": return "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400";
      case "rejected": return "bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400";
      default: return "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400";
    }
  };

  return (
    <div
      data-theme={`${theme === "true" ? "dark" : ""}`}
      className="min-h-screen w-screen dark:bg-bg-dark bg-gray-50"
    >
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-white dark:bg-bg-dark border-b border-gray-100 dark:border-border-color px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate("/freelancer/home")}
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-secondary-text-color hover:text-gray-800 dark:hover:text-text-color transition-colors"
        >
          <ArrowLeft02Icon size={16} />
          Back
        </button>
        <h1 className="text-sm font-bold">
          <span className="text-purple-500 dark:text-white">Skill</span>
          <span className="text-blue-900 dark:text-accent-color">Bridge</span>
        </h1>
        <div className="w-16" />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-800 dark:text-text-color">My Applications</h1>
          <p className="text-xs text-gray-400 dark:text-secondary-text-color mt-0.5">
            {data.length} application{data.length !== 1 ? "s" : ""} total
          </p>
        </div>

        {/* Empty State */}
        {data.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
              <Profile02Icon className="w-6 h-6 text-purple-300" />
            </div>
            <p className="text-sm font-medium text-gray-400 dark:text-secondary-text-color">No applications yet</p>
            <p className="text-xs text-gray-300 dark:text-secondary-text-color">Apply to jobs to see them here</p>
          </div>
        )}

        {/* Cards — Mobile */}
        {data.length > 0 && (
          <>
            {/* Mobile Cards */}
            <div className="flex flex-col gap-3 md:hidden">
              {data.map((job, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-card-color border border-gray-100 dark:border-border-color rounded-2xl p-4 flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-[13px] font-semibold text-gray-800 dark:text-text-color capitalize truncate">
                        {job.title}
                      </h2>
                      <p className="text-[11px] text-gray-400 dark:text-secondary-text-color mt-0.5 capitalize">
                        {job.employer.name}
                      </p>
                    </div>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${statusStyle(job.application.status)}`}>
                      {job.application.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-400 dark:text-secondary-text-color">
                      <TimeQuarterPassIcon size={12} />
                      {formatDate(job.application.appliedAt)}
                    </div>
                    <button
                      onClick={() => navigate("/freelancer/review", { state: { themtrue, job } })}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 text-[11px] font-medium hover:bg-purple-100 transition-colors"
                    >
                      <EyeIcon size={12} />
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white dark:bg-card-color border border-gray-100 dark:border-border-color rounded-2xl overflow-hidden">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-border-color bg-gray-50 dark:bg-bg-dark">
                    <th className="px-5 py-3 text-left">
                      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-secondary-text-color">
                        <Profile02Icon size={13} /> Job Title
                      </div>
                    </th>
                    <th className="px-5 py-3 text-left">
                      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-secondary-text-color">
                        <UserGroupIcon size={13} /> Employer
                      </div>
                    </th>
                    <th className="px-5 py-3 text-left">
                      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-secondary-text-color">
                        <TimeQuarterPassIcon size={13} /> Applied On
                      </div>
                    </th>
                    <th className="px-5 py-3 text-left">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-secondary-text-color">
                        Status
                      </span>
                    </th>
                    <th className="px-5 py-3 text-center">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-secondary-text-color">
                        Action
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((job, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-50 dark:border-border-color hover:bg-gray-50 dark:hover:bg-bg-dark transition-colors last:border-0"
                    >
                      <td className="px-5 py-3.5 text-sm font-medium text-gray-800 dark:text-text-color capitalize">
                        {job.title}
                      </td>
                      <td className="px-5 py-3.5 text-sm text-gray-600 dark:text-secondary-text-color capitalize">
                        {job.employer.name}
                      </td>
                      <td className="px-5 py-3.5 text-sm text-gray-500 dark:text-secondary-text-color">
                        {formatDate(job.application.appliedAt)}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusStyle(job.application.status)}`}>
                          {job.application.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <button
                          onClick={() => navigate("/freelancer/review", { state: { themtrue, job } })}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 text-xs font-medium hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                        >
                          <EyeIcon size={13} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};