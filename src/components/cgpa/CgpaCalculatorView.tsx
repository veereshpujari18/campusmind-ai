import React, { useState } from 'react';
import {
  Calculator,
  Plus,
  Trash2,
  Printer,
  Sparkles,
  RefreshCw,
  Award,
  TrendingUp,
  Download,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';

interface CalcSubject {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

interface CalcSemester {
  id: number;
  name: string;
  subjects: CalcSubject[];
}

export const CgpaCalculatorView: React.FC = () => {
  const { profile, semesters } = useApp();
  const { showToast } = useToast();

  const [scale, setScale] = useState<'10' | '4'>('10');

  // Initial calculation state initialized with real student semesters
  const [calcSemesters, setCalcSemesters] = useState<CalcSemester[]>(() => {
    return semesters.map((sem) => ({
      id: sem.semesterNumber,
      name: `Semester ${sem.semesterNumber}`,
      subjects: sem.subjects.map((s) => ({
        id: s.id,
        name: s.name,
        credits: s.credits,
        grade: s.grade,
      })),
    }));
  });

  const gradePoints10: Record<string, number> = {
    O: 10,
    'A+': 9,
    A: 8,
    'B+': 7,
    B: 6,
    C: 5,
    P: 4,
    F: 0,
  };

  const gradePoints4: Record<string, number> = {
    O: 4.0,
    'A+': 3.7,
    A: 3.3,
    'B+': 3.0,
    B: 2.7,
    C: 2.0,
    P: 1.0,
    F: 0.0,
  };

  const activePoints = scale === '10' ? gradePoints10 : gradePoints4;

  const calculateSemesterSgpa = (subjects: CalcSubject[]) => {
    let totalCredits = 0;
    let totalPoints = 0;

    subjects.forEach((s) => {
      const gp = activePoints[s.grade] ?? 0;
      totalPoints += s.credits * gp;
      totalCredits += s.credits;
    });

    if (totalCredits === 0) return { sgpa: 0, credits: 0 };
    return {
      sgpa: Number((totalPoints / totalCredits).toFixed(2)),
      credits: totalCredits,
    };
  };

  // Cumulative CGPA across all semesters
  let grandCredits = 0;
  let grandPoints = 0;

  const semesterResults = calcSemesters.map((sem) => {
    const res = calculateSemesterSgpa(sem.subjects);
    grandCredits += res.credits;
    grandPoints += res.credits * res.sgpa;
    return { ...sem, ...res };
  });

  const overallCgpa =
    grandCredits > 0 ? Number((grandPoints / grandCredits).toFixed(2)) : 0;

  const handleAddSubject = (semId: number) => {
    setCalcSemesters((prev) =>
      prev.map((sem) => {
        if (sem.id === semId) {
          const newSub: CalcSubject = {
            id: `calc_sub_${Date.now()}`,
            name: `Course Elective ${sem.subjects.length + 1}`,
            credits: 3,
            grade: 'A+',
          };
          return { ...sem, subjects: [...sem.subjects, newSub] };
        }
        return sem;
      })
    );
  };

  const handleRemoveSubject = (semId: number, subId: string) => {
    setCalcSemesters((prev) =>
      prev.map((sem) => {
        if (sem.id === semId) {
          return { ...sem, subjects: sem.subjects.filter((s) => s.id !== subId) };
        }
        return sem;
      })
    );
  };

  const handleUpdateSubject = (
    semId: number,
    subId: string,
    field: 'credits' | 'grade' | 'name',
    val: any
  ) => {
    setCalcSemesters((prev) =>
      prev.map((sem) => {
        if (sem.id === semId) {
          return {
            ...sem,
            subjects: sem.subjects.map((s) => (s.id === subId ? { ...s, [field]: val } : s)),
          };
        }
        return sem;
      })
    );
  };

  const handleAddSemester = () => {
    const nextSemNum = calcSemesters.length + 1;
    if (nextSemNum > 8) {
      showToast('Maximum 8 engineering semesters supported', 'info');
      return;
    }
    const newSem: CalcSemester = {
      id: nextSemNum,
      name: `Semester ${nextSemNum}`,
      subjects: [
        { id: `calc_${Date.now()}_1`, name: 'Core Engineering Subject 1', credits: 4, grade: 'A+' },
        { id: `calc_${Date.now()}_2`, name: 'Core Engineering Subject 2', credits: 4, grade: 'A' },
        { id: `calc_${Date.now()}_3`, name: 'Technical Elective', credits: 3, grade: 'O' },
      ],
    };
    setCalcSemesters([...calcSemesters, newSem]);
    showToast(`Added Semester ${nextSemNum}`, 'success');
  };

  const handleCelebrate = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
      });
    } catch {
      // ignore
    }
    showToast(`Calculated CGPA: ${overallCgpa} on ${scale}.0 Scale!`, 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 print:p-0">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 print:hidden">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">
            <Calculator className="w-4 h-4" />
            <span>Accurate Grade Point Average Simulator</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            CGPA & SGPA Calculator
          </h1>
          <p className="text-xs text-slate-500">
            Simulate your target semester scores, credit weightings, and university GPA.
          </p>
        </div>

        {/* Scale Switcher & Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setScale('10')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                scale === '10'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              10-Point Scale
            </button>
            <button
              onClick={() => setScale('4')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                scale === '4'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              4.0 US Scale
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Download Result</span>
          </button>
        </div>
      </div>

      {/* Main KPI Scoreboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl text-white shadow-md">
          <span className="text-xs text-indigo-100 block font-medium">Cumulative Grade Point Average</span>
          <div className="text-4xl font-black mt-2 tabular-nums">
            {overallCgpa} <span className="text-base font-normal text-indigo-200">/ {scale}.0</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-indigo-100 pt-2 border-t border-indigo-400/30">
            <span>Total Degree Credits: <strong>{grandCredits}</strong></span>
            <button
              onClick={handleCelebrate}
              className="px-2.5 py-1 bg-white/20 hover:bg-white/30 rounded-lg font-semibold flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Verify</span>
            </button>
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium block">Mathematical Formula</span>
            <div className="mt-2 text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
              SGPA = ∑(Credits × GradePoint) / ∑Credits
            </div>
            <div className="mt-2 text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
              CGPA = ∑(SGPA × Credits) / ∑Credits
            </div>
          </div>
          <span className="text-[11px] text-slate-400 mt-2">
            Standard AICTE & UGC Autonomous University Scale
          </span>
        </div>

        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium block">Student Target Comparison</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                {overallCgpa}
              </span>
              <span className="text-xs text-slate-400">Target: {profile.targetCgpa}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 mt-2 overflow-hidden">
              <div
                style={{ width: `${Math.min(100, (overallCgpa / (profile.targetCgpa || 10)) * 100)}%` }}
                className="h-full bg-emerald-500 rounded-full"
              />
            </div>
          </div>
          <div className="text-xs text-emerald-600 font-medium mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>
              {overallCgpa >= profile.targetCgpa
                ? 'Target achieved! Outstanding academic standing.'
                : `${(profile.targetCgpa - overallCgpa).toFixed(2)} points away from graduation goal.`}
            </span>
          </div>
        </div>
      </div>

      {/* Semesters Calculation Breakdown */}
      <div className="space-y-6">
        {semesterResults.map((sem) => (
          <div
            key={sem.id}
            className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4"
          >
            {/* Semester Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {sem.name}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 tabular-nums">
                  SGPA: {sem.sgpa}
                </span>
                <span className="text-xs text-slate-400 tabular-nums">
                  Credits: {sem.credits}
                </span>
              </div>

              <button
                onClick={() => handleAddSubject(sem.id)}
                className="px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-lg flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Course</span>
              </button>
            </div>

            {/* Courses Rows */}
            <div className="space-y-2.5">
              {sem.subjects.map((subj) => (
                <div
                  key={subj.id}
                  className="grid grid-cols-12 gap-2.5 items-center p-2 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs"
                >
                  <div className="col-span-5 sm:col-span-6">
                    <input
                      type="text"
                      value={subj.name}
                      onChange={(e) =>
                        handleUpdateSubject(sem.id, subj.id, 'name', e.target.value)
                      }
                      className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium"
                    />
                  </div>

                  <div className="col-span-3 sm:col-span-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-slate-400">Credits:</span>
                      <select
                        value={subj.credits}
                        onChange={(e) =>
                          handleUpdateSubject(sem.id, subj.id, 'credits', Number(e.target.value))
                        }
                        className="px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg tabular-nums"
                      >
                        {[1, 2, 3, 4, 5, 6].map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-span-3 sm:col-span-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-slate-400">Grade:</span>
                      <select
                        value={subj.grade}
                        onChange={(e) =>
                          handleUpdateSubject(sem.id, subj.id, 'grade', e.target.value)
                        }
                        className="px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg font-bold"
                      >
                        {Object.keys(activePoints).map((g) => (
                          <option key={g} value={g}>
                            {g} ({activePoints[g]} pts)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-span-1 text-right">
                    <button
                      onClick={() => handleRemoveSubject(sem.id, subj.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                      title="Remove course"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleAddSemester}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Next Semester</span>
          </button>

          <button
            onClick={handleCelebrate}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Recalculate & Celebrate</span>
          </button>
        </div>
      </div>
    </div>
  );
};
