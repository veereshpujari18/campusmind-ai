import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Mail,
  Building,
  Calendar,
  Github,
  Linkedin,
  FileText,
  Edit3,
  Award,
  CheckCircle2,
  ExternalLink,
  Download,
  Upload,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { EditProfileModal } from './EditProfileModal';

export const ProfileView: React.FC = () => {
  const { profile, updateProfile, calculateOverallCgpa, internships, dsaProblems } = useApp();
  const { showToast } = useToast();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const overallCgpa = calculateOverallCgpa();
  const solvedDsa = dsaProblems.filter((p) => p.status === 'Solved').length;
  const activeInternships = internships.filter(
    (i) => i.status !== 'Rejected' && i.status !== 'Selected'
  ).length;

  const handleUploadResume = () => {
    updateProfile({ resumeFileName: `Aryan_Sharma_SWE_Resume_${Date.now()}.pdf` });
    showToast('Uploaded new verified resume PDF', 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Profile Card Header */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center font-black text-2xl shadow-md shrink-0">
              {profile.name.charAt(0)}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                  {profile.name}
                </h1>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                  Semester {profile.semester}
                </span>
              </div>

              <div className="text-xs text-slate-500 space-y-0.5">
                <div className="flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>{profile.college}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                  <span>{profile.branch} · Roll/USN: <strong className="font-mono">{profile.usnOrRollNo}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{profile.email}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditModalOpen(true)}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors self-start sm:self-center"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500 block">Overall CGPA</span>
          <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {overallCgpa}
          </span>
          <span className="text-[11px] text-emerald-600 block mt-0.5">Target: {profile.targetCgpa}</span>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500 block">DSA Solved</span>
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
            {solvedDsa} <span className="text-xs font-normal text-slate-400">problems</span>
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">LeetCode / GFG</span>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500 block">Active Internships</span>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 tabular-nums">
            {activeInternships}
          </span>
          <span className="text-[11px] text-slate-400 block mt-0.5">{internships.length} total applied</span>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500 block">Placement Status</span>
          <span className="text-base font-bold text-purple-600 dark:text-purple-400 mt-1 block">
            Tier-1 Eligible
          </span>
          <span className="text-[11px] text-emerald-600 block mt-0.5">Zero Backlogs</span>
        </div>
      </div>

      {/* Bio & Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {/* Bio */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              About & Career Objective
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {profile.bio}
            </p>
          </div>

          {/* Technical Skills */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Technical Core Competencies
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Links & Resume */}
        <div className="lg:col-span-4 space-y-6">
          {/* Social Profiles */}
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Developer Profiles
            </h3>

            <div className="space-y-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Github className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                  <span>GitHub Repository</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 text-blue-600" />
                  <span>LinkedIn Network</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Master Resume Card */}
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Verified Tech Resume
            </h3>

            <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-center gap-3">
              <FileText className="w-6 h-6 text-indigo-600 shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-indigo-950 dark:text-indigo-200 truncate">
                  {profile.resumeFileName}
                </div>
                <div className="text-[10px] text-indigo-700 dark:text-indigo-400">
                  Updated for campus placements
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => showToast('Downloading verified resume...', 'info')}
                className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
              <button
                onClick={handleUploadResume}
                className="py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Replace</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <EditProfileModal
        profile={profile}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={(data) => {
          updateProfile(data);
          showToast('Updated student profile information', 'success');
        }}
      />
    </div>
  );
};
