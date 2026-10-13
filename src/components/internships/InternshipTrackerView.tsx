import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  Trash2,
  ExternalLink,
  Kanban,
  Table as TableIcon,
  Calendar,
  Building,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { InternshipApplication, InternshipStatus } from '../../types';
import { AddInternshipModal } from './AddInternshipModal';

export const InternshipTrackerView: React.FC = () => {
  const { internships, addInternship, updateInternshipStatus, deleteInternship } = useApp();
  const { showToast } = useToast();

  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const statuses: InternshipStatus[] = [
    'Wishlist',
    'Applied',
    'Online Assessment',
    'Interview',
    'Selected',
    'Rejected',
  ];

  const filteredInternships = useMemo(() => {
    return internships.filter((item) => {
      const matchesSearch =
        item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [internships, searchQuery, statusFilter]);

  // Statistics
  const totalApps = internships.length;
  const activePipeline = internships.filter(
    (i) => i.status !== 'Selected' && i.status !== 'Rejected'
  ).length;
  const selectedCount = internships.filter((i) => i.status === 'Selected').length;
  const conversionRate = totalApps > 0 ? Math.round((selectedCount / totalApps) * 100) : 0;

  const handleStatusChange = (id: string, newStatus: InternshipStatus) => {
    updateInternshipStatus(id, newStatus);
    showToast(`Updated status to "${newStatus}"`, 'info');
  };

  const handleDelete = (id: string, company: string) => {
    deleteInternship(id);
    showToast(`Removed application for ${company}`, 'info');
  };

  const getStatusColor = (status: InternshipStatus) => {
    switch (status) {
      case 'Wishlist':
        return 'text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-300';
      case 'Applied':
        return 'text-blue-700 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-300';
      case 'Online Assessment':
        return 'text-amber-700 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-300';
      case 'Interview':
        return 'text-purple-700 bg-purple-50 dark:bg-purple-950/60 dark:text-purple-300';
      case 'Selected':
        return 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300';
      case 'Rejected':
        return 'text-rose-700 bg-rose-50 dark:bg-rose-950/60 dark:text-rose-300';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
            <Briefcase className="w-4 h-4" />
            <span>Campus & Off-Campus Recruitment</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Internship Application Tracker
          </h1>
          <p className="text-xs text-slate-500">
            Organize recruitment pipeline stages, OA assessment test dates, and interviews.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View mode switcher */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Kanban Board View"
            >
              <Kanban className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Table View"
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Application</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500 block">Total Applications</span>
          <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {totalApps}
          </span>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500 block">Active Pipeline</span>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 tabular-nums">
            {activePipeline}
          </span>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500 block">Offers Received</span>
          <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
            {selectedCount}
          </span>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500 block">Offer Conversion</span>
          <span className="text-2xl font-bold text-purple-600 dark:text-purple-400 tabular-nums">
            {conversionRate}%
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search companies (Google, Microsoft), roles..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-hidden w-full sm:w-auto"
          >
            <option value="All">All Stages</option>
            {statuses.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main View: Kanban Board */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-start overflow-x-auto pb-4">
          {statuses.map((columnStatus) => {
            const columnItems = filteredInternships.filter((i) => i.status === columnStatus);

            return (
              <div
                key={columnStatus}
                className="bg-slate-50/70 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-3.5 space-y-3 min-w-[240px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {columnStatus}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400 tabular-nums">
                    {columnItems.length}
                  </span>
                </div>

                {/* Cards in this column */}
                <div className="space-y-3 min-h-[140px]">
                  {columnItems.length === 0 ? (
                    <div className="py-8 text-center text-[11px] text-slate-400 italic">
                      Empty stage
                    </div>
                  ) : (
                    columnItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-md transition-all space-y-2.5 group"
                      >
                        <div className="flex items-start justify-between gap-1">
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                              {item.company}
                            </h4>
                            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                              {item.role}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDelete(item.id, item.company)}
                            className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 rounded transition-opacity"
                            title="Delete application"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="space-y-1 text-[11px] text-slate-500">
                          <div className="flex items-center gap-1.5 truncate">
                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate">{item.location} ({item.workMode})</span>
                          </div>
                          {item.stipend && (
                            <div className="font-semibold text-slate-700 dark:text-slate-300">
                              {item.stipend}
                            </div>
                          )}
                        </div>

                        {item.notes && (
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
                            {item.notes}
                          </p>
                        )}

                        {/* Move Status Dropdown */}
                        <div className="pt-1 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 text-[10px]">
                          <span className="text-slate-400">Move:</span>
                          <select
                            value={item.status}
                            onChange={(e) =>
                              handleStatusChange(item.id, e.target.value as InternshipStatus)
                            }
                            className="bg-transparent text-[10px] font-medium text-indigo-600 dark:text-indigo-400 cursor-pointer focus:outline-hidden"
                          >
                            {statuses.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Alternative Table View */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-2xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/40 text-slate-500 border-b border-slate-200 dark:border-slate-800">
                <th className="py-3 px-4 font-semibold">Company & Role</th>
                <th className="py-3 px-4 font-semibold">Location / Mode</th>
                <th className="py-3 px-4 font-semibold">Stipend</th>
                <th className="py-3 px-4 font-semibold">Stage Status</th>
                <th className="py-3 px-4 font-semibold">Deadline</th>
                <th className="py-3 px-4 font-semibold">Notes</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
              {filteredInternships.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4 font-medium">
                    <div className="font-bold text-slate-900 dark:text-white">{item.company}</div>
                    <div className="text-[11px] text-slate-500">{item.role}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    {item.location} <span className="text-slate-400">({item.workMode})</span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    {item.stipend || '—'}
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item.id, e.target.value as InternshipStatus)
                      }
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md border border-transparent ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {statuses.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3.5 px-4 tabular-nums text-slate-500">
                    {item.deadline}
                  </td>
                  <td className="py-3.5 px-4 max-w-xs truncate text-[11px] text-slate-500">
                    {item.notes || '—'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDelete(item.id, item.company)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Modal */}
      <AddInternshipModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={(data) => {
          addInternship(data);
          showToast(`Added application for ${data.company}`, 'success');
        }}
      />
    </div>
  );
};
