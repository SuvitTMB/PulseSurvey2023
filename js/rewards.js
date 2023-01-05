var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var dateRewards = "";
var xClickMenu = "";


$(document).ready(function () {
  NewDate();
  //if(sessionStorage.getItem("EmpID")==null) { location.href = "index.html"; }
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
  dbSurveyMember = firebase.firestore().collection("Survey_Member");
  dbSurveyRewards = firebase.firestore().collection("Survey_Rewards");
  ListMenu();
  SelectMeunu();
  //dbSongkarn = firebase.firestore().collection("APEclip");
  //ListMenu();
  //SelectMeunu();
  //CheckProfile();
}


function SelectMeunu() {
  if(xClickMenu=="") {
    xClickMenu = "ALL";
  } else {
    xClickMenu = document.getElementById("ClickMenu").value;
  } 
  //console.log(document.getElementById("ClickMenu").value);
  ShowData();
  //loadData();
}


function ListMenu() {
  //console.log(dateRewards+"-----"+xClickMenu);
  var str = "";
  var i = 0;
  str += '<div class="input-group">';
  str += '<select id="ClickMenu" onchange="SelectMeunu()" style="padding: 2px 10px;border-radius: 5px;background: #f1f1f1; cursor: pointer;">';
  dbSurveyRewards.where('RewardsStatus','==', 1)
  .orderBy('TimeStampDate','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      if(i==0) {
        str += '<option value="ALL">ผู้ได้รับรางวัลทั้งหมด</option>';
      }
      str += '<option value="'+ doc.data().RewardDate +'">Date : '+ doc.data().RewardDate +'</option>';
      i++;
    });
    str += '</select>';
    str += '</div>';
    $("#DisplayMenu").html(str);  
  });
}


function ShowData() {
  console.log("dateRewards -----> "+xClickMenu);
  var i = 0;
  var sAchievement = 0;
  count = 0;
  dataSet = "";
  dataSrc = [];

  if(xClickMenu=="ALL") {
    dbSurveyMember.where('RewardStatus','==', 1)
    .get().then((snapshot)=> {
      snapshot.forEach(doc=> {
        i = (i+1);
        dataSet = [ doc.data().RewardDate, doc.data().EmpName,doc.id, i];
        dataSrc.push(dataSet);
        count++;
      }); 
      dTable=$('#ex-table').DataTable({
        "bDestroy": true,    
        data: dataSrc,
        columns: [
          { title: "วันที่", className: "txt-center" },
          { title: "รายชื่อผู้ได้รับรางวัล", className: "txt-left" },
          ],
          dom: 'lfrtipB',
          buttons: [
              //'copy', 'excelFlash', 'excel', 'pdf', 'print'
          ],
            lengthMenu: [[30, 50, 100, -1], [30, 50, 100, "All"]],

          columnDefs: [ { type: 'num-fmt', 'targets': [1] } ],
          order: [[ 1, 'asc']]
        });   
    });
    //$('#ex-table').DataTable().destroy();
    //$("#ex-table tbody").remove();

  } else {

    dbSurveyMember.where('RewardDate','==', xClickMenu)
    .where('RewardStatus','==', 1)
    .get().then((snapshot)=> {
      snapshot.forEach(doc=> {
        i = (i+1);
        dataSet = [doc.data().RewardDate, doc.data().EmpName, doc.id, i];
        dataSrc.push(dataSet);
        count++;
      }); 
      dTable=$('#ex-table').DataTable({
        "bDestroy": true,    
        data: dataSrc,
        columns: [
          { title: "วันที่", className: "txt-center" },
          { title: "รายชื่อผู้ได้รับรางวัล", className: "txt-left" },
          ],
          dom: 'lfrtipB',
          buttons: [
              //'copy', 'excelFlash', 'excel', 'pdf', 'print'
          ],
            lengthMenu: [[30, 50, 100, -1], [30, 50, 100, "All"]],

          columnDefs: [ { type: 'num-fmt', 'targets': [1] } ],
          order: [[ 1, 'asc']]
        });   
    });
    //$('#ex-table').DataTable().destroy();
    //$("#ex-table tbody").remove();
  }
  $('#ex-table').DataTable().destroy();
  $("#ex-table tbody").remove();
}



function loadData() {
  var i = 0;
  var count = 0;
  var dataSet = "";
  var dataSrc = [];
  dbSongkarn.where('SendUnderRH','==', xClickMenu)
  .where('ClipStatus','==', 1)
  .orderBy('TimeStampDate','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      i = (i+1);
      xEmpMember = "";
      xTimegetBox = "";
      var xNewText = "";
      var xClip = "";
      if(doc.data().DisplayImg!="") { 
        xClip = doc.data().DisplayImg;
      } else {
        xClip = "./img/clip-01.jpg";
      }
      xNewText += '<div style="color:#0056ff;font-size:11px;"><div>'+doc.data().EmpName+' ('+doc.data().EmpID+')</div>';
      //xNewText += '<div><img src="'+xClip+'" style="max-width:200px; width:100%;margin-top:8px;"></div>';
      //xNewText += '<div style="max-width:400px; width:100%;margin-top:8px;font-size:11px;line-height: 1.2; color:#999;">'+doc.data().SendMemo+'</div>';
      //xNewText += '<div style="margin-top:4px;color:#f68b1f;">View : '+doc.data().ClickView+' | Like : '+doc.data().ClickLike+' | ข้อความ : '+doc.data().ClickMemo+' </div></div>';
      xNewText += '</div>';
      dataSet = [xNewText, i, doc.id, i];
      dataSrc.push(dataSet);
      count++;
    }); 

    dTable=$('#ex-table').DataTable({
      "bDestroy": true,    
      data: dataSrc,
      columns: [
        //{ title: "EmpID", className: "txt-center" },
        { title: "รายชื่อผู้ได้รับรางวัล" },
        { title: "รางวัล", className: "txt-center" },
        ],
        dom: 'lfrtipB',
        buttons: [
            //'copy', 'excelFlash', 'excel', 'pdf', 'print'
        ],
          lengthMenu: [[50, 100, 200, -1], [50, 100, 200, "All"]],
          columnDefs: [ { type: 'number', 'targets': [0] } ],
          order: [[ 0, 'asc']]
        //dom: 'Bfrtip', buttons: [ 'copy', 'csv', 'excel', 'pdf', 'print' ]
      });   
      $('#ex-table tbody').on( 'click', 'tr', function () {
        var data = dTable.row( $(this).parents('tr') ).data();
        if(count!=0) {
            ClickID(dTable.row( this ).data()[2],dTable.row( this ).data()[2]);
        }
        //console.log(dTable.row( this ).data()[6]);
      });
  });
  $('#ex-table').DataTable().destroy();
  $("#ex-table tbody").remove();
}


function ClickID(x,id) {
  location.href = "viewpage.html?gid="+id+"";
}



function CloseAll() {
  document.getElementById('id01').style.display='none';
}


function NewDate() {
  var today = new Date();
  var day = today.getDate() + "";
  var month = (today.getMonth() + 1) + "";
  var year = today.getFullYear() + "";
  var year1 = today.getFullYear() + 543 +"";
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
  dateRewards = day + "/" + month + "/" + year1;
}



function ConvrtDate(str) {
  var date = new Date(str),
  mnth = ("0" + (date.getMonth() + 1)).slice(-2),
  day = ("0" + date.getDate()).slice(-2);
  return [day, mnth, date.getFullYear()+543].join("/");
}


function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}



