# Ứng Dụng Quản Lý Điểm Sinh Viên (React + TypeScript)

Dự án xây dựng bằng **React 19 + TypeScript (Vite)** tuân thủ 100% các tiêu chuẩn kỹ thuật **ES6**, gõ kiểu nghiêm ngặt (Strict Typing) và cấu trúc component phân chia rõ ràng theo từng thư mục chức năng.

---

## 📁 Cấu Trúc Thư Mục Dự Án (Project Structure)

Dự án được phân chia theo kiến trúc module hóa (Feature-based & Layered Architecture) giúp code sạch sẽ, dễ bảo trì, dễ tìm kiếm từng chức năng:

```text
quan-ly-diem-vs/
├── index.html                      # HTML root template, nhúng font chữ tiếng Việt
├── package.json                    # Cấu hình dependencies (React 19, TypeScript, Vite)
├── tsconfig.json                   # Cấu hình TypeScript compiler (Strict mode)
├── vite.config.js                  # Cấu hình Vite build tool
├── README.md                       # Tài liệu hướng dẫn chi tiết
└── src/
    ├── main.tsx                    # Điểm khởi chạy React (Entry point)
    ├── App.tsx                     # Component cha: Quản lý State chính (students, filter)
    ├── App.css                     # Style layout tổng thể của ứng dụng
    ├── index.css                   # Global CSS reset, biến màu, typography
    │
    ├── types/                      # 📌 Định nghĩa TypeScript Interfaces & Types
    │   └── student.ts              # Student, FilterType, StudentFormData, ValidationResult, v.v.
    │
    ├── constants/                  # 📌 Chứa các hằng số dùng chung toàn app
    │   └── filterTypes.ts          # Định nghĩa các loại bộ lọc (ALL, EXCELLENT, FAILED)
    │
    ├── data/                       # 📌 Dữ liệu khởi tạo ban đầu
    │   └── initialStudents.ts      # Mảng dữ liệu mẫu ban đầu (≥ 3 sinh viên: id, name, score, class)
    │
    ├── utils/                      # 📌 Các hàm tiện ích logic theo chuẩn ES6 & TypeScript
    │   ├── calculations.ts         # Tính điểm trung bình (.reduce()), xếp loại (template literals)
    │   └── validation.ts           # Kiểm tra ràng buộc form (họ tên, lớp, điểm trong khoảng [0, 10])
    │
    └── components/                 # 📌 Các UI Components theo từng thư mục chức năng
        ├── StudentForm/            # Chức năng: Form thêm sinh viên mới
        │   ├── StudentForm.tsx     # Xử lý input: Họ tên, Điểm số (0-10), Lớp & báo lỗi
        │   └── StudentForm.css     # Giao diện Form
        │
        ├── StudentFilter/          # Chức năng: Bộ lọc (Tất cả, Giỏi >= 8, Trượt < 5)
        │   ├── StudentFilter.tsx   # Các nút lọc danh sách theo tiêu chí
        │   └── StudentFilter.css   # Giao diện Filter tabs/buttons
        │
        ├── StudentStats/           # Chức năng: Thống kê cơ bản
        │   ├── StudentStats.tsx    # Tổng số sinh viên, Điểm trung bình (.reduce()), SV Giỏi, SV Trượt
        │   └── StudentStats.css    # Giao diện thẻ thống kê (Stats cards)
        │
        ├── StudentTable/           # Chức năng: Bảng danh sách sinh viên (Component con)
        │   ├── StudentTable.tsx    # Nhận props students, dùng .map() render danh sách
        │   └── StudentTable.css    # Giao diện bảng (Table) responsive
        │
        └── StudentItem/            # Chức năng: Từng dòng sinh viên (Component cháu/con)
            ├── StudentItem.tsx     # Hiển thị chi tiết id, name, score, class, rank + nút Xóa
            └── StudentItem.css     # Giao diện dòng dữ liệu và hiệu ứng nút xóa
```

---

## 🎯 Đáp Ứng Đầy Đủ Các Yêu Cầu Của Đề Bài

### 1. Hiển thị danh sách sinh viên ban đầu
- File: `src/data/initialStudents.ts` cung cấp sẵn danh sách mẫu 5 sinh viên (yêu cầu tối thiểu 3) với đầy đủ các thuộc tính: `id`, `name`, `score`, `class`.
- Hiển thị theo dạng bảng đẹp mắt, rõ ràng thông qua component `StudentTable` và `StudentItem`.

