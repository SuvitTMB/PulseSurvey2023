var EidProfile = "";
var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var xdateCheck = "";
var sCountView = 0;

$(document).ready(function () {
  //if(sessionStorage.getItem("EmpID_Survey")==null) { location.href = "index.html"; }
  var str = "";
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" style="margin:-60px auto 20px auto;"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  Connect_DB();
});


function Connect_DB() {
  var firebaseConfig = {
    apiKey: "AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE",
    authDomain: "retailproject-6f4fc.firebaseapp.com",
    projectId: "retailproject-6f4fc",
    databaseURL: "https://file-upload-6f4fc.firebaseio.com",
    storageBucket: "retailproject-6f4fc.appspot.com",
    messagingSenderId: "653667385625",
    appId: "1:653667385625:web:a5aed08500de80839f0588",
    measurementId: "G-9SKTRHHSW9"
  };
  firebase.initializeApp(firebaseConfig);
  dbProfile = firebase.firestore().collection("CheckProfile");
  dbSurveyMember = firebase.firestore().collection("Survey_Member");
  CheckSurvey();
}


function CheckSurvey() {
  dbSurveyMember.where('EmpID','==',sessionStorage.getItem("EmpID_Survey"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      document.getElementById('loading').style.display='none';
      gotoShowSurvey();
    });
    CheckData();
  });
}

var CheckFoundData = 0;
function CheckData() {
  dbProfile.where('lineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckFoundData = doc.data().statusconfirm;
      EidProfile = doc.id;
      document.getElementById("txtEmpID").value = doc.data().empID;
      document.getElementById('txtEmpID').setAttribute("class","DisableEmpID"); 
      document.getElementById("txtEmpName").value = doc.data().empName;
      document.getElementById('txtEmpName').setAttribute("class","DisableEmpID"); 
      document.getElementById("txtEmpPhone").value = doc.data().empPhone;
      document.getElementById("txtEmpBR").value = doc.data().empBr;
      //document.getElementById("txtEmpAddress").value = doc.data().empAddress;
      document.getElementById('loading').style.display='none';
      document.getElementById('ShowForm').style.display='block';
    });
    if(CheckFoundData==0) {
      document.getElementById('loading').style.display='none';
      document.getElementById('ShowForm').style.display='block';
    }
  });
}


