const SPREADSHEET_ID = '1NKt-Ayj52irJqoQbF9W_BgcXC1iKcU_3ggfWm27zLk4';

function doGet(e) {
  return HtmlService.createTemplateFromFile('Index')
      .evaluate()
      .setTitle('ລະບົບລົງທະບຽນຝຶກຫັດວິຊາຊີບ - IT SKU')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// ຟັງຊັນການເຂົ້າສູ່ລະບົບ (Student & Admin)
function loginUser(username, password) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet(); 
    const masterSheet = ss.getSheetByName('Students_Master');
    
    if (!masterSheet) {
      return { status: 'error', message: 'ບໍ່ພົບແທັບ Students_Master ໃນ Google Sheet' };
    }
    
    const data = masterSheet.getDataRange().getValues();
    const user = username.toString().trim();
    const pass = password.toString().trim();
    
    // 1. ກວດສອບສິດພິເສດສຳລັບ Super Admin ກ່ອນ
    if (user.toLowerCase() === 'admin' && pass === 'fitadmin1234') {
      return { 
        status: 'success', 
        role: 'Admin', 
        id: 'admin', 
        name: 'ຜູ້ດູແລລະບົບ' 
      };
    }
    
    // 2. ກວດສອບລາຍຊື່ນັກສຶກສາໃນຕາຕະລາງ (ຄໍລຳ A ຫາ F)
    for (let i = 1; i < data.length; i++) {
      const dbUser = data[i][0] ? data[i][0].toString().trim() : ""; // ຄໍລຳ A: ລະຫັດນັກສຶກສາ
      const dbPass = data[i][5] ? data[i][5].toString().trim() : ""; // ຄໍລຳ F: ລະຫັດຜ່ານ
      
      if (user === dbUser && pass === dbPass) {
        // ກວດສອບສິດຈາກຄໍລຳ E ( index 4 )
        const userRole = (data[i][4] && data[i][4].toString().trim().toLowerCase() === 'admin') ? 'Admin' : 'Student';
        
        return { 
          status: 'success', 
          role: userRole, 
          id: dbUser,     // ສົ່ງ id ກັບໄປ (ສຳຄັນຫຼາຍ)
          name: data[i][1] // ຄໍລຳ B: ຊື່ ແລະ ນາມສະກຸນ
        };
      }
    }
    
    return { status: 'invalid', message: 'ລະຫັດຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານ ບໍ່ຖືກຕ້ອງ!' };
    
  } catch (error) {
    return { status: 'error', message: 'Error Backend: ' + error.toString() };
  }
}

// ດຶງຂໍ້ມູນສະຖິຕິທັງໝົດສຳລັບ Dashboard
function getDashboardData() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const masterSheet = ss.getSheetByName('Students_Master');
  const regSheet = ss.getSheetByName('Registrations');
  
  const masterData = masterSheet.getDataRange().getValues();
  const regData = regSheet.getDataRange().getValues();
  
  // 1. ສ້າງ Map ເກັບຂໍ້ມູນນັກສຶກສາທີ່ມີຢູ່ແທ້ໃນ Students_Master
  let totalStudents = 0;
  const studentMap = {};
  const registeredIds = new Set(); 
  
  for (let i = 1; i < masterData.length; i++) {
    const sId = masterData[i][0] ? masterData[i][0].toString().trim() : "";
    if (sId !== "") {
      totalStudents++;
      studentMap[sId] = {
        name: masterData[i][1],
        major: masterData[i][2],
        advisor: masterData[i][3]
      };
    }
  }
  
  // 2. ດຶງຂໍ້ມູນການລົງທະບຽນ ແລະ ກັ່ນຕອງເອົາສະເພາະຄົນທີ່ມີຕົວຕົນຢູ່ແທ້ໃນລະບົບ
  const cleanRegisteredList = [];
  for (let j = 1; j < regData.length; j++) {
    const regId = regData[j][0] ? regData[j][0].toString().trim() : "";
    if (regId !== "") {
      
      // 🌟 ເງື່ອນໄຂສຳຄັນ: ກວດສອບວ່າລະຫັດນັກສຶກສານີ້ ຍັງມີຊື່ຢູ່ໃນ Students_Master ຫຼືບໍ່?
      if (studentMap[regId]) { 
        registeredIds.add(regId); // ໝາຍໄວ້ວ່ານັກສຶກສາຄົນນີ້ລົງທະບຽນແລ້ວ
        
        const company = regData[j][2] || "ບໍ່ລະບຸສະຖານທີ່";
        const studentInfo = studentMap[regId];
        
        // ເພີ່ມເຂົ້າຕາຕະລາງສີດຳ ສະເພາະຄົນທີ່ມີຊື່ຢູ່ແທ້
        cleanRegisteredList.push([regId, studentInfo.name, company]);
      } else {
        // 💡 ທາງເລືອກເພີ່ມເຕີມ (Optional): ຖ້າຕ້ອງການໃຫ້ລະບົບລຶບແຖວທີ່ກຳພຣ້າຢູ່ໃນແທັບ Registrations ຖິ້ມອັດຕະໂນມັດ
        // regSheet.deleteRow(j + 1); 
      }
    }
  }
  
  // 3. ປັບປຸງຂໍ້ມູນ Master List ໃຫ້ສະຖານະຕົງກັນ
  const updatedMasterList = [];
  for (let i = 1; i < masterData.length; i++) {
    const sId = masterData[i][0] ? masterData[i][0].toString().trim() : "";
    if (sId !== "") {
      const actualStatus = registeredIds.has(sId) ? 'ລົງທະບຽນແລ້ວ' : 'ຍັງບໍ່ລົງທະບຽນ';
      updatedMasterList.push([
        masterData[i][0],
        masterData[i][1],
        masterData[i][2],
        masterData[i][3],
        actualStatus
      ]);
    }
  }
  
  const registeredCount = registeredIds.size;
  const notRegisteredCount = totalStudents - registeredCount;
  
  return {
    total: totalStudents,
    registered: registeredCount,
    notRegistered: notRegisteredCount,
    registeredList: cleanRegisteredList,
    masterList: updatedMasterList
  };
}

