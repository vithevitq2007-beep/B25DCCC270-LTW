import React from 'react';
import { Student } from '../../types/student';
import StudentItem from '../StudentItem/StudentItem';
import './StudentTable.css';

interface StudentTableProps {
  students?: Student[];
  onDelete: (id: number) => void;
}

/**
 * Component StudentTable (Component con)
 * Nhận danh sách sinh viên qua Props để hiển thị dạng bảng
 * Sử dụng phương thức .map() của ES6 để render từng dòng dữ liệu
 */
const StudentTable: React.FC<StudentTableProps> = ({ students = [], onDelete }) => {
  // Bóc tách số lượng sinh viên qua destructuring
  const { length: totalCount } = students;

  if (totalCount === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <h3>Không tìm thấy sinh viên nào</h3>
        <p>Danh sách trống hoặc không có sinh viên nào khớp với tiêu chí lọc.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="student-table">
        <thead>
          <tr>
            <th className="th-center">STT</th>
            <th className="th-center">Mã SV</th>
            <th>Họ và Tên</th>
            <th>Lớp</th>
            <th>Điểm số</th>
            <th>Xếp loại</th>
            <th className="th-right">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {/* ES6 .map() lặp qua mảng sinh viên và render từng StudentItem */}
          {students.map((student: Student, index: number) => {
            const { id } = student;
            return (
              <StudentItem
                key={id}
                student={student}
                index={index}
                onDelete={onDelete}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