var sCheckBottom = 0;
function CheckRegister() {
  NewDate();
  var str="";
  sCheckBottom = 0;
  stxtEmpID = document.getElementById("txtEmpID").value;
  stxtEmpName = document.getElementById("txtEmpName").value;
  stxtEmpPhone = document.getElementById("txtEmpPhone").value;
  stxtEmpRH = "ttb bank";
  //stxtEmpRH = document.getElementById("txtEmpRH").value;
  stxtEmpBR = document.getElementById("txtEmpBR").value;
  //alert(stxtEmpBR);
  //stxtEmpAddress = document.getElementById("txtEmpAddress").value;
  stxtEmpAccept = $('#txtEmpAccept').is(':checked')

  sessionStorage.setItem("EmpID_Survey", stxtEmpID);
  sessionStorage.setItem("EmpBR_Survey", stxtEmpBR);



  if(stxtEmpID !== null && stxtEmpID !== '') { sCheckBottom = sCheckBottom+1; } else { str += '- กรอกรหัสพนักงาน\n'; }
  if(stxtEmpName !== null && stxtEmpName !== '') { sCheckBottom = sCheckBottom+1; } else { str += '- กรอกชื่อ-นามสกุล\n'; }
  if(stxtEmpPhone !== null && stxtEmpPhone !== '') { sCheckBottom = sCheckBottom+1; } else { str += '- กรอกหมายเลขโทรศัพท์\n'; }
  //if(stxtEmpRH !== null && stxtEmpRH !== '') { sCheckBottom = sCheckBottom+1; } else { str += '- กรอกข้อมูลการเป็นพนักงาน\n'; }
  if(stxtEmpBR !== null && stxtEmpBR !== '') { sCheckBottom = sCheckBottom+1; } else { str += '- กรอกสังกัดหน่วยงาน\n'; sessionStorage.setItem("EmpBR_Survey", stxtEmpBR);
}

  if(sCheckBottom!=4) { 
    var element = document.getElementById("SubmitApp");
    element.classList.add("disabledbutton");
    document.getElementById("txtEmpAccept").checked = false;
    alert("คุณยังกรอกข้อมูลไม่ครบ\n\n"+str);
  }

  if(stxtEmpAccept == true && sCheckBottom==4) { 
    sessionStorage.setItem("EmpBR_Survey", stxtEmpBR);
    //alert(stxtEmpID+"\n"+stxtEmpName+"\n"+stxtEmpPhone+"\n"+stxtEmpRH+"\n"+stxtEmpBR+"\n"+stxtEmpAddress+"\n"+xdateCheck+"\n"); 
    //alert("EidProfile="+EidProfile);
    if(EidProfile!="") {
      document.getElementById('id01').style.display='block';
      dbProfile.doc(EidProfile).update({
        linename : sessionStorage.getItem("LineName"),
        linePicture : sessionStorage.getItem("LinePicture"),
        empPicture : sessionStorage.getItem("LinePicture"),
        empPhone : stxtEmpPhone,
        empRH : stxtEmpRH,
        empBr : stxtEmpBR,
        //empAddress : stxtEmpAddress,
        DateAccept : xdateCheck,
        DateRegister : dateString
      });
    } else {
      dbProfile.add({
        lineID : sessionStorage.getItem("LineID"),
        linename : sessionStorage.getItem("LineName"),
        linePicture : sessionStorage.getItem("LinePicture"),
        empPicture : sessionStorage.getItem("LinePicture"),
        empID : stxtEmpID,
        empName : stxtEmpName,
        empPhone : stxtEmpPhone,
        empRH : stxtEmpRH,
        empBr : stxtEmpBR,
        //empAddress : stxtEmpAddress,
        empAccept : stxtEmpAccept,
        statusconfirm : 2,
        statusedit : 1,
        statuspass : 0,
        lastcheckin : '',
        memo : '',
        EmpCheckIN : 0,
        DateAccept : xdateCheck,
        DateRegister : dateString
      });
      document.getElementById('id01').style.display='block';
    }
    //document.getElementById('id02').style.display='block';
  }
}


function CheckButtomClick() {
  if($('#txtEmpAccept').is(':checked')) {
    $('#SubmitApp').removeClass('disabledbutton');
  } else {
    var element = document.getElementById("SubmitApp");
    element.classList.add("disabledbutton");
  }
}


function GotoHome() {
  location.href = "index.html";
}

function GotoSurvey() {
  location.href = "question.html";
}

function gotoShowSurvey() {
  location.href = 'showsurvey.html';
}

function NewDate() {
  var months = new Array(12);
  months[0] = "January";
  months[1] = "February";
  months[2] = "March";
  months[3] = "April";
  months[4] = "May";
  months[5] = "June";
  months[6] = "July";
  months[7] = "August";
  months[8] = "September";
  months[9] = "October";
  months[10] = "November";
  months[11] = "December";
  var today = new Date();
  var day = today.getDate() + "";
  var monthEN = (today.getMonth()) + "";
  var month = (today.getMonth() + 1) + "";
  var year = today.getFullYear() + "";
  var hour = today.getHours() + "";
  var minutes = today.getMinutes() + "";
  var seconds = today.getSeconds() + "";
  var ampm = hour >= 12 ? 'PM' : 'AM';
  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);
  dateString = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm;

  xdateCheck = months[monthEN] + " " + day + ", " + year + " " + hour + ":" + minutes + ":" + seconds ;
  //var GetWatingTime = "april 25, 2022 12:30:00";


}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
}
