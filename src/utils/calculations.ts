import { Student, FilterType, StudentRank } from '../types/student';
import { FILTER_TYPES } from '../constants/filterTypes';

/**
 * Tính điểm trung bình của toàn bộ danh sách sinh viên
 * Sử dụng phương thức .reduce() theo chuẩn ES6 & TypeScript
 * @param students Danh sách sinh viên
 * @returns Điểm trung bình (làm tròn 2 chữ số thập phân)
 */
export const calculateAverageScore = (students: Student[] = []): number => {
  if (!students || students.length === 0) {
    return 0;
  }

  // Sử dụng reduce để tính tổng điểm của sinh viên
  const totalScore: number = students.reduce((accumulator: number, currentStudent: Student) => {
    const { score } = currentStudent;
    return accumulator + Number(score);
  }, 0);

  const average: number = totalScore / students.length;
  return Number(average.toFixed(2));
};

/**
 * Xếp loại học lực dựa trên điểm số
 * Sử dụng Template Literals và Destructuring
 * @param score Điểm số
 * @returns Thông tin xếp loại
 */
export const getStudentRank = (score: number): StudentRank => {
  const numericScore: number = Number(score);

  if (numericScore >= 8.0) {
    return {
      rank: 'Giỏi',
      isPassed: true,
      colorClass: 'rank-excellent'
    };
  }

  if (numericScore >= 6.5) {
    return {
      rank: 'Khá',
      isPassed: true,
      colorClass: 'rank-good'
    };
  }

  if (numericScore >= 5.0) {
    return {
      rank: 'Trung bình',
      isPassed: true,
      colorClass: 'rank-average'
    };
  }

  return {
    rank: 'Trượt môn',
    isPassed: false,
    colorClass: 'rank-failed'
  };
};

/**
 * Lọc danh sách sinh viên theo bộ lọc hiện tại
 * Sử dụng phương thức .filter() theo chuẩn ES6
 * @param students Danh sách sinh viên gốc
 * @param filter Loại bộ lọc (ALL, EXCELLENT, FAILED)
 * @returns Danh sách sinh viên sau khi lọc
 */
export const filterStudents = (
  students: Student[] = [],
  filter: FilterType = 'ALL'
): Student[] => {
  switch (filter) {
    case FILTER_TYPES.EXCELLENT:
      // Lọc sinh viên Giỏi (Điểm >= 8)
      return students.filter((student: Student) => {
        const { score } = student;
        return Number(score) >= 8.0;
      });

    case FILTER_TYPES.FAILED:
      // Lọc sinh viên trượt môn (Điểm < 5)
      return students.filter((student: Student) => {
        const { score } = student;
        return Number(score) < 5.0;
      });

    case FILTER_TYPES.ALL:
    default:
      return students;
  }
};
