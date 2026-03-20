import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import {
  PlusSignIcon, Delete01Icon, ArrowLeft02Icon,
  Download03Icon, GraduateMaleIcon,
  NoteIcon, TaskDone01Icon,
  CodeIcon, SignLanguageCIcon,
  Certificate01Icon, PlusSignSquareIcon,
} from "hugeicons-react";

export const Resume = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userdata = location.state?.getprofile;

  const [summary, setSummary] = useState("");
  const [education, setEducation] = useState([{ id: 1, course: "", college: "", year: "" }]);
  const [projects, setProjects] = useState([{ id: 1, title: "", description: "", link: "" }]);
  const [certifications, setCertifications] = useState([{ id: 1, course: "", provider: "", year: "" }]);
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);

  const update = (arr, index, key, val, setter) => {
    const copy = [...arr];
    copy[index][key] = val;
    setter(copy);
  };

  const addItem = (setter, template) => setter(prev => [...prev, { ...template, id: Date.now() }]);
  const removeItem = (setter, index) => setter(prev => prev.filter((_, i) => i !== index));

  // ✅ Pure jsPDF — proper text-based PDF
  const handleDownloadPDF = () => {
    const pdf = new jsPDF({ unit: "mm", format: "a4" });
    const pageW = 210;
    const margin = 18;
    const contentW = pageW - margin * 2;
    let y = 0;

    const colors = {
      purple: [83, 74, 183],
      dark: [30, 30, 30],
      gray: [100, 100, 100],
      light: [150, 150, 150],
      line: [220, 220, 230],
      bgHeader: [245, 243, 255],
    };

    // --- Header Background ---
    pdf.setFillColor(...colors.bgHeader);
    pdf.rect(0, 0, pageW, 42, "F");

    // --- Name ---
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.setTextColor(...colors.purple);
    pdf.text(userdata?.name || "Your Name", pageW / 2, 16, { align: "center" });

    // --- Role badge ---
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(...colors.gray);
    pdf.text((userdata?.roll || "").toUpperCase(), pageW / 2, 23, { align: "center" });

    // --- Email ---
    pdf.setFontSize(9);
    pdf.setTextColor(...colors.gray);
    pdf.text(userdata?.email || "", pageW / 2, 29, { align: "center" });

    // --- Divider under header ---
    pdf.setDrawColor(...colors.purple);
    pdf.setLineWidth(0.5);
    pdf.line(margin, 36, pageW - margin, 36);

    y = 44;

    // --- Helper: Section Title ---
    const sectionTitle = (title) => {
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.setTextColor(...colors.purple);
      pdf.text(title.toUpperCase(), margin, y);
      pdf.setDrawColor(...colors.line);
      pdf.setLineWidth(0.3);
      pdf.line(margin, y + 1.5, pageW - margin, y + 1.5);
      y += 7;
    };

    // --- Helper: Wrapped text ---
    const wrappedText = (text, x, maxW, size = 9, color = colors.dark) => {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(size);
      pdf.setTextColor(...color);
      const lines = pdf.splitTextToSize(text || "", maxW);
      pdf.text(lines, x, y);
      y += lines.length * (size * 0.4) + 1;
    };

    // --- Helper: Check page overflow ---
    const checkPage = (needed = 15) => {
      if (y + needed > 280) {
        pdf.addPage();
        y = 18;
      }
    };

    // --- SUMMARY ---
    if (summary.trim()) {
      sectionTitle("Professional Summary");
      wrappedText(summary, margin, contentW, 9, colors.dark);
      y += 4;
    }

    // --- EDUCATION ---
    const filledEdu = education.filter(e => e.course || e.college);
    if (filledEdu.length > 0) {
      checkPage(20);
      sectionTitle("Education");
      filledEdu.forEach(item => {
        checkPage(12);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(9.5);
        pdf.setTextColor(...colors.dark);
        pdf.text(item.course || "", margin, y);

        if (item.year) {
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(8.5);
          pdf.setTextColor(...colors.light);
          pdf.text(item.year, pageW - margin, y, { align: "right" });
        }
        y += 4.5;

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8.5);
        pdf.setTextColor(...colors.gray);
        pdf.text(item.college || "", margin, y);
        y += 6;
      });
      y += 2;
    }

    // --- PROJECTS ---
    const filledProj = projects.filter(p => p.title);
    if (filledProj.length > 0) {
      checkPage(20);
      sectionTitle("Projects");
      filledProj.forEach(item => {
        checkPage(18);

        // Title + bullet
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(9.5);
        pdf.setTextColor(...colors.dark);
        pdf.text(`• ${item.title}`, margin, y);
        y += 5;

        if (item.description) {
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(8.5);
          pdf.setTextColor(...colors.gray);
          const lines = pdf.splitTextToSize(item.description, contentW - 4);
          pdf.text(lines, margin + 3, y);
          y += lines.length * 3.8 + 1;
        }

        if (item.link) {
          pdf.setFont("helvetica", "italic");
          pdf.setFontSize(8);
          pdf.setTextColor(59, 130, 246);
          pdf.text(item.link, margin + 3, y);
          y += 5;
        }
        y += 2;
      });
      y += 1;
    }

    // --- CERTIFICATIONS ---
    const filledCert = certifications.filter(c => c.course);
    if (filledCert.length > 0) {
      checkPage(20);
      sectionTitle("Certifications");
      filledCert.forEach(item => {
        checkPage(10);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(9.5);
        pdf.setTextColor(...colors.dark);
        pdf.text(`• ${item.course}`, margin, y);

        if (item.year) {
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(8.5);
          pdf.setTextColor(...colors.light);
          pdf.text(item.year, pageW - margin, y, { align: "right" });
        }
        y += 4.5;

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8.5);
        pdf.setTextColor(...colors.gray);
        pdf.text(item.provider || "", margin + 3, y);
        y += 6;
      });
      y += 2;
    }

    // --- SKILLS ---
    if (skills.length > 0) {
      checkPage(20);
      sectionTitle("Skills");

      // Skills in a grid style — 3 per row
      const skillChunks = [];
      for (let i = 0; i < skills.length; i += 3) {
        skillChunks.push(skills.slice(i, i + 3));
      }

      skillChunks.forEach(row => {
        checkPage(8);
        row.forEach((skill, colIndex) => {
          const x = margin + colIndex * (contentW / 3);
          // Small box behind each skill
          pdf.setFillColor(245, 243, 255);
          pdf.roundedRect(x, y - 3.5, contentW / 3 - 3, 6, 1.5, 1.5, "F");
          pdf.setFont("helvetica", "normal");
          pdf.setFontSize(8.5);
          pdf.setTextColor(...colors.purple);
          pdf.text(skill, x + (contentW / 3 - 3) / 2, y, { align: "center" });
        });
        y += 8;
      });
      y += 2;
    }

    // --- LANGUAGES ---
    if (languages.length > 0) {
      checkPage(15);
      sectionTitle("Languages");
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.setTextColor(...colors.dark);
      pdf.text(languages.join("  •  "), margin, y);
      y += 8;
    }

    // --- Footer ---
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(7.5);
    pdf.setTextColor(...colors.light);
    pdf.text(`Generated via SkillBridge • ${new Date().toLocaleDateString("en-IN")}`, pageW / 2, 290, { align: "center" });

    pdf.save(`${userdata?.name || "resume"}.pdf`);
  };

  return (
    <div className="w-full min-h-screen flex-col flex justify-center bg-gray-50 dark:bg-bg-dark">

      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-white dark:bg-bg-dark border-b border-gray-100 dark:border-border-color px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-secondary-text-color hover:text-gray-800 dark:hover:text-text-color"
        >
          <ArrowLeft02Icon size={16} />
          Back
        </button>
        <h1 className="text-sm font-semibold text-gray-700 dark:text-text-color">Resume Builder</h1>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white text-xs font-medium transition-colors"
        >
          <Download03Icon size={13} />
          Download PDF
        </button>
      </div>

      <div className="w-full flex justify-center">
        <div className="mx-auto w-full max-w-[800px] bg-white dark:bg-card-color shadow-sm rounded-2xl m-4 md:m-6 p-6 md:p-8">

          {/* Header Preview */}
          <div className="text-center pb-5 mb-2 border-b border-gray-100 dark:border-border-color bg-purple-50 dark:bg-purple-900/10 rounded-xl p-4">
            {userdata?.profileImage && (
              <img src={userdata.profileImage} className="w-16 h-16 rounded-2xl object-cover mx-auto mb-3 border border-gray-100" alt="profile" />
            )}
            <h1 className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-accent-color">{userdata?.name}</h1>
            <p className="text-sm mt-1 text-gray-400 dark:text-secondary-text-color">{userdata?.email}</p>
            <span className="inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-medium capitalize bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300">
              {userdata?.roll}
            </span>
          </div>

          {/* Summary */}
          <ResumeSection title="Professional Summary" icon={<NoteIcon size={15} />}>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Write a brief professional summary..."
              rows={3}
              className="w-full mt-2 p-3 text-sm bg-gray-50 dark:bg-bg-dark border border-gray-200 dark:border-border-color rounded-xl outline-none focus:ring-2 focus:ring-purple-300 dark:text-secondary-text-color placeholder:text-gray-300 resize-none"
            />
          </ResumeSection>

          {/* Education */}
          <ResumeSection title="Education" icon={<GraduateMaleIcon size={15} />}
            onAdd={() => addItem(setEducation, { course: "", college: "", year: "" })}
          >
            {education.map((item, index) => (
              <div key={item.id} className="mb-3 p-3 bg-gray-50 dark:bg-bg-dark rounded-xl border border-gray-100 dark:border-border-color relative">
                {education.length > 1 && (
                  <button onClick={() => removeItem(setEducation, index)} className="absolute top-2 right-2 text-red-400 hover:text-red-500">
                    <Delete01Icon size={13} />
                  </button>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <input value={item.course} onChange={(e) => update(education, index, "course", e.target.value, setEducation)} placeholder="Course / Degree" className="input-field" />
                  <input value={item.college} onChange={(e) => update(education, index, "college", e.target.value, setEducation)} placeholder="College / University" className="input-field" />
                  <input value={item.year} onChange={(e) => update(education, index, "year", e.target.value, setEducation)} placeholder="Year (e.g. 2025)" className="input-field" />
                </div>
              </div>
            ))}
          </ResumeSection>

          {/* Projects */}
          <ResumeSection title="Projects" icon={<CodeIcon size={15} />}
            onAdd={() => addItem(setProjects, { title: "", description: "", link: "" })}
          >
            {projects.map((item, index) => (
              <div key={item.id} className="mb-3 p-3 bg-gray-50 dark:bg-bg-dark rounded-xl border border-gray-100 dark:border-border-color relative">
                {projects.length > 1 && (
                  <button onClick={() => removeItem(setProjects, index)} className="absolute top-2 right-2 text-red-400 hover:text-red-500">
                    <Delete01Icon size={13} />
                  </button>
                )}
                <div className="flex flex-col gap-2">
                  <input value={item.title} onChange={(e) => update(projects, index, "title", e.target.value, setProjects)} placeholder="Project Title" className="input-field" />
                  <textarea value={item.description} onChange={(e) => update(projects, index, "description", e.target.value, setProjects)} placeholder="Project Description" rows={2} className="input-field resize-none" />
                  <input value={item.link} onChange={(e) => update(projects, index, "link", e.target.value, setProjects)} placeholder="GitHub / Live Link" className="input-field" />
                </div>
              </div>
            ))}
          </ResumeSection>

          {/* Certifications */}
          <ResumeSection title="Certifications" icon={<Certificate01Icon size={15} />}
            onAdd={() => addItem(setCertifications, { course: "", provider: "", year: "" })}
          >
            {certifications.map((item, index) => (
              <div key={item.id} className="mb-3 p-3 bg-gray-50 dark:bg-bg-dark rounded-xl border border-gray-100 dark:border-border-color relative">
                {certifications.length > 1 && (
                  <button onClick={() => removeItem(setCertifications, index)} className="absolute top-2 right-2 text-red-400 hover:text-red-500">
                    <Delete01Icon size={13} />
                  </button>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <input value={item.course} onChange={(e) => update(certifications, index, "course", e.target.value, setCertifications)} placeholder="Course Name" className="input-field" />
                  <input value={item.provider} onChange={(e) => update(certifications, index, "provider", e.target.value, setCertifications)} placeholder="Provider (e.g. Udemy)" className="input-field" />
                  <input value={item.year} onChange={(e) => update(certifications, index, "year", e.target.value, setCertifications)} placeholder="Year" className="input-field" />
                </div>
              </div>
            ))}
          </ResumeSection>

          {/* Skills */}
          <ResumeSection title="Skills" icon={<CodeIcon size={15} />}>
            <textarea
              value={skills.join(", ")}
              onChange={(e) => setSkills(e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
              placeholder="React, Node.js, MongoDB, Docker... (comma separated)"
              rows={2}
              className="w-full mt-2 p-3 text-sm bg-gray-50 dark:bg-bg-dark border border-gray-200 dark:border-border-color rounded-xl outline-none focus:ring-2 focus:ring-purple-300 dark:text-secondary-text-color placeholder:text-gray-300 resize-none"
            />
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {skills.map((skill, i) => (
                  <span key={i} className="px-2.5 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 rounded-lg text-[11px] font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </ResumeSection>

          {/* Languages */}
          <ResumeSection title="Languages" icon={<SignLanguageCIcon size={15} />}>
            <textarea
              value={languages.join(", ")}
              onChange={(e) => setLanguages(e.target.value.split(",").map(s => s.trim()).filter(Boolean))}
              placeholder="English, Hindi, Marathi..."
              rows={2}
              className="w-full mt-2 p-3 text-sm bg-gray-50 dark:bg-bg-dark border border-gray-200 dark:border-border-color rounded-xl outline-none focus:ring-2 focus:ring-purple-300 dark:text-secondary-text-color placeholder:text-gray-300 resize-none"
            />
            {languages.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {languages.map((lang, i) => (
                  <span key={i} className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 rounded-lg text-[11px] font-medium">
                    {lang}
                  </span>
                ))}
              </div>
            )}
          </ResumeSection>

        </div>
      </div>

      <style>{`
        .input-field {
          width: 100%;
          padding: 6px 10px;
          font-size: 13px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          outline: none;
          background: white;
          color: #374151;
        }
        .input-field:focus { border-color: #a78bfa; }
      `}</style>
    </div>
  );
};

const ResumeSection = ({ title, icon, children, onAdd }) => (
  <div className="mt-6">
    <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100 dark:border-border-color">
      <div className="flex items-center gap-2">
        <span className="text-purple-500 dark:text-accent-color">{icon}</span>
        <h2 className="font-semibold text-sm text-gray-700 dark:text-text-color">{title}</h2>
      </div>
      {onAdd && (
        <button onClick={onAdd} className="flex items-center gap-1 px-2 py-1 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-500 dark:text-purple-300 text-[11px] font-medium hover:bg-purple-100 transition-colors">
          <PlusSignSquareIcon size={11} />
          Add
        </button>
      )}
    </div>
    {children}
  </div>
);