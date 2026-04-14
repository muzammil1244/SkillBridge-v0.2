import {
  Message02Icon, NodeAddIcon,
  Delete01Icon,
  UserSquareIcon, MoonEclipseIcon, NewJobIcon, PermanentJobIcon, CoinsDollarIcon, SkewIcon, File01Icon
  , Edit01Icon,
  BubbleChatOutcomeIcon,
  Time01Icon,
  SearchVisualIcon,
  MentoringIcon,
  UserStar02Icon,
  Mail01Icon,
  LockPasswordIcon,
  Image01Icon,
  Sun03Icon,
  Moon01Icon,
  Menu01Icon,
  NoteIcon,
  Chatting01Icon,
  PolicyIcon,
  Logout02Icon,
  HelpSquareIcon,
  CustomerService02Icon,
  GroupItemsIcon,
  Alert01Icon,
  AlertCircleIcon,
  LaptopIcon,
  FilterMailSquareIcon,
  ImageAdd02Icon,
  Profile02Icon,
  UserIcon,
  Cancel02Icon,
  Cancel01Icon








} from "hugeicons-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "motion/react"
import laptopimg from "../imgs/icons8-laptop-30.png"


export const Home = () => {
  const ref = useRef()
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [editetrue, editefalse] = useState(false)
  const [showthem, setthem] = useState(false)
  const [showwarn, setwarn] = useState(false)
  const [cartdata, setcartdata] = useState({})
  const [selected, setSelected] = useState("sun");
  const [showmenu, setmune] = useState(false)
  const [employertrue, employerfalse] = useState(false)
  const [getwarn, ssetwarn] = useState('')
  const [getalert, setalert] = useState(false)
  const [selectedId, setSelectedId] = useState(null);
  const [themtrue, themfalse] = useState(() => {
    const storedValue = localStorage.getItem("myValue");
    return storedValue === "true";
  })
  const options = [
    { label: "sun", icon: <Sun03Icon className="md:size-[16px] size-[12px] " /> },
    { label: "moon", icon: <Moon01Icon size={16} className="md:size-[16px] size-[12px] " /> },

  ];
    const [loader,settloader] = useState(false)

  const [getprofile, setprofile] = useState({})
  const [getformdata, setFormData] = useState({
    name: null,
    email: null,
    password: null,
    reason: null,
    profileImage: null,
  })
  const [trueshow, setshow] = useState(false)
  const toggleTheme = (mode) => {
    const isDark = mode === "moon";

    setthem(isDark);

    localStorage.setItem("myValue", isDark.toString());

    window.location.reload(); 
  };

  useEffect((
  ) => {
    localStorage.setItem("theme", themtrue)
  }, [themtrue])

  const [getjobarr, setjobarr] = useState([])
  const [filters, falsefilter] = useState({
    title: '',

  })

  useEffect(() => {
    employerfalse(true)
  })


  const handleToggleDescription = () => {
    setShowFullDesc((prev) => !prev);
  };


  const navigate = useNavigate()





  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({ ...getformdata, [name]: files[0] }); // ✅ File object, not URL
    } else {
      setFormData({ ...getformdata, [name]: value });
    }
  };
  const handlefilter = (e) => {
    falsefilter({ ...filters, [e.target.name]: e.target.value });
  };


  useEffect(() => {
    if (getprofile && Object.keys(getprofile).length > 0) {
      setFormData({
        name: getprofile.name || "",
        email: getprofile.email || "",
        reason: getprofile.roll || "",
        profileImage: null,
      });
    }
  }, [getprofile])

  useEffect(() => {
    profile()
    jobsData()
  }, [])


  const profile = async () => {
    const token = localStorage.getItem("token"); // ✅ yahin se lo

    if (!token) {
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
      console.log("profiledata of re",pdata)

    } catch (err) {
      console.log(err);
    }
  };

  const updateprofile = async (e) => {
    e.preventDefault()
console.log("updat fun osreked")
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


      if(update.ok){
        settloader(false)
            window.location.reload();
      }
      if(update.ok){
        settloader(false)
            window.location.reload();
      }
    
     




    } catch (err) {

      console.log("update profile problem ", err);



    }

  }



  const jobsData = async () => {
    const token = localStorage.getItem("token"); 

    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      const jobsdata = await fetch(`${import.meta.env.VITE_API_URL}/api/employer/jobs`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, 
        },
      })

      const data = await jobsdata.json()
      setjobarr(data)
    } catch (err) {
      console.log(err)
    }
  }


  const filterdata =getjobarr.length>0? getjobarr.filter((job) => {
    const jobtitle = !filters.title || job.title.toLowerCase().includes(filters.title.toLowerCase());
    return jobtitle;
  }):[]


  const handlelogout = () => {
    localStorage.removeItem("token")
    window.location.reload()
  }





  const DeleteJob = async (id) => {
    const token = localStorage.getItem("token");
   settloader(true)


    if (getwarn.trim().toLowerCase() === getprofile.name.trim().toLowerCase()) {
      console.log("yesssssssssssss")
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/api/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
settloader(false)
       
        setwarn(false);
        ssetwarn("");
        window.location.reload()  
      } catch (err) {
        console.log("Delete failed:", err);
      }
    } else {    

      setalert(true);
      setTimeout(() => {
        setalert(false)
      }, 1000);
    }
  };


  const handlewarn = (id) => {
    setwarn(true)
    setSelectedId(id);  
  }
  let ref2 = useRef()


  const x2 = useMotionValue(0.5);
  const y2 = useMotionValue(0.5);
  const rotateX2 = useTransform(y2, [0, 1], [15, -15]);
  const rotateY2 = useTransform(x2, [0, 1], [-15, 15]);
