import { useState } from "react";
import { ArrowLeft02Icon, PlusSignIcon, Cancel01Icon, ImageAdd02Icon, CheckmarkCircle01Icon } from "hugeicons-react";
import { useLocation, useNavigate } from "react-router-dom";

export function Create() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loader, sertloader] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [jobData, setJobData] = useState({
    title: "", description: "", skill: [], budget: "",
    deadline: "", jobtype: "work from Home", salary: "",
    canapply: "", opportunity: "", image: null, active: true,
  });

  const [skillInput, setSkillInput] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setJobData({ ...jobData, [name]: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else if (type === "checkbox") {
      setJobData({ ...jobData, [name]: checked });
    } else {
      setJobData({ ...jobData, [name]: value });
    }
  };

  const addSkill = () => {
    if (skillInput.trim() !== "") {
      setJobData({ ...jobData, skill: [...jobData.skill, skillInput.trim()] });
      setSkillInput("");
    }
  };

  const removeSkill = (index) => {
    const newSkills = [...jobData.skill];
    newSkills.splice(index, 1);
    setJobData({ ...jobData, skill: newSkills });
  };

  const CreateJob = async (e) => {
    e.preventDefault();
    if (new Date(jobData.deadline) < new Date()) {
      alert("Deadline must be a future date.");
      return;
    }
    const token = localStorage.getItem("token");
    sertloader(true);
    try {
      const formData = new FormData();
      formData.append("title", jobData.title);
      formData.append("description", jobData.description);
      formData.append("budget", jobData.budget);
      formData.append("deadline", jobData.deadline);
      formData.append("jobtype", jobData.jobtype);
      formData.append("salary", jobData.salary);
      formData.append("canapply", jobData.canapply);
      formData.append("opportunity", jobData.opportunity);
      formData.append("active", jobData.active);
      formData.append("skill", JSON.stringify(jobData.skill));
      if (jobData.image) formData.append("image", jobData.image);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/jobcreate`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        sertloader(false);
        navigate("/employer/home");
      } else {
        sertloader(false);
        alert("Job post failed: " + result.error);
      }
    } catch (err) {
      console.error("Error:", err);
      sertloader(false);
    }
  };

  const inputClass = "w-full bg-gray-50 dark:bg-bg-dark border border-gray-200 dark:border-border-color rounded-xl px-4 py-2.5 text-sm text-gray-700 dark:text-secondary-text-color outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-accent-color placeholder:text-gray-300";
  const labelClass = "text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-secondary-text-color mb-1.5 block";

  return (
    <div
      data-theme={location.state?.themtrue ? "dark" : ""}
      className="min-h-screen bg-gray-50 dark:bg-bg-dark"
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

      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-800 dark:text-text-color">Create Job</h1>
          <p className="text-xs text-gray-400 dark:text-secondary-text-color mt-0.5">Fill in the details to post a new job</p>
        </div>

        <form onSubmit={CreateJob} className="flex flex-col gap-4">

          {/* Basic Info Card */}
          <div className="bg-white dark:bg-card-color border border-gray-100 dark:border-border-color rounded-2xl overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-purple-400 to-blue-400" />
            <div className="p-5 flex flex-col gap-4">
              <p className="text-xs font-semibold text-gray-500 dark:text-secondary-text-color uppercase tracking-wide">Basic Info</p>

              <div>
                <label className={labelClass}>Job Title *</label>
                <input type="text" name="title" placeholder="e.g. React Developer" value={jobData.title} onChange={handleChange} className={inputClass} required />
              </div>

              <div>
                <label className={labelClass}>Job Description</label>
                <textarea name="description" placeholder="Describe the job role, responsibilities..." value={jobData.description} onChange={handleChange} rows={4} className={`${inputClass} resize-none`} />
              </div>

              <div>
                <label className={labelClass}>Who Can Apply</label>
                <input type="text" name="canapply" placeholder="e.g. Freshers, 1-2 years experience" value={jobData.canapply} onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Opportunities</label>
                <input type="number" name="opportunity" placeholder="No. of openings" value={jobData.opportunity} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          </div>

          {/* Skills Card */}
          <div className="bg-white dark:bg-card-color border border-gray-100 dark:border-border-color rounded-2xl p-5 flex flex-col gap-3">
            <p className="text-xs font-semibold text-gray-500 dark:text-secondary-text-color uppercase tracking-wide">Required Skills</p>

            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                placeholder="Type a skill and press Add or Enter"
                className={inputClass}
              />
              <button type="button" onClick={addSkill}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 text-white text-xs font-medium transition-colors flex-shrink-0">
                <PlusSignIcon size={13} />
                Add
              </button>
            </div>

            {jobData.skill.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {jobData.skill.map((sk, idx) => (
                  <span key={idx} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 text-[11px] font-medium">
                    {sk}
                    <button type="button" onClick={() => removeSkill(idx)} className="text-purple-400 hover:text-red-500 transition-colors">
                      <Cancel01Icon size={10} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Compensation Card */}
          <div className="bg-white dark:bg-card-color border border-gray-100 dark:border-border-color rounded-2xl p-5 flex flex-col gap-4">
            <p className="text-xs font-semibold text-gray-500 dark:text-secondary-text-color uppercase tracking-wide">Compensation & Type</p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Salary (₹)</label>
                <input type="number" name="salary" placeholder="e.g. 15000" value={jobData.salary} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Budget (₹)</label>
                <input type="number" name="budget" placeholder="e.g. 20000" value={jobData.budget} onChange={handleChange} className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Job Type</label>
                <select name="jobtype" value={jobData.jobtype} onChange={handleChange} className={inputClass}>
                  <option value="work from Home">Work from Home</option>
                  <option value="work from office">Work from Office</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Deadline</label>
                <input type="date" name="deadline" value={jobData.deadline} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          </div>

          {/* Image + Active Card */}
          <div className="bg-white dark:bg-card-color border border-gray-100 dark:border-border-color rounded-2xl p-5 flex flex-col gap-4">
            <p className="text-xs font-semibold text-gray-500 dark:text-secondary-text-color uppercase tracking-wide">Company Details</p>

            {/* Image Upload */}
            <div>
              <label className={labelClass}>Company Image</label>
              <label className="flex items-center gap-3 bg-gray-50 dark:bg-bg-dark border border-dashed border-gray-300 dark:border-border-color rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-border-color transition-colors">
                {imagePreview ? (
                  <img src={imagePreview} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" alt="preview" />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center flex-shrink-0">
                    <ImageAdd02Icon size={18} className="text-purple-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-600 dark:text-secondary-text-color">
                    {imagePreview ? "Image selected ✓" : "Click to upload company logo"}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">PNG, JPG, WEBP supported</p>
                </div>
                <input type="file" name="image" accept="image/*" onChange={handleChange} className="hidden" />
              </label>
            </div>

            {/* Active Toggle */}
            <div
              onClick={() => setJobData({ ...jobData, active: !jobData.active })}
              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                jobData.active
                  ? "bg-green-50 dark:bg-green-900/15 border-green-200 dark:border-green-800/30"
                  : "bg-gray-50 dark:bg-bg-dark border-gray-200 dark:border-border-color"
              }`}
            >
              <div className="flex items-center gap-2">
                <CheckmarkCircle01Icon size={16} className={jobData.active ? "text-green-500" : "text-gray-400"} />
                <div>
                  <p className={`text-xs font-semibold ${jobData.active ? "text-green-700 dark:text-green-400" : "text-gray-500 dark:text-secondary-text-color"}`}>
                    {jobData.active ? "Currently Hiring" : "Not Active"}
                  </p>
                  <p className="text-[10px] text-gray-400 dark:text-secondary-text-color">Click to toggle</p>
                </div>
              </div>
              <div className={`w-10 h-5 rounded-full transition-colors flex items-center px-0.5 ${jobData.active ? "bg-green-500" : "bg-gray-300 dark:bg-border-color"}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${jobData.active ? "translate-x-5" : "translate-x-0"}`} />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loader}
            className="w-full py-3 rounded-xl bg-purple-500 hover:bg-purple-600 disabled:opacity-70 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            {loader ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <PlusSignIcon size={15} />
                Post Job
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
}