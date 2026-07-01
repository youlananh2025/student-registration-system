<div class="container mt-4">
  <div class="row text-center mb-4">
    <div class="col-md-4 mb-2">
      <div class="card bg-primary text-white p-3 shadow-sm rounded-3">
        <h5><i class="fa-solid fa-users me-2"></i>ນັກສຶກສາທັງໝົດ</h5>
        <h2 id="dashTotal" class="fw-bold">0</h2>
      </div>
    </div>
    <div class="col-md-4 mb-2">
      <div class="card bg-success text-white p-3 shadow-sm rounded-3">
        <h5><i class="fa-solid fa-user-check me-2"></i>ລົງທະບຽນແລ້ວ</h5>
        <h2 id="dashReg" class="fw-bold">0</h2>
      </div>
    </div>
    <div class="col-md-4 mb-2">
      <div class="card bg-danger text-white p-3 shadow-sm rounded-3">
        <h5><i class="fa-solid fa-user-clock me-2"></i>ຍັງບໍ່ລົງທະບຽນ</h5>
        <h2 id="dashNotReg" class="fw-bold">0</h2>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-lg-6 mb-4">
      <div class="card shadow-sm border-0 rounded-3">
        <div class="card-header bg-dark text-white p-3 fw-bold">
          <i class="fa-solid fa-pen-to-square me-2 text-warning"></i>ຟອມລົງທະບຽນ & ອັບເດດຂໍ້ມູນການຝຶກງານ
        </div>
        <div class="card-body p-4">
          
          <form id="regForm">
            <div class="mb-3">
              <label class="form-label fw-bold">ລະຫັດນັກສຶກສາ</label>
              <input type="text" id="student_id_form" name="student_id" readonly class="form-control bg-light fw-bold text-primary">
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold">ຊື່ ແລະ ນາມສະກຸນ</label>
              <input type="text" id="student_name" name="student_name" readonly class="form-control bg-light">
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold">ເບີໂທລະສັບຂອງທ່ານ <span class="text-danger">*</span></label>
              <input type="text" id="student_phone" name="student_phone" class="form-control" placeholder="ຕົວຢ່າງ: 020 XXXXXXXX" required>
            </div>

            <hr class="my-4 text-muted">
            <h5 class="text-primary mb-3"><i class="fa-solid fa-building me-2"></i><b>ຂໍ້ມູນສະຖານທີ່ຝຶກງານ</b></h5>

            <div class="mb-3">
              <label class="form-label fw-bold">ຊື່ສະຖານທີ່ຝຶກງານ <span class="text-danger">*</span></label>
              <input type="text" id="company_name" name="company_name" class="form-control" placeholder="ຊື່ບໍລິສັດ, ຮ້ານ ຫຼື ອົງກອນ" required>
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold">ປະເພດສະຖານທີ່ຝຶກງານ <span class="text-danger">*</span></label>
              <select id="company_type" name="company_type" class="form-select" required>
                <option value="" disabled selected>--- ກະລຸນາເລືອກປະເພດ ---</option>
                <option value="ເອກະຊົນ">ບໍລິສັດເອກະຊົນ</option>
                <option value="ລັດຖະບານ">ລັດຖະບານ</option>
                <option value="ລັດວິສາຫະກິດ">ລັດວິສາຫະກິດ</option>
                <option value="ອົງກອນສາກົນ">ອົງກອນສາກົນ (NGO)</option>
              </select>
            </div>

            <div class="row">
              <div class="col-md-4 mb-3">
                <label class="form-label fw-bold">ບ້ານ <span class="text-danger">*</span></label>
                <input type="text" id="village" name="village" class="form-control" placeholder="ບ້ານ" required>
              </div>
              <div class="col-md-4 mb-3">
                <label class="form-label fw-bold">ເມືອງ <span class="text-danger">*</span></label>
                <input type="text" id="district" name="district" class="form-control" placeholder="ເມືອງ" required>
              </div>
              <div class="col-md-4 mb-3">
                <label class="form-label fw-bold">ແຂວງ <span class="text-danger">*</span></label>
                <input type="text" id="province" name="province" class="form-control" placeholder="ແຂວງ" required>
              </div>
            </div>

            <hr class="my-4 text-muted">
            <h5 class="text-success mb-3"><i class="fa-solid fa-address-book me-2"></i><b>ຂໍ້ມູນຜູ້ປະສານງານ / ຫົວໜ້າບ່ອນຝຶກງານ</b></h5>

            <div class="mb-3">
              <label class="form-label fw-bold">ຊື່ຫົວໜ້າຜູ້ນຳພາຝຶກງານ ຫຼື ຜູ້ຕິດຕໍ່ <span class="text-danger">*</span></label>
              <input type="text" id="contact_person" name="contact_person" class="form-control" placeholder="ຊື່ ແລະ ນາມສະກຸນ" required>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">ຕຳແໜ່ງ <span class="text-danger">*</span></label>
                <input type="text" id="contact_position" name="contact_position" class="form-control" placeholder="ຕົວຢ່າງ: ຫົວໜ້າແຜນກ IT" required>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label fw-bold">ເບີໂທຕິດຕໍ່ຜູ້ປະສານງານ <span class="text-danger">*</span></label>
                <input type="text" id="contact_phone" name="contact_phone" class="form-control" placeholder="ເບີໂທຕິດຕໍ່" required>
              </div>
            </div>

            <div class="d-grid mt-4">
              <button type="submit" class="btn btn-success p-2 fs-5 fw-bold rounded-3 shadow-sm">
                <i class="fa-solid fa-floppy-disk me-2"></i>ບັນທຶກ / ອັບເດດຂໍ້ມູນ
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>

    <div class="col-lg-6">
      <div class="card shadow-sm border-0 rounded-3 mb-4">
        <div class="card-body p-3" style="height: 220px; position: relative;">
          <canvas id="summaryChart"></canvas>
        </div>
      </div>

      <div class="card shadow-sm border-0 rounded-3">
        <div class="card-header bg-dark text-white p-3 fw-bold">
          <i class="fa-solid fa-list-check me-2 text-success"></i>ລາຍຊື່ນັກສຶກສາທີ່ລົງທະບຽນສຳເລັດແລ້ວ
        </div>
        <div class="card-body p-3">
          <div class="table-responsive">
            <table id="regTable" class="table table-striped table-hover align-middle w-100" style="font-size: 0.9rem;">
              <thead class="table-dark text-center">
                <tr>
                  <th style="width: 25%">ລະຫັດ</th>
                  <th style="width: 35%">ຊື່ ແລະ ນາມສະກຸນ</th>
                  <th style="width: 40%">ສະຖານທີ່ຝຶກງານ</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  $(document).ready(function() {
    // ດຶງຂໍ້ມູນການລົງທະບຽນເກົ່າມາສະແດງ (Autofill ຖ້າມີຂໍ້ມູນ)
    if (currentUser && currentUser.id) {
      google.script.run.withSuccessHandler(function(regInfo) {
        if (regInfo) {
          // 🔄 ກໍລະນີມີຂໍ້ມູນເກົ່າ: ເອົາຂໍ້ມູນມາຢອດໃສ່ຟອມທຸກຊ່ອງ
          $('#student_phone').val(regInfo.phone || '');
          $('#company_name').val(regInfo.company_name || '');
          $('#company_type').val(regInfo.company_type || '');
          $('#village').val(regInfo.village || '');
          $('#district').val(regInfo.district || '');
          $('#province').val(regInfo.province || '');
          $('#contact_person').val(regInfo.contact_person || '');
          $('#contact_position').val(regInfo.contact_position || '');
          $('#contact_phone').val(regInfo.contact_phone || '');
        } else {
          // ✨ ກໍລະນີເປັນນັກສຶກສາໃໝ່: ບັງຄັບໃຫ້ທຸກຊ່ອງຫວ່າງເປົ່າທັງໝົດ
          $('#student_phone').val('');
          $('#company_name').val('');
          $('#company_type').val(''); // ປ່ອຍໃຫ້ກັບໄປເລືອກ '--- ກະລຸນາເລືອກປະເພດ ---'
          $('#village').val('');
          $('#district').val('');
          $('#province').val('');
          $('#contact_person').val('');
          $('#contact_position').val('');
          $('#contact_phone').val('');
        }
      }).getRegistrationDetails(currentUser.id);
    }
  });
</script>
