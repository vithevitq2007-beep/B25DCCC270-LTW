# 📘 TÀI LIỆU HƯỚNG DẪN CHI TIẾT TỪNG ĐOẠN CODE, TỪNG HÀM VÀ FUNCTION
## Dự Án: Quản Lý Điểm Sinh Viên (React 19 + TypeScript + Vite)

Tài liệu này giải thích chi tiết **100% các file, từng dòng code, từng interface, từng function** theo chuẩn ES6 và TypeScript trong dự án. Tài liệu được biên soạn để bạn nắm vững bản chất, tự tin giải trình khi bảo vệ đồ án hoặc đi thi.

---

# MỤC LỤC
1. [Khái quát kiến trúc dự án](#1-khái-quát-kiến-trúc-dự-án)
2. [Chi tiết thư mục `src/types/student.ts`](#2-chi-tiết-thư-mục-srctypesstudentts)
3. [Chi tiết thư mục `src/constants/filterTypes.ts`](#3-chi-tiết-thư-mục-srcconstantsfiltertypests)
4. [Chi tiết thư mục `src/data/initialStudents.ts`](#4-chi-tiết-thư-mục-srcdatainitialstudentsts)
5. [Chi tiết thư mục `src/utils/` (Logic & Thuật toán ES6)](#5-chi-tiết-thư-mục-srcutils-logic--thuật-toán-es6)
   - [5.1 `calculations.ts` (Tính toán .reduce(), xếp loại, lọc .filter())](#51-calculationsts)
   - [5.2 `validation.ts` (Ràng buộc dữ liệu Form)](#52-validationts)
6. [Chi tiết các Component trong `src/components/`](#6-chi-tiết-các-component-trong-srccomponents)
   - [6.1 `StudentItem/StudentItem.tsx` (Component cháu - Từng dòng SV & Nút Xóa)](#61-studentitemstudentitemtsx)
   - [6.2 `StudentTable/StudentTable.tsx` (Component con - Bảng hiển thị danh sách .map())](#62-studenttablestudenttabletsx)
   - [6.3 `StudentForm/StudentForm.tsx` (Form thêm mới sinh viên)](#63-studentformstudentformtsx)
   - [6.4 `StudentFilter/StudentFilter.tsx` (Bộ lọc danh sách)](#64-studentfilterstudentfiltertsx)
   - [6.5 `StudentStats/StudentStats.tsx` (Thống kê tổng SV và điểm TB)](#65-studentstatsstudentstatstsx)
7. [Chi tiết Component cha `src/App.tsx`](#7-chi-tiết-component-cha-srcapptsx)
8. [Chi tiết file khởi chạy `src/main.tsx`](#8-chi-tiết-file-khởi-chạy-srcmaintsx)
9. [Bảng đối chiếu 5 yêu cầu ES6 bắt buộc](#9-bảng-đối-chiếu-5-yêu-cầu-es6-bắt-buộc)

---

## 1. Khái Quát Kiến Trúc Dự Án

Dự án áp dụng kiến trúc **Module hóa theo chức năng (Feature-based & Layered Architecture)**:
- **`types/`**: Nơi duy nhất định nghĩa khuôn mẫu dữ liệu (Data models & Contracts) cho TypeScript.
- **`constants/`**: Chứa các giá trị cố định, tránh "magic string" (chuỗi viết cứng dễ sai chính tả).
- **`data/`**: Chứa mock data ban đầu.
- **`utils/`**: Tách biệt hoàn toàn phần xử lý logic tính toán và kiểm tra dữ liệu ra khỏi UI (Pure functions - dễ test và tái sử dụng).
- **`components/`**: Mỗi component nằm trong một thư mục riêng biệt kèm file CSS của chính nó, giúp việc tìm kiếm và sửa đổi giao diện cực kỳ nhanh chóng.

---

## 2. Chi Tiết Thư Mục `src/types/student.ts`

File này chứa toàn bộ các định nghĩa TypeScript Interfaces và Types của dự án.

```typescript
export interface Student {
  id: number;
  name: string;
  score: number;
  class: string;
}
```
- **Ý nghĩa**: Định nghĩa kiểu dữ liệu cho một đối tượng sinh viên gồm đúng 4 trường theo yêu cầu đề bài:
  - `id`: Mã định danh duy nhất (kiểu `number`).
  - `name`: Họ và tên sinh viên (kiểu `string`).
  - `score`: Điểm số của sinh viên (kiểu `number`).
  - `class`: Tên lớp học (kiểu `string`).

```typescript
export type FilterType = 'ALL' | 'EXCELLENT' | 'FAILED';
```
- **Ý nghĩa**: Định nghĩa kiểu `Union Type` cho bộ lọc. Chỉ cho phép 1 trong 3 giá trị: `'ALL'` (Tất cả), `'EXCELLENT'` (Sinh viên giỏi), `'FAILED'` (Trượt môn). Nếu truyền chuỗi khác, TypeScript sẽ báo lỗi ngay khi gõ code.

```typescript
export interface FilterOption {
  key: FilterType;
  label: string;
}
```
- **Ý nghĩa**: Kiểu dữ liệu để hiển thị từng nút trong bộ lọc (`key` là mã lọc, `label` là tên tiếng Việt hiển thị trên nút).

```typescript
export interface StudentFormData {
  name: string;
  score: string;
  className: string;
}
```
- **Ý nghĩa**: Kiểu dữ liệu của State trong Form nhập liệu. Lưu ý `score` ở đây là `string` vì trong ô `<input type="number">`, giá trị nhận từ `event.target.value` luôn là chuỗi ký tự trước khi được chuyển thành số.

```typescript
export type ValidationErrors = Partial<Record<keyof StudentFormData, string>>;
```
- **Ý nghĩa**: Định nghĩa danh sách lỗi của form. `keyof StudentFormData` đại diện cho các trường `'name' | 'score' | 'className'`. `Partial` nghĩa là các trường lỗi này có thể có hoặc không.

```typescript
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationErrors;
}
```
- **Ý nghĩa**: Kết quả trả về của hàm kiểm tra form: `isValid` là boolean cho biết form có hợp lệ hay không, và `errors` chứa các câu thông báo lỗi cụ thể.

```typescript
export interface StudentRank {
  rank: string;
  isPassed: boolean;
  colorClass: string;
}
```
- **Ý nghĩa**: Kết quả xếp loại của sinh viên (`rank` ví dụ "Giỏi", `isPassed` đánh dấu đỗ/trượt, `colorClass` là tên class CSS để đổi màu badge).

---

## 3. Chi Tiết Thư Mục `src/constants/filterTypes.ts`

```typescript
export const FILTER_TYPES = {
  ALL: 'ALL',
  EXCELLENT: 'EXCELLENT',
  FAILED: 'FAILED'
} as const;
```
- **Ý nghĩa**: Định nghĩa các hằng số bộ lọc. Cú pháp `as const` của TypeScript biến các giá trị thành giá trị cố định (read-only literal types) `'ALL'`, `'EXCELLENT'`, `'FAILED'` thay vì kiểu `string` chung chung.

```typescript
export const FILTER_LABELS: FilterOption[] = [
  { key: 'ALL', label: 'Tất cả sinh viên' },
  { key: 'EXCELLENT', label: 'Sinh viên Giỏi (Điểm ≥ 8)' },
  { key: 'FAILED', label: 'Sinh viên trượt môn (Điểm < 5)' }
];
```
- **Ý nghĩa**: Mảng chứa danh sách 3 nút lọc hiển thị trên giao diện, tuân thủ đúng yêu cầu đề bài: Lọc Giỏi (>= 8) và Lọc trượt (< 5).

---

## 4. Chi Tiết Thư Mục `src/data/initialStudents.ts`

```typescript
export const initialStudents: Student[] = [
  { id: 1, name: 'Nguyễn Văn An', score: 8.5, class: 'CNTT-K18A' },
  { id: 2, name: 'Trần Thị Bình', score: 4.2, class: 'KTPM-K18B' },
  { id: 3, name: 'Lê Hoàng Cường', score: 9.0, class: 'CNTT-K18A' },
  { id: 4, name: 'Phạm Minh Đức', score: 6.8, class: 'HTTT-K18C' },
  { id: 5, name: 'Võ Thị Hồng', score: 3.5, class: 'KTPM-K18B' }
];
```
- **Ý nghĩa**: Đề bài yêu cầu có sẵn mảng dữ liệu mẫu tối thiểu 3 sinh viên với các trường `id, name, score, class`. Ở đây khởi tạo sẵn 5 sinh viên với đầy đủ các mức điểm (Giỏi, Khá, Trượt) để khi vừa mở trang web lên, bộ lọc và thống kê đã có dữ liệu thực tế để kiểm tra ngay.

---

## 5. Chi Tiết Thư Mục `src/utils/` (Logic & Thuật Toán ES6)

### 5.1 `calculations.ts`

File này chứa toàn bộ logic xử lý tính toán số liệu và lọc danh sách.

#### Hàm 1: `calculateAverageScore` (Tính điểm trung bình toàn lớp)
```typescript
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
```
- **Cơ chế hoạt động**:
  1. Kiểm tra nếu mảng rỗng thì trả về `0` tránh lỗi chia cho 0 (`NaN`).
  2. **Áp dụng ES6 `.reduce()` bắt buộc**:
     - `accumulator`: Biến tích lũy tổng điểm ban đầu bằng `0`.
     - `currentStudent`: Phần tử sinh viên hiện tại trong vòng lặp.
     - `const { score } = currentStudent;`: Bóc tách thuộc tính `score` bằng Destructuring.
     - `return accumulator + Number(score);`: Cộng dồn điểm số vào biến tích lũy.
  3. Lấy `totalScore` chia cho `students.length` để được điểm trung bình.
  4. Dùng `.toFixed(2)` để làm tròn 2 chữ số thập phân và bọc `Number(...)` để trả về kiểu số.

#### Hàm 2: `getStudentRank` (Xếp loại học lực)
```typescript
export const getStudentRank = (score: number): StudentRank => {
  const numericScore: number = Number(score);

  if (numericScore >= 8.0) {
    return { rank: 'Giỏi', isPassed: true, colorClass: 'rank-excellent' };
  }
  if (numericScore >= 6.5) {
    return { rank: 'Khá', isPassed: true, colorClass: 'rank-good' };
  }
  if (numericScore >= 5.0) {
    return { rank: 'Trung bình', isPassed: true, colorClass: 'rank-average' };
  }
  return { rank: 'Trượt môn', isPassed: false, colorClass: 'rank-failed' };
};
```
- **Cơ chế hoạt động**:
  - Điểm >= 8.0: Xếp loại **Giỏi** (badge màu xanh lá).
  - Điểm 6.5 - 7.9: Xếp loại **Khá** (badge màu xanh dương).
  - Điểm 5.0 - 6.4: Xếp loại **Trung bình** (badge màu vàng).
  - Điểm < 5.0: Xếp loại **Trượt môn** (badge màu đỏ).

#### Hàm 3: `filterStudents` (Lọc danh sách sinh viên)
```typescript
export const filterStudents = (
  students: Student[] = [],
  filter: FilterType = 'ALL'
): Student[] => {
  switch (filter) {
    case FILTER_TYPES.EXCELLENT:
      return students.filter((student: Student) => {
        const { score } = student;
        return Number(score) >= 8.0;
      });

    case FILTER_TYPES.FAILED:
      return students.filter((student: Student) => {
        const { score } = student;
        return Number(score) < 5.0;
      });

    case FILTER_TYPES.ALL:
    default:
      return students;
  }
};
```
- **Cơ chế hoạt động**:
  - **Áp dụng ES6 `.filter()` bắt buộc**:
    - Khi chọn `EXCELLENT`: Giữ lại các sinh viên có `score >= 8.0`.
    - Khi chọn `FAILED`: Giữ lại các sinh viên có `score < 5.0`.
    - Khi chọn `ALL`: Trả về nguyên vẹn danh sách sinh viên ban đầu.

---

### 5.2 `validation.ts`

File này chứa hàm kiểm tra dữ liệu đầu vào khi thêm sinh viên mới.

```typescript
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
      // Dùng Template Literal ES6 để nối chuỗi báo lỗi
      errors.score = `Điểm số (${numericScore}) không hợp lệ! Điểm phải từ 0 đến 10.`;
    }
  }

  // 3. Kiểm tra Lớp học
  if (!className || className.trim() === '') {
    errors.className = 'Vui lòng nhập tên lớp học.';
  }

  const isValid: boolean = Object.keys(errors).length === 0;

  return { isValid, errors };
};
```
- **Cơ chế hoạt động**:
  1. `const { name, score, className } = formData;`: Destructuring để lấy 3 giá trị cần kiểm tra.
  2. Khởi tạo đối tượng `errors` rỗng.
  3. Kiểm tra:
     - Nếu `name` rỗng hoặc chỉ toàn khoảng trắng -> gán thông báo lỗi cho `errors.name`.
     - Nếu `score` rỗng -> gán thông báo lỗi cho `errors.score`.
     - Nếu `score` không phải là số hoặc nhỏ hơn 0 hoặc lớn hơn 10 -> gán thông báo lỗi cho `errors.score` (sử dụng **Template Literal** `` `Điểm số (${numericScore}) không hợp lệ!` ``).
     - Nếu `className` rỗng -> gán thông báo lỗi cho `errors.className`.
  4. Đếm số lượng thuộc tính trong `errors` bằng `Object.keys(errors).length === 0`. Nếu bằng 0 tức là không có lỗi (`isValid = true`).

---

## 6. Chi Tiết Các Component Trong `src/components/`

### 6.1 `StudentItem/StudentItem.tsx` (Component Cháu/Con)
Yêu cầu đề bài: *Hiển thị chi tiết từng dòng dữ liệu của một sinh viên, có nút "Xóa".*

```typescript
interface StudentItemProps {
  student: Student;
  index: number;
  onDelete: (id: number) => void;
}
```
- **Ý nghĩa**: Định nghĩa các Props mà `StudentItem` nhận từ `StudentTable`:
  - `student`: Đối tượng sinh viên cần hiển thị.
  - `index`: Số thứ tự của dòng (0, 1, 2...).
  - `onDelete`: Hàm callback để gọi khi người dùng bấm nút xóa.

```typescript
const StudentItem: React.FC<StudentItemProps> = ({ student, index, onDelete }) => {
  // Destructuring bóc tách thông tin sinh viên
  const { id, name, score, class: className } = student;

  // Gọi hàm xếp loại học lực
  const { rank, colorClass } = getStudentRank(score);

  // Xử lý sự kiện click xóa sinh viên
  const handleRemove = (): void => {
    // Dùng Template Literal để hiển thị tên và lớp trong thông báo xác nhận
    const confirmMessage = `Bạn có chắc chắn muốn xóa sinh viên "${name}" (Lớp ${className}) không?`;
    if (window.confirm(confirmMessage)) {
      onDelete(id); // Kích hoạt callback xóa truyền từ cha xuống
    }
  };
```
- **Giải thích đoạn code**:
  - `const { class: className } = student;`: Đổi tên biến `class` thành `className` vì `class` là từ khóa dự lưu trong JavaScript.
  - `handleRemove`: Hàm mũi tên (Arrow Function) gọi `window.confirm(confirmMessage)`. Khi người dùng chọn "OK", hàm `onDelete(id)` được thực thi với `id` của sinh viên đó.
- **Phần JSX hiển thị**:
  - `index + 1`: Số thứ tự bắt đầu từ 1.
  - `#{id}`: Mã sinh viên.
  - `{name.charAt(0).toUpperCase()}`: Lấy chữ cái đầu tiên của tên làm Avatar tròn màu sắc.
  - `{`Lớp ${className}`}`: Template literal hiển thị lớp học.
  - `Number(score).toFixed(1)`: Hiển thị điểm số với 1 số thập phân.
  - `<span className={`rank-badge ${colorClass}`}>{rank}</span>`: Huy hiệu xếp loại tương ứng.
  - Nút `<button onClick={handleRemove}>`: Nút Xóa kèm icon SVG thùng rác.

---

### 6.2 `StudentTable/StudentTable.tsx` (Component Con)
Yêu cầu đề bài: *StudentList hoặc StudentTable: Nhận danh sách qua Props để hiển thị.*

```typescript
interface StudentTableProps {
  students?: Student[];
  onDelete: (id: number) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({ students = [], onDelete }) => {
  // Bóc tách tổng số lượng sinh viên bằng Destructuring
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
```
- **Ý nghĩa**:
  - Nếu `students` rỗng (`totalCount === 0`), hiển thị giao diện thông báo trống trực quan ("Không tìm thấy sinh viên nào").
  - Nếu có dữ liệu, hiển thị thẻ `<table>`.

```typescript
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
```
- **Giải thích đoạn code**:
  - **Áp dụng ES6 `.map()` bắt buộc**: Duyệt qua từng `student` trong mảng và trả về một phần tử `<StudentItem />`.
  - `key={id}`: Thuộc tính duy nhất bắt buộc trong React để quản lý việc cập nhật DOM hiệu quả.
  - Truyền `onDelete={onDelete}` xuống cho component cháu `StudentItem`.

---

### 6.3 `StudentForm/StudentForm.tsx` (Chức Năng: Thêm Sinh Viên Mới)
Yêu cầu đề bài: *Có một Form nhập liệu gồm Họ tên, Điểm số, Lớp. Nhấn nút "Thêm" cập nhật ngay lập tức. Ràng buộc dữ liệu nếu để trống hoặc điểm < 0 hoặc > 10 thì báo lỗi.*

```typescript
interface StudentFormProps {
  onAddStudent: (newStudent: Student) => void;
}
```
- **State quản lý**:
```typescript
const [formData, setFormData] = useState<StudentFormData>({
  name: '',
  score: '',
  className: ''
});

const [errors, setErrors] = useState<ValidationErrors>({});
```
  - `formData`: Lưu trữ giá trị người dùng đang nhập ở 3 ô: `name`, `score`, `className`.
  - `errors`: Lưu trữ các thông báo lỗi nếu dữ liệu không hợp lệ.

```typescript
const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
  const { name: fieldName, value } = event.target;

  // Cập nhật giá trị ô input bằng Computed Property Name
  setFormData((prevData: StudentFormData) => ({
    ...prevData,
    [fieldName]: value
  }));

  // Tự động xóa thông báo lỗi khi người dùng bắt đầu sửa
  const errorKey = fieldName as keyof StudentFormData;
  if (errors[errorKey]) {
    setErrors((prevErrors: ValidationErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[errorKey];
      return updatedErrors;
    });
  }
};
```
- **Ý nghĩa**:
  - `handleChange`: Hàm dùng chung cho cả 3 ô input nhờ vào thuộc tính `name` của thẻ input (`name="name"`, `name="score"`, `name="className"`).
  - Sử dụng toán tử spread `...prevData` và dynamic key `[fieldName]: value` để cập nhật duy nhất ô đang gõ mà giữ nguyên 2 ô còn lại.
  - Khi người dùng bắt đầu gõ vào ô bị lỗi, lỗi của ô đó lập tức biến mất để giao diện thân thiện với người dùng.

```typescript
const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
  event.preventDefault(); // Ngăn trình duyệt tự reload lại trang

  // Kiểm tra tính hợp lệ dữ liệu
  const { isValid, errors: validationErrors } = validateStudentForm(formData);

  if (!isValid) {
    setErrors(validationErrors); // Hiển thị thông báo lỗi nếu có lỗi
    return; // Dừng lại, không cho thêm
  }

  // Tạo đối tượng sinh viên mới
  const newStudent: Student = {
    id: Date.now(), // Tạo ID độc nhất dựa trên timestamp hiện tại
    name: name.trim(),
    score: parseFloat(score), // Chuyển chuỗi điểm thành số thực
    class: className.trim()
  };

  // Gọi hàm onAddStudent từ App.tsx truyền xuống
  onAddStudent(newStudent);

  // Reset form về trạng thái trống
  setFormData({ name: '', score: '', className: '' });
  setErrors({});
};
```
- **Ý nghĩa**:
  - `event.preventDefault()`: Ngăn chặn reload trang mặc định của form HTML.
  - `validateStudentForm(formData)`: Kiểm tra ràng buộc. Nếu `!isValid`, set errors để giao diện hiện lỗi màu đỏ và `return` dừng lại.
  - `id: Date.now()`: Sinh ID số duy nhất mà không bị trùng lặp.
  - `onAddStudent(newStudent)`: Bắn dữ liệu sinh viên mới lên component cha `App`.

---

### 6.4 `StudentFilter/StudentFilter.tsx` (Chức Năng: Bộ Lọc Danh Sách)
Yêu cầu đề bài: *Có nút hoặc bộ lọc để hiển thị riêng danh sách sinh viên đạt loại Giỏi (Điểm >= 8) hoặc sinh viên trượt môn (Điểm < 5).*

```typescript
interface StudentFilterProps {
  currentFilter: FilterType;
  onFilterChange: (newFilter: FilterType) => void;
  counts?: Partial<Record<FilterType, number>>;
}
```
- **Cơ chế hoạt động**:
```typescript
{FILTER_LABELS.map((filterItem: FilterOption) => {
  const { key, label } = filterItem;
  const isActive: boolean = currentFilter === key;
  const count: number = counts[key] ?? 0;

  return (
    <button
      key={key}
      type="button"
      className={`filter-btn ${isActive ? 'filter-btn-active' : ''}`}
      onClick={() => onFilterChange(key)}
    >
      <span>{label}</span>
      <span className={`filter-count-badge ${isActive ? 'badge-active' : ''}`}>
        {count}
      </span>
    </button>
  );
})}
```
  - Dùng `.map()` duyệt qua danh sách các bộ lọc: "Tất cả sinh viên", "Sinh viên Giỏi (Điểm ≥ 8)", "Sinh viên trượt môn (Điểm < 5)".
  - `isActive = currentFilter === key`: Nút đang được chọn sẽ nhận class `filter-btn-active` để đổi màu nền sang màu tím nổi bật.
  - `count`: Hiển thị số lượng sinh viên tương ứng với từng bộ lọc ngay bên cạnh nhãn (ví dụ: Tất cả: 5, Giỏi: 2, Trượt: 2).

---

### 6.5 `StudentStats/StudentStats.tsx` (Chức Năng: Thống Kê Cơ Bản)
Yêu cầu đề bài: *Hiển thị tổng số lượng sinh viên và điểm trung bình của toàn lớp.*

```typescript
const StudentStats: React.FC<StudentStatsProps> = ({ students = [] }) => {
  // 1. Tổng số lượng sinh viên
  const totalStudents: number = students.length;

  // 2. Điểm trung bình toàn lớp tính bằng .reduce()
  const averageScore: number = calculateAverageScore(students);

  // 3. Số lượng sinh viên Giỏi (Điểm >= 8) bằng .filter()
  const excellentCount: number = students.filter(({ score }: Student) => Number(score) >= 8.0).length;

  // 4. Số lượng sinh viên Trượt (Điểm < 5) bằng .filter()
  const failedCount: number = students.filter(({ score }: Student) => Number(score) < 5.0).length;
```
- **Ý nghĩa**:
  - Tính toán tự động phản ứng theo danh sách `students`. Bất cứ khi nào thêm hoặc xóa sinh viên, thống kê lập tức cập nhật lại theo thời gian thực.
  - Hiển thị 4 thẻ thông số (Stats Card) với màu sắc và icon sinh động:
    1. **Tổng số sinh viên**: `totalStudents`.
    2. **Điểm trung bình**: `averageScore.toFixed(2)` (tính toán bằng `.reduce()`).
    3. **Sinh viên Giỏi (≥ 8)**: Số lượng và tỷ lệ % sinh viên giỏi.
    4. **Sinh viên Trượt (< 5)**: Số lượng và tỷ lệ % sinh viên cần thi lại.

---

## 7. Chi Tiết Component Cha `src/App.tsx`
Yêu cầu đề bài: *App (Component cha): Quản lý state chính của ứng dụng (dữ liệu danh sách sinh viên, bộ lọc).*

```typescript
const App: React.FC = () => {
  // State 1: Danh sách sinh viên, khởi tạo từ initialStudents
  const [students, setStudents] = useState<Student[]>(initialStudents);

  // State 2: Bộ lọc hiện tại (mặc định là ALL)
  const [currentFilter, setCurrentFilter] = useState<FilterType>('ALL');
```
- **Ý nghĩa 2 State chính**:
  - `students`: Mảng chứa toàn bộ dữ liệu sinh viên. Khi thêm hoặc xóa, state này thay đổi.
  - `currentFilter`: Lưu tiêu chí lọc đang được chọn (`'ALL' | 'EXCELLENT' | 'FAILED'`).

```typescript
  // Tính năng 2: Thêm sinh viên mới (sử dụng toán tử spread ...)
  const handleAddStudent = (newStudent: Student): void => {
    setStudents((prevStudents: Student[]) => [newStudent, ...prevStudents]);
  };
```
- **Ý nghĩa**: Dùng `[newStudent, ...prevStudents]` để đưa sinh viên mới lên đầu danh sách và bảo toàn toàn bộ danh sách cũ không bị mất đi (đúng yêu cầu đề bài: *"cập nhật danh sách hiển thị ngay lập tức, không được làm mất dữ liệu cũ"*).

```typescript
  // Tính năng 3: Xóa sinh viên (sử dụng .filter())
  const handleDeleteStudent = (idToDelete: number): void => {
    setStudents((prevStudents: Student[]) =>
      prevStudents.filter((student: Student) => {
        const { id } = student;
        return id !== idToDelete;
      })
    );
  };
```
- **Ý nghĩa**: Lọc giữ lại tất cả sinh viên có `id` khác với `idToDelete`. Sinh viên có `id === idToDelete` sẽ bị loại bỏ khỏi mảng state.

```typescript
  // Tính năng 4: Xử lý thay đổi bộ lọc
  const handleFilterChange = (newFilter: FilterType): void => {
    setCurrentFilter(newFilter);
  };

  // Tính số lượng cho từng bộ lọc
  const filterCounts: Record<FilterType, number> = {
    [FILTER_TYPES.ALL]: students.length,
    [FILTER_TYPES.EXCELLENT]: students.filter(({ score }: Student) => Number(score) >= 8.0).length,
    [FILTER_TYPES.FAILED]: students.filter(({ score }: Student) => Number(score) < 5.0).length
  };

  // Lọc danh sách sinh viên theo bộ lọc hiện tại trước khi truyền cho StudentTable
  const displayedStudents: Student[] = filterStudents(students, currentFilter);
```
- **Ý nghĩa**:
  - `displayedStudents`: Gọi hàm `filterStudents` để lấy ra danh sách thỏa mãn điều kiện lọc.
  - Danh sách `displayedStudents` được truyền xuống component con `StudentTable` qua prop `students={displayedStudents}`.

---

## 8. Chi Tiết File Khởi Chạy `src/main.tsx`

```typescript
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
```
- **Ý nghĩa**:
  - `document.getElementById('root')`: Lấy thẻ `div#root` từ file `index.html`.
  - `createRoot(...)`: Phương thức khởi tạo cây Virtual DOM của React 18/19.
  - `<React.StrictMode>`: Bật chế độ kiểm tra nghiêm ngặt của React giúp phát hiện sớm các lỗi vòng đời (lifecycle) và cảnh báo code cũ không an toàn.
  - `<App />`: Render component cha cao nhất vào DOM.

---

## 9. Bảng Đối Chiếu 5 Yêu Cầu ES6 Bắt Buộc

| Yêu cầu đề bài | Mã nguồn triển khai trong dự án | Vị trí file minh chứng |
| :--- | :--- | :--- |
| **1. Bắt buộc dùng `let`, `const` thay cho `var`** | 100% biến, hàm trong toàn bộ dự án đều dùng `const` và `let`. Tuyệt đối không có bất kỳ từ khóa `var` nào. | Tất cả các file trong `src/` |
| **2. Dùng Arrow Functions cho tất cả các hàm/component** | `const App: React.FC = () => { ... }`<br>`const handleAddStudent = (newStudent: Student): void => { ... }`<br>`const calculateAverageScore = (...): number => { ... }` | `src/App.tsx`<br>`src/components/*`<br>`src/utils/*` |
| **3. Dùng Destructuring Assignment** | Bóc tách đối tượng và mảng:<br>• `const [students, setStudents] = useState(...)`<br>• `const { id, name, score, class: className } = student;`<br>• `const { isValid, errors } = validateStudentForm(...)` | `src/App.tsx`<br>`src/components/StudentItem/StudentItem.tsx`<br>`src/components/StudentForm/StudentForm.tsx` |
| **4. Dùng Template Literals** | Dùng dấu backtick (`` ` ``) để nối chuỗi động:<br>• `` `Bạn có chắc muốn xóa sinh viên "${name}"...` ``<br>• `` `Lớp ${className}` ``<br>• `` `Điểm số (${numericScore}) không hợp lệ!` ``<br>• `` `Hiển thị ${displayedStudents.length} trên ${students.length}` `` | `src/components/StudentItem/StudentItem.tsx`<br>`src/utils/validation.ts`<br>`src/App.tsx` |
| **5. Phương thức mảng ES6: `.map()`, `.filter()`, `.reduce()`** | • **`.map()`**: Render bảng sinh viên và nút lọc.<br>• **`.filter()`**: Lọc sinh viên Giỏi (>= 8), Trượt (< 5) và xóa sinh viên theo ID.<br>• **`.reduce()`**: Tính tổng điểm để tính điểm trung bình lớp trong `calculateAverageScore()`. | `src/components/StudentTable/StudentTable.tsx`<br>`src/utils/calculations.ts`<br>`src/App.tsx` |

---

> 💡 **Mẹo**: Khi giáo viên hỏi về luồng hoạt động (Data Flow), bạn có thể trả lời:
> *"Dữ liệu danh sách sinh viên được lưu tập trung tại State của component cha `App.tsx`. Khi thêm sinh viên, form `StudentForm` sẽ kiểm tra dữ liệu và gửi đối tượng sinh viên mới lên `App` qua callback `onAddStudent`. Khi xóa sinh viên, component cháu `StudentItem` gọi callback `onDelete` truyền ngược lên `App` để lọc bằng `.filter()`. Danh sách hiển thị sẽ đi qua bộ lọc `filterStudents` rồi truyền xuống qua props cho component con `StudentTable` và duyệt bằng `.map()` để hiển thị."*
