/**
 * Interface đại diện cho thông tin một sinh viên
 */
export interface Student {
  id: number;
  name: string;
  score: number;
  class: string;
}

/**
 * Kiểu dữ liệu cho các loại bộ lọc sinh viên
 */
export type FilterType = 'ALL' | 'EXCELLENT' | 'FAILED';

/**
 * Cấu hình hiển thị nhãn cho bộ lọc
 */
export interface FilterOption {
  key: FilterType;
  label: string;
}

/**
 * Dữ liệu form nhập liệu thêm sinh viên mới
 */
export interface StudentFormData {
  name: string;
  score: string;
  className: string;
}

/**
 * Đối tượng chứa các thông báo lỗi kiểm tra hợp lệ
 */
export type ValidationErrors = Partial<Record<keyof StudentFormData, string>>;

/**
 * Kết quả kiểm tra tính hợp lệ của Form
 */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrors;
}

/**
 * Thông tin xếp loại học lực của sinh viên
 */
export interface StudentRank {
  rank: string;
  isPassed: boolean;
  colorClass: string;
}
