var a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11;
/*
  var a0 = "38%";
  var a1 = "48%";
  var a2 = "29%";
  var a3 = "54%";
  var a4 = "34%";
  var a5 = "78%";
  var a6 = "39%";
  var a7 = "41%";
  var a8 = "76%";
  var a9 = "83%";
  var a10 = "64%";
*/

Connect_DB();

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
  ListGroupSurvey();
}

var GetTargetSurvey = 0;
function ListGroupSurvey() {
  var i = 0;
  var str = "";
  dbSurveyGroup.orderBy('RankGroup','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      var sPerTarget = (doc.data().TotalSurvey / doc.data().TargetSurvey) * 100 ;
      GetAllSurvey = parseFloat(GetAllSurvey)+parseFloat(doc.data().TotalSurvey);
      GetTargetSurvey = parseFloat(GetTargetSurvey)+parseFloat(doc.data().TargetSurvey);
      if(i==0) {
        a0 = parseFloat(sPerTarget) + "%";
        btext0 = doc.data().EmpGroup;
        console.log(a0);
      } else if (i==1) {
        atext1 = sPerTarget;
        btext1 = doc.data().EmpGroup;
      } else if (i==2) {
        atext2 = sPerTarget;
        btext2 = doc.data().EmpGroup;
      } else if (i==3) {
        atext3 = sPerTarget;
        btext3 = doc.data().EmpGroup;
      } else if (i==4) {
        atext4 = sPerTarget;
        btext4 = doc.data().EmpGroup;
      } else if (i==5) {
        atext5 = sPerTarget;
        btext5 = doc.data().EmpGroup;
      } else if (i==6) {
        atext6 = sPerTarget;
        btext6 = doc.data().EmpGroup;
      } else if (i==7) {
        atext7 = sPerTarget;
        btext7 = doc.data().EmpGroup;
      } else if (i==8) {
        atext8 = sPerTarget;
        btext8 = doc.data().EmpGroup;
      } else if (i==9) {
        atext9 = sPerTarget;
        btext9 = doc.data().EmpGroup;
      }
      i++
    });
    var ShowRatio = (GetAllSurvey/GetTargetSurvey)*100 ;
    $("#DisplayAllSurvey").html(addCommas(GetAllSurvey));
    $("#DisplayTargetSurvey").html(addCommas(GetTargetSurvey));
    $("#DisplayRatio").html(ShowRatio.toFixed(2)+"%");

    //alert(GetAllSurvey);
    a0 = "56%";
    console.log("a0="+a0);
    console.log(GetAllSurvey+"-----"+GetTargetSurvey);
    //NewSet();
    //NewSet();
  });
}
