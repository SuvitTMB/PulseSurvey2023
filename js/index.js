var i = 0;
var EidProfile = "";
var dateString = "";



$(document).ready(function () {

/*
  sessionStorage.clear(); 
  var str = "";
  var sLineID = "Ua6b6bf745bd9bfd01a180de1a05c23b3";
  var sLineName = "Website";
  var sLinePicture = "https://profile.line-scdn.net/0hoLlg-mNNMGNRHiaTpMdPNG1bPg4mMDYrKX8qVnIYOgYpe3QwbCp2AXVKaVN_fnMzOC16V3NMagF8";
  sessionStorage.setItem("LineID", sLineID);
  sessionStorage.setItem("LineName", sLineName);
  sessionStorage.setItem("LinePicture", sLinePicture);
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" width="100px"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  Connect_DB();
*/  

  main();
});



async function main() {
  await liff.init({ liffId: "1655966947-ZQna9Rop" });
  document.getElementById("isLoggedIn").append(liff.isLoggedIn());
  if(liff.isLoggedIn()) {
    getUserProfile();
  } else {
    liff.login();
  }
}


async function getUserProfile() {
  var str = "";
  const profile = await liff.getProfile();
  sessionStorage.setItem("LineID", profile.userId);
  sessionStorage.setItem("LineName", profile.displayName);
  sessionStorage.setItem("LinePicture", profile.pictureUrl);
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" width="100px"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  Connect_DB();
}


function openWindow() {
  liff.openWindow({
    url: "https://line.me",
    external: true     
  })
}


function Connect_DB() {
  var firebaseConfig = {
    apiKey: "AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE",
    authDomain: "retailproject-6f4fc.firebaseapp.com",
    projectId: "retailproject-6f4fc",
    storageBucket: "retailproject-6f4fc.appspot.com",
    messagingSenderId: "653667385625",
    appId: "1:653667385625:web:a5aed08500de80839f0588",
    measurementId: "G-9SKTRHHSW9"
  };
  firebase.initializeApp(firebaseConfig);
  dbProfile = firebase.firestore().collection("CheckProfile");
  dbSurveyMember = firebase.firestore().collection("Survey_Member");
  //dbTNIdate = firebase.firestore().collection("TNIdate");
  //dbTNIapprove = firebase.firestore().collection("TNImember");
  //dbTNIRedeemPoint = firebase.firestore().collection("TNIRedeemPoint");
  //dbTNIlog = firebase.firestore().collection("TNIlog");
  //CheckTNIdate();
  CheckData();
}

/*
function CheckTNIdate() {
  dbTNIdate.where('CodeName','==',sCodeName)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sessionStorage.setItem("TNIdate", doc.data().DateUpload);
      $("#DateUpload").html(doc.data().DateUpload);  
    });
  });
}
*/

function CheckData() {
  dbProfile.where('lineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sessionStorage.setItem("EmpName_Survey", doc.data().empName);
      sessionStorage.setItem("EmpID_Survey", doc.data().empID);
      sessionStorage.setItem("EmpBR_Survey", doc.data().empBr);
      //alert("==="+sessionStorage.getItem("EmpID_Survey"));
    });
    CheckSurvey();
  });
}


var DoneSurvey = 0;
function CheckSurvey() {
  dbSurveyMember.where('EmpID','==',sessionStorage.getItem("EmpID_Survey"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      DoneSurvey = 1;
      document.getElementById('loading').style.display='none';
      document.getElementById('OldSurvey').style.display='block';
    });
    if(DoneSurvey==0) {
      document.getElementById('loading').style.display='none';
      document.getElementById('NewSurvey').style.display='block';
    }
  });
}

/*
function CheckNewRedeemPoint() {
  dbTNIRedeemPoint.where('EmpID','==',parseFloat(sessionStorage.getItem("EmpID")))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sCheckTNIapprove = 1;
      sessionStorage.setItem("TotalPointRedeem", doc.data().TotalPointRedeem);
      sessionStorage.setItem("TotalItemRedeem", doc.data().TotalItemRedeem);
    });
    if(sCheckTNIapprove==0) {
      dbTNIRedeemPoint.add({
        EmpID : parseFloat(sessionStorage.getItem("EmpID")),
        TotalPointRedeem : 0,
        TotalItemRedeem : 0,
        DateRedeem : ''
      });
      sessionStorage.setItem("TotalPointRedeem", 0);
      sessionStorage.setItem("TotalItemRedeem", 0);
    }
    var str = "";
    str += '<div><div class="NameLine">ยินดีต้อนรับสู่ TNI Redeem Point</div>';
    str += '<div style="color:#002d63; font-size:15px; padding:10px;font-weight: 600;">" '+ sessionStorage.getItem("EmpGroup") +' Group "</div>';
    str += '<div style="font-size: 11px; color:#000000;">Point ของคุณมีค่า สามารถนำมาเปลี่ยนเป็นของรางวัล<br>ได้ตามความต้องการของคุณ</div>';
    str += '<div><img src="./img/giphy.gif" style="width:100%;"></div>';
    str += '<di></div>';
    str += '<div class="btn-t2" onclick="GotoLink()" style="margin-top:20px;padding:6px 40px;">ดูข้อมูลของ<br>คุณ'+ sessionStorage.getItem("EmpName") +'</div>';
    str += '<div style="height: 15px;"></div>';
    str += '';
    str += '</div>';
    $("#WelcomePage").html(str);  
    document.getElementById('id02').style.display='block';
  });
}
*/

