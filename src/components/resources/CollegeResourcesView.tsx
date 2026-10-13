import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  FileText,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { CollegeResource } from '../../types';
import { UploadResourceModal } from './UploadResourceModal';
import { ResourcePreviewModal } from './ResourcePreviewModal';

export const CollegeResourcesView: React.FC = () => {
  const { resources, addResource, incrementResourceDownload } = useApp();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSemester, setSelectedSemester] = useState<string>('All');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [activePreviewResource, setActivePreviewResource] = useState<CollegeResource | null>(null);

  const categories = [
    'All',
    'Notes',
    'PYQ',
    'Lab Programs',
    'Syllabus',
    'Timetables',
    'Important Announcements',
    'Study Materials',
  ];

  const filteredResources = useMemo(() => {
    return resources.filter((r) => {
      const matchSearch =
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === 'All' || r.type === selectedCategory;
      const matchSem = selectedSemester === 'All' || String(r.semester) === selectedSemester;

      return matchSearch && matchCategory && matchSem;
    });
  }, [resources, searchQuery, selectedCategory, selectedSemester]);

  const handleDownload = (id: string, title: string) => {
    incrementResourceDownload(id);
    showToast(`Downloading: "${title}"`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Academic Knowledge Base</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            College Resources & Notes Hub
          </h1>
          <p className="text-xs text-slate-500">
            Access lecture notes, university previous year question papers (PYQs), and laboratory code.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Study Resource</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, subject (DBMS, CN), author..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-hidden"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All Resource Types' : c}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-hidden"
            >
              <option value="All">All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s} value={String(s)}>
                  Semester {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Resources Cards Grid */}
      {filteredResources.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            No resources match your search
          </h3>
          <p className="text-xs text-slate-500">
            Be the first to share notes or question papers for this subject!
          </p>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="mt-2 px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-semibold"
          >
            Upload Resource
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700 p-5 flex flex-col justify-between transition-all hover:shadow-md group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                    Semester {res.semester} · {res.type}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase">
                    {res.fileFormat}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {res.title}
                </h3>

                <div className="text-xs text-slate-500 dark:text-slate-400 space-y-0.5">
                  <div className="font-semibold text-slate-700 dark:text-slate-300">
                    {res.subject}
                  </div>
                  <div className="text-[11px]">By {res.author}</div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {res.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 tabular-nums">
                  {res.fileSize} · {res.downloads} downloads
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setActivePreviewResource(res)}
                    className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    title="Preview Document"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDownload(res.id, res.title)}
                    className="px-3 py-1.5 bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 text-amber-700 dark:text-amber-300 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <UploadResourceModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={(res) => {
          addResource(res);
          showToast(`Uploaded "${res.title}" to Resources Hub`, 'success');
        }}
      />

      <ResourcePreviewModal
        resource={activePreviewResource}
        isOpen={!!activePreviewResource}
        onClose={() => setActivePreviewResource(null)}
        onDownload={handleDownload}
      />
    </div>
  );
};
