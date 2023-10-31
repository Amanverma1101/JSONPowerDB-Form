function validateAndGetFormData() {
  var stuIdVar = $("#stuId").val();
  if (stuIdVar === "") {
    alert("Student Roll-No Required Value");
    $("#stuId").focus();
    return "";
  }
  var stuNameVar = $("#stuName").val();
  if (stuNameVar === "") {
    alert("Student Name is Required Value");
    $("#stuName").focus();
    return "";
  }
  var stuClassVar = $("#stuClass").val();
  if (stuClassVar === "") {
    alert("Student Class is Required Value");
    $("#stuClass").focus();
    return "";
  }

  var stuDOBVar = $("#stuDOB").val();
  if (stuDOBVar === "") {
    alert("Student Birth-Date is Required Value");
    $("stuDOB").focus();
    return "";
  }

  var stuAddressVar = $("#stuAddress").val();
  if (stuAddressVar === "") {
    alert("Student Address is Required Value");
    $("#stuAddress").focus();
    return "";
  }

  var stuEnrollDateVar = $("stuEnrollDate").val();
  if (stuEnrollDateVar === "") {
    alert("Student Enrollment-Date is Required Value");
    $("stuEnrollDate").focus();
    return "";
  }

  var jsonStrObj = {
    studentId: stuIdVar,
    studentName: stuNameVar,
    studentClass: stuClassVar,
    studentDOB: stuDOBVar,
    studentAddress: stuAddressVar,
    studentEnrollDate: stuEnrollDateVar,
  };
  return JSON.stringify(jsonStrObj);
}

function getstuIdASJsonObj() {
  var stuid = $("#stuid").val();
  var jsonStr = {
    id: stuid,
  };
  return JSON.stringify(jsonStr);
}

function getStu() {
  var stuIdJsonObj = getstuIdASJsonObj();
  var getRequest = createGET_BY_KEYRequest(
    connToken,
    stuDBName,
    stuRelationName,
    stuIdJsonObj
  );
  jQuery.ajaxSetup({ async: false });
  var resJsonObj = executeCommandAtGivenBaseUrl(
    getRequest,
    jpdbBaseURL,
    jpdbURL
  );
  jQuery.ajaxSetup({ async: true });
  if (resJsonObj.status === 400) {
    $("#save").prop("disabled", flase);
    $("#reset").prop("disabled", false);
    $("#stuname").focus();
  } else if (resJsonObj.status === 200) {
    $("#stuid").prop("disabled", true);
    fillData(resJsonObj);
    $("#change").prop("disabled", false);
    $("#reset").prop("disabled", false);
    $("#stuname").focus();
  }
}

function resetForm() {
  $("#stuId").val("");
  $("#stuName").val("");
  $("#stuClass").val("");
  $("#stuDOB").val("");
  $("#stuAddress").val("");
  $("#stuEnrollDate").val("");
  $("#stuId").focus();
}

function changeData() {
  $("#change").prop("disabled", true);
  jsonChg = validateData();
  var updateRequest = createUPDATERecordRequest(
    ConnToken,
    jsonChg,
    stuDBName,
    stuRelationName,
    localStorage.getItem("recno")
  );
  jQuery.ajaxSetup({ async: falses });
  var resJsonObj = executeCommandAtGivenBaseUrl(
    updateRequest.jpdBaseURL,
    jpdbIML
  );
  jQuery.ajaxSetup({ async: true });
  console.log(resJsonObj);
  resetForm();
  $("#stuID").focus();
}

function saveData() {
  var jsonStr = validateAndGetFormData();
  if (jsonStr === "") {
    return;
  }
  var putReqStr = createPUTRequest(
    "90931549|-31949330628828695|90959929",
    jsonStr,
    "Student", //db-name
    "Student-rel" //rel-name
  );

  alert(putReqStr);

  jQuery.ajaxSetup({ async: false });
  var resultObj = executeCommandAtGivenBaseUrl(
    putReqStr,
    "http://api.login2explore.com:5577",
    "/api/iml"
  );
  jQuery.ajaxSetup({ async: true });

  alert(JSON.stringify(resultObj));
  resetForm();
}
