import { FilterOption } from '../types/student';

/**
 * Các loại bộ lọc danh sách sinh viên
 */
export const FILTER_TYPES = {
  ALL: 'ALL',              // Tất cả sinh viên
  EXCELLENT: 'EXCELLENT',  // Sinh viên Giỏi (Điểm >= 8)
  FAILED: 'FAILED'         // Sinh viên trượt môn (Điểm < 5)
} as const;

/**
 * Danh sách hiển thị nhãn của bộ lọc
 */
export const FILTER_LABELS: FilterOption[] = [
  { key: 'ALL', label: 'Tất cả sinh viên' },
  { key: 'EXCELLENT', label: 'Sinh viên Giỏi (Điểm ≥ 8)' },
  { key: 'FAILED', label: 'Sinh viên trượt môn (Điểm < 5)' }
];