useEffect(()=>{
 let icon = localStorage.getItem("myValue")

if(icon === "true"){
  setSelected("moon")
}else{
  setSelected("sun")
}

},[])



  const handleMouseMove2 = (e) => {


    const rect = ref2.current.getBoundingClientRect(); 
    const posX = (e.clientX - rect.left) / rect.width; 
    const posY = (e.clientY - rect.top) / rect.height;
    x2.set(posX);
    y2.set(posY);
  };

  const handleMouseLeave2 = () => {
    x2.set(0.5);
    y2.set(0.5);
  };


 return (
    <div
      onClick={() => { if (showmenu) setmune(false); if (showthem) setthem(false); }}
      data-theme={`${themtrue ? "dark" : ""}`}
      className="md:w-screen md:h-screen overflow-x-hidden bg-gray-50 dark:bg-bg-dark md:grid h-screen md:grid-cols-8 lg:grid-cols-4"
    >

      {/* ===== SIDEBAR ===== */}
      <div className={`${trueshow ? "right-0 duration-100" : "right-[-100%] duration-100 hidden"} absolute md:static z-10 md:block md:overflow-x-hidden lg:overflow-visible dark:bg-bg-dark md:dark:border-r-2 md:dark:border-border-color md:col-span-3 lg:col-span-1 md:flex md:flex-col bg-white`}>

        {/* Profile Image */}
        <div className="relative h-[200px] md:h-[220px] w-full overflow-hidden bg-[#1a0533]">
          {getprofile?.profileImage ? (
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
              <div className="w-14 h-14 rounded-2xl bg-purple-200 flex items-center justify-center">
                <span className="text-purple-700 font-bold text-2xl">
                  {getprofile?.name?.charAt(0)?.toUpperCase() || "?"}
                </span>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(26,5,51,0.92)]" />
          <div className="absolute bottom-3 left-4 right-4">
            <h2 className="text-white font-bold text-lg leading-tight">{getprofile?.name}</h2>
            <p className="text-white/60 text-xs mt-0.5">{getprofile?.email}</p>
          </div>
          <button onClick={() => setshow(false)} className="absolute top-3 right-3 md:hidden w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white">
            <Cancel01Icon size={14} />
          </button>
        </div>

        {/* Profile Body */}
        <div className="w-full p-4 flex flex-col gap-3 bg-white dark:bg-bg-dark flex-1 overflow-y-auto">

          {/* Badges */}
          <div className="flex gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEEDFE] dark:bg-purple-900/30 text-[#3C3489] dark:text-purple-300 text-xs font-medium">
              <img src={laptopimg} className="w-3 h-3" alt="" />
              {getprofile?.roll || "—"}
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E1F5EE] dark:bg-green-900/30 text-[#0F6E56] dark:text-green-300 text-xs font-medium">
              <NewJobIcon size={11} />
              {getjobarr.length} Jobs
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
              {[
                { icon: <MentoringIcon size={13} />, name: "reason", type: "select", label: "Role" },
                { icon: <UserStar02Icon size={13} />, name: "name", type: "text", label: "Name", defaultValue: getprofile?.name },
                { icon: <Mail01Icon size={13} />, name: "email", type: "email", label: "Email", defaultValue: getprofile?.email },
                { icon: <LockPasswordIcon size={13} />, name: "password", type: "password", label: "Password" },
              ].map((field, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-secondary-text-color">{field.label}</span>
                  <div className="flex items-center gap-2 bg-gray-50 dark:bg-card-color border border-gray-200 dark:border-border-color rounded-lg px-3">
                    <span className="text-gray-400 flex-shrink-0">{field.icon}</span>
                    {field.type === "select" ? (
                      <select onChange={handleChange} name={field.name} defaultValue={getprofile?.roll}
                        className="bg-transparent border-none outline-none text-sm py-2 w-full text-gray-700 dark:text-secondary-text-color">
                        <option value="freelancer">Freelancer</option>
                        <option value="employer">Employer</option>
                      </select>
                    ) : (
                      <input onChange={handleChange} name={field.name} type={field.type}
                        defaultValue={field.defaultValue || ""}
                        placeholder={field.label}
                        className="bg-transparent border-none outline-none text-sm py-2 w-full text-gray-700 dark:text-secondary-text-color placeholder:text-gray-300"
                      />
                    )}
                  </div>
                </div>
              ))}

              {/* File upload */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-secondary-text-color">Profile Photo</span>
                <label className="flex items-center gap-2 bg-gray-50 dark:bg-card-color border border-dashed border-gray-300 dark:border-border-color rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors">
                  <ImageAdd02Icon size={13} className="text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-400 dark:text-secondary-text-color truncate">Click to upload</span>
                  <input onChange={handleChange} name="profileImage" type="file" accept="image/*" className="hidden" />
                </label>
              </div>

              <div className="flex gap-2 mt-1">
                <button type="button" onClick={() => editefalse(false)}
                  className="flex-1 py-2 rounded-lg border border-gray-200 dark:border-border-color text-sm text-gray-500 dark:text-secondary-text-color hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit"
                  className="flex-1 py-2 rounded-lg bg-[#534AB7] hover:bg-[#3C3489] text-white text-sm font-medium transition-colors">
                  {loader ? <div className="flex justify-center"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /></div> : "Save Changes"}
                </button>
              </div>
            </motion.form>
          )}
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="p-3 overflow-y-auto md:col-span-5 lg:col-span-3 bg-white dark:bg-bg-dark h-full w-full">

        {/* NAV */}
        <nav className="bg-white dark:bg-bg-dark w-full flex items-center justify-between px-3 md:px-5 border-b dark:border-border-color border-gray-200 py-2.5 gap-2 mb-4">
          <div className="hidden md:block flex-shrink-0">
            <h1 className="text-sm font-bold">
              <span className="text-purple-500 dark:text-white">Skill</span>
              <span className="text-blue-900 dark:text-accent-color">Bridge</span>
            </h1>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xs relative">
            <SearchVisualIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-500 dark:text-text-color size-[14px]" />
            <input
              onChange={handlefilter}
              type="text"
              name="title"
              placeholder="Search jobs..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-100 dark:bg-card-color dark:text-secondary-text-color rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5">

            {/* Create Job */}
            <button
              onClick={() => navigate("/employer/job/create", { state: { themtrue } })}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-purple-500 hover:bg-purple-600 text-white text-xs font-medium transition-colors"
            >
              <NodeAddIcon size={13} />
              <span className="hidden md:inline">Create Job</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => { setthem(!showthem); setmune(false); }}
              className="p-1.5 rounded-lg bg-gray-100 dark:bg-card-color hover:bg-gray-200 dark:hover:bg-border-color transition-colors relative"
            >
              {options.find(opt => opt.label === selected)?.icon}
              {showthem && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-0 top-9 z-20 bg-white dark:bg-card-color border border-gray-200 dark:border-border-color rounded-xl shadow-lg overflow-hidden w-24">
                  {options.map((opt, i) => (
                    <div key={i} onClick={() => { setthem(false); toggleTheme(opt.label); }}
                      className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-border-color text-gray-700 dark:text-secondary-text-color">
                      {opt.icon}
                      <span className="text-xs capitalize">{opt.label}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </button>

            {/* Menu */}
            <div className="relative">
              <button
                onClick={() => { setmune(!showmenu); setthem(false); }}
                className="p-1.5 rounded-lg bg-gray-100 dark:bg-card-color hover:bg-gray-200 dark:hover:bg-border-color transition-colors"
              >
                <Menu01Icon className="size-[14px] md:size-[16px] dark:text-gray-300 text-gray-700" />
              </button>
              {showmenu && (
                <motion.div initial={{ opacity: 0, scale: 0.95, y: -4 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="absolute right-0 top-10 z-20 w-48 bg-white dark:bg-card-color border border-gray-200 dark:border-border-color rounded-xl shadow-xl overflow-hidden py-1">
                  {[
                    { icon: <Chatting01Icon size={15} />, label: "Start Chat", onClick: () => navigate("/chatapp", { state: { themtrue, employertrue, senderId: getprofile._id } }) },
                    { icon: <PolicyIcon size={15} />, label: "Our Policy", onClick: () => {} },
                    { icon: <UserIcon size={15} />, label: "User Profile", onClick: () => setshow(true), mobile: true },
                    { icon: <Logout02Icon size={15} />, label: "Log Out", onClick: handlelogout },
                    { icon: <HelpSquareIcon size={15} />, label: "Help", onClick: () => {} },
                    { icon: <CustomerService02Icon size={15} />, label: "+91 8446411038", onClick: () => {} },
                  ].map((item, i) => (
                    <div key={i} onClick={item.onClick}
                      className={`flex items-center gap-2.5 px-3 py-2 cursor-pointer group hover:bg-gray-50 dark:hover:bg-border-color transition-colors ${item.mobile ? "md:hidden" : ""}`}>
                      <span className="text-gray-400 group-hover:text-purple-500 dark:group-hover:text-accent-color">{item.icon}</span>
                      <span className="text-[13px] text-gray-700 dark:text-secondary-text-color group-hover:text-purple-500 dark:group-hover:text-accent-color">{item.label}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </nav>

        {/* JOB CARDS */}
        {getjobarr.length > 0 ? filterdata.map((element) => (
          <div key={element._id}
            className="w-full max-w-xl mx-auto my-3 md:my-5 bg-white dark:bg-card-color border border-gray-100 dark:border-border-color rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
          >
            <div className="h-1 w-full bg-gradient-to-r from-purple-400 to-blue-400" />

            <div className="px-4 md:px-6 py-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <h1 className="text-[15px] md:text-lg font-bold text-orange-500 truncate">{element.title}</h1>
                  {element.active && (
                    <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[10px] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Active Hiring
                    </span>
                  )}
                </div>
                <img className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-xl border border-gray-100 dark:border-border-color flex-shrink-0"
                  src={element.image} alt={element.title} />
              </div>

              {/* Description */}
              <p onClick={() => setShowFullDesc(!showFullDesc)}
                className={`text-[12px] md:text-sm text-gray-500 dark:text-secondary-text-color mb-3 cursor-pointer leading-relaxed ${showFullDesc ? "break-words" : "line-clamp-2"}`}>
                {element.description}
              </p>

              {/* Info Pills */}
              <div className="flex flex-wrap gap-2 mb-3">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 text-[11px] font-medium">
                  <PermanentJobIcon size={12} />{element.jobtype}
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-300 text-[11px] font-medium">
                  <CoinsDollarIcon size={12} />₹{element.budget}
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-bg-dark text-gray-500 dark:text-secondary-text-color text-[11px]">
                  <Time01Icon size={12} />
                  {new Date(element.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                </div>
              </div>

              {/* Skills */}
              <div className="flex items-start gap-1.5 mb-4 cursor-pointer" onClick={() => setShowAllSkills(!showAllSkills)}>
                <SkewIcon size={13} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <p className={`text-[11px] text-gray-500 dark:text-secondary-text-color ${showAllSkills ? "break-words" : "truncate"}`}>
                  <span className="font-semibold text-gray-600 dark:text-text-color">Skills: </span>
                  {element.skill.join(", ")}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-border-color">
                <div className="flex gap-2">
                  <button onClick={() => navigate("/employer/job/update", { state: { themtrue, element } })}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-500 dark:text-orange-300 text-xs font-medium hover:bg-orange-100 transition-colors">
                    <Edit01Icon size={12} /> Update
                  </button>
                  <button onClick={() => handlewarn(element._id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-300 text-xs font-medium hover:bg-red-100 transition-colors">
                    <Delete01Icon size={12} /> Delete
                  </button>
                </div>
                <button onClick={() => navigate("/employer/job/application", { state: { themtrue, jobid: element, senderId: getprofile._id } })}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white text-xs font-medium transition-colors">
                  <File01Icon size={12} /> Applications
                </button>
              </div>
            </div>
          </div>
        )) : (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
              <NodeAddIcon size={24} className="text-purple-300" />
            </div>
            <p className="text-sm font-medium text-gray-400 dark:text-secondary-text-color">No jobs created yet</p>
            <p className="text-xs text-gray-300 dark:text-secondary-text-color">Use the "Create Job" button to get started</p>
            <button onClick={() => navigate("/employer/job/create", { state: { themtrue } })}
              className="mt-2 px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 text-white text-xs font-medium transition-colors">
              Create First Job
            </button>
          </div>
        )}
      </div>

      {/* ===== DELETE WARNING MODAL ===== */}
      {showwarn && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          onClick={() => setwarn(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white dark:bg-card-color rounded-2xl shadow-2xl border border-gray-100 dark:border-border-color overflow-hidden"
          >
            {/* Top danger strip */}
            <div className="h-1 w-full bg-red-500" />

            <div className="p-5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0">
                  <Alert01Icon size={18} className="text-red-500" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-gray-800 dark:text-text-color">Delete Job</h2>
                  <p className="text-xs text-gray-400 dark:text-secondary-text-color mt-0.5">This action cannot be undone</p>
                </div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-800/20 rounded-xl p-3">
                <p className="text-xs text-orange-600 dark:text-orange-300">
                  Type <span className="font-bold">"{getprofile.name}"</span> to confirm deletion
                </p>
              </div>

              <div className="flex items-center gap-2 bg-gray-50 dark:bg-bg-dark border border-gray-200 dark:border-border-color rounded-lg px-3">
                <AlertCircleIcon size={13} className="text-gray-400 flex-shrink-0" />
                <input type="text" onChange={(e) => ssetwarn(e.target.value)}
                  placeholder={`Type ${getprofile.name}`}
                  className="bg-transparent outline-none text-sm py-2 w-full text-gray-700 dark:text-secondary-text-color placeholder:text-gray-300"
                />
              </div>

              {getalert && (
                <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="text-xs text-red-500 text-center">
                  Name doesn't match — try again
                </motion.p>
              )}

              <div className="flex gap-2 mt-1">
                <button onClick={() => setwarn(false)}
                  className="flex-1 py-2 rounded-lg border border-gray-200 dark:border-border-color text-sm text-gray-500 dark:text-secondary-text-color hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button onClick={() => DeleteJob(selectedId)}
                  className="flex-1 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors">
                  {loader ? <div className="flex justify-center"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /></div> : "Delete Job"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

    </div>
  );
}