<script>
// ເກັບຂໍ້ມູນຜູ້ໃຊ້ທີ່ກຳລັງ Login ຢູ່
let currentUser = null;

$(document).ready(function() {
  // ==========================================
  // 1. ຈັດການການເຂົ້າສູ່ລະບົບ (Login Form)
  // ==========================================
$('#loginForm').on('submit', function(e) {
  e.preventDefault();
  Swal.fire({ title: 'ກຳລັງກວດສອບ...', didOpen: () => { Swal.showLoading() } });
  
  const user = $('#username').val().trim();
  const pass = $('#password').val().trim();
  
  // ເອີ້ນໃຊ້ຟັງຊັນໃນ Code.gs
  google.script.run
    .withSuccessHandler(function(response) {
      Swal.close();
      if (response.status === 'success') {
        currentUser = response; // ເກັບຂໍ້ມູນຜູ້ໃຊ້ໄວ້ໃນຕົວແປ Global
        
        $('#loginPage').addClass('d-none');
        $('#mainApp').removeClass('d-none');
        
        // ກວດສອບສິດ ແລະ ແຍກໜ້າຈໍ
        if (response.role === 'Admin' || response.role === 'admin') {
          loadAdminView();
        } else {
          loadStudentView();
        }
      } else {
        Swal.fire('ແຈ້ງເຕືອນ', response.message, 'warning');
      }
    })
    .withFailureHandler(function(err) {
      Swal.close();
      Swal.fire('ຜິດພາດຮ້າຍແຮງ', 'ບໍ່ສາມາດເຊື່ອມຕໍ່ຟັງຊັນ loginUser ໃນ Backend ໄດ້. ກະລຸນາກວດສອບວ່າໄດ້ Save ແລະ Deploy ລະບົບແລ້ວຫຼືບໍ່? ລາຍລະອຽດ: ' + err.toString(), 'error');
    })
    .loginUser(user, pass); // <--- ຕ້ອງຊື່ໃຫ້ຕົງກັບໃນ Code.gs ເປະໆ
});

  // ==========================================
  // 2. ຈັດການຟອມລົງທະບຽນ/ແກ້ໄຂ (ຝັ່ງນັກສຶກສາ)
  // ==========================================
$(document).on('submit', '#regForm', function(e) {
  e.preventDefault();
  
  Swal.fire({
    title: 'ຢືນຢັນການບັນທຶກ?',
    text: "ທ່ານຕ້ອງການບັນທຶກ ຫຼື ອັບເດດຂໍ້ມູນການຝຶກງານນີ້ ຫຼື ບໍ່?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#198754',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'ຢືນຢັນ',
    cancelButtonText: 'ຍົກເລີກ'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({ title: 'ກຳລັງປະມວນຜົນ...', didOpen: () => { Swal.showLoading() } });
      
      // 💡 ວິທີໃໝ່: ດຶງຂໍ້ມູນທຸກຊ່ອງໃນຟອມອັດຕະໂນມັດ ຜ່ານ attribute 'name' ຂອງ Input
      const formData = {};
      const formArray = $(this).serializeArray();
      $.each(formArray, function() {
        formData[this.name] = this.value;
      });
      
      // ເພີ່ມລາຍການ ID ເຂົ້າໄປເພີ່ມເຕີມເພື່ອຄວາມແນ່ນອນ
      formData['student_id'] = $('#student_id_form').val() || (currentUser ? currentUser.id : '');
      
      // ສົ່ງໄປຫາ Backend (Code.gs)
      google.script.run
        .withSuccessHandler(function(res) {
          Swal.close();
          if (res.status === 'success') {
            Swal.fire('ສຳເລັດ!', res.message, 'success');
            refreshDashboard(); // ໂຫຼດ Dashboard ໃໝ່ທັນທີ
          } else {
            Swal.fire('ຜິດພາດ!', res.message, 'error');
          }
        })
        .withFailureHandler(function(err) {
          Swal.close();
          Swal.fire('ຜິດພາດຮ້າຍແຮງ', 'ບໍ່ສາມາດເຊື່ອມຕໍ່ Server ໄດ້: ' + err.toString(), 'error');
        })
        .saveRegistration(formData);
    }
  });
});

  // ==========================================
  // 3. ຈັດການຟອມ ເພີ່ມ/ແກ້ໄຂ ນັກສຶກສາ (ຝັ່ງ Admin)
  // ==========================================
  $(document).on('submit', '#adminStudentForm', function(e) {
    e.preventDefault();
    Swal.fire({ title: 'ກຳລັງບັນທຶກຂໍ້ມູນ...', didOpen: () => { Swal.showLoading() } });
    
    const studentData = {
      student_id: $('#admin_student_id').val().trim(),
      full_name: $('#admin_full_name').val().trim(),
      major: $('#admin_major').val(),
      advisor: $('#admin_advisor').val().trim()
    };
    
    google.script.run.withSuccessHandler(function(res) {
      if (res.status === 'success') {
        Swal.fire('ສຳເລັດ!', 'ບັນທຶກຂໍ້ມູນນັກສຶກສາຮຽບຮ້ອຍ', 'success');
        resetAdminForm();
        refreshAdminDashboard(); // ໂຫຼດຕາຕະລາງຝັ່ງ Admin ໃໝ່
      } else {
        Swal.fire('ຜິດພາດ!', res.message, 'error');
      }
    }).saveStudentFromAdmin(studentData);
  });
});

