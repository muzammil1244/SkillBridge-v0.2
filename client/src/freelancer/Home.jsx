import {
  Message02Icon,
  NodeAddIcon,
  Delete01Icon,
  UserSquareIcon,
  MoonEclipseIcon,
  NewJobIcon,
  PermanentJobIcon,
  CoinsDollarIcon,
  SkewIcon,
  File01Icon,
  Edit01Icon,
  BubbleChatOutcomeIcon,
  Time01Icon,
  SearchVisualIcon,
  Home02Icon,
  Dollar01Icon,
  DollarCircleIcon,
  MentoringIcon,
  UserStar02Icon,
  Mail01Icon,
  Passport01Icon,
  LockPasswordIcon,
  Image01Icon,
  FilterAddIcon,
  JobSearchIcon,
  Location01Icon,
  Search01Icon,
  Search02Icon,
  Cancel02Icon,
  Menu01Icon,
  NoteIcon,
  Chatting01Icon,
  PolicyIcon,
  Logout01Icon,
  Logout02Icon,
  HelpSquareIcon,
  CustomerService02Icon,
  Sun03Icon,
  Moon01Icon,
  JobLinkIcon,
  NoteEditIcon,
  Image02Icon,
  ImageUpload01Icon,
  ImageAdd01Icon,
  ImageAdd02Icon,
  Edit02Icon,
  PlusSignIcon,
  StarIcon,
  Building02Icon,
  UserIcon,
  Cancel01Icon,
  CancelSquareIcon,
  LaptopIcon,
  HandBag01Icon,
  SearchCircleIcon
} from "hugeicons-react";
import { useEffect, useRef, useState } from "react";
import { useFetcher, useLocation, useNavigate } from "react-router-dom";
import { animate, motion, AnimatePresence, useMotionValue, useTransform } from "motion/react"
import { Nottification } from "../components/notify";
import { jwtDecode } from "jwt-decode";
import laptopimg from "../imgs/icons8-laptop-30.png"

