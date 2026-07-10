// =====================================================================
// DỮ LIỆU DÙNG CHUNG cho sơ đồ liên kết phòng ban SOL (2D & 3D)
// -----------------------------------------------------------------
// File này là NGUỒN DỮ LIỆU DUY NHẤT. Khi có tài liệu khảo sát mới
// hoặc cần cập nhật nghiệp vụ / phòng ban, CHỈ CẦN SỬA FILE NÀY —
// cả sol-department-network.html (2D) và sol-department-network-3d.html
// (3D) sẽ tự động dùng dữ liệu mới, không cần sửa code hiển thị.
//
// Cách cập nhật:
// 1. "nodeMeta"   — thêm/sửa phòng ban (id, label). Với các phòng đã có
//                   file khảo sát chi tiết, thêm id đó vào mảng CORE_IDS.
// 2. "edgeDefs"   — thêm/sửa liên kết giữa 2 phòng: { a, b, processes: [...], freq }
// 3. "internalNV" — nghiệp vụ nội bộ cấp Level 1 của 1 phòng (chỉ có
//                   khi phòng đó đã được khảo sát chi tiết — có file .md riêng)
//
// Nguồn: trích xuất từ mục "1.4 Phối hợp với phòng ban khác" và
// "2.1 Nghiệp vụ cấp cao (Level 1)" trong các file khảo sát:
//   - Survey-CK-Final.md
//   - Survey-DaoTao-Final.md
//   - survey-ke-toan-Final.md
//   - survey-QA-Final.md
//   - Survey-ThuMua-Final.md
//   - survey-HR-Final.md
//   - survey-R&D-Final.md
// (đường dẫn gốc: docs/SOL/6.Workshop_Survey_Record/Phan-tich-sau-survey-final/)
// =====================================================================

