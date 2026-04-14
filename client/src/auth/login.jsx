import { LockPasswordIcon, Mail01Icon } from "hugeicons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { jwtDecode } from "jwt-decode";
import img1 from "../imgs/Computer login-amico.svg";

export const Loging = () => {
  const [getdata, setdata] = useState({ email: "", password: "" });
  const [loader, sertloader] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...getdata, [name]: value });
    setError("");
  };

  const Submitdata = async (e) => {
    e.preventDefault();
    sertloader(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getdata),
      });

      if (!response.ok) {
        sertloader(false);
        setError("Invalid email or password. Please try again.");
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      const role = jwtDecode(data.token);
      if (role.roll === "Candidate") {
        navigate("/freelancer/home");
      } else {
        navigate("/employer/home");
      }
    } catch (err) {
      sertloader(false);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="md:w-screen md:h-screen bg-white flex-col-reverse md:flex-row flex overflow-hidden">

      {/* Left — Form */}
      <div className="bg-white md:w-1/2 h-full flex flex-col justify-center px-8 md:px-16 py-10">

        {/* Logo + Nav */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mb-10"
        >
          <h1 className="text-sm font-bold">
            <span className="text-purple-500">Skill</span>
            <span className="text-blue-900">Bridge</span>
          </h1>
          <button
            onClick={() => navigate("/register")}
            className="text-xs font-medium text-gray-500 hover:text-purple-600 border border-gray-200 hover:border-purple-300 px-3 py-1.5 rounded-lg transition-colors"
          >
            Create account →
          </button>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Welcome back</h2>
          <p className="text-sm text-gray-400 mt-1">Sign in to your SkillBridge account</p>
        </motion.div>

        {/* Form */}
        <form onSubmit={Submitdata} className="flex flex-col gap-4">

          {/* Email */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <label className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5 block">
              Email Address
            </label>
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 focus-within:ring-2 focus-within:ring-purple-300 focus-within:border-purple-300 transition-all">
              <Mail01Icon size={16} className="text-gray-400 flex-shrink-0" />
              <input
                onChange={handleChange}
                placeholder="you@example.com"
                className="bg-transparent w-full py-3 text-sm text-gray-700 placeholder:text-gray-300 outline-none"
                type="email"
                name="email"
                required
              />
            </div>
          </motion.div>

          {/* Password */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <label className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 mb-1.5 block">
              Password
            </label>
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 focus-within:ring-2 focus-within:ring-purple-300 focus-within:border-purple-300 transition-all">
              <LockPasswordIcon size={16} className="text-gray-400 flex-shrink-0" />
              <input
                onChange={handleChange}
                placeholder="Enter your password"
                className="bg-transparent w-full py-3 text-sm text-gray-700 placeholder:text-gray-300 outline-none"
                type="password"
                name="password"
                required
              />
            </div>
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
            className="w-full py-3 bg-purple-500 hover:bg-purple-600 disabled:opacity-70 transition-colors text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 mt-2"
          >
            {loader ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Sign In"
            )}
          </motion.button>

          {/* Register Link */}
          <p className="text-center text-xs text-gray-400 mt-2">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-purple-500 font-semibold hover:underline"
            >
              Register here
            </button>
          </p>

        </form>
      </div>

      {/* Right — Hero */}
      <div className="bg-purple-500 md:w-1/2 md:h-full overflow-hidden flex items-center flex-col justify-center relative px-8">

        {/* Background circles decoration */}
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-purple-400/30" />
        <div className="absolute bottom-20 left-5 w-20 h-20 rounded-full bg-purple-400/20" />
        <div className="absolute top-1/2 left-0 w-10 h-10 rounded-full bg-white/10" />

        <motion.img
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, delay: 0.3 }}
          className="w-64 md:w-72 mb-8 relative z-10"
          src={img1}
          alt="login hero"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center hidden md:block px-4 max-w-md relative z-10"
        >
          <h1 className="text-2xl md:text-3xl text-white font-extrabold mb-3 leading-tight">
            Hey, welcome back!
          </h1>
          <p className="text-sm text-purple-100 leading-relaxed">
            SkillBridge connects talented freelancers with amazing employers. Find the perfect match for your journey.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {["🔒 Secure Login", "⚡ Instant Access", "💼 Smart Matching"].map((tag, i) => (
              <span key={i} className="text-xs bg-white/20 text-white px-3 py-1.5 rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};