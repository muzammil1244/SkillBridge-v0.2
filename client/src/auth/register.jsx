import { LockPasswordIcon, Mail01Icon, UserSquareIcon, EyeIcon, ImageAdd02Icon, ViewOffSlashIcon } from "hugeicons-react";
import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", reason: "", profileImage: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loader, sertloader] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setError("");
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const Submitfun = async (e) => {
    e.preventDefault();
    sertloader(true);
    const realFormData = new FormData();
    realFormData.append("name", formData.name);
    realFormData.append("email", formData.email);
    realFormData.append("password", formData.password);
    realFormData.append("roll", formData.reason);
    realFormData.append("profileImage", formData.profileImage);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        body: realFormData,
      });
      const data = await response.json();
      if (!response.ok) {
        sertloader(false);
        if (data.details?.includes("duplicate key")) {
          setError("Email already exists. Please use a different email.");
        } else {
          setError("Registration failed: " + data.error);
        }
      } else {
        sertloader(false);
        navigate("/login");
      }
    } catch (err) {
      sertloader(false);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-screen h-screen bg-white flex flex-col-reverse md:flex-row overflow-hidden">

      {/* Left — Form */}
      <div className="bg-white md:w-1/2 h-full flex flex-col justify-center px-8 md:px-14 py-10 overflow-y-auto">

        {/* Logo + Nav */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between"
        >
          <h1 className="text-sm font-bold">
            <span className="text-purple-500">Skill</span>
            <span className="text-blue-900">Bridge</span>
          </h1>
          <button
            onClick={() => navigate("/login")}
            className="text-xs font-medium mt-5 text-gray-500 hover:text-purple-600 border border-gray-200 hover:border-purple-300 px-3 py-1.5 rounded-lg transition-colors"
          >
            Sign in →
          </button>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Create account 🚀</h2>
          <p className="text-sm text-gray-400 mt-1">Join SkillBridge and start your journey</p>
        </motion.div>

        <form onSubmit={Submitfun} className="flex flex-col gap-3.5">

          {/* Name */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <label className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5 block">Full Name</label>
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 focus-within:ring-2 focus-within:ring-purple-300 focus-within:border-purple-300 transition-all">
              <UserSquareIcon size={15} className="text-gray-400 flex-shrink-0" />
              <input
                type="text" name="name" placeholder="Your full name"
                onChange={handleChange} required
                className="bg-transparent w-full py-2.5 text-sm text-gray-700 placeholder:text-gray-300 outline-none"
              />
            </div>
          </motion.div>

          {/* Email */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <label className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5 block">Email Address</label>
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 focus-within:ring-2 focus-within:ring-purple-300 focus-within:border-purple-300 transition-all">
              <Mail01Icon size={15} className="text-gray-400 flex-shrink-0" />
              <input
                type="email" name="email" placeholder="you@example.com"
                onChange={handleChange} required
                className="bg-transparent w-full py-2.5 text-sm text-gray-700 placeholder:text-gray-300 outline-none"
              />
            </div>
          </motion.div>

          {/* Password */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
            <label className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5 block">Password</label>
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 focus-within:ring-2 focus-within:ring-purple-300 focus-within:border-purple-300 transition-all">
              <LockPasswordIcon size={15} className="text-gray-400 flex-shrink-0" />
              <input
                type={showPassword ? "text" : "password"} name="password"
                placeholder="Create a password" onChange={handleChange} required
                className="bg-transparent w-full py-2.5 text-sm text-gray-700 placeholder:text-gray-300 outline-none flex-1"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-purple-500 transition-colors flex-shrink-0">
                {showPassword ? <ViewOffSlashIcon size={15} /> : <EyeIcon size={15} />}
              </button>
            </div>
          </motion.div>

          {/* Role */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <label className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-2 block">I am a</label>
            <div className="grid grid-cols-2 gap-2">
              {["freelancer", "employer"].map((role) => (
                <label
                  key={role}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border cursor-pointer transition-all text-sm font-medium capitalize ${
                    formData.reason === role
                      ? "bg-purple-50 border-purple-400 text-purple-600"
                      : "bg-gray-50 border-gray-200 text-gray-500 hover:border-purple-200"
                  }`}
                >
                  <input type="radio" name="reason" value={role} onChange={handleChange} className="hidden" />
                  {role === "freelancer" ? "💻" : "🏢"} {role}
                </label>
              ))}
            </div>
          </motion.div>

          {/* Profile Image */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
            <label className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5 block">Profile Photo</label>
            <label className="flex items-center gap-3 bg-gray-50 border border-dashed border-gray-300 rounded-xl px-4 py-2.5 cursor-pointer hover:bg-gray-100 transition-colors">
              {imagePreview ? (
                <img src={imagePreview} className="w-8 h-8 rounded-xl object-cover flex-shrink-0" alt="preview" />
              ) : (
                <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <ImageAdd02Icon size={15} className="text-purple-400" />
                </div>
              )}
              <span className="text-xs text-gray-400">
                {imagePreview ? "Photo selected ✓" : "Click to upload profile photo"}
              </span>
              <input type="file" name="profileImage" accept="image/*" onChange={handleChange} className="hidden" />
            </label>
          </motion.div>

          {/* Error */}
          {error && (
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2"
            >
              {error}
            </motion.p>
          )}

          {/* Submit */}
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            type="submit"
            disabled={loader}
            className="w-full py-3 bg-purple-500 hover:bg-purple-600 disabled:opacity-70 transition-colors text-white rounded-xl text-sm font-semibold flex items-center justify-center mt-1"
          >
            {loader ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : "Create Account"}
          </motion.button>

          <p className="text-center text-xs text-gray-400">
            Already have an account?{" "}
            <button type="button" onClick={() => navigate("/login")} className="text-purple-500 font-semibold hover:underline">
              Sign in
            </button>
          </p>

        </form>
      </div>

      {/* Right — Live Preview */}
      <div className="bg-purple-500 md:w-1/2 md:h-full hidden md:flex flex-col items-center justify-center px-8 relative overflow-hidden">

        {/* BG Decoration */}
        <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-purple-400/30" />
        <div className="absolute bottom-20 left-5 w-24 h-24 rounded-full bg-purple-400/20" />
        <div className="absolute top-1/3 left-0 w-12 h-12 rounded-full bg-white/10" />

        {/* Live Preview Card — draggable */}
        <motion.div
          drag
          dragConstraints={{ left: -80, right: 80, top: -40, bottom: 40 }}
          whileDrag={{ scale: 0.95 }}
          dragElastic={0.3}
          className="bg-white rounded-2xl shadow-2xl w-72 p-5 text-center cursor-grab active:cursor-grabbing relative z-10 mb-6"
        >
          {/* Avatar */}
          <div className="mb-3">
            {imagePreview ? (
              <img src={imagePreview} className="w-20 h-20 mx-auto rounded-2xl object-cover border-2 border-purple-100" alt="Profile" />
            ) : (
              <div className="w-20 h-20 mx-auto rounded-2xl bg-purple-100 flex items-center justify-center text-purple-400 text-2xl">
                {formData.name ? formData.name.charAt(0).toUpperCase() : "?"}
              </div>
            )}
          </div>

          <h2 className="text-base font-bold text-orange-500 capitalize">
            {formData.name || "Your Name"}
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {formData.email || "youremail@example.com"}
          </p>

          {formData.reason && (
            <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium capitalize bg-purple-50 text-purple-600">
              {formData.reason === "freelancer" ? "💻" : "🏢"} {formData.reason}
            </span>
          )}

          <div className="mt-3 h-px bg-gray-100" />
          <p className="text-[10px] text-gray-300 mt-2">Drag me around!</p>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center max-w-xs relative z-10"
        >
          <h1 className="text-2xl font-extrabold text-white mb-2">Start your journey</h1>
          <p className="text-sm text-purple-100 leading-relaxed">
            SkillBridge connects talented freelancers with amazing employers. Build your career today.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {["🚀 Get Hired", "💼 Post Jobs", "🤝 Connect"].map((tag, i) => (
              <span key={i} className="text-xs bg-white/20 text-white px-3 py-1.5 rounded-full font-medium">{tag}</span>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};