export const Homee = () => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showpage, getpage] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [editetrue, editefalse] = useState(false)
  const [filtertrue, setFiltertrue] = useState(false)
  const [menutrue, menufalse] = useState(false)
  const [showthem, setthem] = useState(false)
  const [reviewtrue, reviewfalse] = useState(false)
  const [themtrue, themfalse] = useState(() => {
    const storedValue = localStorage.getItem("myValue");
    return storedValue === "true";
  })

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [jobsLoading, setJobsLoading] = useState(false);
  const bottomRef = useRef();
  const [truedata, falsedata] = useState([])
  const [gettoke, settoken] = useState("")
  const [selected, setSelected] = useState("sun");
  const [getprofile, setprofile] = useState({})
  const [getapplicationdata, setapplication] = useState([])
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [getformdata, setFormData] = useState({
    name: null,
    email: null,
    password: null,
    reason: null,
    profileImage: null,
  })

  const [showprofile, setshowprofile] = useState(false)
  const options = [
    { label: "sun", icon: <Sun03Icon className="dark:text-secondary-text-color size-[13px] md:size-[16px]" /> },
    { label: "moon", icon: <Moon01Icon className="dark:text-secondary-text-color size-[13px] md:size-[16px] " /> },

  ];
  const [showAll, setShowAll] = useState(false);
  const [showalljob, setshhowalljobs] = useState(true);

  const [filters, falsefilter] = useState({
    title: '',
    location: '',
    minSalary: ''
  })

  const [getreviewdata, setreviewdata] = useState({
    rate: null,
    Comment: ""
  });

  const [getreview, setreview] = useState([])
  let reviewdata = showAll ? getreview : getreview.slice(0, 4);
  useEffect(() => {
    localStorage.setItem("myValue", themtrue);
  }, [themtrue]);

  const Reviewfun = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/review/review`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        return;
      }

      const data = await response.json();
      setreview(data);
    } catch (err) {
      console.log("review err", err);
    }
  };

  useEffect(() => {
    let icon = localStorage.getItem("myValue")
    console.log("is true or false", icon)

    if (icon === "true") {
      setSelected("moon")
    } else {
      setSelected("sun")
    }

  }, [])

  const toggleTheme = (mode) => {
    const isDark = mode === "moon";

    setthem(isDark);

    localStorage.setItem("myValue", isDark.toString());

    window.location.reload();



  };

  const handlereview = (e) => {
    const { name, value } = e.target;
    setreviewdata(prev => ({
      ...prev,
      [name]: value
    }));
  };





  const PostReview = async () => {
    const token = localStorage.getItem("token");


    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/review/add/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(getreviewdata)
      });

      if (!res.ok) {
        const errData = await res.json();
        console.error("Backend error:", errData);
      } else {
        const result = await res.json();
        console.log("Review submitted:", result);
      }
    } catch (err) {
      console.log("Review post error", err);
    }
  };




  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({ ...getformdata, [name]: files[0] });
    } else {
      setFormData({ ...getformdata, [name]: value });
    }
  };

  const handleToggleDescription = () => {
    setShowFullDesc((prev) => !prev);
  };



  // here the all job fetch with paggination and with filter 
  
const jobsdata = async (pageNum = 1, currentFilters = filters) => {
  const token = localStorage.getItem("token");
  setJobsLoading(true);

  const params = new URLSearchParams({ page: pageNum });
  if (currentFilters.title) params.append("job_name", currentFilters.title);
  if (currentFilters.location) params.append("job_location", currentFilters.location);
  if (currentFilters.minSalary) params.append("job_salary", currentFilters.minSalary);

  try {
    const jobdata = await fetch(
      `${import.meta.env.VITE_API_URL}/api/freelancer/jobs?${params}`,
      { method: "GET", headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await jobdata.json();
    falsedata((prev) => pageNum === 1 ? data.jobs : [...prev, ...data.jobs]);
    setHasMore(data.hasMore);
  } catch (err) {
    console.log(err);
  } finally {
    setJobsLoading(false);
  }
};



  useEffect(() => {



    const data = localStorage.getItem("token")
    const decoded = jwtDecode(data)
    if (decoded.roll == "employer") {

      navigate("/login")

    } else {
      console.log("not a employer", decoded.roll);

    }

    profile()
    applicationdata()
  }, [])


 useEffect(() => {
  jobsdata(1, filters);
}, [filters]);

  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore && !jobsLoading) {
        setPage((prev) => prev + 1);
      }
    });
    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [hasMore, jobsLoading]);



  useEffect(() => {
    Reviewfun()
  }, [])


  const tokenremove = () => {

    localStorage.removeItem("token")

    navigate("/login")

  }

  const profile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      const data = await fetch(`${import.meta.env.VITE_API_URL}/api/profile`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const pdata = await data.json();
      setprofile(pdata);
      console.log("profile data", pdata);

    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    if (location.state?.truenot) {
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
        navigate(location.pathname, { replace: true });
      }, 3000);
    }
  }, [location, navigate]);


  useEffect(() => {
    if (getprofile && Object.keys(getprofile).length > 0) {
      setFormData({
        name: getprofile.name || "",
        email: getprofile.email || "",
        reason: getprofile.roll || "",
        profileImage: null,
      });
    }
  }, [getprofile]);
  const updateprofile = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    const realFormData = new FormData();

    if (getformdata.name && getformdata.name.trim() !== "") {
      realFormData.append("name", getformdata.name);
    }

    if (getformdata.email && getformdata.email.trim() !== "") {
      realFormData.append("email", getformdata.email);
    }

    if (getformdata.password && getformdata.password.trim() !== "") {
      realFormData.append("password", getformdata.password);
    }

    if (getformdata.reason && getformdata.reason.trim() !== "") {
      realFormData.append("roll", getformdata.reason);
    }

    if (getformdata.profileImage) {
      realFormData.append("profileImage", getformdata.profileImage);
    }

    try {
      const update = await fetch(`${import.meta.env.VITE_API_URL}/api/user/profileupdate`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: realFormData,

      })


      setTimeout(() => {
        window.location.reload();
      }, 1000);




    } catch (err) {

      console.log("update profile problem ", err);



    }

  }

  const applicationdata = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      const applicantdata = await fetch(`${import.meta.env.VITE_API_URL}/api/freelancer/applied-jobs`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })

      const data = await applicantdata.json()
      setapplication(data)

    } catch (err) {
      console.log(err)
    }
  }



  useEffect((
  ) => {
    localStorage.setItem("theme", themtrue)
  }, [themtrue])


const handlefilter = (e) => {
  const newFilters = { ...filters, [e.target.name]: e.target.value };
  falsefilter(newFilters);  // state update
  setPage(1);
  falsedata([]);
  setHasMore(true);
  jobsdata(1, newFilters);  // ✅ naya filter seedha pass karo — state ka wait mat karo
};


 



  let ref2 = useRef()


  const x2 = useMotionValue(0.5);
  const y2 = useMotionValue(0.5);
  const rotateX2 = useTransform(y2, [0, 1], [15, -15]);
  const rotateY2 = useTransform(x2, [0, 1], [-15, 15]);




  const handleMouseMove2 = (e) => {


    const rect = ref2.current.getBoundingClientRect(); // card ka size/location
    const posX = (e.clientX - rect.left) / rect.width; // mouse x position card ke andar
    const posY = (e.clientY - rect.top) / rect.height; // mouse y position card ke andar
    x2.set(posX);
    y2.set(posY);
  };

  const handleMouseLeave2 = () => {
    x2.set(0.5);
    y2.set(0.5);
  };


  return (
    <div
      onClick={() => {
        if (menutrue) menufalse(false)
        if (showthem) setthem(false)
        if (showpage) getpage(false)

      }}
      data-theme={`${themtrue ? "dark" : ""}`}

      className="md:w-screen md:h-screen   overflow-x-hidden bg-white md:grid md:grid-cols-8  lg:grid-cols-4">


{/* profile section  */}

    <div className={`${showprofile == true ? "right-0" : "right-[-100%] hidden"} absolute md:static z-10 md:block md:overflow-x-hidden lg:overflow-visible md:col-span-3 lg:col-span-1 md:flex md:flex-col items-center bg-white dark:bg-bg-dark md:dark:border-r-2 md:dark:border-border-color duration-100`}>

  {/* Profile Image Section */}
  <div className="relative h-[200px] md:h-[220px] w-full overflow-hidden bg-[#1a0533]">
    {getprofile && getprofile.profileImage ? (
      <motion.img
        ref={ref2}
        style={{ rotateX: rotateX2, rotateY: rotateY2, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove2}
        onMouseLeave={handleMouseLeave2}
        className="w-full h-full object-cover opacity-85"
        src={getprofile.profileImage}
        alt="profile"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center">
          <span className="text-purple-700 font-bold text-xl">
            {getprofile?.name?.charAt(0)?.toUpperCase() || "?"}
          </span>
        </div>
      </div>
    )}

    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(26,5,51,0.92)]" />

    {/* Name on image */}
    <div className="absolute bottom-3 left-4 right-4">
      <h2 className="text-white font-bold text-lg leading-tight">{getprofile?.name}</h2>
      <p className="text-white/60 text-xs mt-0.5">{getprofile?.email}</p>
    </div>

    {/* Mobile close button */}
    <button
      onClick={() => setshowprofile(false)}
      className="absolute top-3 right-3 md:hidden w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30"
    >
      <CancelSquareIcon size={14} />
    </button>
  </div>

  {/* Profile Body */}
  <div className="w-full p-4 flex flex-col gap-3 bg-white dark:bg-bg-dark">

    {/* Badges */}
    <div className="flex gap-2 flex-wrap">
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEEDFE] dark:bg-purple-900/30 text-[#3C3489] dark:text-purple-300 text-xs font-medium">
        <LaptopIcon size={11} />
        {getprofile?.roll || "—"}
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E1F5EE] dark:bg-green-900/30 text-[#0F6E56] dark:text-green-300 text-xs font-medium">
        <HandBag01Icon size={11} />
        {getapplicationdata?.length || 0} Applications
      </div>
    </div>

    <div className="h-px bg-gray-100 dark:bg-border-color" />

    {/* Edit Button */}
    <button
      onClick={() => editefalse(!editetrue)}
      className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-gray-200 dark:border-border-color text-sm font-medium text-gray-700 dark:text-text-color hover:bg-gray-50 dark:hover:bg-card-color transition-colors"
    >
      <Edit01Icon size={14} />
      Edit Profile
    </button>

    {/* Edit Form */}
    {editetrue && (
      <motion.form
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={updateprofile}
        className="flex flex-col gap-3"
      >

        {/* Role */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-secondary-text-color">Role</span>
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-card-color border border-gray-200 dark:border-border-color rounded-lg px-3">
            <MentoringIcon size={13} className="text-gray-400 flex-shrink-0" />
            <select
              onChange={handleChange}
              name="reason"
              defaultValue={getprofile?.roll}
              className="bg-transparent border-none outline-none text-sm py-2 w-full text-gray-700 dark:text-secondary-text-color"
            >
              <option value="freelancer">Freelancer</option>
              <option value="employer">Employer</option>
            </select>
          </div>
        </div>

        {/* Name */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-secondary-text-color">Full Name</span>
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-card-color border border-gray-200 dark:border-border-color rounded-lg px-3">
            <UserStar02Icon size={13} className="text-gray-400 flex-shrink-0" />
            <input
              onChange={handleChange}
              name="name"
              type="text"
              defaultValue={getprofile?.name}
              placeholder="Your name"
              className="bg-transparent border-none outline-none text-sm py-2 w-full text-gray-700 dark:text-secondary-text-color placeholder:text-gray-300"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-secondary-text-color">Email</span>
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-card-color border border-gray-200 dark:border-border-color rounded-lg px-3">
            <Mail01Icon size={13} className="text-gray-400 flex-shrink-0" />
            <input
              onChange={handleChange}
              name="email"
              type="email"
              defaultValue={getprofile?.email}
              placeholder="Email address"
              className="bg-transparent border-none outline-none text-sm py-2 w-full text-gray-700 dark:text-secondary-text-color placeholder:text-gray-300"
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-secondary-text-color">Password</span>
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-card-color border border-gray-200 dark:border-border-color rounded-lg px-3">
            <LockPasswordIcon size={13} className="text-gray-400 flex-shrink-0" />
            <input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="New password"
              className="bg-transparent border-none outline-none text-sm py-2 w-full text-gray-700 dark:text-secondary-text-color placeholder:text-gray-300"
            />
          </div>
        </div>

        {/* Profile Photo */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-secondary-text-color">Profile Photo</span>
          <label className="flex items-center gap-2 bg-gray-50 dark:bg-card-color border border-dashed border-gray-300 dark:border-border-color rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-border-color transition-colors">
            <ImageAdd02Icon size={13} className="text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-400 dark:text-secondary-text-color truncate">
              Click to upload image
            </span>
            <input
              onChange={handleChange}
              name="profileImage"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </label>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-1">
          <button
            type="button"
            onClick={() => editefalse(false)}
            className="flex-1 py-2 rounded-lg border border-gray-200 dark:border-border-color text-sm text-gray-500 dark:text-secondary-text-color hover:bg-gray-50 dark:hover:bg-card-color transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-2 rounded-lg bg-[#534AB7] hover:bg-[#3C3489] text-white text-sm font-medium transition-colors"
          >
            
              Save
          
          </button>
        </div>

      </motion.form>
    )}
  </div>
</div>

      {/* Main Content */}
      <div className="p-3 relative overflow-y-scroll lg:col-span-3  md:col-span-5 dark:bg-bg-dark bg-white w-full">
     
     
     {/* headers */}

        <nav className="bg-white dark:bg-bg-dark w-full flex items-center justify-between px-3 md:px-5 border-b dark:border-border-color border-gray-200 py-2.5 gap-2">

  {/* Logo */}
  <div className="hidden md:block flex-shrink-0">
    <h1 className="text-sm font-bold">
      <span className="text-purple-500 dark:text-white">Skill</span>
      <span className="text-blue-900 dark:text-accent-color">Bridge</span>
    </h1>
  </div>

  {/* Search Bar */}
  <div className="flex-1 max-w-xs relative">
    <SearchCircleIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-500 dark:text-text-color size-[14px] md:size-[16px]" />
    <input
      onChange={handlefilter}
      type="text"
      name="title"
      placeholder="Search jobs..."
      className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-100 dark:bg-card-color dark:text-secondary-text-color rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-accent-color"
    />
  </div>

  {/* Right Actions */}
  <div className="flex items-center gap-1.5">

    {/* Filter Button */}
    <div className="relative">
      <button
        onClick={() => { setFiltertrue(!filtertrue); menufalse(false); setthem(false); }}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors
          ${filtertrue
            ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300"
            : "bg-gray-100 dark:bg-card-color text-gray-700 dark:text-secondary-text-color hover:bg-gray-200 dark:hover:bg-border-color"
          }`}
      >
        <FilterAddIcon className="size-[13px] md:size-[15px]" />
        <span className="hidden md:inline">Filter</span>
        {(filters.location !== "" || filters.minSalary !== "") && (
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 dark:bg-accent-color" />
        )}
      </button>

      {/* Filter Dropdown */}
      {filtertrue && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute right-0 top-10 z-20 w-72 bg-white dark:bg-card-color border border-gray-200 dark:border-border-color rounded-2xl shadow-xl p-4 flex flex-col gap-3"
        >
          <p className="text-xs font-semibold text-gray-500 dark:text-secondary-text-color uppercase tracking-wide">Filter Jobs</p>

          {/* Title */}
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-bg-dark border border-gray-200 dark:border-border-color rounded-lg px-3">
            <JobSearchIcon className="size-[13px] text-purple-500 dark:text-secondary-text-color flex-shrink-0" />
            <input
              onChange={handlefilter}
              type="text"
              name="title"
              placeholder="Job title..."
              className="bg-transparent outline-none text-sm py-2 w-full text-gray-700 dark:text-secondary-text-color placeholder:text-gray-300"
            />
          </div>

          {/* Job Type */}
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-bg-dark border border-gray-200 dark:border-border-color rounded-lg px-3">
            <Location01Icon className="size-[13px] text-purple-500 dark:text-secondary-text-color flex-shrink-0" />
            <select
              name="location"
              defaultValue={filters.location}
              onChange={handlefilter}
              className="bg-transparent outline-none text-sm py-2 w-full text-gray-700 dark:text-secondary-text-color"
            >
              <option value="">All job types</option>
              <option value="work from Home">Work from Home</option>
              <option value="work from office">Work from Office</option>
            </select>
          </div>

          {/* Salary */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-500 dark:text-secondary-text-color">Min Salary</span>
              <span className="text-xs font-semibold text-purple-600 dark:text-accent-color">₹{filters.minSalary || 0}</span>
            </div>
            <input
              type="range"
              name="minSalary"
              min={0}
              max={100000}
              step={1000}
              value={filters.minSalary || 0}
              onChange={handlefilter}
              className="w-full accent-purple-500 dark:accent-accent-color"
            />
            <div className="flex justify-between text-[10px] text-gray-400 dark:text-secondary-text-color">
              <span>₹0</span>
              <span>₹1,00,000</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => {
                falsefilter({ title: '', location: '', minSalary: '' });
                setPage(1);
                falsedata([]);
                setHasMore(true);
                jobsdata(1, { title: '', location: '', minSalary: '' });
              }}
              className="flex-1 py-1.5 rounded-lg border border-gray-200 dark:border-border-color text-xs text-gray-500 dark:text-secondary-text-color hover:bg-gray-50 dark:hover:bg-bg-dark transition-colors"
            >
              Reset
            </button>
            <button
              onClick={() => setFiltertrue(false)}
              className="flex-1 py-1.5 rounded-lg bg-purple-500 hover:bg-purple-600 text-white text-xs font-medium transition-colors"
            >
              Apply
            </button>
          </div>
        </motion.div>
      )}
    </div>

    {/* Theme Toggle */}
    <button
      onClick={() => { setthem(!showthem); menufalse(false); setFiltertrue(false); }}
      className={`p-1.5 rounded-lg transition-colors bg-gray-100 dark:bg-card-color hover:bg-gray-200 dark:hover:bg-border-color
        ${showthem ? "ring-2 ring-purple-400 dark:ring-accent-color" : ""}`}
    >
      {options.find(opt => opt.label === selected)?.icon}
    </button>

    {showthem && (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute top-14 right-16 z-20 bg-white dark:bg-card-color border border-gray-200 dark:border-border-color rounded-xl shadow-lg overflow-hidden"
      >
        {options.map((opt, index) => (
          <div
            key={index}
            onClick={() => { setthem(false); toggleTheme(opt.label); }}
            className={`flex items-center gap-2 px-4 py-2 cursor-pointer text-sm
              ${opt.label === "sun"
                ? "hover:bg-sky-50 dark:hover:bg-sky-900/20 text-gray-700 dark:text-secondary-text-color"
                : "hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-gray-700 dark:text-secondary-text-color"
              }`}
          >
            {opt.icon}
            <span className="text-xs capitalize">{opt.label}</span>
          </div>
        ))}
      </motion.div>
    )}

    {/* Menu Button */}
    <div className="relative">
      <button
        onClick={() => { menufalse(!menutrue); setthem(false); setFiltertrue(false); }}
        className={`p-1.5 rounded-lg transition-colors bg-gray-100 dark:bg-card-color hover:bg-gray-200 dark:hover:bg-border-color
          ${menutrue ? "ring-2 ring-purple-400 dark:ring-accent-color" : ""}`}
      >
        <Menu01Icon className="size-[14px] md:size-[16px] dark:text-gray-300 text-gray-700" />
      </button>

      {menutrue && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute right-0 top-10 z-20 w-48 bg-white dark:bg-card-color border border-gray-200 dark:border-border-color rounded-xl shadow-xl overflow-hidden py-1"
        >
          {[
            { icon: <NoteIcon className="size-[15px]" />, label: "Your Applications", onClick: () => navigate("/freelancer/application", { state: { themtrue } }) },
            { icon: <Chatting01Icon className="size-[15px]" />, label: "Start Chat", onClick: () => navigate("/chatapp", { state: { themtrue, senderId: getprofile._id } }) },
            { icon: <UserIcon className="size-[15px]" />, label: "User Profile", onClick: () => { setshowprofile(true); menufalse(false); }, mobile: true },
            { icon: <PolicyIcon className="size-[15px]" />, label: "Our Policy", onClick: () => {} },
            { icon: <NoteEditIcon className="size-[15px]" />, label: "Edit Resume", onClick: () => navigate("/freelancer/resume", { state: { themtrue, getprofile } }) },
            { icon: <Logout02Icon className="size-[15px]" />, label: "Log Out", onClick: tokenremove },
            { icon: <HelpSquareIcon className="size-[15px]" />, label: "Help", onClick: () => {} },
            { icon: <CustomerService02Icon className="size-[15px]" />, label: "+91 8446411038", onClick: () => {} },
          ].map((item, i) => (
            <div
              key={i}
              onClick={item.onClick}
              className={`flex items-center gap-2.5 px-3 py-2 cursor-pointer group transition-colors hover:bg-gray-50 dark:hover:bg-border-color ${item.mobile ? "md:hidden" : ""}`}
            >
              <span className="text-gray-500 dark:text-secondary-text-color group-hover:text-purple-500 dark:group-hover:text-accent-color">
                {item.icon}
              </span>
              <span className="text-[13px] text-gray-700 dark:text-secondary-text-color group-hover:text-purple-500 dark:group-hover:text-accent-color">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      )}
    </div>

  </div>
</nav>

{/* the infinite scroll with the paggination of mongodb   */}

       {truedata && truedata.length ? truedata.map((element) => (
  <div
    key={element._id}
    className="w-full max-w-xl mx-auto my-3 md:my-5 bg-white dark:bg-card-color border border-gray-100 dark:border-border-color rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
  >
    {/* Top colored strip */}
    <div className="h-1 w-full bg-gradient-to-r from-purple-400 to-blue-400" />

    <div className="px-4 md:px-6 py-4">

      {/* Header — title + image */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h1 className="text-[15px] md:text-lg font-bold text-orange-500 truncate">
            {element.title}
          </h1>
          {element.active && (
            <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[10px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Active Hiring
            </span>
          )}
        </div>
        <img
          className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-xl border border-gray-100 dark:border-border-color flex-shrink-0"
          src={element.image}
          alt={element.title}
        />
      </div>

      {/* Description */}
      <p
        className={`text-[12px] md:text-sm text-gray-500 dark:text-secondary-text-color mb-3 cursor-pointer transition-all duration-300 leading-relaxed ${showFullDesc ? "break-words" : "line-clamp-2"}`}
        onClick={handleToggleDescription}
        title="Click to expand"
      >
        {element.canapply}
      </p>

      {/* Info Pills */}
      <div className="flex flex-wrap gap-2 mb-3">

        {/* Job Type */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 text-[11px] font-medium">
          <PermanentJobIcon className="size-[12px]" />
          {element.jobtype}
        </div>

        {/* Budget */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-300 text-[11px] font-medium">
          <CoinsDollarIcon className="size-[12px]" />
          ₹{element.budget}
        </div>

        {/* Posted date */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-bg-dark text-gray-500 dark:text-secondary-text-color text-[11px]">
          <Time01Icon className="size-[12px]" />
          {new Date(element.createdAt).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>

      </div>

      {/* Skills */}
      <div
        className={`flex items-start gap-1.5 mb-4 cursor-pointer`}
        onClick={() => setShowAllSkills(!showAllSkills)}
      >
        <SkewIcon className="size-[13px] text-gray-400 dark:text-secondary-text-color mt-0.5 flex-shrink-0" />
        <p className={`text-[11px] md:text-xs text-gray-500 dark:text-secondary-text-color leading-relaxed ${showAllSkills ? "break-words" : "truncate"}`}>
          <span className="font-semibold text-gray-600 dark:text-text-color">Skills: </span>
          {element.skill.join(", ")}
        </p>
      </div>

      {/* Footer — View Button */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-border-color">
        <p className="text-[10px] text-gray-400 dark:text-secondary-text-color">
          {new Date(element.createdAt).toLocaleString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
          })}
        </p>
        <button
          onClick={() => { setSelectedJob(element); getpage(true); }}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-purple-500 hover:bg-purple-600 dark:bg-accent-color dark:hover:bg-accent-light text-white text-[12px] md:text-sm font-medium transition-colors duration-200"
        >
          View Job
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

    </div>
  </div>
)) : (
  <div className="flex flex-col items-center justify-center py-20 gap-3">
    <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-card-color flex items-center justify-center">
      <SearchVisualIcon className="size-[24px] text-gray-300 dark:text-secondary-text-color" />
    </div>
    <p className="text-sm font-medium text-gray-400 dark:text-secondary-text-color">No jobs found</p>
    <p className="text-xs text-gray-300 dark:text-secondary-text-color">Try changing your filters</p>
  </div>
)}
        <div ref={bottomRef} />

        {jobsLoading && (
          <div className="flex justify-center py-4">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!hasMore && !jobsLoading && truedata.length > 0 && (
          <p className="text-center text-gray-400 dark:text-secondary-text-color py-4 text-sm">
            No more jobs to load
          </p>
        )}

       {showpage && selectedJob && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed z-50 inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-end md:items-center px-0 md:px-4"
    onClick={() => getpage(false)}
  >
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 60, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      onClick={(e) => e.stopPropagation()}
      className="w-full md:w-2/3 md:max-w-2xl max-h-[92vh] md:max-h-[88vh] overflow-y-auto bg-white dark:bg-bg-dark rounded-t-3xl md:rounded-3xl shadow-2xl border border-gray-100 dark:border-border-color"
    >

      {/* Top drag indicator — mobile */}
      <div className="flex justify-center pt-3 pb-1 md:hidden">
        <div className="w-10 h-1 rounded-full bg-gray-200 dark:bg-border-color" />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 bg-white/90 dark:bg-bg-dark/90 backdrop-blur border-b border-gray-100 dark:border-border-color">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 rounded-full bg-purple-500" />
          <span className="text-[13px] font-semibold text-gray-700 dark:text-text-color truncate max-w-[200px]">
            {selectedJob.title}
          </span>
        </div>
        <button
          onClick={() => getpage(false)}
          className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-card-color flex items-center justify-center text-gray-500 dark:text-secondary-text-color hover:bg-gray-200 dark:hover:bg-border-color transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div className="p-5 flex flex-col gap-5">

        {/* Title + Image */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl font-bold text-orange-500 leading-tight">
              {selectedJob.title}
            </h1>
            <p className="text-xs text-gray-400 dark:text-secondary-text-color mt-1">
              Exciting opportunity awaits!
            </p>
            {selectedJob.active && (
              <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[11px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Active Hiring
              </span>
            )}
          </div>
          <img
            className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-2xl border border-gray-100 dark:border-border-color shadow-sm flex-shrink-0"
            src={selectedJob.image}
            alt="Company Logo"
          />
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center gap-1 p-3 bg-purple-50 dark:bg-purple-900/15 rounded-xl">
            <Home02Icon className="size-[18px] text-purple-500 dark:text-purple-300" />
            <span className="text-[11px] font-medium text-purple-700 dark:text-purple-300 text-center leading-tight">
              {selectedJob.jobtype}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 p-3 bg-green-50 dark:bg-green-900/15 rounded-xl">
            <DollarCircleIcon className="size-[18px] text-green-600 dark:text-green-400" />
            <span className="text-[11px] font-medium text-green-700 dark:text-green-300 text-center">
              ₹{selectedJob.budget}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 p-3 bg-blue-50 dark:bg-blue-900/15 rounded-xl">
            <UserSquareIcon className="size-[18px] text-blue-600 dark:text-blue-300" />
            <span className="text-[11px] font-medium text-blue-700 dark:text-blue-300 text-center leading-tight">
              {selectedJob.opportunity}
            </span>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-secondary-text-color">
            Required Skills
          </span>
          <div className="flex flex-wrap gap-1.5">
            {selectedJob.skill.map((skill, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-card-color text-gray-600 dark:text-secondary-text-color text-[11px] font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Can Apply */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-secondary-text-color">
            Who Can Apply
          </span>
          <div className="bg-sky-50 dark:bg-border-color rounded-xl p-4 text-[12px] md:text-sm text-gray-700 dark:text-secondary-text-color leading-relaxed max-h-[150px] overflow-y-auto">
            {selectedJob.canapply}
          </div>
        </div>

        {/* About Company */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-secondary-text-color">
            About Company
          </span>
          <div className="bg-orange-50 dark:bg-border-color rounded-xl p-4 text-[12px] md:text-sm text-gray-700 dark:text-secondary-text-color leading-relaxed max-h-[150px] overflow-y-auto">
            {selectedJob.description}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2 pb-2">
          <button
            onClick={() => getpage(false)}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-border-color text-sm text-gray-600 dark:text-secondary-text-color hover:bg-gray-50 dark:hover:bg-card-color transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              navigate("/freelancer/apply", {
                state: { themtrue, jobid: selectedJob._id },
              });
            }}
            className="flex-1 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors"
          >
            Apply Now
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>

      </div>
    </motion.div>
  </motion.div>
)}
       









       {showNotification && (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="fixed top-5 left-1/2 -translate-x-1/2 z-50"
  >
    <div className="flex items-center gap-3 bg-white dark:bg-card-color border border-green-200 dark:border-green-800 px-4 py-3 rounded-2xl shadow-lg">
      {/* Green check circle */}
      <div className="w-7 h-7 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-green-500">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <span className="text-[13px] font-semibold text-gray-800 dark:text-text-color">Success!</span>
        <span className="text-[11px] text-gray-500 dark:text-secondary-text-color">Action completed successfully</span>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-[3px] rounded-b-2xl bg-green-400 dark:bg-green-500"
        style={{ animation: "shrink 3s linear forwards" }}
      />
    </div>

    <style>{`
      @keyframes shrink {
        from { width: 100%; }
        to { width: 0%; }
      }
    `}</style>
  </motion.div>
)}


     <div className="w-full bg-white dark:bg-card-color rounded-2xl border border-gray-100 dark:border-border-color overflow-hidden">

  {/* Header */}
  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-border-color">
    <div>
      <h1 className="text-sm font-semibold text-gray-800 dark:text-text-color">Reviews</h1>
      <p className="text-[11px] text-gray-400 dark:text-secondary-text-color mt-0.5">{getreview.length} total reviews</p>
    </div>
    <motion.button
      onClick={() => reviewfalse(!reviewtrue)}
      whileTap={{ scale: 0.85, rotate: 90 }}
      transition={{ type: "spring", duration: 0.4 }}
      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors duration-200 ${
        reviewtrue
          ? "bg-red-100 dark:bg-red-900/20 text-red-500"
          : "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300"
      }`}
    >
      {reviewtrue
        ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        : <PlusSignIcon className="w-4 h-4" />
      }
    </motion.button>
  </div>

  {/* Add Review Form */}
  <AnimatePresence>
    {reviewtrue && (
      <motion.div
        key="review-box"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden"
      >
        <div className="px-5 py-4 bg-gray-50 dark:bg-bg-dark border-b border-gray-100 dark:border-border-color flex flex-col gap-3">

          {/* Star Rating */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-secondary-text-color">Rating (0–5)</span>
            <div className="flex items-center gap-2 bg-white dark:bg-card-color border border-gray-200 dark:border-border-color rounded-lg px-3">
              <StarIcon className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
              <input
                onChange={handlereview}
                type="number"
                name="rate"
                max={5}
                min={0}
                placeholder="e.g. 4"
                className="bg-transparent outline-none text-sm py-2 w-full text-gray-700 dark:text-secondary-text-color placeholder:text-gray-300"
              />
            </div>
          </div>

          {/* Comment */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-secondary-text-color">Your Review</span>
            <textarea
              onChange={handlereview}
              rows="3"
              name="Comment"
              placeholder="Share your experience..."
              className="bg-white dark:bg-card-color border border-gray-200 dark:border-border-color rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-secondary-text-color placeholder:text-gray-300 outline-none resize-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-accent-color"
            />
          </div>

          {/* Submit */}
          <button
            onClick={() => { PostReview(); window.location.reload(); }}
            className="self-end flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 text-white text-xs font-medium transition-colors"
          >
            Submit Review
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>

  {/* Reviews List */}
  <div className="p-4 flex flex-col gap-3">
    {reviewdata.length > 0 ? reviewdata.map((element, index) => (
      <div
        key={index}
        className="flex gap-3 p-3 rounded-xl bg-gray-50 dark:bg-bg-dark border border-gray-100 dark:border-border-color hover:border-purple-200 dark:hover:border-border-color transition-colors"
      >
        {/* Avatar */}
        {element.profileImage ? (
          <img
            src={element.profileImage}
            alt="profile"
            className="w-9 h-9 rounded-xl object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
            <span className="text-purple-600 dark:text-purple-300 text-sm font-bold">
              {element.name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[13px] font-semibold text-gray-800 dark:text-text-color truncate">{element.name}</p>
            {/* Stars */}
            <div className="flex items-center gap-0.5 flex-shrink-0">
              {[1,2,3,4,5].map((star) => (
                <svg key={star} width="11" height="11" viewBox="0 0 24 24"
                  fill={star <= element.rate ? "#f97316" : "none"}
                  stroke="#f97316" strokeWidth="2"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
            </div>
          </div>
          <p className="text-[12px] text-gray-500 dark:text-secondary-text-color break-words leading-relaxed">
            {element.Comment}
          </p>
        </div>
      </div>
    )) : (
      <div className="flex flex-col items-center py-8 gap-2">
        <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-border-color flex items-center justify-center">
          <StarIcon className="w-5 h-5 text-gray-300" />
        </div>
        <p className="text-xs text-gray-400 dark:text-secondary-text-color">No reviews yet</p>
      </div>
    )}
  </div>

  {/* View All */}
  {getreview.length > 4 && (
    <button
      onClick={() => setShowAll(!showAll)}
      className="w-full py-3 text-xs font-medium text-purple-500 dark:text-accent-color hover:bg-purple-50 dark:hover:bg-card-color border-t border-gray-100 dark:border-border-color transition-colors"
    >
      {showAll ? "Show less" : `View all ${getreview.length} reviews`}
    </button>
  )}

</div>



      </div >

    </div>

  );
};
