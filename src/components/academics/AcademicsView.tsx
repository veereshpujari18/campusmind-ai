import React, { useState } from 'react';
import {
  GraduationCap,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { AddSubjectModal } from './AddSubjectModal';

export const AcademicsView: React.FC = () => {
  const {
    semesters,
    activeSemesterNum,
    setActiveSemesterNum,
    addSubject,
    deleteSubject,
    calculateOverallCgpa,
  } = useApp();
  const { showToast } = useToast();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const currentSemester =
    semesters.find((s) => s.semesterNumber === activeSemesterNum) || {
      semesterNumber: activeSemesterNum,
      academicYear: '2026',
      sgpa: 0,
      totalCredits: 0,
      subjects: [],
    };

  const overallCgpa = calculateOverallCgpa();

  const handleDelete = (subjectId: string, subjectName: string) => {
    deleteSubject(activeSemesterNum, subjectId);
    showToast(`Removed "${subjectName}" from Semester ${activeSemesterNum}`, 'info');
  };

  const getGradeBadge = (grade: string) => {
    switch (grade) {
      case 'O':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'A+':
      case 'A':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'B+':
      case 'B':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'C':
      case 'P':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      default:
        return 'bg-rose-50 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border-rose-200 dark:border-rose-800';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Top Banner & SGPA Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Performance Management</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Semester {activeSemesterNum} Coursework
          </h1>
          <p className="text-xs text-slate-500">
            Track continuous internal evaluation (CIE), external grades, attendance, and semester GPA.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-right">
            <span className="text-[11px] text-slate-500 block">Semester SGPA</span>
            <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums">
              {currentSemester.sgpa || '0.00'}
            </span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-right">
            <span className="text-[11px] text-slate-500 block">Overall CGPA</span>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {overallCgpa}
            </span>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Subject</span>
          </button>
        </div>
      </div>

      {/* Semester Switcher Tabs (Sem 1 to Sem 8) */}
      <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((semNum) => {
          const isActive = activeSemesterNum === semNum;
          const semRec = semesters.find((s) => s.semesterNumber === semNum);
          return (
            <button
              key={semNum}
              onClick={() => setActiveSemesterNum(semNum)}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>Semester {semNum}</span>
              {semRec && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded ${
                    isActive ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {semRec.sgpa}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Subjects Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span>Enrolled Subjects ({currentSemester.subjects.length})</span>
            <span className="text-slate-400">· Total Credits: {currentSemester.totalCredits}</span>
          </div>
          <span className="text-xs text-slate-500">Min 75% attendance mandatory</span>
        </div>

        {currentSemester.subjects.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              No subjects added for Semester {activeSemesterNum}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Add your curriculum subjects, credits, and CIE internal marks to begin calculating your semester SGPA.
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add First Subject</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/75 dark:bg-slate-800/40 text-slate-500 border-b border-slate-200 dark:border-slate-800">
                  <th className="py-3 px-4 font-semibold">Subject & Code</th>
                  <th className="py-3 px-4 font-semibold text-center">Credits</th>
                  <th className="py-3 px-4 font-semibold text-center">Internal (/50)</th>
                  <th className="py-3 px-4 font-semibold text-center">External (/100)</th>
                  <th className="py-3 px-4 font-semibold text-center">Total (Scaled)</th>
                  <th className="py-3 px-4 font-semibold text-center">Grade</th>
                  <th className="py-3 px-4 font-semibold text-center">Grade Point</th>
                  <th className="py-3 px-4 font-semibold text-center">Attendance</th>
                  <th className="py-3 px-4 font-semibold text-center">Assignments</th>
                  <th className="py-3 px-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                {currentSemester.subjects.map((sub) => {
                  const totalScore = Math.round(
                    (sub.internalMarks / sub.maxInternalMarks) * 50 +
                      (sub.externalMarks / sub.maxExternalMarks) * 50
                  );
                  const isLowAttendance = sub.attendancePercentage < 75;

                  return (
                    <tr
                      key={sub.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-medium">
                        <div className="text-slate-900 dark:text-white font-semibold">
                          {sub.name}
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">{sub.code}</div>
                      </td>

                      <td className="py-3.5 px-4 text-center tabular-nums font-semibold">
                        {sub.credits}
                      </td>

                      <td className="py-3.5 px-4 text-center tabular-nums">
                        {sub.internalMarks} / {sub.maxInternalMarks}
                      </td>

                      <td className="py-3.5 px-4 text-center tabular-nums">
                        {sub.externalMarks} / {sub.maxExternalMarks}
                      </td>

                      <td className="py-3.5 px-4 text-center tabular-nums font-bold text-slate-900 dark:text-white">
                        {totalScore}%
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold border ${getGradeBadge(
                            sub.grade
                          )}`}
                        >
                          {sub.grade}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center tabular-nums font-bold text-indigo-600 dark:text-indigo-400">
                        {sub.gradePoint}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <div className="inline-flex items-center gap-1.5 tabular-nums">
                          <span
                            className={`font-semibold ${
                              isLowAttendance
                                ? 'text-rose-600 dark:text-rose-400'
                                : 'text-emerald-600 dark:text-emerald-400'
                            }`}
                          >
                            {sub.attendancePercentage}%
                          </span>
                          {isLowAttendance ? (
                            <span title="Attendance below 75% cutoff!">
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                            </span>
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {sub.attendedClasses}/{sub.totalClasses} classes
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-center tabular-nums">
                        {sub.assignmentsCompleted} / {sub.totalAssignments}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDelete(sub.id, sub.name)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                          title="Delete subject"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Subject Modal */}
      <AddSubjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        semesterNum={activeSemesterNum}
        onAdd={(sub) => {
          addSubject(activeSemesterNum, sub);
          showToast(`Added "${sub.name}" to Semester ${activeSemesterNum}`, 'success');
        }}
      />
    </div>
  );
};