// ບັນທຶກ ຫຼື ອັບເດດການລົງທະບຽນ
function saveRegistration(formData) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet(); 
    const regSheet = ss.getSheetByName('Registrations');
    const masterSheet = ss.getSheetByName('Students_Master');
    
    if (!regSheet || !masterSheet) {
      return { status: 'error', message: 'ບໍ່ພົບແທັບ Registrations ຫຼື Students_Master!' };
    }
    
    // 💡 ປ້ອງກັນບັກ Serialize: ຮອງຮັບການດຶງຄ່າທັງແບບ Object ປົກກະຕິ ແລະ ແບບ Form name
    const targetId = (formData.student_id || formData.student_id_form || "").toString().trim();
    
    if (targetId === "") {
      return { status: 'error', message: 'ບໍ່ພົບລະຫັດນັກສຶກສາ! ກະລຸນາລອງໃໝ່' };
    }
    
    // ກຽມ Array ຂໍ້ມູນ (ກວດສອບທຸກ Key ທີ່ອາດຈະສົ່ງມາຈາກ HTML ບໍ່ໃຫ້ເປັນຄ່າວ່າງ)
    const rowToSave = [
      targetId,                                                 // A: student_id
      formData.student_phone || formData.phone || "",         // B: phone
      formData.company_name || formData.company || "",        // C: company_name
      formData.village || "",                                 // D: village
      formData.district || "",                                // E: district
      formData.province || "",                                // F: province
      formData.company_type || "",                            // G: company_type
      formData.contact_person || "",                          // H: contact_person
      formData.contact_position || formData.contact_role || "",// I: contact_position
      formData.contact_phone || "",                           // J: contact_phone
      new Date()                                              // K: timestamp
    ];
    
    const regData = regSheet.getDataRange().getValues();
    let isExisting = false;
    let targetRowIndex = -1;
    
    // ເຊັກວ່າມີຢູ່ແລ້ວບໍ່
    for (let i = 1; i < regData.length; i++) {
      if (regData[i][0].toString().trim() === targetId) {
        isExisting = true;
        targetRowIndex = i + 1;
        break;
      }
    }
    
    // 🔥 [ຂັ້ນຕອນທີ 1] ບັງຄັບບັນທຶກລົງແທັບ Registrations ກ່ອນໝູ່
    if (isExisting) {
      regSheet.getRange(targetRowIndex, 1, 1, rowToSave.length).setValues([rowToSave]);
    } else {
      regSheet.appendRow(rowToSave);
    }
    
    //  [ຂັ້ນຕອນທີ 2] ເມື່ອ Registrations ບັນທຶກຜ່ານແລ້ວ ບໍ່ມີ Error ຈຶ່ງຄ່ອຍມາອັບເດດ Students_Master
    const masterData = masterSheet.getDataRange().getValues();
    for (let j = 1; j < masterData.length; j++) {
      if (masterData[j][0].toString().trim() === targetId) {
        // ຄໍລຳ E ຄືຄໍລຳທີ 5 (index 4 ຂອງ Google Sheet) ທີ່ເກັບສະຖານະ "ລົງທະບຽນແລ້ວ"
        masterSheet.getRange(j + 1, 5).setValue('ລົງທະບຽນແລ້ວ'); 
        break;
      }
    }
    
    return { 
      status: 'success', 
      message: isExisting ? 'ອັບເດດຂໍ້ມູນໃນຖານຂໍ້ມູນສຳເລັດ!' : 'ບັນທຶກຂໍ້ມູນລົງຖານຂໍ້ມູນໃໝ່ສຳເລັດ!' 
    };
    
  } catch (error) {
    // ຖ້າພັງຢູ່ບ່ອນໃດ ໃຫ້ແຈ້ງເຕືອນອອກມາເລີຍ ບໍ່ໃຫ້ມັນແອບປ່ຽນສະຖານະຟຣີໆ
    return { status: 'error', message: 'ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກ: ' + error.toString() };
  }
}

