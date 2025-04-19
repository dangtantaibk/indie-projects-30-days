# SplitEZ - Ứng dụng phân chia chi phí nhóm

![SplitEZ Logo](https://img.shields.io/badge/SplitEZ-Phân%20chia%20chi%20phí%20nhóm-4CAF50)

SplitEZ là một ứng dụng web đơn giản và trực quan giúp các nhóm bạn bè hoặc đồng nghiệp dễ dàng phân chia các khoản chi phí chung sau các sự kiện, chuyến đi hoặc hoạt động nhóm.

## Tính năng chính

- ✅ Nhập danh sách thành viên tham gia
- ✅ Thêm nhiều khoản chi phí với người chi trả, số tiền và mô tả
- ✅ Tự động tính toán số dư cuối cùng của mỗi người
- ✅ Hiển thị chi tiết ai nợ ai và bao nhiêu (đề xuất thanh toán tối ưu)
- ✅ Giao diện đơn giản, thân thiện với thiết bị di động
- ✅ Lưu trữ dữ liệu trong localStorage để không bị mất khi tải lại trang

## Cách sử dụng

1. Thêm thành viên tham gia vào nhóm
2. Nhập các khoản chi phí bao gồm: người trả tiền, số tiền và mô tả (không bắt buộc)
3. Nhấn nút "Tính toán kết quả" để xem:
   - Tóm tắt tổng chi phí và chi phí trung bình mỗi người
   - Bảng chi tiết cho thấy ai đã chi bao nhiêu, cần chi bao nhiêu và số dư
   - Danh sách các giao dịch thanh toán đề xuất để cân bằng mọi chi phí

## Cài đặt và chạy

1. Clone repository này về máy:
```bash
git clone https://github.com/username/splitez.git
```

2. Mở file `public/index.html` trong trình duyệt bất kỳ

3. Bắt đầu sử dụng ứng dụng!

## Cách hoạt động

SplitEZ sử dụng thuật toán tối ưu hóa để tính toán cách phân chia chi phí với số lượng giao dịch thanh toán ít nhất:

1. Tính tổng chi phí của cả nhóm và chia đều cho số lượng thành viên
2. Tính số dư của mỗi người (số tiền đã chi - số tiền cần chi)
3. Sử dụng thuật toán tham lam để tạo danh sách các giao dịch thanh toán tối ưu

## Ngôn ngữ và công nghệ sử dụng

- HTML5
- CSS3 (với biến CSS và flexbox)
- JavaScript thuần (ES6+)
- LocalStorage API để lưu trữ dữ liệu

## Tính năng trong tương lai

- [ ] Hỗ trợ nhiều loại tiền tệ
- [ ] Tùy chọn chia chi phí theo tỷ lệ không đều nhau
- [ ] Xuất báo cáo quyết toán dưới dạng PDF
- [ ] Chia sẻ liên kết cho các thành viên trong nhóm để cập nhật cộng tác
- [ ] Đồng bộ hóa dữ liệu qua tài khoản người dùng (yêu cầu back-end)

## Tác giả

Phát triển bởi [@username](https://github.com/username) như một dự án trong chuỗi "30 Days of Indie Projects"

## Giấy phép

[MIT License](LICENSE)