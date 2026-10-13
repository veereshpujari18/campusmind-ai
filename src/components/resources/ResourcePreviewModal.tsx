import React from 'react';
import { X, Download, FileText, CheckCircle2, Calendar, User, Eye } from 'lucide-react';
import { CollegeResource } from '../../types';

interface ResourcePreviewModalProps {
  resource: CollegeResource | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (id: string, title: string) => void;
}

export const ResourcePreviewModal: React.FC<ResourcePreviewModalProps> = ({
  resource,
  isOpen,
  onClose,
  onDownload,
}) => {
  if (!isOpen || !resource) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
              Semester {resource.semester} · {resource.type}
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
              {resource.title}
            </h2>
            <div className="text-xs text-slate-500 flex items-center gap-2 pt-1">
              <span>{resource.subject}</span>
              <span>·</span>
              <span>By {resource.author}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-500 block">File Type</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase">
                {resource.fileFormat}
              </span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-500 block">File Size</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white tabular-nums">
                {resource.fileSize}
              </span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-500 block">Uploaded</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white tabular-nums">
                {resource.uploadedDate}
              </span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
              <span className="text-[10px] text-slate-500 block">Downloads</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                {resource.downloads}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Resource Summary
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {resource.description}
            </p>
          </div>

          {/* Document Preview Shell */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <Eye className="w-4 h-4 text-indigo-500" />
              <span>Document Verification & Index Preview</span>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 space-y-2">
              <div className="font-semibold text-slate-900 dark:text-white">Table of Contents / Overview:</div>
              <ul className="list-disc list-inside space-y-1 text-[11px]">
                <li>Section 1: Theoretical Foundations and Architecture Diagrams</li>
                <li>Section 2: Solved Previous University End-Semester Numericals</li>
                <li>Section 3: Key Laboratory Experiment Commands & Algorithm Complexity</li>
                <li>Section 4: Top 20 Examination Revision Viva Questions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl"
          >
            Close
          </button>

          <button
            onClick={() => onDownload(resource.id, resource.title)}
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Download Resource ({resource.fileSize})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
