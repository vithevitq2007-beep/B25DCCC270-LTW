import { Student } from '../types/student';

/**
 * Dữ liệu mẫu ban đầu gồm tối thiểu 3 sinh viên
 * Mỗi sinh viên gồm các trường: id, name, score, class
 */
export const initialStudents: Student[] = [
  {
    id: 1,
    name: 'Nguyễn Văn An',
    score: 8.5,
    class: 'CNTT-K18A'
  },
  {
    id: 2,
    name: 'Trần Thị Bình',
    score: 4.2,
    class: 'KTPM-K18B'
  },
  {
    id: 3,
    name: 'Lê Hoàng Cường',
    score: 9.0,
    class: 'CNTT-K18A'
  },
  {
    id: 4,
    name: 'Phạm Minh Đức',
    score: 6.8,
    class: 'HTTT-K18C'
  },
  {
    id: 5,
    name: 'Võ Thị Hồng',
    score: 3.5,
    class: 'KTPM-K18B'
  }
];