// ໂຫຼດໜ້າຈໍຝັ່ງ ນັກສຶກສາ
function loadStudentView() {
  if(currentUser) {
    $('#navUserDisplay').text(currentUser.name + " (" + currentUser.id + ")");
  }
  
  // 🔒 ປ້ອງກັນຄວາມປອດໄພ: ຖ້າບົດບາດບໍ່ແມ່ນ Admin ໃຫ້ຊ່ອນປຸ່ມສະຫຼັບໜ້າຈໍຖິ້ມທັນທີ!
  if (currentUser && (currentUser.role === 'Admin' || currentUser.role === 'admin')) {
    $('#adminToggleMenu').removeClass('d-none'); // ເຫັນສະເພາະ Admin
  } else {
    $('#adminToggleMenu').addClass('d-none');    // ນັກສຶກສາທົ່ວໄປຈະຖືກຊ່ອນ ບໍ່ສາມາດກົດໄດ້
  }
  
  google.script.run.withSuccessHandler(function(html) {
    $('#viewContainer').html(html);
    if(currentUser) {
      $('#student_id_form').val(currentUser.id);
      $('#student_name').val(currentUser.name);
    }
    refreshDashboard();
  }).include('StudentView');
}

// ໂຫຼດໜ້າຈໍຝັ່ງ Admin
function loadAdminView() {
  $('#navUserDisplay').text("ຜູ້ເບິ່ງແຍງລະບົບ (Admin)");
  $('#adminToggleMenu').removeClass('d-none'); // Admin ເຫັນປຸ່ມສະຫຼັບມຸມມອງໄດ້ເປັນປົກກະຕິ
  
  google.script.run.withSuccessHandler(function(html) {
    $('#viewContainer').html(html);
    refreshAdminDashboard();
  }).include('AdminView');
}

// ==========================================
// 6. ຣີເຟຣຊ Dashboard & ຕາຕະລາງສີດຳ (Student)
// ==========================================
function refreshDashboard() {
  google.script.run.withSuccessHandler(function(data) {
    $('#dashTotal').text(data.total);
    $('#dashReg').text(data.registered);
    $('#dashNotReg').text(data.notRegistered);
    
    // ✅ ປ້ອງກັນບັກ DataTable ບໍ່ທັນໂຫຼດ
    if (typeof $.fn.DataTable !== 'undefined') {
      if ($.fn.DataTable.isDataTable('#regTable')) {
        $('#regTable').DataTable().destroy();
      }
      
      let rows = '';
      data.registeredList.forEach(row => {
        rows += `<tr><td class="fw-bold">${row[0]}</td><td>${row[1]}</td><td><i class="fa-solid fa-building text-secondary me-2"></i>${row[2]}</td></tr>`;
      });
      $('#regTable tbody').html(rows);
      
      $('#regTable').DataTable({ 
        pageLength: 5, 
        destroy: true,
        language: { search: "ຄົ້ນຫາຊື່/ລະຫັດ:", emptyTable: "ຍັງບໍ່ມີຂໍ້ມູນການລົງທະບຽນ" } 
      });
    }
    
    // ສ້າງກຣາຟວົງມົນ
    const canvas = document.getElementById('summaryChart');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (window.myCurrentChart) { window.myCurrentChart.destroy(); }
      window.myCurrentChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['ລົງທະບຽນແລ້ວ', 'ຍັງບໍ່ລົງທະບຽນ'],
          datasets: [{ data: [data.registered, data.notRegistered], backgroundColor: ['#198754', '#dc3545'] }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    }
  }).getDashboardData();
}

