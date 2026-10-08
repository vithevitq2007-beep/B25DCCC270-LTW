import React from 'react';
import { Student } from '../../types/student';
import { calculateAverageScore } from '../../utils/calculations';
import './StudentStats.css';

interface StudentStatsProps {
  students?: Student[];
}

/**
 * Component StudentStats
 * Hiển thị các chỉ số thống kê cơ bản: Tổng số sinh viên, Điểm trung bình toàn lớp
 * @param props { students }
 */
const StudentStats: React.FC<StudentStatsProps> = ({ students = [] }) => {
  // Bóc tách tổng số lượng sinh viên
  const totalStudents: number = students.length;

  // Tính điểm trung bình bằng phương thức .reduce() qua hàm calculateAverageScore
  const averageScore: number = calculateAverageScore(students);

  // Thống kê số lượng sinh viên Giỏi (>= 8) và Trượt môn (< 5) bằng .filter()
  const excellentCount: number = students.filter(({ score }: Student) => Number(score) >= 8.0).length;
  const failedCount: number = students.filter(({ score }: Student) => Number(score) < 5.0).length;

  return (
    <div className="stats-container">
      {/* 1. Thẻ Tổng số sinh viên */}
      <div className="stat-card stat-total">
        <div className="stat-icon-wrapper">
          <span className="stat-icon">👥</span>
        </div>
        <div className="stat-content">
          <span className="stat-label">Tổng số sinh viên</span>
          <span className="stat-value">{totalStudents}</span>
          <span className="stat-subtext">
            {`Toàn bộ ${totalStudents} sinh viên`}
          </span>
        </div>
      </div>

      {/* 2. Thẻ Điểm trung bình toàn lớp */}
      <div className="stat-card stat-average">
        <div className="stat-icon-wrapper">
          <span className="stat-icon">📊</span>
        </div>
        <div className="stat-content">
          <span className="stat-label">Điểm trung bình</span>
          <span className="stat-value">{averageScore.toFixed(2)}</span>
          <span className="stat-subtext">
            {totalStudents > 0 ? `Tính trên thang điểm 10` : 'Chưa có dữ liệu'}
          </span>
        </div>
      </div>

      {/* 3. Thẻ Sinh viên Giỏi */}
      <div className="stat-card stat-excellent">
        <div className="stat-icon-wrapper">
          <span className="stat-icon">⭐</span>
        </div>
        <div className="stat-content">
          <span className="stat-label">Sinh viên Giỏi (≥ 8)</span>
          <span className="stat-value">{excellentCount}</span>
          <span className="stat-subtext">
            {totalStudents > 0
              ? `${((excellentCount / totalStudents) * 100).toFixed(0)}% tổng số sinh viên`
              : '0%'}
          </span>
        </div>
      </div>

      {/* 4. Thẻ Sinh viên Trượt môn */}
      <div className="stat-card stat-failed">
        <div className="stat-icon-wrapper">
          <span className="stat-icon">⚠️</span>
        </div>
        <div className="stat-content">
          <span className="stat-label">Sinh viên Trượt (&lt; 5)</span>
          <span className="stat-value">{failedCount}</span>
          <span className="stat-subtext">
            {totalStudents > 0
              ? `${((failedCount / totalStudents) * 100).toFixed(0)}% cần học lại`
              : '0%'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudentStats;