### 2. Thêm sinh viên mới & Ràng buộc dữ liệu
- File: `src/components/StudentForm/StudentForm.tsx`.
- Gồm 3 ô nhập: **Họ tên**, **Điểm số**, **Lớp**.
- Khi nhấn nút "Thêm sinh viên", danh sách được cập nhật tức thì bằng toán tử spread `[newStudent, ...prevStudents]` mà không làm mất dữ liệu cũ.
- **Ràng buộc dữ liệu (`src/utils/validation.ts`)**: Kiểm tra không để trống trường nào, kiểm tra điểm số phải là số hợp lệ nằm trong khoảng từ `0` đến `10`. Nếu không hợp lệ sẽ hiển thị thông báo lỗi bằng màu đỏ ngay dưới ô nhập và chặn thêm mới.

### 3. Xóa sinh viên
- File: `src/components/StudentItem/StudentItem.tsx`.
- Mỗi dòng sinh viên có một nút **Xóa** kèm icon thùng rác.
- Khi người dùng bấm vào nút Xóa, có hộp thoại xác nhận hiển thị tên sinh viên bằng **Template Literals**, khi đồng ý sẽ loại bỏ sinh viên khỏi danh sách bằng phương thức `students.filter()`.

### 4. Tính năng lọc (Filter) / Thống kê cơ bản
- File: `src/components/StudentFilter/StudentFilter.tsx`:
  - Lọc riêng sinh viên đạt loại **Giỏi (Điểm ≥ 8)**.
  - Lọc riêng sinh viên **trượt môn (Điểm < 5)**.
  - Xem **Tất cả** sinh viên.
- File: `src/components/StudentStats/StudentStats.tsx`:
  - Hiển thị **Tổng số lượng sinh viên**.
  - Hiển thị **Điểm trung bình của toàn lớp** được tính toán chính xác bằng phương thức `.reduce()` của ES6 trong `src/utils/calculations.ts`.

---

## 🌟 Quy Chuẩn Kỹ Thuật (ES6 & TypeScript)

| Tiêu chuẩn | Chi tiết triển khai |
| :--- | :--- |
| **TypeScript Strict** | Định nghĩa types rõ ràng trong [`src/types/student.ts`](file:///home/thevi/hocweb/quan-ly-diem-vs/src/types/student.ts). Toàn bộ Props, State, Event Handlers đều được gõ kiểu nghiêm ngặt. |
| **`let`, `const` thay cho `var`** | Toàn bộ dự án sử dụng 100% `const` và `let`, tuyệt đối không dùng `var`. |
| **Arrow Functions** | Toàn bộ các component (`App`, `StudentTable`, `StudentItem`, `StudentForm`, `StudentFilter`, `StudentStats`) và các hàm tiện ích (`calculateAverageScore`, `getStudentRank`, `validateStudentForm`) đều viết bằng Arrow Function `() => {}`. |
| **Destructuring Assignment** | Bóc tách props và state trong tất cả các components: `const { id, name, score, class: className } = student;`, `const [students, setStudents] = useState<Student[]>(...)`. |
| **Template Literals** | Dùng template literals với dấu backtick (`` ` ``) để nối chuỗi: `` `Lớp ${className}` ``, `` `Xóa sinh viên "${name}"?` ``, `` `Điểm TB: ${averageScore.toFixed(2)}` ``. |
| **ES6 Array Methods** | <br>• `.map()`: Render danh sách sinh viên trong `StudentTable`.<br>• `.filter()`: Lọc sinh viên theo tiêu chí Giỏi/Trượt và xóa sinh viên.<br>• `.reduce()`: Tính tổng điểm để tìm điểm trung bình của toàn lớp trong `calculateAverageScore()`. |

---

## 🛠️ Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

1. **Di chuyển vào thư mục dự án**:
   ```bash
   cd /home/thevi/hocweb/quan-ly-diem-vs
   ```

2. **Kiểm tra kiểu dữ liệu & Đóng gói (Build & Typecheck)**:
   ```bash
   npm run build
   ```

3. **Khởi chạy máy chủ phát triển (Development Server)**:
   ```bash
   npm run dev
   ```
   Trang web sẽ chạy tại địa chỉ: `http://localhost:3000`.