// ==========================================
// 7. ຣີເຟຣຊ Dashboard & ຕາຕະລາງທັງໝົດ (Admin)
// ==========================================
function refreshAdminDashboard() {
  google.script.run.withSuccessHandler(function(data) {
    $('#adminTotalStudents').text(data.total);
    $('#adminRegCount').text(data.registered);
    $('#adminPendingCount').text(data.notRegistered);
    
    if (typeof $.fn.DataTable !== 'undefined') {
      if ($.fn.DataTable.isDataTable('#adminMasterTable')) {
        $('#adminMasterTable').DataTable().destroy();
      }
      
      let rows = '';
      data.masterList.forEach(row => {
        let statusClass = (row[4] === 'ລົງທະບຽນແລ້ວ') ? 'badge-status-yes' : 'badge-status-no';
        rows += `<tr>
          <td class="text-center fw-bold">${row[0]}</td>
          <td>${row[1]}</td>
          <td>${row[2]}</td>
          <td class="text-center"><span class="badge ${statusClass} rounded-pill p-2">${row[4] || 'ຍັງບໍ່ລົງທະບຽນ'}</span></td>
          <td class="text-center">
            <div class="btn-group btn-group-sm">
              <button class="btn btn-outline-warning" onclick="editStudent('${row[0]}')"><i class="fa-solid fa-user-gear"></i></button>
            </div>
          </td>
        </tr>`;
      });
      
      $('#adminMasterTable tbody').html(rows);
      $('#adminMasterTable').DataTable({ pageLength: 10, destroy: true });
    }
    checkInitialSystemStatus(); // ໂຫຼດປຸ່ມ ສະຖານະ ປິດ-ເປີດ ລະບົບ
  }).getDashboardData();
}

// ==========================================
// 8. ຟັງຊັນຍ່ອຍຂອງ Admin (ປ່ຽນສະຖານະ, ແກ້ໄຂ, ສົ່ງອອກ Excel)
// ==========================================
function changeSystemStatus(status) {
  Swal.fire({ title: 'ກຳລັງປ່ຽນສະຖານະ...', didOpen: () => { Swal.showLoading() } });
  google.script.run.withSuccessHandler(function(res) {
    Swal.close();
    let badge = $('#systemStatusBadge');
    if(res.current === 'OPEN') {
      badge.text('ເປີດໃຫ້ລົງທະບຽນ').removeClass('bg-danger').addClass('bg-success');
    } else {
      badge.text('ປິດລະບົບແລ້ວ').removeClass('bg-success').addClass('bg-danger');
    }
    Swal.fire('ສຳເລັດ', 'ປ່ຽນສະຖານະລະບົບເປັນ: ' + (res.current === 'OPEN' ? 'ເປີດ' : 'ປິດ'), 'success');
  }).toggleSystemStatus(status);
}

function checkInitialSystemStatus() {
  google.script.run.withSuccessHandler(function(status) {
    let badge = $('#systemStatusBadge');
    if(status === 'OPEN') {
      badge.text('ເປີດໃຫ້ລົງທະບຽນ').addClass('bg-success').removeClass('bg-danger');
    } else {
      badge.text('ปิดระบบแล้ว').addClass('bg-danger').removeClass('bg-success');
    }
  }).getSystemStatus();
}

function editStudent(id) {
  Swal.fire({ title: 'ກຳລັງດຶງຂໍ້ມູນ...', didOpen: () => { Swal.showLoading() } });
  google.script.run.withSuccessHandler(function(student) {
    Swal.close();
    if(student) {
      $('#admin_student_id').val(student.id).attr('readonly', true);
      $('#admin_full_name').val(student.name);
      $('#admin_major').val(student.major);
      $('#admin_advisor').val(student.advisor);
      $('#formTitle').html('<i class="fa-solid fa-user-gear me-2 text-warning"></i>ແກ້ໄຂຂໍ້ມູນນັກສຶກສາ');
    }
  }).getStudentDetails(id);
}

function resetAdminForm() {
  $('#adminStudentForm')[0].reset();
  $('#admin_student_id').removeAttr('readonly');
  $('#formTitle').html('<i class="fa-solid fa-user-plus me-2 text-primary"></i>ຈັດການຂໍ້ມູນນັກສຶກສາ');
}

function exportData(type) {
  if (type === 'excel') {
    let excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'></head><body><table>";
    excelFile += $('#adminMasterTable').html();
    excelFile += "</table></body></html>";
    let blob = new Blob([excelFile], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "ລາຍຊື່ນັກສຶກສາ.xls";
    link.click();
  } else if (type === 'pdf') {
    window.print();
  }
}

// ==========================================
// 9. ປຸ່ມອອກຈາກລະບົບ & ສະຫຼັບໜ້າ (Logout)
// ==========================================
function logout() {
  Swal.fire({
    title: 'ອອກຈາກລະບົບ?',
    text: "ທ່ານຕ້ອງການອອກຈາກລະບົບແທ້ຫຼືບໍ່?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'ອອກຈາກລະບົບ',
    cancelButtonText: 'ຍົກເລີກ'
  }).then((result) => {
    if (result.isConfirmed) {
      currentUser = null;
      $('#mainApp').addClass('d-none');
      $('#loginPage').removeClass('d-none');
      $('#loginForm')[0].reset();
      Swal.fire({ icon: 'success', title: 'ອອກຈາກລະບົບສຳເລັດ', timer: 1000, showConfirmButton: false });
    }
  });
}

function toggleAdminStudentView() {
  if ($('#adminMasterTable').length) {
    loadStudentView();
  } else {
    loadAdminView();
  }
}
</script>
