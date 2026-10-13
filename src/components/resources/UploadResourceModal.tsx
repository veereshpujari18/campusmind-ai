import React, { useState } from 'react';
import { X, Upload, BookOpen } from 'lucide-react';
import { CollegeResource } from '../../types';

interface UploadResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (res: Omit<CollegeResource, 'id' | 'uploadedDate' | 'downloads'>) => void;
}

export const UploadResourceModal: React.FC<UploadResourceModalProps> = ({
  isOpen,
  onClose,
  onUpload,
}) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Database Management Systems');
  const [semester, setSemester] = useState(6);
  const [type, setType] = useState<CollegeResource['type']>('Notes');
  const [fileFormat, setFileFormat] = useState<'PDF' | 'DOCX' | 'ZIP' | 'CODE'>('PDF');
  const [fileSize, setFileSize] = useState('3.5 MB');
  const [author, setAuthor] = useState('Aryan Sharma (Student Contributor)');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    onUpload({
      title: title.trim(),
      subject: subject.trim(),
      semester: Number(semester),
      type,
      fileFormat,
      fileSize,
      author: author.trim(),
      description: description.trim(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Upload College Study Resource
              </h3>
              <p className="text-xs text-slate-500">Share lecture notes, question papers, or lab code</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Resource Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Unit 3 Dynamic Programming Hand-annotated Notes"
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="DBMS / Operating Systems"
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Semester
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value))}
                className="w-full px-2.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl tabular-nums"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s}>
                    Semester {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Resource Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-2 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              >
                <option value="Notes">Notes</option>
                <option value="PYQ">PYQ</option>
                <option value="Lab Programs">Lab Programs</option>
                <option value="Syllabus">Syllabus</option>
                <option value="Timetables">Timetables</option>
                <option value="Study Materials">Study Materials</option>
                <option value="Important Announcements">Announcement</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Format
              </label>
              <select
                value={fileFormat}
                onChange={(e) => setFileFormat(e.target.value as any)}
                className="w-full px-2 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              >
                <option value="PDF">PDF Document</option>
                <option value="DOCX">DOCX Word</option>
                <option value="ZIP">ZIP Archive</option>
                <option value="CODE">Source Code</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Estimated Size
              </label>
              <input
                type="text"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                placeholder="2.4 MB"
                className="w-full px-2 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl tabular-nums"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Description & Highlights *
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What topics does this resource cover? Mention university scheme or solved question years..."
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-colors shadow-sm"
            >
              Publish to College Hub
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
