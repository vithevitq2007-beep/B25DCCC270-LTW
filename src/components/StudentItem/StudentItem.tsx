import React from 'react';
import { Student } from '../../types/student';
import { getStudentRank } from '../../utils/calculations';
import './StudentItem.css';

interface StudentItemProps {
  student: Student;
  index: number;
  onDelete: (id: number) => void;
}

/**
 * Component StudentItem (Component cháu/con)
 * Hiển thị chi tiết từng dòng dữ liệu của một sinh viên
 * Nhận props: student, index, onDelete
 */
const StudentItem: React.FC<StudentItemProps> = ({ student, index, onDelete }) => {
  // Destructuring props và dữ liệu sinh viên theo chuẩn ES6
  const { id, name, score, class: className } = student;

  // Lấy thông tin xếp loại
  const { rank, colorClass } = getStudentRank(score);

  // Xử lý sự kiện click xóa sinh viên
  const handleRemove = (): void => {
    // Template Literal hiển thị câu xác nhận
    const confirmMessage = `Bạn có chắc chắn muốn xóa sinh viên "${name}" (Lớp ${className}) không?`;
    if (window.confirm(confirmMessage)) {
      onDelete(id);
    }
  };

  return (
    <tr className="student-row">
      <td className="col-index">{index + 1}</td>
      <td className="col-id">
        <span className="id-badge">#{id}</span>
      </td>
      <td className="col-name">
        <div className="student-info">
          <div className="student-avatar">{name.charAt(0).toUpperCase()}</div>
          <span className="student-name-text">{name}</span>
        </div>
      </td>
      <td className="col-class">
        <span className="class-badge">{`Lớp ${className}`}</span>
      </td>
      <td className="col-score">
        <span className="score-value">{Number(score).toFixed(1)}</span>
      </td>
      <td className="col-rank">
        <span className={`rank-badge ${colorClass}`}>{rank}</span>
      </td>
      <td className="col-action">
        <button
          type="button"
          className="btn-delete"
          onClick={handleRemove}
          title={`Xóa sinh viên ${name}`}
        >
          <svg
            className="delete-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
          <span>Xóa</span>
        </button>
      </td>
    </tr>
  );
};

export default StudentItem;