// ຟັງຊັນສຳລັບ Admin ຕັ້ງຄ່າ ປິດ-ເປີດ ລະບົບ
function toggleSystemStatus(status) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('System_Settings');
  sheet.getRange(2, 2).setValue(status);
  return { status: 'success', current: status };
}

// 1. ຟັງຊັນບັນທຶກ ຫຼື ອັບເດດຂໍ້ມູນນັກສຶກສາຈາກໜ້າ Admin
function saveStudentFromAdmin(studentData) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Students_Master');
  const data = sheet.getDataRange().getValues();
  
  let rowIndex = -1;
  // ຊອກຫາວ່າມີລະຫັດນັກສຶກສານີ້ແລ້ວຫຼືບໍ່
  for (let i = 1; i < data.length; i++) {
    if (data[i][0].toString().trim() === studentData.student_id) {
      rowIndex = i + 1; // ໄດ້ແຖວທີ່ຈະອັບເດດ
      break;
    }
  }
  
  if (rowIndex === -1) {
    // ຖ້າບໍ່ມີໃຫ້ ເພີ່ມແຖວໃໝ່ (id, name, major, advisor, status, password)
    sheet.appendRow([studentData.student_id, studentData.full_name, studentData.major, studentData.advisor, 'ຍັງບໍ່ລົງທະບຽນ', '123456']);
  } else {
    // ຖ້າມີແລ້ວໃຫ້ ອັບເດດຂໍ້ມູນເກົ່າ
    sheet.getRange(rowIndex, 2).setValue(studentData.full_name);
    sheet.getRange(rowIndex, 3).setValue(studentData.major);
    sheet.getRange(rowIndex, 4).setValue(studentData.advisor);
  }
  return { status: 'success' };
}

// 2. ຟັງຊັນດຶງຂໍ້ມູນນັກສຶກສາແບບລາຍບຸກຄົນມາແກ້ໄຂ
function getStudentDetails(id) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Students_Master');
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0].toString().trim() === id.toString().trim()) {
      return {
        id: data[i][0],
        name: data[i][1],
        major: data[i][2],
        advisor: data[i][3]
      };
    }
  }
  return null;
}

// 3. ຟັງຊັນດຶງສະຖານະລະບົບປັດຈຸບັນ (OPEN / CLOSE)
function getSystemStatus() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName('System_Settings');
  const data = sheet.getDataRange().getValues();
  for (let i = 0; i < data.length; i++) {
    if (data[i][0].toString().trim() === 'system_status') {
      return data[i][1].toString().trim().toUpperCase();
    }
  }
  return 'CLOSE';
}

// ຟັງຊັນດຶງຂໍ້ມູນການລົງທະບຽນເກົ່າຂອງນັກສຶກສາແຕ່ລະຄົນ ມາສະແດງໃນຟອມ
function getRegistrationDetails(studentId) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const regSheet = ss.getSheetByName('Registrations');
    
    if (!regSheet) return null;
    
    const data = regSheet.getDataRange().getValues();
    const targetId = studentId.toString().trim();
    
    // ຄົ້ນຫາຂໍ້ມູນນັກສຶກສາໃນຊີດ Registrations
    for (let i = 1; i < data.length; i++) {
      if (data[i][0].toString().trim() === targetId) {
        // ຖ້າເຈິຂໍ້ມູນເກົ່າ ໃຫ້ສົ່ງ Object ນີ້ກັບໄປ
        return {
          student_id: data[i][0],
          phone: data[i][1],
          company_name: data[i][2],
          village: data[i][3],
          district: data[i][4],
          province: data[i][5],
          company_type: data[i][6],
          contact_person: data[i][7],
          contact_position: data[i][8],
          contact_phone: data[i][9]
        };
      }
    }
    return null; // 💡 ສຳຄັນຫຼາຍ: ຖ້າເປັນນັກສຶກສາໃໝ່ ໃຫ້ສົ່ງ null ເພື່ອໃຫ້ຟອມຫວ່າງເປົ່າ
    
  } catch (error) {
    Logger.log(error.toString());
    return null;
  }
}
