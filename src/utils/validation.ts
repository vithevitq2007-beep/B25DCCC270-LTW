import { StudentFormData, ValidationResult, ValidationErrors } from '../types/student';

/**
 * Kiểm tra tính hợp lệ của dữ liệu form nhập sinh viên mới
 * @param formData Đối tượng form gồm name, score, className
 * @returns Kết quả kiểm tra { isValid, errors }
 */
export const validateStudentForm = (formData: StudentFormData): ValidationResult => {
  const { name, score, className } = formData;
  const errors: ValidationErrors = {};

  // 1. Kiểm tra Họ và tên
  if (!name || name.trim() === '') {
    errors.name = 'Vui lòng nhập họ và tên sinh viên.';
  } else if (name.trim().length < 2) {
    errors.name = 'Họ và tên phải có tối thiểu 2 ký tự.';
  }

  // 2. Kiểm tra Điểm số
  if (score === '' || score === null || score === undefined) {
    errors.score = 'Vui lòng nhập điểm số của sinh viên.';
  } else {
    const numericScore: number = Number(score);
    if (Number.isNaN(numericScore)) {
      errors.score = 'Điểm số phải là một số hợp lệ.';
    } else if (numericScore < 0 || numericScore > 10) {
      errors.score = `Điểm số (${numericScore}) không hợp lệ! Điểm phải từ 0 đến 10.`;
    }
  }

  // 3. Kiểm tra Lớp học
  if (!className || className.trim() === '') {
    errors.className = 'Vui lòng nhập tên lớp học.';
  }

  const isValid: boolean = Object.keys(errors).length === 0;

  return {
    isValid,
    errors
  };
};