window.SOL_NETWORK_DATA = (function () {
  const CORE_IDS = ["CK", "TRAINING", "KETOAN", "QAQC", "THUMUA", "HR", "RND"];

  // id: { label, x, y }  — x/y chỉ dùng cho bản 2D (ReactFlow), bản 3D tự bố trí bằng force-layout
  const nodeMeta = {
    CK:        { label: "Central Kitchen\n(CK)",     x: 250,  y: 60  },
    TRAINING:  { label: "Đào tạo\n(Training)",       x: 700,  y: 60  },
    KETOAN:    { label: "Kế toán",                   x: 60,   y: 380 },
    QAQC:      { label: "QA/QC",                     x: 900,  y: 380 },
    THUMUA:    { label: "Thu mua",                   x: 480,  y: 660 },

    NHAHANG:   { label: "Nhà hàng / OPS",            x: 470,  y: 250 },
    RND:       { label: "R&D / PD",                  x: 900,  y: 120 },
    HR:        { label: "Nhân sự (HR)",               x: 300,  y: 250 },
    MARKETING: { label: "Marketing",                 x: 950,  y: 620 },
    DUAN:      { label: "Dự án & Bảo trì",           x: 60,   y: 620 },
    IT:        { label: "IT",                        x: 700,  y: 760 },
    BOD:       { label: "BOD / GĐTC",                x: 150,  y: 120 },
    FRANCHISE: { label: "Nhượng quyền\n(Franchise)", x: -50,  y: 500 },
    CS:        { label: "CS (CSKH)",                 x: 1120, y: 480 },
    VANCHUYEN: { label: "Nhà thầu VC\n(3SA/3S/Ahamove)", x: 480, y: 900 },
    MALL_MCD:  { label: "Đối tác Mall / Machida",    x: -80,  y: 260 },
  };

  // { a, b, processes: [...], freq }
  const edgeDefs = [
    { a: "CK", b: "NHAHANG", processes: ["Order & giao hàng: nhà hàng đặt đơn, CK giao theo lịch cố định (2-4-6 / 3-5-7)"], freq: "Hàng ngày" },
    { a: "CK", b: "THUMUA", processes: ["CK tạo order mua NVL trên CukCuk/F2Tech", "Thu mua làm việc với NCC, NCC giao hàng về CK"], freq: "Hàng ngày" },
    { a: "CK", b: "KETOAN", processes: ["Kiểm kê cuối tháng, chốt số NXT", "Làm giá & chốt giá sản phẩm", "Theo dõi P&L của CK"], freq: "Ngày / Tháng" },
    { a: "CK", b: "QAQC", processes: ["Kiểm soát chất lượng NVL đầu vào (IQC) tại CK", "Phản hồi chất lượng NVL & pest control"], freq: "Hàng ngày / Phát sinh" },
    { a: "CK", b: "HR", processes: ["Tuyển dụng nhân sự cho CK", "Chốt công, chốt lương (1Office)"], freq: "Phát sinh / Tháng" },
    { a: "CK", b: "DUAN", processes: ["Sửa chữa / bảo trì nhà xưởng CK", "Mua mới thiết bị (đề xuất qua 1Office)"], freq: "Phát sinh" },
    { a: "CK", b: "RND", processes: ["Thử nghiệm NVL mới & bán thành phẩm mới", "Chốt tiêu chuẩn nguyên liệu, quy trình sản xuất"], freq: "4–5 lần/tháng" },
    { a: "CK", b: "BOD", processes: ["Xây dựng AOP & chốt KPI/KPO hằng năm"], freq: "Cuối năm" },
    { a: "CK", b: "TRAINING", processes: ["Đào tạo ATLĐ, VSATTP, định hướng nhân viên mới CK"], freq: "Khi có lịch" },
    { a: "CK", b: "VANCHUYEN", processes: ["Giao hàng hệ thống theo lịch cố định (3SA, 3S)", "Giao ad hoc qua Ahamove"], freq: "Theo lịch + phát sinh" },

    { a: "TRAINING", b: "KETOAN", processes: ["Ghi nhận quy trình mới (thu ngân/kiểm kê) → cập nhật tài liệu đào tạo"], freq: "Phát sinh" },
    { a: "TRAINING", b: "HR", processes: ["Ban hành quy chế đào tạo & training roadmap theo career path", "Phối hợp tổ chức event/teambuilding"], freq: "Hàng tuần / Phát sinh" },
    { a: "TRAINING", b: "NHAHANG", processes: ["Biên soạn SOP vận hành từ thông tin thực tế OPS", "Biên soạn module ISM cho quản lý", "Giám sát kết quả ISB/ISP"], freq: "Liên tục / hàng tuần" },
    { a: "TRAINING", b: "QAQC", processes: ["Cập nhật tiêu chuẩn VSATTP mới", "Tạo checklist chấm điểm", "Mở lớp đào tạo VSATTP (QA giảng, Training tổ chức)"], freq: "Định kỳ / khi có thay đổi" },
    { a: "TRAINING", b: "MARKETING", processes: ["Tổ chức lớp đào tạo khi có menu mới / chương trình KM"], freq: "Theo campaign" },
    { a: "TRAINING", b: "RND", processes: ["Biên soạn SOP món ăn mới + recipe chart (phối hợp tại bếp)"], freq: "Phát sinh (món mới)" },

    { a: "KETOAN", b: "RND", processes: ["Nhận công thức định mức món (gram/NVL) để cài giá thành"], freq: "Phát sinh" },
    { a: "KETOAN", b: "MARKETING", processes: ["Cài đặt menu & CTKM trên F2 theo memo Marketing"], freq: "Phát sinh" },
    { a: "KETOAN", b: "NHAHANG", processes: ["BC P&L tuần (forecast) & MenuMix", "Nhận COL (chi phí nhân công) từ OPS"], freq: "Hàng tuần" },
    { a: "KETOAN", b: "HR", processes: ["Tính thưởng cho nhà hàng theo chỉ số tài chính", "Hạch toán & ghi nhận lương"], freq: "Hàng tháng" },
    { a: "KETOAN", b: "FRANCHISE", processes: ["Theo dõi & thu công nợ nhượng quyền (2 kỳ/tháng)"], freq: "2 kỳ/tháng" },
    { a: "KETOAN", b: "DUAN", processes: ["Xử lý tạm ứng bảo trì phát sinh"], freq: "Phát sinh" },
    { a: "KETOAN", b: "MALL_MCD", processes: ["BC doanh thu theo hợp đồng với đối tác mall & Machida"], freq: "Hàng tháng" },
    { a: "KETOAN", b: "BOD", processes: ["Duyệt lệnh thanh toán ngân hàng (IB) — 2 cấp", "Duyệt kế hoạch dòng tiền hàng tháng"], freq: "Hàng ngày / Tháng" },
    { a: "KETOAN", b: "THUMUA", processes: ["Nhận phiếu giao hàng NCC, đối chiếu công nợ", "Cung cấp giá mua để chốt công nợ; tạo mã NCC/hàng hóa"], freq: "Hàng ngày / Tháng" },

    { a: "QAQC", b: "NHAHANG", processes: ["Audit nhà hàng theo checklist 5 nhóm S-C-P-Q-D"], freq: "Hàng ngày" },
    { a: "QAQC", b: "THUMUA", processes: ["Kiểm soát chất lượng NVL/NCC đầu vào", "Trao đổi COA, hồ sơ năng lực NCC"], freq: "Hàng tuần" },
    { a: "QAQC", b: "RND", processes: ["Kiểm soát chất lượng sản phẩm mới tại NH & CK"], freq: "Phát sinh" },
    { a: "QAQC", b: "VANCHUYEN", processes: ["Kiểm soát chất lượng SP trong quá trình vận chuyển CK → NH"], freq: "Hàng tháng" },
    { a: "QAQC", b: "CS", processes: ["Kiểm tra & đánh giá phản hồi khách hàng liên quan ATTP"], freq: "Khi có sự vụ" },

    { a: "THUMUA", b: "NHAHANG", processes: ["Nhận PR NVL/CCDC từ cửa hàng", "Nhận forecast nhu cầu đặt hàng"], freq: "Hàng ngày (NVL) / Tháng (CCDC)" },
    { a: "THUMUA", b: "MARKETING", processes: ["Cung cấp POSM (standee, mica QR, thẻ Takeaway...)", "Hỗ trợ tìm hàng cho chương trình khuyến mãi"], freq: "Theo chương trình" },
    { a: "THUMUA", b: "HR", processes: ["Cung cấp đồng phục, quà tặng sinh nhật NV, văn phòng phẩm"], freq: "Hàng tháng / phát sinh" },
    { a: "THUMUA", b: "IT", processes: ["Kết nối NCC thiết bị mạng/POS cho IT"], freq: "Phát sinh" },
    { a: "THUMUA", b: "DUAN", processes: ["Tìm & chốt giá NCC nội thất, bảng hiệu cho dự án mới"], freq: "Theo dự án" },
    { a: "THUMUA", b: "RND", processes: ["Cung cấp mẫu NCC/NVL mới để R&D test", "Nội địa hóa nguyên liệu nhập khẩu"], freq: "Phát sinh" },
    { a: "THUMUA", b: "BOD", processes: ["Phê duyệt NCC chiến lược, ngân sách & hợp đồng lớn"], freq: "Hàng tháng / phát sinh" },

    { a: "HR", b: "NHAHANG", processes: ["Cung cấp dữ liệu giờ công/ngày công (COL) hàng tuần", "Nhận kế hoạch nhân sự & điều chuyển nhà hàng", "Onboarding, đồng phục, chấm công, nghỉ việc tại NH"], freq: "Hàng ngày / Hàng tuần" },
    { a: "HR", b: "IT", processes: ["Cấp tài khoản mail/hệ thống cho nhân sự mới", "Yêu cầu thay đổi hệ thống 1Office, bảo mật dữ liệu nhân sự"], freq: "Phát sinh" },
    { a: "HR", b: "MARKETING", processes: ["Employer Branding & tuyển dụng vị trí Marketing", "Xác nhận phụ cấp chụp hình để tính lương"], freq: "Cuối tháng" },
    { a: "HR", b: "QAQC", processes: ["Tuyển nhân sự chuyên môn QA/QC", "Điều chuyển nhân sự CK ↔ NH theo yêu cầu QA"], freq: "Phát sinh" },
    { a: "HR", b: "RND", processes: ["Tuyển nhân sự chuyên môn R&D theo yêu cầu"], freq: "Phát sinh" },
    { a: "HR", b: "BOD", processes: ["Đàm phán ngân sách nhân sự & chính sách lương", "Duyệt tuyển dụng vượt định biên"], freq: "Phát sinh" },

    { a: "RND", b: "DUAN", processes: ["Vẽ/duyệt layout bếp khi mở nhà hàng mới", "Giám sát xây dựng, đề xuất giải pháp thiết bị bếp"], freq: "Khi mở NH mới" },
    { a: "RND", b: "MARKETING", processes: ["Lên calendar/seasonal menu", "Làm menu mới (chụp hình, quay clip, đề xuất giá bán)"], freq: "Cuối năm / Phát sinh" },
    { a: "RND", b: "NHAHANG", processes: ["Training & đánh giá tay nghề nhân viên NH", "Kiểm tra định kỳ (food safety, food setting)", "Hỗ trợ vận hành trực tiếp"], freq: "Mong muốn 2 lần/tuần/NH — thực tế 1 lần/tháng" },
    { a: "RND", b: "IT", processes: ["Setup thiết bị khi mở NH mới (camera, máy in bill)"], freq: "Khi mở NH" },
  ];

  // Nghiệp vụ nội bộ cấp Level 1 — chỉ có với phòng đã có file khảo sát chi tiết (nằm trong CORE_IDS)
  const internalNV = {
    CK: [
      "NV1 — Order & Giao hàng cho nhà hàng",
      "NV2 — Kế hoạch & Thực thi sản xuất",
      "NV3 — Mua hàng & Tiếp nhận NVL đầu vào",
      "NV4 — Quản lý kho & NXT",
      "NV5 — Quản trị giá thành & P&L",
      "NV6 — Thử nghiệm NVL/BTP mới",
      "NV7 — Quản trị chất lượng & ATTP",
      "NV8 — Sửa chữa / Bảo trì nhà xưởng",
      "NV9 — Nhân sự (tuyển dụng, chấm công, đào tạo)",
      "NV10 — Lập kế hoạch năm (AOP/KPI)",
    ],
    TRAINING: [
      "NV1 — Đào tạo ISB/ISP (In-house + Franchise + NSO)",
      "NV2 — Đào tạo ISM",
      "NV3 — Sát hạch / Certify",
      "NV4 — Xây dựng, cập nhật & ban hành tài liệu",
      "NV5 — Quản lý & vận hành TreeAMS",
      "NV6 — Đào tạo Orientation",
      "NV7 — Follow sau đào tạo (Training audit)",
      "NV8 — Tổ chức lớp theo yêu cầu phòng ban khác",
    ],
    KETOAN: [
      "NV1 — Báo cáo tài chính & quản trị",
      "NV2 — Quản lý giá thành & tồn kho Nhà hàng",
      "NV3 — Quản lý giá thành & tồn kho Bếp trung tâm",
      "NV4 — Quản lý doanh thu",
      "NV5 — Quản lý công nợ nhà cung cấp",
      "NV6 — Quản lý tài sản & CCDC",
      "NV7 — Quản lý thanh toán & dòng tiền",
      "NV8 — Cài đặt danh mục & CTKM trên hệ thống",
      "NV9 — Duyệt đề nghị thanh toán",
      "NV10 — Kiểm soát & Hỗ trợ Kế toán viên",
      "NV11 — Kế toán Thuế",
    ],
    QAQC: [
      "NV1 — Audit nhà hàng",
      "NV2 — Xin cấp giấy phép đủ điều kiện ATTP",
      "NV3 — Xin cấp giấy phép môi trường",
      "NV4 — Đăng ký bán rượu tiêu dùng tại chỗ",
      "NV5 — Tiếp Đoàn Thanh tra/Kiểm tra/Liên ngành ATTP",
      "NV6 — Tiếp Đoàn kiểm tra Môi trường",
      "NV7 — Đào tạo tập huấn kiến thức ATTP",
      "NV8 — Kiểm soát chất lượng đầu vào tại CK (IQC)",
      "NV9 — Kiểm soát quy trình sản xuất tại CK (PQC/OQC)",
      "NV10 — Soạn thảo quy trình/hướng dẫn",
    ],
    THUMUA: [
      "NV1 — Tiếp nhận yêu cầu mua hàng (PR)",
      "NV2 — Tìm kiếm & đánh giá nhà cung cấp",
      "NV3 — Yêu cầu báo giá (RFQ)",
      "NV4 — Đàm phán giá & điều khoản",
      "NV5 — Tạo & phát hành đơn đặt hàng (PO)",
      "NV6 — Theo dõi giao hàng & xử lý phát sinh",
      "NV7 — Quản lý hợp đồng & hồ sơ NCC",
      "NV8 — Đối chiếu thanh toán & công nợ NCC",
      "NV9 — Quản lý dữ liệu giá mua",
      "NV10 — Báo cáo & phân tích mua hàng",
      "NV11 — Phát triển NVL mới & Nội địa hóa",
    ],
    HR: [
      "NV1 — Talent Acquisition (Tuyển dụng)",
      "NV2 — Cấp phát & Quản lý Đồng phục",
      "NV3 — Chấm công",
      "NV4 — Tính lương & Phụ cấp",
      "NV5 — Bảo hiểm Xã hội (BHXH)",
      "NV6 — Nghỉ việc (Offboarding)",
      "NV7 — Xử lý Kỷ luật",
      "NV8 — Khen thưởng & Điều chỉnh lương / Thăng chức",
      "NV9 — Đánh giá & Điều chuyển nội bộ",
      "NV10 — Hành chính & Quản lý Dữ liệu / Chiến lược HR",
    ],
    RND: [
      "NV1 — Phát triển sản phẩm / Món mới",
      "NV2 — Quản lý BOM & Chart + Kiểm soát Cost",
      "NV3 — Đào tạo & Đánh giá tay nghề",
      "NV4 — Kiểm soát chất lượng & Xây dựng tiêu chuẩn",
      "NV5 — Quản lý Nguồn hàng & NCC",
      "NV6 — Hỗ trợ Vận hành (OPS Support, kiêm nhiệm ~40%)",
      "NV7 — Hỗ trợ mở nhà hàng mới (Dự án)",
      "NV8 — Phối hợp Marketing & Calendar",
      "NV9 — Phân bổ sản xuất & Chuyển giao (CK/OEM/NH)",
      "NV10 — Chấm điểm shop (TreeAMS) — chưa triển khai",
      "NV11 — Phân tích số liệu",
    ],
  };

  // Quy trình con Level 2 — mỗi mảng con tương ứng 1-1 theo THỨ TỰ (index) với
  // internalNV[deptId] ở trên (index 0 = NV1, index 1 = NV2, ...).
  // Trích từ mục "2.2 Quy trình con (Level 2)" / "2.0 Bản đồ phân cấp nghiệp vụ" của mỗi file khảo sát.
  const level2NV = {
    CK: [
      ["NV1.1 — Tiếp nhận & tổng hợp đơn hàng nhà hàng", "NV1.2 — Lên lịch & chia hàng về store", "NV1.3 — Xuất kho & giao hàng", "NV1.4 — Giao bù khi thiếu hàng", "NV1.5 — Giao ad hoc (Ahamove)"],
      ["NV2.1 — Lập kế hoạch sản xuất theo đơn", "NV2.2 — Sơ chế / chế biến / đóng gói"],
      ["NV3.1 — Tạo order NVL & nhận hàng từ NCC"],
      ["NV4.1 — Cập nhật NXT vận hành hàng ngày", "NV4.2 — Kiểm kê & chốt NXT cuối tháng"],
      ["NV5.1 — Làm giá & chốt giá sản phẩm"],
      ["NV6.1 — Thử nghiệm NVL mới", "NV6.2 — Thử nghiệm bán thành phẩm mới"],
      ["NV7.1 — Phản hồi chất lượng NVL & pest control"],
      ["NV8.1 — Đề xuất & duyệt sửa chữa / mua mới thiết bị"],
      ["NV9.1 — Tuyển dụng & phỏng vấn", "NV9.2 — Chấm công & chốt lương", "NV9.3 — Đào tạo ATLĐ / VSATTP / định hướng"],
      ["NV10.1 — Xây dựng AOP & chốt KPI/KPO"],
    ],
    TRAINING: [
      ["NV1.1 — Đào tạo OJT tại cửa hàng", "NV1.2 — Đào tạo ISB NSO", "NV1.3 — Đào tạo ISB Franchise", "NV1.4 — Tái đào tạo / Promote"],
      ["NV2.1 — Đào tạo ISM theo level", "NV2.2 — Skill Assessment (ISM)"],
      ["NV3.1 — Sát hạch lý thuyết tập trung", "NV3.2 — Sát hạch thực hành", "NV3.3 — Phỏng vấn vấn đáp"],
      ["NV4.1 — Biên soạn SOP món ăn mới", "NV4.2 — Cập nhật & ban hành SOP vận hành"],
      ["NV5.1 — Setup khóa học & đề thi", "NV5.2 — Gán học viên & tạo nhóm", "NV5.3 — Báo cáo sau đào tạo"],
      ["Chưa tách quy trình con — cần workshop bổ sung"],
      ["Chưa tách quy trình con — đang PENDING ~nửa năm"],
      ["Chưa tách quy trình con — cần workshop bổ sung"],
    ],
    KETOAN: [
      ["NV1.1 — P&L tuần (forecast)", "NV1.2 — MenuMix tuần", "NV1.3 — P&L tháng (thực tế)", "NV1.4 — Hạch toán lương từ HR", "NV1.5 — BC chỉ số tài chính cho HR tính thưởng"],
      ["NV2.1 — Theo dõi NXT NVL nhà hàng hàng ngày", "NV2.2 — Kiểm kê tồn kho định kỳ (NH)", "NV2.3 — Cài đặt định mức món ăn", "NV2.4 — Tính giá thành cuối tháng (NH)", "NV2.5 — Giải trình thừa/thiếu NVL & bồi thường"],
      ["NV3.1 — Theo dõi NXT BTT (bao gồm xuất NH, NQ)", "NV3.2 — Kiểm kê tồn kho BTT", "NV3.3 — Cài đặt định mức BTT", "NV3.4 — Tính giá thành BTT", "NV3.5 — Theo dõi & thu công nợ nhượng quyền"],
      ["NV4.1 — Kiểm tra & đối chiếu DT (F2 vs App)", "NV4.2 — Kiểm tra chương trình khuyến mãi", "NV4.3 — Quản lý Recoin nội bộ", "NV4.4 — Theo dõi nộp tiền ngân hàng hàng ngày", "NV4.5 — Báo cáo doanh thu cho đối tác & NQ", "NV4.6 — Ghi nhận doanh thu lên FAST"],
      ["NV5.1 — Nhận & kiểm tra phiếu giao hàng NCC", "NV5.2 — Cập nhật phiếu nhập có giá vào FAST", "NV5.3 — Đối chiếu công nợ NCC", "NV5.4 — Lập đề nghị thanh toán NCC"],
      ["NV6.1 — Kiểm kê CCDC/TS định kỳ (1 quý/lần)", "NV6.2 — Theo dõi nhập xuất CCDC/TS", "NV6.3 — Giải trình thừa/thiếu & yêu cầu bồi thường", "NV6.4 — Phân bổ CCDC & khấu hao TS"],
      ["NV7.1 — Lập kế hoạch dòng tiền (dự chi tháng)", "NV7.2 — Lập lệnh thanh toán ngân hàng", "NV7.3 — Hạch toán giao dịch ngân hàng trên FAST", "NV7.4 — Quản lý tạm ứng nhân viên", "NV7.5 — Quản lý khoản vay & lãi vay", "NV7.6 — Lập bộ hồ sơ giải ngân"],
      ["NV8.1 — Cài đặt món ăn mới & giá bán (FAST + F2)", "NV8.2 — Cài đặt chương trình khuyến mãi trên F2", "NV8.3 — Tạo mã NVL/CCDC trên FAST"],
      ["NV9.1 — Duyệt ĐNTT trên 1Office + ký file giấy"],
      ["NV10.1 — Kiểm soát tiến độ & hỗ trợ nghiệp vụ kế toán viên"],
      ["NV11.1 — Kê khai VAT/TNDN/TNCN; sổ sách; làm việc cơ quan thuế (thuê ngoài)"],
    ],
    QAQC: [
      ["NV1.1 — Lập kế hoạch & lịch kiểm tra NH", "NV1.2 — Kiểm tra NH theo checklist S-C-P-Q-D", "NV1.3 — Xử lý kết quả & theo dõi khắc phục (CAPA)"],
      ["NV2.1 — Chuẩn bị & nộp hồ sơ pháp lý", "NV2.2 — Tiếp Đoàn thẩm định tại NH/CK"],
      ["NV3.1 — Chuẩn bị & nộp hồ sơ", "NV3.2 — Tiếp Đoàn kiểm tra môi trường"],
      ["NV4.1 — Tổng hợp & nộp hồ sơ"],
      ["NV5.1 — Chuẩn bị hồ sơ & tiếp đoàn", "NV5.2 — Xử lý kết quả sau kiểm tra"],
      ["NV6.1 — Chuẩn bị hồ sơ & tiếp đoàn"],
      ["NV7.1 — Đào tạo nhân viên mới", "NV7.2 — Tái đào tạo / cập nhật nhân viên cũ"],
      ["NV8.1 — Tiếp nhận & kiểm tra NVL theo SPEC"],
      ["NV9.1 — Kiểm soát tuân thủ từng công đoạn sản xuất", "NV9.2 — Kiểm tra thành phẩm & lưu mẫu", "NV9.3 — Kiểm soát CCP / mối nguy chế biến"],
      ["NV10.1 — Xây dựng & ban hành tiêu chuẩn/SOP/SPEC", "NV10.2 — Quản lý & cập nhật thư viện tài liệu"],
    ],
    THUMUA: [
      ["NV1.1 — Tiếp nhận & kiểm tra nhu cầu NVL (CukCuk/F2)", "NV1.2 — Tiếp nhận & kiểm tra PR CCDC/thiết bị (1Office)", "NV1.3 — Tiếp nhận Forecast & nhu cầu đặt hàng"],
      ["NV2.1 — Tìm kiếm & đánh giá năng lực NCC mới", "NV2.2 — Tái đánh giá NCC hiện hữu"],
      ["NV3.1 — Gửi RFQ, thu thập & so sánh báo giá"],
      ["NV4.1 — Thương lượng giá, thanh toán, giao hàng, hợp đồng"],
      ["NV5.1 — Lập PO hàng NVL (CukCuk)", "NV5.2 — Lập PO CCDC/thiết bị (1Office)", "NV5.3 — Mua sắm cho Dự án"],
      ["NV6.1 — Theo dõi NCC giao xuống shop & giao CK", "NV6.2 — Xử lý trả hàng NCC"],
      ["NV7.1 — Lưu trữ, cập nhật hợp đồng/hồ sơ pháp lý"],
      ["NV8.1 — Lập đề nghị thanh toán (CCDC/phát sinh)", "NV8.2 — Theo dõi & đối chiếu công nợ định kỳ"],
      ["NV9.1 — Tạo mã/giá sản phẩm & NCC mới hoàn toàn", "NV9.2 — Cập nhật biến động giá định kỳ"],
      ["NV10.1 — Báo cáo chi phí mua hàng tháng & phân tích 80/20", "NV10.2 — Phân tích biến động giá theo tuần"],
      ["NV11.1 — Cung cấp mẫu & hồ sơ NVL mới cho R&D", "NV11.2 — Nội địa hóa nguyên liệu nhập khẩu"],
    ],
    HR: [
      ["NV1.1 — Lập & duyệt đề xuất tuyển dụng", "NV1.2 — Đăng tin, sourcing & sàng lọc ứng viên", "NV1.3 — Phỏng vấn", "NV1.4 — Onboarding & nhận việc", "NV1.5 — Đánh giá sau thử việc & ký HĐLĐ chính thức"],
      ["NV2.1 — Cấp phát đồng phục khi nhận việc (cọc 300k)", "NV2.2 — Thu hồi đồng phục khi nghỉ việc & hoàn cọc"],
      ["NV3.1 — Gán ca & duyệt ca hàng tuần (AM/QM)", "NV3.2 — Xử lý quên chấm công & đơn vắng mặt", "NV3.3 — Xử lý làm thêm giờ / ca gãy", "NV3.4 — Xuất dữ liệu chấm công sang bảng tính lương"],
      ["NV4.1 — Tính lương full-time & part-time", "NV4.2 — Xử lý phụ cấp đặc thù", "NV4.3 — Tích hợp dữ liệu phạt trừ & thưởng", "NV4.4 — Duyệt & chi lương"],
      ["NV5.1 — Đăng ký tham gia BHXH cho nhân sự mới", "NV5.2 — Tái ký HĐLĐ & điều chỉnh mức đóng BHXH", "NV5.3 — Báo giảm BHXH (nghỉ việc) & chốt sổ"],
      ["NV6.1 — Tiếp nhận & duyệt đơn nghỉ việc (1Office)", "NV6.2 — Bàn giao tài sản & chứng từ tài chính", "NV6.3 — Thanh toán lương cuối & hoàn tất thủ tục hành chính"],
      ["NV7.1 — Lập biên bản & quyết định kỷ luật"],
      ["NV8.1 — Quy trình đề xuất & duyệt khen thưởng", "NV8.2 — Điều chỉnh lương, thăng chức & ban hành quyết định"],
      ["NV9.1 — Đánh giá điều chỉnh tăng lương định kỳ", "NV9.2 — Điều chuyển nội bộ (retraining, đổi vị trí/phòng)"],
      ["NV10.1 — Ban hành orgchart & chức danh phòng ban", "NV10.2 — Quản lý tài khoản mail & phân quyền hệ thống", "NV10.3 — Lưu trữ & kế thừa dữ liệu nhân sự", "NV10.4 — Xây dựng & ban hành chính sách nhân sự", "NV10.5 — Quản lý & Tái triển khai HRMS (1Office/Vendor)"],
    ],
    RND: [
      ["NV1.1 — Lên ý tưởng & Calendar seasonal menu", "NV1.2 — Nghiên cứu, test recipe & tasting", "NV1.3 — Thẩm định với chuyên gia Nhật (Tatsuya)", "NV1.4 — Review & cải tiến / nâng cấp món cũ", "NV1.5 — Đề xuất giá bán"],
      ["NV2.1 — Tạo BOM & Chart món mới", "NV2.2 — Cập nhật BOM & Chart món cũ (+ version)", "NV2.3 — Rà soát chênh lệch định mức hàng tháng"],
      ["NV3.1 — Training món mới cho nhà hàng", "NV3.2 — Training & chuyển giao công nghệ CK", "NV3.3 — Training tay nghề (xóc chảo, trụng mì, dao...)", "NV3.4 — Test tay nghề định kỳ (1–5 sao)", "NV3.5 — Re-training / Test tay nghề tuyển dụng"],
      ["NV4.1 — Xây bộ tiêu chuẩn / SOP (chế biến, bảo quản...)", "NV4.2 — Đánh giá chất lượng đầu ra CK", "NV4.3 — Kiểm tra định kỳ tại NH (food safety, setting)", "NV4.4 — Hỗ trợ OPS giải quyết feedback QA"],
      ["NV5.1 — Đánh giá/đề xuất nguồn hàng mới & đổi nguồn", "NV5.2 — Follow chất lượng nguồn hàng hiện tại", "NV5.3 — Tìm nguồn hàng backup", "NV5.4 — Tiếp nhận & test mẫu NCC chào hàng", "NV5.5 — Quản lý OEM"],
      ["NV6.1 — Xử lý feedback nhà hàng", "NV6.2 — Giải pháp vận hành (NS/CCDC/NVL)", "NV6.3 — Đề xuất điều chuyển / promote nhân sự", "NV6.4 — Hỗ trợ trực tiếp vận hành tại NH"],
      ["NV7.1 — Thiết kế / duyệt layout bếp", "NV7.2 — Giám sát xây dựng layout", "NV7.3 — First Order (FO) CCDC & thiết bị", "NV7.4 — Giải pháp trang thiết bị bếp"],
      ["NV8.1 — Calendar năm / KBI / seasonal menu", "NV8.2 — Làm menu mới (chụp hình, clip quảng bá)", "NV8.3 — Kênh phản hồi chất lượng & đo hiệu quả chương trình"],
      ["NV9.1 — Quyết định SP làm ở CK / OEM / NH (+ solution)"],
      ["Chưa triển khai — thiếu nhân sự/thời gian (0% TreeAMS)"],
      ["NV11.1 — Phân tích cost / doanh thu nội bộ"],
    ],
  };

  // Chi tiết Level 3 (PHẦN 3 — QUY TRÌNH CHI TIẾT trong file khảo sát) cho
  // TỪNG quy trình con (Level 2). Đây là map THƯA (sparse) — chỉ chứa các
  // mục ĐÃ có dữ liệu chi tiết trong tài liệu khảo sát gốc; mục nào chưa có
  // trong map này thì giao diện sẽ tự hiện "Chưa có dữ liệu chi tiết — cần
  // workshop bổ sung". Key = "<deptId>|<nv1Index>|<subIndex>" (index 0-based,
  // khớp với thứ tự trong internalNV / level2NV ở trên).
  //
  // Mỗi mục gồm:
  //   steps      — mảng bước "Ai làm: Làm gì" (mục 3. Các bước thực hiện)
  //   exceptions — mảng "Tình huống → Cách xử lý" (mục 4. Khi có sự cố/ngoại lệ)
  //   forms      — mảng "Tên tài liệu (Dạng, Ai quản lý, Nơi lưu)" (mục 5. Biểu mẫu/tài liệu)
  //   note       — ghi chú ngắn khi quy trình CHƯA có chi tiết đầy đủ
  const level3Detail = {
    // ---------------- CK ----------------
    "CK|0|0": {
      steps: [
        "Nhà hàng: Tạo đơn theo lịch cố định (2-4-6 / 3-5-7) trên CukCuk/F2Tech",
        "CK Admin: Tổng hợp đơn các store để chia hàng",
      ],
      exceptions: ["Đơn phát sinh ngoài lịch / điều chỉnh → trao đổi qua Zalo, Call, hoặc qua Sếp (Mr. Đông)"],
      forms: ["Đơn đặt hàng nhà hàng (Điện tử — CukCuk/F2Tech, CK Admin quản lý)"],
    },
    "CK|0|1": {
      steps: [
        "CK Admin: Lấy nhu cầu từ tổng hợp đơn (CukCuk/F2Tech)",
        "CK Admin: Phân bổ hàng theo nhu cầu từng store",
      ],
      exceptions: [
        "Store xin 10, CK còn 8 → giao 8, báo Zalo SL thực tế; bù vào đơn kế tiếp nếu store cần",
        "Store chỉ thực sự cần 8 → nhận theo SL thực tế, không giao bù",
      ],
      forms: ["Bảng chia hàng theo store (Điện tử — CukCuk/F2Tech, CK Admin quản lý)"],
    },
    "CK|0|2": {
      steps: [
        "Thủ kho: Tạo phiếu xuất kho (CukCuk/F2Tech)",
        "Logistic: Bàn giao nhà thầu vận chuyển (3SA/3S) theo lịch cố định",
        "Nhà thầu VC: Giao hàng tới store",
        "Nhà hàng: Xác nhận nhận hàng qua Zalo (không lưu vết trên HT)",
      ],
      exceptions: [
        "Giao gấp ngoài lịch (ad hoc) → đóng thùng xốp, gọi Ahamove (→ QT giao ad hoc)",
        "Giao thiếu → giao bù vào đơn kế tiếp bằng phiếu xuất (→ QT giao bù)",
      ],
      forms: [
        "Phiếu xuất kho (Điện tử — Thủ kho, CukCuk/F2Tech)",
        "Lịch giao hàng cố định (Văn bản — CK Manager, không lưu tập trung)",
        "Bảng kê vận chuyển 3SA/3S/Ahamove (Giấy/Điện tử — Logistic)",
      ],
    },
    "CK|0|3": {
      steps: [],
      exceptions: [],
      forms: ["Phiếu xuất kho đơn bù (Điện tử — Thủ kho, CukCuk/F2Tech)"],
      note: "Chưa có quy trình chi tiết đầy đủ — cần workshop bổ sung: điều kiện kích hoạt giao bù, thời hạn bù, theo dõi công nợ giao hàng.",
    },
    "CK|0|4": { note: "Chưa có quy trình chi tiết — cần khai thác: điều kiện giao gấp, cách tính chi phí Ahamove, đo lường số chuyến phát sinh." },
    "CK|1|0": { note: "Hiện hoàn toàn thủ công — không có trên hệ thống." },
    "CK|1|1": { note: "Cần khai thác: SOP sản xuất, định mức NVL, tiêu chuẩn VSATTP." },
    "CK|2|0": { note: "Cần khai thác: quy trình kiểm tra chất lượng đầu vào, cách ghi nhận sai lệch so với tiêu chuẩn NVL." },
    "CK|3|0": { note: "Cần khai thác: thời điểm cập nhật (cuối ngày hay realtime?), logic NXT sai ở đâu, ai kiểm tra." },
    "CK|3|1": {
      steps: [
        "CK (Thủ kho + GS): Kiểm đếm vật lý toàn bộ hàng hóa, NVL tại kho",
        "CK + Kế toán: Ghi kết quả vào Excel, đối chiếu với số liệu hệ thống",
        "CK + Kế toán: Trao đổi Zalo để chốt số liệu đồng thuận",
        "Kế toán: Nhập số NXT đã chốt lên FAST",
        "CK (Thủ kho): Cập nhật lại số liệu trên CukCuk theo số đã chốt",
        "Kế toán: FAST tự tính giá lý thuyết, gửi CK qua Zalo",
        "CK + Kế toán: Trao đổi điều chỉnh giá; Kế toán chốt trên FAST",
        "Kế toán: Gửi báo cáo P&L của CK qua Email (deadline ngày 10–11)",
      ],
      exceptions: [
        "Số liệu thực tế vs hệ thống chênh lệch lớn → hai bên trao đổi Zalo tìm nguyên nhân, điều chỉnh và chốt lại",
        "Ngày lễ/kỳ nghỉ trùng deadline → làm muộn hơn, chưa có quy trình xử lý chính thức",
        "Kế toán và CK không đồng ý về giá → trao đổi Zalo tiếp, chưa có quy trình escalation",
      ],
      forms: [
        "File kiểm kê Excel tháng (Excel — CK + Kế toán, chưa có kho lưu trữ tập trung)",
        "Số liệu NXT trên CukCuk (Hệ thống — CK, CukCuk Cloud)",
        "Dữ liệu NXT và giá thành trên FAST (Hệ thống — Kế toán, FAST)",
        "Báo cáo P&L CK (Email/PDF — Kế toán)",
      ],
    },
    "CK|4|0": {
      steps: [
        "Kế toán: FAST tính giá lý thuyết từ NXT + định mức",
        "CK + Kế toán: Trao đổi, điều chỉnh, chốt giá qua Zalo",
      ],
      exceptions: [
        "Lô NVL có tỷ lệ bỏ cao (tới 50%) → giá đội, chưa có cơ chế tách, ảnh hưởng KPI CK",
        "Hàng thử nghiệm tính vào cost → sai giá thành, chưa có giải pháp",
      ],
      forms: [
        "Giá thành sản phẩm (FAST — Kế toán)",
        "Định mức thu hồi NVL (Ghi chép tay, không tập trung — CK)",
      ],
    },
    "CK|5|0": {
      steps: [
        "Thu mua: Giao mẫu NVL mới từ NCC đến CK",
        "CK (Thủ kho): Nhập mẫu thử vào CukCuk/F2Tech (mã riêng)",
        "CK (GS/NV SX): Sơ chế/pha lóc NVL theo SOP/thực tế vận hành",
        "CK (GS): Cân tỷ lệ thu hồi thực tế, ghi nhận định mức",
        "CK: Đóng gói mẫu BTP gửi R&D; phân bổ phần còn lại về cửa hàng",
        "R&D: Test chất lượng mẫu BTP, ra kết quả Duyệt/Không duyệt",
        "Thu mua: (nếu không duyệt) tìm NCC/mẫu mới, lặp lại quy trình",
        "QA: (nếu duyệt) văn bản hóa tiêu chuẩn NVL đầu vào, ban hành cho CK + Thu mua",
      ],
      exceptions: [
        "R&D không duyệt sau nhiều lần thử → tiếp tục thử không giới hạn; nếu không khả thi báo lên BOD",
        "Mẫu thử phân bổ về cửa hàng gây khiếu nại chất lượng → xử lý case-by-case",
        "NCC giao mẫu không đúng quy cách → Thu mua yêu cầu giao lại",
        "Cost mẫu thử tính vào P&L của CK → chưa có giải pháp tách biệt, ảnh hưởng KPI",
      ],
      forms: [
        "Phiếu ghi nhận định mức thu hồi (Ghi chép tay, chưa có mẫu chuẩn — CK)",
        "Kết quả duyệt từ R&D (Zalo — R&D)",
        "Tài liệu tiêu chuẩn NVL từ QA (Chưa nhận được)",
        "Dữ liệu mẫu trên CukCuk/F2Tech (Hệ thống — CK)",
      ],
    },
    "CK|5|1": { note: "Tách riêng khỏi quy trình thử nghiệm NVL. Input là BTP mới (không phải NVL). Cần khai thác điểm khác biệt." },
    "CK|6|0": { note: "CK báo QA khi NVL/BTP không phù hợp; báo côn trùng khi phát sinh. Cần workshop chi tiết hóa." },
    "CK|7|0": { note: "Đề xuất trên 1Office, Dự án duyệt theo phân quyền BOA. Thiếu fast-track khi khẩn cấp." },
    "CK|8|0": { note: "HR tìm ứng viên (WhatsApp), CK phỏng vấn & chốt. Cần xem xét đưa lên ATS/1Office." },
    "CK|8|1": { note: "Chấm công trên 1Office (ngày 2–8); chốt lương qua WhatsApp với C&B. Trả lương ngày 10." },
    "CK|8|2": { note: "Training tổ chức, CK gửi danh sách qua WhatsApp. Chưa ghi nhận kết quả đào tạo — rủi ro tuân thủ." },
    "CK|9|0": { note: "CK phân tích Excel/PPT, BOD chốt (tháng 10–11). Dữ liệu P&L/NXT/OTIF lấy thủ công." },

    // ---------------- TRAINING ----------------
    "TRAINING|0|0": { ref: "TRAINING|0|shared" },
    "TRAINING|0|1": { ref: "TRAINING|0|shared" },
    "TRAINING|0|2": { ref: "TRAINING|0|shared" },
    "TRAINING|0|3": { ref: "TRAINING|0|shared" },
    "TRAINING|0|shared": {
      steps: [
        "OPS (Quản lý cửa hàng): OJT tại cửa hàng bằng tài liệu SOP",
        "OPS: Đánh giá thực hành (Skill Assessment) bằng form giấy",
        "Training: Tổ chức thi lý thuyết tập trung trên TreeAMS (≥80% pass)",
        "Training: Xuất raw data kết quả (TreeAMS → Excel)",
        "Training: Tổng hợp thủ công đếm pass/fail/vắng (Excel)",
        "Training: Gửi báo cáo cho HR + quản lý phòng ban (Email)",
        "Training: NV fail/vắng → gán vào khóa kế tiếp (TreeAMS)",
      ],
      exceptions: [
        "Hệ thống lag, học viên không gửi bài được → kiểm tra mạng, làm lại; báo kỹ thuật TreeAMS",
        "Học viên vắng (có/không phép) → ghi nhận báo cáo HR, chuyển khóa kế tiếp",
        "Học viên fail bài thi → chuyển khóa retake lần 2",
        "NV nghỉ việc nhưng account TreeAMS còn tồn tại → rà soát thủ công, deactive/delete",
        "Điểm danh thực tế quá thấp (vd 2/20) → buộc dừng lớp, tốn chi phí",
      ],
      forms: [
        "Bộ tài liệu SOP vận hành T1–T3 (PDF/Google Docs — Training Leader, Drive cá nhân)",
        "Tài liệu ISM (PDF/Google Docs — Training Leader)",
        "Form báo cáo sau đào tạo (Excel/Google Sheets — Training Leader)",
        "Form điểm danh khóa học (Giấy + Excel — Training Leader)",
      ],
    },
    "TRAINING|1|0": { note: "Chưa có quy trình chi tiết — cần khai thác trigger, các bước gán module theo cấp quản lý, công cụ, đầu ra, ai phê duyệt." },
    "TRAINING|1|1": { note: "Chưa có quy trình chi tiết — cần khai thác form quan sát vận hành ca, tiêu chí đánh giá, cơ chế vấn đáp BGĐ." },
    "TRAINING|2|0": { note: "Chưa có quy trình chi tiết — công cụ thi hiện tại, cách ra đề/bốc đề, ngưỡng pass ≥80%, xử lý fail/retake." },
    "TRAINING|2|1": { note: "Chưa có quy trình chi tiết — ai đánh giá tại cửa hàng, form/tiêu chí, cách ghi nhận & lưu lịch sử năng lực." },
    "TRAINING|2|2": { note: "Chưa có quy trình chi tiết — áp dụng cấp nào, hội đồng gồm ai (BGĐ), tiêu chí đánh giá, gắn thăng tiến." },
    "TRAINING|3|0": {
      steps: [
        "R&D/BD (Chef): Làm món mới thực tế tại bếp",
        "Training: Quan sát & ghi nhận từng bước, định lượng, bảo quản",
        "Training: Biên soạn SOP + thiết kế Recipe Chart (Word/Docs + Canva Pro)",
        "R&D/BD: Xác nhận thông tin SOP (kênh xác nhận chưa rõ)",
        "Training: Ban hành SOP xuống cửa hàng (kênh gửi chưa rõ)",
      ],
      exceptions: [],
      forms: [],
    },
    "TRAINING|3|1": { note: "Chưa có quy trình chi tiết — ai trigger khi QA/Kế toán đổi quy trình, SLA cập nhật, kênh ban hành, versioning tài liệu." },
    "TRAINING|4|0": { ref: "TRAINING|4|shared" },
    "TRAINING|4|1": { ref: "TRAINING|4|shared" },
    "TRAINING|4|2": { ref: "TRAINING|4|shared" },
    "TRAINING|4|shared": {
      steps: [
        "Mr. Cư + Trainer: Chuẩn bị tài liệu (PDF, video) & biên soạn ngân hàng câu hỏi",
        "Training: Upload PDF/video theo module lên TreeAMS",
        "Training: Tạo bài test (gõ tay từng câu + đáp án ABCD, set thời gian)",
        "Training: Tạo khóa học, gắn tài liệu + video + test theo thứ tự",
        "Training: Tạo account học viên (thủ công, không link 1Office)",
        "Training: Gán học viên vào khóa (@ từng người hoặc theo nhóm)",
        "Học viên: Học PDF → video → làm test (≥80% pass)",
        "Training: Theo dõi tiến độ (không có dashboard tổng hợp)",
        "Training: Xuất raw data → lọc/đếm thủ công (Pivot) → email HR + host",
      ],
      exceptions: [
        "Hệ thống lag, học viên không gửi bài được → kiểm tra mạng, báo kỹ thuật TreeAMS",
        "Học viên vắng mặt không phép → ghi nhận báo cáo HR, chuyển khóa tiếp theo",
        "NV đã nghỉ nhưng account vẫn tồn tại → rà soát thủ công, deactive/delete",
        "Cập nhật tài liệu hàng tháng → phải làm lại bộ đề từ đầu (gõ tay)",
      ],
      forms: [],
    },
    "TRAINING|5|0": { note: "Chưa có quy trình chi tiết — tần suất (1 tuần/lần), nội dung lớp, ai đứng lớp, cách ghi nhận & báo cáo HR." },
    "TRAINING|6|0": { note: "Chưa có quy trình chi tiết — đang PENDING ~6 tháng. Cần khai thác checklist audit, tần suất, ai thực hiện." },
    "TRAINING|7|0": { note: "Chưa có quy trình chi tiết — quy trình tiếp nhận yêu cầu từ OPS/MKT/HR/QA, vai trò Host của Training." },

    // ---------------- KETOAN ----------------
    "KETOAN|0|0": {
      steps: [
        "OPS: Gửi file Excel COL forecast tuần (WhatsApp/Email, trước Thứ 6)",
        "KTT: Xuất báo cáo COS% thực tế từ F2 (đầu tháng → Thứ 5)",
        "KTT: Xuất báo cáo khuyến mãi từ F2, tự lọc KM khách / KM nhân viên",
        "KTT: Áp doanh thu forecast từ Finance model vào template",
        "KTT: Nhập COL từ OPS vào template",
        "KTT: Tổng hợp P&L forecast + MenuMix vào template (Thứ 6)",
        "KTT: Gửi P&L + MenuMix cho Mr. Vĩ, OPS, HOO (Thứ 7, trước họp Thứ 2)",
      ],
      exceptions: [
        "OPS gửi COL trễ (sau Thứ 5) → KTT nhắc; nếu vẫn trễ, dùng COL tuần trước hoặc ước tính",
        "Dữ liệu F2 lỗi/không xuất được → báo F2 Tech support, có thể lùi gửi sang sáng Thứ 2",
        "KTT vắng → chưa có SOP backup rõ ràng",
      ],
      forms: [
        "Finance model đầu năm (Excel — GĐ Tài chính cung cấp)",
        "File P&L tuần forecast (Excel — KTT)",
        "Báo cáo COS xuất từ F2 (Excel — KTT)",
        "File COL từ OPS (Excel — OPS gửi, KTT lưu)",
      ],
    },
    "KETOAN|0|1": {
      steps: [
        "KTT: Xuất báo cáo chi tiết bán hàng từng món từng NH từ F2",
        "KTT: Ráp giá vốn định mức vào từng món (Vlookup, theo định mức đã cài trên FAST)",
        "KTT: Tính tổng doanh thu + COS từng món, so sánh sản lượng bán",
        "KTT: Gửi cho OPS, HOO vào Thứ 7 (cùng lúc P&L tuần)",
      ],
      exceptions: [],
      forms: ["File MenuMix tuần (Excel — KTT)"],
    },
    "KETOAN|0|2": { note: "Chưa có quy trình chi tiết — cần workshop bổ sung." },
    "KETOAN|0|3": { note: "Chưa có quy trình chi tiết — cần workshop bổ sung." },
    "KETOAN|0|4": { note: "Chưa có quy trình chi tiết — cần workshop bổ sung." },
    "KETOAN|1|0": {
      steps: [
        "Nhà hàng: Tạo phiếu nhập/xuất/điều chuyển NVL trên F2",
        "KT Giá thành: Đổ dữ liệu NXT từ F2 ra Excel (thủ công)",
        "KT Giá thành: Import vào FAST (import hoặc nhập tay)",
        "KT Giá thành: Cuối tháng — kiểm kê vật lý (hàng trọng yếu 1 tuần/lần, toàn bộ cuối tháng)",
        "KT Giá thành: Tính chênh lệch tồn lý thuyết vs tồn kiểm kê",
        "KT Giá thành: Lập phiếu \"Xuất sử dụng\" cuối tháng để san phẳng tồn FAST = tồn kiểm kê",
        "KT Giá thành → Nhà hàng: Gửi số liệu xác nhận; nếu lệch thì trao đổi điều chỉnh",
      ],
      exceptions: [
        "Nhà hàng nhập sai mã NVL/SL trên F2 → KT phát hiện khi đổ Excel, liên hệ Zalo sửa; không sửa được → lập phiếu bù",
        "Số tồn kiểm kê lệch lớn (không hợp lý) → gửi Excel chênh lệch cho NH giải trình, chấp nhận thì chốt, không thì kiểm tra lại",
        "NH không nộp biên bản kiểm kê đúng hạn → nhắc qua Zalo, vẫn trễ thì báo Manager OPS",
      ],
      forms: [
        "Phiếu nhập/xuất NVL (F2Tech — NH + KT)",
        "File Excel NXT hàng ngày (Excel — KT Giá thành, máy cá nhân)",
        "Biên bản kiểm kê NVL cuối tháng (Giấy + Excel — KT Giá thành)",
        "Phiếu xuất sử dụng cuối tháng (FAST — KT Giá thành)",
      ],
    },
    "KETOAN|1|1": {
      steps: [
        "KT Giá thành: Đến nhà hàng kiểm đếm NVL thực tế (checklist giấy/file)",
        "KT Giá thành: Ghi nhận số kiểm kê, gửi NH xác nhận (Email/Zalo)",
        "Nhà hàng: Xem số kiểm kê, phản hồi nếu có sai lệch",
        "KT Giá thành: Chốt số kiểm kê, làm baseline đầu tháng sau",
      ],
      exceptions: [
        "NH không chịu số kiểm kê → KT giải trình bằng số tồn đầu + số nhập (đối chiếu NCC) + số xuất (NH tự xuất)",
        "Chênh lệch quá lớn, bất thường → kiểm kê lại, xem có phiếu xuất bị bỏ sót",
      ],
      forms: [],
    },
    "KETOAN|1|2": { note: "Chưa có quy trình chi tiết — cần workshop bổ sung." },
    "KETOAN|1|3": {
      steps: [
        "KT Giá thành: Đảm bảo phiếu xuất sử dụng cuối tháng đã đủ và đúng (phụ thuộc kiểm kê NXT hoàn tất)",
        "FAST: Chạy tính giá vốn — phân bổ NVL theo định mức, ra giá vốn từng món (giá trung bình)",
        "KT Giá thành: Xem chênh lệch giá vốn thực vs định mức, gửi NH xem lần cuối",
        "KT Giá thành: Chốt giá vốn, cập nhật vào hóa đơn bán hàng trên FAST",
      ],
      exceptions: [
        "Lô NVL hao hụt tỷ lệ cao (50%) → giá vốn đội mạnh, chưa có cơ chế tách, ảnh hưởng KPI",
        "Định mức sai (R&D cập nhật không kịp) → KT Giá thành điều chỉnh thủ công",
        "Muốn tính giá vốn theo tuần → chưa thực hiện được, nhân lực không đủ + F2 chưa hỗ trợ",
      ],
      forms: [],
    },
    "KETOAN|1|4": {
      steps: [
        "KT Giá thành: Đổ chênh lệch NVL ra Excel (từng NVL, từng NH, số thừa/thiếu, giá trị)",
        "KT Giá thành: Gửi file chênh lệch cho NH/QM (thời hạn giải trình 3–7 ngày)",
        "NH/QM: Giải trình từng NVL lệch, ghi note trực tiếp vào Excel",
        "KT Giá thành: Xem xét giải trình, chấp nhận hoặc đề nghị bồi thường",
        "NH/QM: Chọn hình thức bồi thường (nộp tiền/trừ lương/trừ thưởng, có thể trả góp)",
      ],
      exceptions: [
        "NH không chịu số chênh lệch → KT giải trình bằng số tồn đầu + nhập (đối chiếu NCC) + xuất (NH tự xuất)",
        "Bồi thường lớn, NH xin trả góp → chấp nhận trả góp theo từng tháng (KTT duyệt)",
        "Bếp và Bar cùng chịu trách nhiệm (NH Casual) → tách chênh lệch riêng theo Bếp/Bar",
      ],
      forms: [],
    },
    "KETOAN|2|0": { note: "Chưa có quy trình chi tiết — cần workshop bổ sung (tương tự NXT nhà hàng nhưng cho BTT)." },
    "KETOAN|2|1": { note: "Chưa có quy trình chi tiết — cần workshop bổ sung." },
    "KETOAN|2|2": { note: "Chưa có quy trình chi tiết — cần workshop bổ sung." },
    "KETOAN|2|3": { note: "Chưa có quy trình chi tiết — cần workshop bổ sung." },
    "KETOAN|2|4": {
      steps: [
        "BTT: Xuất hàng cho NQ, tạo phiếu xuất F2 (chỉ số lượng, chưa có giá bán)",
        "KT Kho: Export phiếu xuất F2 ra Excel",
        "KT Kho: Vlookup giá bán từ bảng báo giá NQ vào từng phiếu",
        "KT Kho: Tổng hợp công nợ theo kỳ (1–15 hoặc 16–cuối tháng)",
        "KT Kho: Gửi bảng công nợ + phiếu xuất chi tiết cho NQ (Email/Zalo)",
        "NQ: Đối chiếu, gửi ủy nhiệm chi",
        "KT Kho: Xác nhận nhận tiền, hạch toán vào FAST",
      ],
      exceptions: [
        "NQ trả trễ → gọi điện xác nhận, NQ hẹn ngày",
        "NQ không chấp nhận số liệu → đối chiếu lại phiếu nhận hàng NQ vs phiếu xuất BTT",
        "Bảng báo giá chưa cập nhật kịp kỳ → dùng bảng giá tháng trước hoặc chờ (rủi ro áp sai giá)",
      ],
      forms: [],
    },
    "KETOAN|3|0": {
      steps: [
        "Nhà hàng: Bán hàng + nhập thủ công đơn Grab/Shopee/GSM lên F2",
        "KT Doanh thu: Tải báo cáo từ từng app (Grab/Shopee/GSM/Befood)",
        "KT Doanh thu: So sánh số đơn & giá trị app vs F2",
        "KT Doanh thu: Lọc bill giá = 0, đối chiếu memo khuyến mãi Marketing",
        "KT Doanh thu: Cuối tháng — export F2, import FAST (DT + KM + Recoin + giảm giá + thu tiền)",
      ],
      exceptions: [
        "NH nộp tiền trễ sau 14:00 → gọi điện NH + báo AM/HOO",
        "Tiền thẻ/chuyển khoản không về → liên hệ NH cung cấp link cà thẻ, NH liên hệ ngân hàng",
        "Báo cáo app lệch nhiều hơn NH báo → NH nộp bổ sung; lệch ít hơn → NH tự bổ sung đơn",
      ],
      forms: [],
    },
    "KETOAN|3|1": { note: "Chưa có quy trình chi tiết — cần workshop bổ sung." },
    "KETOAN|3|2": { note: "Chưa có quy trình chi tiết — cần workshop bổ sung." },
    "KETOAN|3|3": { note: "Chưa có quy trình chi tiết — cần workshop bổ sung." },
    "KETOAN|3|4": { note: "Chưa có quy trình chi tiết — cần workshop bổ sung." },
    "KETOAN|3|5": { note: "Chưa có quy trình chi tiết — cần workshop bổ sung." },
    "KETOAN|4|0": { ref: "KETOAN|4|shared01" },
    "KETOAN|4|1": { ref: "KETOAN|4|shared01" },
    "KETOAN|4|shared01": {
      steps: [
        "NH/CK: Tạo phiếu nhập hàng trên F2 (số lượng) khi nhận hàng NCC; gửi phiếu giao hàng giấy cho KT",
        "KT Công nợ: Đối chiếu số lượng + mặt hàng trên F2 với phiếu giao hàng giấy (kiểm tra 100%)",
        "KT Công nợ: Export phiếu nhập F2 ra Excel, Vlookup giá thu mua từ bảng giá",
        "KT Công nợ: Import phiếu nhập có giá vào FAST",
      ],
      exceptions: [],
      forms: [],
    },
    "KETOAN|4|2": { ref: "KETOAN|4|shared23" },
    "KETOAN|4|3": { ref: "KETOAN|4|shared23" },
    "KETOAN|4|shared23": {
      steps: [
        "NCC: Gửi bảng công nợ theo kỳ chốt (tuần/nửa tháng/tháng tùy NCC)",
        "KT Công nợ: Đối chiếu bảng công nợ NCC với FAST",
        "KT Công nợ: Lập bộ hồ sơ đề nghị thanh toán (ĐNTT + biên bản công nợ + hóa đơn GTGT + sổ công nợ FAST + phiếu giao hàng)",
        "KT Thanh toán: Nhận bộ hồ sơ, cập nhật lịch thanh toán, tạo lệnh Internet Banking",
      ],
      exceptions: [],
      forms: [],
    },
    "KETOAN|5|0": { note: "Chưa có quy trình chi tiết — cần workshop bổ sung." },
    "KETOAN|5|1": { note: "Chưa có quy trình chi tiết — cần workshop bổ sung." },
    "KETOAN|5|2": { note: "Chưa có quy trình chi tiết — cần workshop bổ sung." },
    "KETOAN|5|3": { note: "Chưa có quy trình chi tiết — cần workshop bổ sung." },
    "KETOAN|6|0": {
      steps: [
        "KT Tổng hợp: Nhắc/thu thập bảng dự chi từ tất cả phòng ban (đầu tháng)",
        "KT Tổng hợp: Tổng hợp chi theo tuần, so sánh với khả năng thu",
        "KT Tổng hợp → KTT: Gửi bản dự chi cân đối, KTT review",
        "KTT → Mr. Vĩ (GĐ Tài chính): Gửi bản dự chi đã review để duyệt cuối",
        "KT Thanh toán: Lên lịch thanh toán dựa trên dự chi đã duyệt",
      ],
      exceptions: [],
      forms: [],
    },
    "KETOAN|6|1": {
      steps: [
        "KT Thanh toán: Nhận bộ hồ sơ ĐNTT (giấy), kiểm tra đủ chứng từ",
        "KT Thanh toán: Cập nhật lịch thanh toán trên Excel",
        "KT Thanh toán: Tạo lệnh chuyển khoản trên Internet Banking",
        "KT Thanh toán: Xuất báo cáo các lệnh chưa chi, gửi KTT xem trước",
        "KTT: Duyệt lệnh cấp 1 trên app Internet Banking",
        "BOD: Duyệt lệnh cấp 2 → tiền đi (bắt buộc 2 cấp, không thể bỏ qua)",
        "KT Thanh toán: Hạch toán giao dịch bank vào FAST (từ bảng kê IB)",
      ],
      exceptions: [
        "KTT hoặc BOD vắng — lệnh không được duyệt → chờ đến khi có mặt, chưa có quy trình backup",
        "NCC hỏi tiền chưa về → KT Thanh toán kiểm tra IB, xác nhận với ngân hàng",
        "Lịch chi bị dồn (nhiều ĐNTT cùng ngày) → ưu tiên theo mức độ cấp thiết, thương lượng phòng ban",
      ],
      forms: [],
    },
    "KETOAN|6|2": { note: "Chưa có quy trình chi tiết — cần workshop bổ sung." },
    "KETOAN|6|3": { note: "Chưa có quy trình chi tiết — cần workshop bổ sung." },
    "KETOAN|6|4": { note: "Chưa có quy trình chi tiết — cần workshop bổ sung." },
    "KETOAN|6|5": { note: "Chưa có quy trình chi tiết — cần workshop bổ sung." },
    "KETOAN|7|0": {
      steps: [
        "Marketing: Tạo memo khuyến mãi/món mới trên 1Office, gửi link sau khi duyệt",
        "KT Tổng hợp: Nhận memo, tạo mã món/tên/đơn vị tính trên FAST (mã FAST là master)",
        "KT Tổng hợp: Copy tay mã + thông tin sang F2, nhập thêm giá bán",
      ],
      exceptions: [],
      forms: [],
    },
    "KETOAN|7|1": { note: "Chưa có quy trình chi tiết — cần workshop bổ sung." },
    "KETOAN|7|2": { note: "Chưa có quy trình chi tiết — cần workshop bổ sung." },
    "KETOAN|8|0": { note: "Chưa có quy trình chi tiết — cần workshop bổ sung." },
    "KETOAN|9|0": {
      note: "Chưa có chi tiết đầy đủ — cần workshop BU chuyên sâu. Phạm vi dự kiến: KTTH (Leader) theo dõi tiến độ từng KT viên, phát hiện điểm nghẽn, hỗ trợ nghiệp vụ, escalate lên KTT khi cần. Ảnh hưởng trực tiếp SLA báo cáo cuối tháng.",
    },
    "KETOAN|10|0": {
      note: "Chưa có chi tiết đầy đủ — kế toán thuế đang thuê ngoài. Phạm vi dự kiến: kê khai VAT hàng tháng, TNDN quý/năm, TNCN, sổ sách thuế, làm việc cơ quan thuế, quyết toán cuối năm.",
    },
  };

  return { CORE_IDS, nodeMeta, edgeDefs, internalNV, level2NV, level3Detail };
})();
