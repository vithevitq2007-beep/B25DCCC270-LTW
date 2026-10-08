import React, { useState } from 'react';
import { Student, FilterType } from './types/student';
import { initialStudents } from './data/initialStudents';
import { FILTER_TYPES } from './constants/filterTypes';
import { filterStudents } from './utils/calculations';
import StudentStats from './components/StudentStats/StudentStats';
import StudentForm from './components/StudentForm/StudentForm';
import StudentFilter from './components/StudentFilter/StudentFilter';
import StudentTable from './components/StudentTable/StudentTable';
import './App.css';

/**
 * Component App (Component cha)
 * Quản lý toàn bộ State chính của ứng dụng:
 * 1. Danh sách sinh viên (students)
 * 2. Trạng thái bộ lọc hiện tại (currentFilter)
 */
const App: React.FC = () => {
  // State 1: Danh sách sinh viên, khởi tạo từ initialStudents
  const [students, setStudents] = useState<Student[]>(initialStudents);

  // State 2: Bộ lọc hiện tại (mặc định là ALL)
  const [currentFilter, setCurrentFilter] = useState<FilterType>('ALL');

  /**
   * Tính năng 2: Thêm sinh viên mới vào danh sách
   * Sử dụng toán tử spread [...] để giữ nguyên dữ liệu cũ
   */
  const handleAddStudent = (newStudent: Student): void => {
    setStudents((prevStudents: Student[]) => [newStudent, ...prevStudents]);
  };

  /**
   * Tính năng 3: Xóa sinh viên khỏi danh sách
   * Sử dụng phương thức .filter() của ES6 để loại bỏ sinh viên theo id
   */
  const handleDeleteStudent = (idToDelete: number): void => {
    setStudents((prevStudents: Student[]) =>
      prevStudents.filter((student: Student) => {
        const { id } = student;
        return id !== idToDelete;
      })
    );
  };

  /**
   * Tính năng 4: Xử lý thay đổi bộ lọc
   */
  const handleFilterChange = (newFilter: FilterType): void => {
    setCurrentFilter(newFilter);
  };

  // Tính số lượng sinh viên cho từng loại bộ lọc bằng ES6 .filter()
  const filterCounts: Record<FilterType, number> = {
    [FILTER_TYPES.ALL]: students.length,
    [FILTER_TYPES.EXCELLENT]: students.filter(({ score }: Student) => Number(score) >= 8.0).length,
    [FILTER_TYPES.FAILED]: students.filter(({ score }: Student) => Number(score) < 5.0).length
  };

  // Lấy danh sách sinh viên sau khi lọc để truyền xuống StudentTable
  const displayedStudents: Student[] = filterStudents(students, currentFilter);

  return (
    <div className="app-container">
      {/* Header chính của trang web */}
      <header className="app-header">
        <h1 className="app-title"> Quản Lý Điểm Sinh Viên</h1>
        <p className="app-subtitle">
          
        </p>
      </header>

      {/* 1. Khu vực Thống kê cơ bản (Tổng số lượng SV, Điểm trung bình qua .reduce()) */}
      <section className="section-stats" aria-label="Thống kê sinh viên">
        <StudentStats students={students} />
      </section>

      {/* 2. Khu vực Form nhập liệu thêm sinh viên mới */}
      <section className="section-form" aria-label="Thêm sinh viên mới">
        <StudentForm onAddStudent={handleAddStudent} />
      </section>

      {/* 3. Khu vực Bộ lọc và Bảng hiển thị danh sách sinh viên */}
      <section className="section-list" aria-label="Danh sách sinh viên">
        <div className="list-card">
          <div className="list-card-header">
            <div>
              <h2 className="list-title">Danh Sách Sinh Viên</h2>
              <p className="list-subtitle">
                
              </p>
            </div>
          </div>

          {/* Bộ lọc Filter */}
          <StudentFilter
            currentFilter={currentFilter}
            onFilterChange={handleFilterChange}
            counts={filterCounts}
          />

          {/* Bảng danh sách sinh viên (Component con) */}
          <StudentTable
            students={displayedStudents}
            onDelete={handleDeleteStudent}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="app-footer">
        
      </footer>
    </div>
  );
};

export default App;
