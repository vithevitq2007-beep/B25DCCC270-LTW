import React, { useState } from 'react';
import { Student, StudentFormData, ValidationErrors } from '../../types/student';
import { validateStudentForm } from '../../utils/validation';
import './StudentForm.css';

interface StudentFormProps {
  onAddStudent: (newStudent: Student) => void;
}

/**
 * Component StudentForm
 * Quản lý form nhập liệu và ràng buộc validation khi thêm sinh viên
 * @param props { onAddStudent }
 */
const StudentForm: React.FC<StudentFormProps> = ({ onAddStudent }) => {
  // State quản lý dữ liệu nhập vào của form
  const [formData, setFormData] = useState<StudentFormData>({
    name: '',
    score: '',
    className: ''
  });

  // State quản lý các thông báo lỗi kiểm tra dữ liệu
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Bóc tách các giá trị từ formData
  const { name, score, className } = formData;

  // Xử lý khi người dùng nhập dữ liệu vào ô input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name: fieldName, value } = event.target;

    // Cập nhật giá trị ô input
    setFormData((prevData: StudentFormData) => ({
      ...prevData,
      [fieldName]: value
    }));

    // Tự động xóa lỗi của trường đó khi người dùng bắt đầu sửa
    const errorKey = fieldName as keyof StudentFormData;
    if (errors[errorKey]) {
      setErrors((prevErrors: ValidationErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[errorKey];
        return updatedErrors;
      });
    }
  };

  // Xử lý khi nhấn nút "Thêm"
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    // Ràng buộc dữ liệu qua hàm validate ES6
    const { isValid, errors: validationErrors } = validateStudentForm(formData);

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    // Tạo đối tượng sinh viên mới với ID duy nhất
    const newStudent: Student = {
      id: Date.now(),
      name: name.trim(),
      score: parseFloat(score),
      class: className.trim()
    };

    // Gọi hàm thêm sinh viên từ component cha App
    onAddStudent(newStudent);

    // Reset lại form và lỗi
    setFormData({
      name: '',
      score: '',
      className: ''
    });
    setErrors({});
  };

  return (
    <div className="form-card">
      <div className="form-header">
        <h3 className="form-title">
          <span className="form-icon">➕</span> Thêm Sinh Viên Mới
        </h3>
        <p className="form-subtitle">Điền đầy đủ thông tin để thêm sinh viên vào danh sách</p>
      </div>

      <form className="student-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          {/* 1. Ô nhập Họ và Tên */}
          <div className="form-group">
            <label htmlFor="name-input" className="form-label">
              Họ và Tên <span className="required-star">*</span>
            </label>
            <input
              id="name-input"
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="VD: Nguyễn Văn A"
              className={`form-input ${errors.name ? 'input-error' : ''}`}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          {/* 2. Ô nhập Điểm số */}
          <div className="form-group">
            <label htmlFor="score-input" className="form-label">
              Điểm số (0 - 10) <span className="required-star">*</span>
            </label>
            <input
              id="score-input"
              type="number"
              name="score"
              value={score}
              onChange={handleChange}
              step="0.1"
              min="0"
              max="10"
              placeholder="VD: 8.5"
              className={`form-input ${errors.score ? 'input-error' : ''}`}
            />
            {errors.score && <span className="error-message">{errors.score}</span>}
          </div>

          {/* 3. Ô nhập Lớp */}
          <div className="form-group">
            <label htmlFor="class-input" className="form-label">
              Lớp <span className="required-star">*</span>
            </label>
            <input
              id="class-input"
              type="text"
              name="className"
              value={className}
              onChange={handleChange}
              placeholder="VD: CNTT-K18A"
              className={`form-input ${errors.className ? 'input-error' : ''}`}
            />
            {errors.className && <span className="error-message">{errors.className}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            <span>Thêm sinh viên</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
