import React from 'react';
import { FilterType, FilterOption } from '../../types/student';
import { FILTER_LABELS } from '../../constants/filterTypes';
import './StudentFilter.css';

interface StudentFilterProps {
  currentFilter: FilterType;
  onFilterChange: (newFilter: FilterType) => void;
  counts?: Partial<Record<FilterType, number>>;
}

/**
 * Component StudentFilter
 * Hiển thị các nút lọc: Tất cả, Sinh viên Giỏi (Điểm >= 8), Sinh viên trượt môn (Điểm < 5)
 * @param props { currentFilter, onFilterChange, counts }
 */
const StudentFilter: React.FC<StudentFilterProps> = ({
  currentFilter,
  onFilterChange,
  counts = {}
}) => {
  return (
    <div className="filter-container">
      <div className="filter-label-group">
        <span className="filter-icon">🔍</span>
        <span className="filter-title">Bộ lọc danh sách:</span>
      </div>

      <div className="filter-buttons">
        {/* ES6 .map() render danh sách các nút lọc */}
        {FILTER_LABELS.map((filterItem: FilterOption) => {
          const { key, label } = filterItem;
          const isActive: boolean = currentFilter === key;
          const count: number = counts[key] ?? 0;

          return (
            <button
              key={key}
              type="button"
              className={`filter-btn ${isActive ? 'filter-btn-active' : ''}`}
              onClick={() => onFilterChange(key)}
            >
              <span>{label}</span>
              <span className={`filter-count-badge ${isActive ? 'badge-active' : ''}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StudentFilter;