/*
function OpenForm() {
  if(CheckFoundData==1) {
    document.getElementById('Loading').style.display='none';
    document.getElementById('myRegister').style.display='block';
    document.getElementById('myTimer').style.display='none';
  } else {
    document.getElementById('Loading').style.display='none';
    document.getElementById('myRegister').style.display='block';
    document.getElementById('myTimer').style.display='none';
  }
}
*/

/*
function WaitingPage() {
  //alert(CheckFoundData);
  var str = "";
  str +='<center><div><img src="./img/stop.png" width="250px;"></div>';
  str +='<div style="margin-top:20px;"><br><div class="text-waiting">เรียน <font color="#0056ff"><b>คุณ'+sessionStorage.getItem("EmpName")+'</b></font>';
  if(CheckFoundData==2) {
    sMemberlog = "รอการอนุมัติ";
    str +='<br><b><font color="#ff0000">คุณยังไม่ได้รับสิทธิ์ในการเข้าใช้งานระบบนี้<br>โปรดรอการอนุมัติภายใน 24 ชั่วโมง</font></b></div>';
  } else {
    sMemberlog = "ไม่ได้รับสิทธิ์";
    str +='<br><b><font color="#ff0000">คุณไม่ได้รับสิทธิ์ในการเข้าใช้งานระบบนี้</font></b></div>';
    str +='<a href="mailto:suvit.cha@ttbbank.com&subject=แจ้งขอใช้ระบบงานของ LINE Retail Society&body=กรุณาระบุเหตุผลที่ต้องการใช้งาน" style="text-decoration: none;"><div class="btn-t2">แจ้งเราหากคุณต้องการใช้งาน</div></a>';
  }
  //str +='<div class="btn-t1" onclick="EditData()">คลิกเพื่อตรวจสอบข้อมูล</div>';
  str +='</div></center>';
  SaveBA_Log();
  $("#MyWatingPage").html(str);  
  document.getElementById('Loading').style.display='none';
  document.getElementById('myRegister').style.display='none';
  document.getElementById('WaitingPage').style.display='block';
}


function ClickSaveProfile() {
  var sCheckBottom = 0;
  //alert($("input[type=checkbox][id=cb1]:checked").val());
  stxtEmpID = document.getElementById("txtEmpID").value;
  stxtEmpName = document.getElementById("txtEmpName").value;
  stxtEmpPhone = document.getElementById("txtEmpPhone").value;
  stxtEmpGroup = document.getElementById("txtEmpGroup").value;
  if(stxtEmpID !== null && stxtEmpID !== '') { sCheckBottom = sCheckBottom+1; }
  if(stxtEmpName !== null && stxtEmpName !== '') { sCheckBottom = sCheckBottom+1; }
  if(stxtEmpPhone !== null && stxtEmpPhone !== '') { sCheckBottom = sCheckBottom+1; }
  if(stxtEmpGroup !== null && stxtEmpGroup !== '') { sCheckBottom = sCheckBottom+1; }
  if(sCheckBottom==4) {
    SaveData();
  }
}


function SaveBA_Log() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  dbTNIlog.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID"),
    EmpName : sessionStorage.getItem("EmpName"),
    PageVisit : sMemberlog,
    LogDateTime : dateString,
    LogTimeStamp : TimeStampDate
  });
}


function SaveData() {
  NewDate();
  if(EidProfile=="") {
    dbProfile.add({
      lineID : sessionStorage.getItem("LineID"),
      linename : sessionStorage.getItem("LineName"),
      linePicture : sessionStorage.getItem("LinePicture"),
      empPicture : sessionStorage.getItem("LinePicture"),
      empID : document.getElementById("txtEmpID").value,
      empName : document.getElementById("txtEmpName").value,
      empPhone : document.getElementById("txtEmpPhone").value,
      empGroup : document.getElementById("txtEmpGroup").value,
      empRH : document.getElementById("txtEmpGroup").value,
      empAddress : '',
      //StatusRegister : 0;
      statusconfirm : 2,
      statusedit : 1,
      statuspass : 0,
      empAddress : '',
      lastcheckin : '',
      memo : '',
      empBr : 'BBD',
      DateRegister : dateString
      //egisterDate : dateString
    });
    document.getElementById('myRegister').style.display='none';
    document.getElementById('myTimer').style.display='block';
*/

/*
  } else {
    dbProfile.doc(EidProfile).update({
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : document.getElementById("txtEmpID").value,
      EmpName : document.getElementById("txtEmpName").value,
      EmpPhone : document.getElementById("txtEmpPhone").value,
      EmpGroup : document.getElementById("txtEmpGroup").value,
      DateRegister : dateString
    });
*/
/*
  }
  document.getElementById('myRegister').style.display='none';
  document.getElementById('WaitingPage').style.display='block';
  document.getElementById('myTimer').style.display='none';
  CheckData();
}
*/



function gotoShowSurvey() {
  location.href = 'showsurvey.html';
}

function NewDate() {
  var today = new Date();
  var day = today.getDate() + "";
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
}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
}
