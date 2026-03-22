import { PermanentJobIcon, BorderFullIcon, BubbleChatOutcomeIcon, StarIcon, ArrowLeft02Icon, UserStatusIcon, Search01Icon, FilterAddIcon } from "hugeicons-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Applications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const jobId = location?.state?.jobid;
  const senderId = location?.state?.senderId;
  const themtrue = location?.state?.themtrue;

  const filteredApplicants = applicants.filter((applicant) => {
    const matchName = applicant.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "all" || applicant.status === statusFilter;
    return matchName && matchStatus;
  });

  useEffect(() => { applicationdata(); }, []);

  const applicationdata = async () => {
    const token = localStorage.getItem("token");
    try {
      const data = await fetch(`${import.meta.env.VITE_API_URL}/api/employer/${jobId._id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await data.json();
      setApplicants(json.applicants);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (index, newStatus) => {
    const updated = [...applicants];
    const freelancerId = updated[index].freelancerId;
    updated[index].status = newStatus;
    setApplicants(updated);
    setActiveDropdownIndex(null);
    const token = localStorage.getItem("token");
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/update-status/${jobId._id}/${freelancerId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (error) {
      console.log("Status update failed", error);
    }
  };

  return (
    <div
      data-theme={`${themtrue ? "dark" : ""}`}
      className="min-h-screen dark:bg-bg-dark bg-gray-50"
    >
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-white dark:bg-bg-dark border-b border-gray-100 dark:border-border-color px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate("/employer/home")}
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

      <div className="max-w-6xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <PermanentJobIcon size={16} className="text-purple-500 dark:text-accent-color" />
            <h1 className="text-xl font-bold text-gray-800 dark:text-text-color capitalize">{jobId?.title}</h1>
          </div>
          <p className="text-xs text-gray-400 dark:text-secondary-text-color">
            {applicants.length} applicant{applicants.length !== 1 ? "s" : ""} total
          </p>
        </div>

        {/* Stats */}
        {applicants.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: "Total", count: applicants.length, color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300" },
              { label: "Pending", count: applicants.filter(a => a.status === "pending").length, color: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400" },
              { label: "Accepted", count: applicants.filter(a => a.status === "accepted").length, color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400" },
            ].map((stat, i) => (
              <div key={i} className={`rounded-xl px-4 py-3 flex flex-col items-center ${stat.color}`}>
                <span className="text-xl font-bold">{stat.count}</span>
                <span className="text-[11px] font-medium mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Search + Filter */}
        <div className="flex gap-2 mb-6">
          <div className="flex-1 relative">
            <Search01Icon size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs bg-white dark:bg-card-color border border-gray-200 dark:border-border-color rounded-xl outline-none focus:ring-2 focus:ring-purple-300 dark:text-secondary-text-color placeholder:text-gray-300"
            />
          </div>
          <div className="relative flex items-center">
            <FilterAddIcon size={13} className="absolute left-3 text-gray-400 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-8 pr-3 py-2 text-xs bg-white dark:bg-card-color border border-gray-200 dark:border-border-color rounded-xl outline-none focus:ring-2 focus:ring-purple-300 dark:text-secondary-text-color appearance-none cursor-pointer"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin" />
          </div>
        )}

        {/* Empty */}
        {!loading && filteredApplicants.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
              <UserStatusIcon className="w-6 h-6 text-purple-300" />
            </div>
            <p className="text-sm font-medium text-gray-400 dark:text-secondary-text-color">No applicants found</p>
            <p className="text-xs text-gray-300 dark:text-secondary-text-color">Try changing your search or filter</p>
          </div>
        )}

        {/* Cards Grid */}
        {!loading && filteredApplicants.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredApplicants.map((applicant, index) => (
              <div
                key={index}
                className="bg-white dark:bg-card-color border border-gray-100 dark:border-border-color rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Top strip */}
                <div className="h-1 w-full bg-gradient-to-r from-purple-400 to-blue-400" />

                <div className="p-4 flex flex-col gap-3">

                  {/* Profile */}
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <img
                        src={applicant.profileImage}
                        alt={applicant.name}
                        className="w-12 h-12 rounded-xl object-cover border border-gray-100 dark:border-border-color"
                      />
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-card-color ${
                        applicant.status === "accepted" ? "bg-green-400" :
                        applicant.status === "rejected" ? "bg-red-400" : "bg-amber-400"
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-[13px] font-bold text-gray-800 dark:text-text-color capitalize truncate">{applicant.name}</h2>
                      <p className="text-[11px] text-gray-400 dark:text-secondary-text-color truncate">{applicant.email}</p>
                    </div>
                    {/* Rating */}
                    <div className="flex items-center gap-1 flex-shrink-0 px-2 py-1 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                      <StarIcon size={11} className="text-orange-500" />
                      <span className="text-[11px] font-semibold text-orange-600 dark:text-orange-400">{applicant.rating}</span>
                    </div>
                  </div>

                  <div className="h-px bg-gray-100 dark:bg-border-color" />

                  {/* Cover Letter */}
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-secondary-text-color">Cover Letter</span>
                    <p className="text-[12px] text-gray-600 dark:text-secondary-text-color mt-1 line-clamp-2 leading-relaxed">
                      {applicant.coverLater || "—"}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-secondary-text-color">Status</span>
                    {activeDropdownIndex === index ? (
                      <select
                        className="text-xs border border-gray-200 dark:border-border-color rounded-lg px-2 py-1 bg-white dark:bg-bg-dark dark:text-secondary-text-color outline-none"
                        value={applicant.status}
                        onChange={(e) => handleStatusChange(index, e.target.value)}
                        autoFocus
                        onBlur={() => setActiveDropdownIndex(null)}
                      >
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    ) : (
                      <button
                        onClick={() => setActiveDropdownIndex(index)}
                        className={`text-[11px] font-medium px-2.5 py-1 rounded-full capitalize flex items-center gap-1.5 cursor-pointer transition-colors ${
                          applicant.status === "accepted" ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400" :
                          applicant.status === "rejected" ? "bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400" :
                          "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          applicant.status === "accepted" ? "bg-green-500" :
                          applicant.status === "rejected" ? "bg-red-500" : "bg-amber-400"
                        }`} />
                        {applicant.status}
                      </button>
                    )}
                  </div>

                  {/* Applied At */}
                  <p className="text-[11px] text-gray-400 dark:text-secondary-text-color">
                    Applied {new Date(applicant.appliedAt).toLocaleDateString("en-IN", {
                      day: "2-digit", month: "short", year: "numeric"
                    })}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2 pt-1 border-t border-gray-100 dark:border-border-color">
                    <a
                      href={applicant.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 text-xs font-medium text-center hover:bg-purple-100 transition-colors"
                    >
                      View Resume
                    </a>
                    <button
                      onClick={() => navigate("/chatapp", {
                        state: { senderId, reciverId: applicant, conversationId: "new", jobid: jobId, employertrue: true }
                      })}
                      className="flex-1 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-blue-100 transition-colors"
                    >
                      <BubbleChatOutcomeIcon size={13} />
                      Chat
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};