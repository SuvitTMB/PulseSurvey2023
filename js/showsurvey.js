var atext0 = "";
var btext0 = "";
var atext1 = "";
var btext1 = "";
var atext2 = "";
var btext2 = "";
var atext3 = "";
var btext3 = "";
var atext4 = "";
var btext4 = "";
var atext5 = "";
var btext5 = "";
var atext6 = "";
var btext6 = "";
var atext7 = "";
var btext7 = "";
var atext8 = "";
var btext8 = "";
var atext9 = "";
var btext9 = "";
var atext10 = "";
var btext10 = "";
var atext11 = "";
var btext11 = "";
var a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11;
var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var GetAllSurvey = 0;

$(document).ready(function () {
  $('.skillbar').skillBars({
    from: 0,
    speed: 2000, 
    interval: 100,
    decimals: 0,
  });
  Connect_DB();
  ListGroupSurvey();  
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
  dbSurveyGroup = firebase.firestore().collection("Survey_Group");
  
}

var GetTargetSurvey = 0;
function ListGroupSurvey() {
  var i = 0;
  var str = "";
  dbSurveyGroup.orderBy('RankGroup','asc')
  //.limit(2)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      var sPerTarget = (doc.data().TotalSurvey / doc.data().TargetSurvey) * 100 ;
      GetAllSurvey = parseFloat(GetAllSurvey)+parseFloat(doc.data().TotalSurvey);
      GetTargetSurvey = parseFloat(GetTargetSurvey)+parseFloat(doc.data().TargetSurvey);
      if(i==0) {
        atext0 = (doc.data().TotalSurvey / doc.data().TargetSurvey) * 100 ;
        a0 = atext0.toFixed(0)+"%";
        btext0 = doc.data().EmpGroup;
      } else if (i==1) {
        atext1 = (doc.data().TotalSurvey / doc.data().TargetSurvey) * 100 ;
        a1 = atext1.toFixed(0)+"%";
        btext1 = doc.data().EmpGroup; 
      } else if (i==2) {
        atext2 = (doc.data().TotalSurvey / doc.data().TargetSurvey) * 100 ;
        a2 = atext2.toFixed(0)+"%";
        btext2 = doc.data().EmpGroup;
      } else if (i==3) {
        atext3 = (doc.data().TotalSurvey / doc.data().TargetSurvey) * 100 ;
        a3 = atext3.toFixed(0)+"%";
        btext3 = doc.data().EmpGroup;
      } else if (i==4) {
        atext4 = (doc.data().TotalSurvey / doc.data().TargetSurvey) * 100 ;
        a4 = atext4.toFixed(0)+"%";
        btext4 = doc.data().EmpGroup;
      } else if (i==5) {
        atext5 = (doc.data().TotalSurvey / doc.data().TargetSurvey) * 100 ;
        a5 = atext5.toFixed(0)+"%";
        btext5 = doc.data().EmpGroup;
      } else if (i==6) {
        atext6 = (doc.data().TotalSurvey / doc.data().TargetSurvey) * 100 ;
        a6 = atext6.toFixed(0)+"%";
        btext6 = doc.data().EmpGroup;
      } else if (i==7) {
        atext7 = (doc.data().TotalSurvey / doc.data().TargetSurvey) * 100 ;
        a7 = atext7.toFixed(0)+"%";
        btext7 = doc.data().EmpGroup;
      } else if (i==8) {
        atext8 = (doc.data().TotalSurvey / doc.data().TargetSurvey) * 100 ;
        a8 = atext8.toFixed(0)+"%";
        btext8 = doc.data().EmpGroup;
      } else if (i==9) {
        atext9 = (doc.data().TotalSurvey / doc.data().TargetSurvey) * 100 ;
        a9 = atext9.toFixed(0)+"%";
        btext9 = doc.data().EmpGroup;
      } else if (i==10) {
        atext10 = (doc.data().TotalSurvey / doc.data().TargetSurvey) * 100 ;
        a10 = atext10.toFixed(0)+"%";
        btext10 = doc.data().EmpGroup;
      } else if (i==11) {
        atext11 = (doc.data().TotalSurvey / doc.data().TargetSurvey) * 100 ;
        a11 = atext11.toFixed(0)+"%";
        btext11 = doc.data().EmpGroup;
      }
      i++
    });
    var ShowRatio = (GetAllSurvey/GetTargetSurvey)*100 ;
    $("#DisplayAllSurvey").html(addCommas(GetAllSurvey));
    $("#DisplayTargetSurvey").html(addCommas(GetTargetSurvey));
    $("#DisplayRatio").html(ShowRatio.toFixed(2)+"%");
    console.log("Last "+GetAllSurvey+"-----"+GetTargetSurvey);
    reload();
  });
}


function reload() {
  var x0 = "53%";
  document.getElementById('A0').setAttribute('data-percent', a0);
  document.getElementById('A1').setAttribute('data-percent', a1);
  document.getElementById('A2').setAttribute('data-percent', a2);
  document.getElementById('A3').setAttribute('data-percent', a3);
  document.getElementById('A4').setAttribute('data-percent', a4);
  document.getElementById('A5').setAttribute('data-percent', a5);
  document.getElementById('A6').setAttribute('data-percent', a6);
  document.getElementById('A7').setAttribute('data-percent', a7);
  document.getElementById('A8').setAttribute('data-percent', a8);
  document.getElementById('A9').setAttribute('data-percent', a9);
  document.getElementById('A10').setAttribute('data-percent', a10);
  document.getElementById('A11').setAttribute('data-percent', a11);

  $("#B0").html(btext0);
  $("#B1").html(btext1);
  $("#B2").html(btext2);
  $("#B3").html(btext3);
  $("#B4").html(btext4);
  $("#B5").html(btext5);
  $("#B6").html(btext6);
  $("#B7").html(btext7);
  $("#B8").html(btext8);
  $("#B9").html(btext9);
  $("#B10").html(btext10);
  $("#B11").html(btext11);
  $('.skillbar').skillBars({
    from: 0,
    speed: 2000, 
    interval: 100,
    decimals: 0,
  });  
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
}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}


function addCommas(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}
