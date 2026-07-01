<div class="container-fluid">
  
  <div class="row g-3 mb-4">
    <div class="col-12 col-sm-6 col-xl-3">
      <div class="card bg-primary text-white p-3 h-100 d-flex flex-row align-items-center justify-content-between shadow-sm">
        <div>
          <h6 class="text-uppercase opacity-75">ນັກສຶກສາທັງໝົດ</h6>
          <h2 class="fw-bold mb-0" id="adminTotalStudents">0</h2>
        </div>
        <i class="fa-solid fa-graduation-cap fa-3x opacity-25"></i>
      </div>
    </div>
    <div class="col-12 col-sm-6 col-xl-3">
      <div class="card bg-success text-white p-3 h-100 d-flex flex-row align-items-center justify-content-between shadow-sm">
        <div>
          <h6 class="text-uppercase opacity-75">ລົງທະບຽນແລ້ວ</h6>
          <h2 class="fw-bold mb-0" id="adminRegCount">0</h2>
        </div>
        <i class="fa-solid fa-user-check fa-3x opacity-25"></i>
      </div>
    </div>
    <div class="col-12 col-sm-6 col-xl-3">
      <div class="card bg-danger text-white p-3 h-100 d-flex flex-row align-items-center justify-content-between shadow-sm">
        <div>
          <h6 class="text-uppercase opacity-75">ຍັງບໍ່ມາໃຊ້ສິດ</h6>
          <h2 class="fw-bold mb-0" id="adminPendingCount">0</h2>
        </div>
        <i class="fa-solid fa-user-clock fa-3x opacity-25"></i>
      </div>
    </div>
    <div class="col-12 col-sm-6 col-xl-3">
      <div class="card bg-dark text-white p-3 h-100 shadow-sm">
        <h6 class="text-uppercase opacity-75"><i class="fa-solid fa-gear me-1 text-warning"></i> ສະຖານະລະບົບ</h6>
        <div class="d-flex align-items-center justify-content-between mt-2">
          <span class="badge fs-6" id="systemStatusBadge">ກຳລັງໂຫຼດ...</span>
          <div class="btn-group btn-group-sm">
            <button class="btn btn-outline-success" onclick="changeSystemStatus('OPEN')">ເປີດ</button>
            <button class="btn btn-outline-danger" onclick="changeSystemStatus('CLOSE')">ປິດ</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-xxl-4 col-xl-5 mb-4">
      <div class="card p-4 shadow-sm h-100">
        <h5 class="fw-bold text-navy mb-3 border-bottom pb-2" id="formTitle">
          <i class="fa-solid fa-user-plus me-2 text-primary"></i>ຈັດການຂໍ້ມູນນັກສຶກສາ
        </h5>
        <form id="adminStudentForm">
          <div class="mb-3">
            <label class="form-label fw-bold">ລະຫັດນັກສຶກສາ</label>
            <input type="text" id="admin_student_id" class="form-control" required placeholder="ໃສ່ລະຫັດນັກສຶກສາ">
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">ຊື່ ແລະ ນາມສະກຸນ</label>
            <input type="text" id="admin_full_name" class="form-control" required placeholder="ທ້າວ/ນາງ...">
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">ສາຂາວິຊາ</label>
            <select id="admin_major" class="form-select" required>
              <option value="">-- ເລືອກສາຂາ --</option>
              <option value="Information Technology">BIT</option>
              <option value="Computer Science">BMT</option>
              <option value="Computer Engineering">BNT</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold">ອາຈານທີ່ປຶກສາ</label>
            <input type="text" id="admin_advisor" class="form-control" required placeholder="ຊື່ອາຈານທີ່ປຶກສາ">
          </div>
          <div class="mb-4">
            <label class="form-label fw-bold">ອັບໂຫຼດຮູບຖ່າຍ (URL)</label>
            <input type="url" id="admin_photo_url" class="form-control" placeholder="https://example.com/photo.jpg">
          </div>
          
          <div class="d-flex gap-2">
            <button type="submit" class="btn btn-primary w-100 py-2" id="btnSaveStudent">
              <i class="fa-solid fa-floppy-disk me-1"></i> ບັນທຶກຂໍ້ມູນ
            </button>
            <button type="button" class="btn btn-secondary w-50 py-2" onclick="resetAdminForm()">
              ຍົກເລີກ
            </button>
          </div>
        </form>

        <div class="mt-4 pt-3 border-top">
          <h6><i class="fa-solid fa-file-import me-1 text-success"></i> ນຳເຂົ້າຂໍ້ມູນດ່ວນ</h6>
          <button class="btn btn-outline-success btn-sm w-100 mt-2" onclick="importFromDatabase()">
            <i class="fa-solid fa-database me-1"></i> Sync/ດຶງຂໍ້ມູນຈາກຖານຂໍ້ມູນນັກສຶກສາເດີມ
          </button>
        </div>
      </div>
    </div>

    <div class="col-xxl-8 col-xl-7 mb-4">
      <div class="card p-3 shadow-sm h-100">
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
          <h5 class="fw-bold text-secondary mb-0">
            <i class="fa-solid fa-table-list me-2 text-success"></i>ລາຍຊື່ນັກສຶກສາທັງໝົດ ແລະ ສະຖານະ
          </h5>
          <div class="btn-group shadow-sm">
            <button class="btn btn-light btn-sm border" onclick="exportData('excel')"><i class="fa-solid fa-file-excel text-success me-1"></i> Excel</button>
            <button class="btn btn-light btn-sm border" onclick="exportData('pdf')"><i class="fa-solid fa-file-pdf text-danger me-1"></i> PDF</button>
            <button class="btn btn-light btn-sm border" onclick="window.print();"><i class="fa-solid fa-print text-dark me-1"></i> ພິມລາຍງານ</button>
          </div>
        </div>

        <div class="table-responsive">
          <table id="adminMasterTable" class="table table-bordered table-striped table-hover w-100 align-middle">
            <thead class="table-dark text-center">
              <tr>
                <th>ລະຫັດ</th>
                <th>ຊື່ ແລະ ນາມສະກຸນ</th>
                <th>ສາຂາ</th>
                <th>ສະຖານະ</th>
                <th>ຈັດການ</th>
              </tr>
            </thead>
            <tbody>
              </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

</div>

<style>
  .text-navy { color: #1e3c72; }
  .table th { font-weight: 600; font-size: 0.9rem; }
  .table td { font-size: 0.9rem; }
  .badge-status-yes { background-color: #198754; color: white; }
  .badge-status-no { background-color: #dc3545; color: white; }
  
  @media print {
    body * { visibility: hidden; }
    #adminMasterTable, #adminMasterTable * { visibility: visible; }
    #adminMasterTable { position: absolute; left: 0; top: 0; width: 100%; }
  }
</style>
