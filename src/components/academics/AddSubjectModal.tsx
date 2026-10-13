import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { SubjectGrade } from '../../types';

interface AddSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  semesterNum: number;
  onAdd: (subject: Omit<SubjectGrade, 'id'>) => void;
}

export const AddSubjectModal: React.FC<AddSubjectModalProps> = ({
  isOpen,
  onClose,
  semesterNum,
  onAdd,
}) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [credits, setCredits] = useState(4);
  const [internalMarks, setInternalMarks] = useState(45);
  const [externalMarks, setExternalMarks] = useState(85);
  const [attendedClasses, setAttendedClasses] = useState(40);
  const [totalClasses, setTotalClasses] = useState(44);
  const [assignmentsCompleted, setAssignmentsCompleted] = useState(4);
  const [totalAssignments, setTotalAssignments] = useState(4);

  if (!isOpen) return null;

  const calculateGrade = (internals: number, externals: number) => {
    // Total out of 100 (Internal out of 50 scaled to 50 + external scaled to 50, or typical formula: (internals + externals/2))
    const totalPercentage = Math.round((internals / 50) * 50 + (externals / 100) * 50);
    if (totalPercentage >= 90) return { grade: 'O', point: 10 };
    if (totalPercentage >= 80) return { grade: 'A+', point: 9 };
    if (totalPercentage >= 70) return { grade: 'A', point: 8 };
    if (totalPercentage >= 60) return { grade: 'B+', point: 7 };
    if (totalPercentage >= 50) return { grade: 'B', point: 6 };
    if (totalPercentage >= 45) return { grade: 'C', point: 5 };
    if (totalPercentage >= 40) return { grade: 'P', point: 4 };
    return { grade: 'F', point: 0 };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const { grade, point } = calculateGrade(internalMarks, externalMarks);
    const attendancePct = totalClasses > 0 ? Math.round((attendedClasses / totalClasses) * 100) : 100;

    onAdd({
      code: code.trim().toUpperCase() || `CS${semesterNum}0${Math.floor(Math.random() * 9 + 1)}`,
      name: name.trim(),
      credits: Number(credits),
      internalMarks: Number(internalMarks),
      maxInternalMarks: 50,
      externalMarks: Number(externalMarks),
      maxExternalMarks: 100,
      grade,
      gradePoint: point,
      attendancePercentage: attendancePct,
      attendedClasses: Number(attendedClasses),
      totalClasses: Number(totalClasses),
      assignmentsCompleted: Number(assignmentsCompleted),
      totalAssignments: Number(totalAssignments),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Add Subject — Semester {semesterNum}
            </h3>
            <p className="text-xs text-slate-500">Configure course credits and exam marks</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Course Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={`CS${semesterNum}01`}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white uppercase"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Subject Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Distributed Systems"
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Credits (1 - 6)
              </label>
              <input
                type="number"
                min="1"
                max="6"
                value={credits}
                onChange={(e) => setCredits(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white tabular-nums"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Internal (/50)
              </label>
              <input
                type="number"
                min="0"
                max="50"
                value={internalMarks}
                onChange={(e) => setInternalMarks(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white tabular-nums"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                External (/100)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={externalMarks}
                onChange={(e) => setExternalMarks(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white tabular-nums"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Attended Classes
              </label>
              <input
                type="number"
                min="0"
                value={attendedClasses}
                onChange={(e) => setAttendedClasses(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white tabular-nums"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Total Classes
              </label>
              <input
                type="number"
                min="1"
                value={totalClasses}
                onChange={(e) => setTotalClasses(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white tabular-nums"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Assignments Done
              </label>
              <input
                type="number"
                min="0"
                value={assignmentsCompleted}
                onChange={(e) => setAssignmentsCompleted(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white tabular-nums"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Total Assignments
              </label>
              <input
                type="number"
                min="1"
                value={totalAssignments}
                onChange={(e) => setTotalAssignments(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white tabular-nums"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm"
            >
              Add Subject
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
