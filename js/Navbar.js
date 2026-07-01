<nav class="navbar navbar-expand-lg navbar-dark nav-bg shadow-sm sticky-top">
  <div class="container-fluid px-4">
    
    <a class="navbar-brand d-flex align-items-center" href="#" onclick="location.reload();">
      <i class="fa-solid fa-graduation-cap fa-lg text-warning me-2"></i>
      <span class="fw-bold fs-5 tracking-wide d-none d-sm-inline">
        ລະບົບລົງທະບຽນການເຝຶກຫັດວິຊາຊີບ <span class="badge bg-warning text-dark fs-6 ms-1">FIT SKU</span>
      </span>
      <span class="fw-bold fs-5 tracking-wide d-inline d-sm-none">
        FIT-SKU Internship
      </span>
    </a>

    <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto align-items-lg-center">
        
        <li class="nav-item me-lg-3 my-2 my-lg-0">
          <span class="nav-link text-white bg-white bg-opacity-10 rounded-pill px-3 py-1.5 d-inline-flex align-items-center">
            <i class="fa-solid fa-user-circle me-2 text-warning"></i>
            <span id="navUserDisplay">ກຳລັງໂຫຼດຂໍ້ມູນ...</span>
          </span>
        </li>

        <li class="nav-item d-none" id="adminToggleMenu">
          <button class="btn btn-outline-warning btn-sm rounded-pill px-3 me-lg-2" onclick="toggleAdminStudentView()">
            <i class="fa-solid fa-rectangle-list me-1"></i> ສະຫຼັບມຸມມອງ Admin
          </button>
        </li>

        <li class="nav-item mt-2 mt-lg-0">
          <button class="btn btn-danger btn-sm rounded-pill px-3 w-100" onclick="logout()">
            <i class="fa-solid fa-right-from-bracket me-1"></i> ອອກຈາກລະບົບ
          </button>
        </li>

      </ul>
    </div>

  </div>
</nav>

<style>
  /* ຕົບແຕ່ງເພີ່ມເຕີມເພື່ອຄວາມສວຍງາມ */
  .nav-bg {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%) !important;
  }
  .navbar-brand:hover {
    opacity: 0.9;
  }
  .tracking-wide {
    letter-spacing: 0.5px;
  }
</style>
