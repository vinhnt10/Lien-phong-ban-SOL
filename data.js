// =====================================================================
// DỮ LIỆU DÙNG CHUNG cho sơ đồ liên kết phòng ban SOL (2D & 3D)
// -----------------------------------------------------------------
// File này là NGUỒN DỮ LIỆU DUY NHẤT. Khi có tài liệu khảo sát mới
// hoặc cần cập nhật nghiệp vụ / phòng ban, CHỈ CẦN SỬA FILE NÀY —
// cả sol-department-network.html (2D) và sol-department-network-3d.html
// (3D) sẽ tự động dùng dữ liệu mới, không cần sửa code hiển thị.
//
// Cách cập nhật:
// 1. "nodeMeta"   — thêm/sửa phòng ban (id, label). Với 5 phòng đã có
//                   file khảo sát chi tiết, thêm id đó vào mảng CORE.
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
// (đường dẫn gốc: docs/SOL/6.Workshop_Survey_Record/Phan-tich-sau-survey-final/)
// =====================================================================

window.SOL_NETWORK_DATA = (function () {
  const CORE_IDS = ["CK", "TRAINING", "KETOAN", "QAQC", "THUMUA"];

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
  };

  return { CORE_IDS, nodeMeta, edgeDefs, internalNV };
})();
