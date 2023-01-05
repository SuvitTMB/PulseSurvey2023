var st1_pocet = 0;
var st2_pocet = 0;
var st3_pocet = 0;
var st4_pocet = 0;
var st5_pocet = 0;
var st6_pocet = 0;
var st7_pocet = 0;
var st8_pocet = 0;
var sTotalSurvey = 0;
var sTargetSurvey = 0;
var sTotalQ1 = 0;
var sTotalQ2 = 0;
var sTotalQ3 = 0;
var sTotalQ4 = 0;
var sTotalQ5 = 0;
var sTotalQ6 = 0;
var sTotalQ7 = 0;
var sTotalQ8 = 0;
var sSumPoint = 0;
var d1 = 0;
var d2 = 0;
var d3 = 0;
var d4 = 0;
var d5 = 0;
var d6 = 0;
var d7 = 0;
var d8 = 0;

var SumRatio = 0;
var sum_score = 0;         // total amount to be paid
var total = 0;         // total amount to be paid
var total_tickets = 0; // total amount of tickets
var t1 = { id: 't1', pocet: 0, hodnota: 1 }; // ticket 1st category
var t2 = { id: 't2', pocet: 0, hodnota: 1 }; // ticket 2nd category
var t3 = { id: 't3', pocet: 0, hodnota: 1 }; // ticket 3rd category
var t4 = { id: 't4', pocet: 0, hodnota: 1 }; // ticket 3rd category
var t5 = { id: 't5', pocet: 0, hodnota: 1 }; // ticket 3rd category
var t6 = { id: 't6', pocet: 0, hodnota: 1 }; // ticket 3rd category
var t7 = { id: 't7', pocet: 0, hodnota: 1 }; // ticket 3rd category
var t8 = { id: 't8', pocet: 0, hodnota: 1 }; // ticket 3rd category
var Cal_Ratio = 5;
var DateRegister = "";
var EidGroup = "";


$(document).ready(function() {
  if(sessionStorage.getItem("EmpID_Survey")==null) { location.href = "index.html"; }
  Connect_DB();

  $('#back').on('click', function() {
    $('li.active').filter('.active').prev('li').find('a[data-toggle="tab"]').tab('show');
    $('li').find('a[data-toggle="tab"]').removeClass('btn-success');
    $('#ok-icon').addClass('hidden');
    total_tickets = 0;
    $('#listed_t1').addClass('hidden').children().not('h4').remove();
    $('#listed_t2').addClass('hidden').children().not('h4').remove();
    $('#listed_t3').addClass('hidden').children().not('h4').remove();
    $('#listed_t4').addClass('hidden').children().not('h4').remove();
    $('#listed_t5').addClass('hidden').children().not('h4').remove();
    $('#listed_t6').addClass('hidden').children().not('h4').remove();
    $('#listed_t7').addClass('hidden').children().not('h4').remove();
    $('#listed_t8').addClass('hidden').children().not('h4').remove();
    render();
  });
  $('#continue').on('click', function() {
    if (total_tickets > 0) {
      $('li.active').filter('.active').next('li').find('a[data-toggle="tab"]').tab('show');
      $('li').find('a[data-toggle="tab"]').addClass('btn-success');
      $('#ok-icon').removeClass('hidden');
      addTicketList(t1);
      addTicketList(t2);
      addTicketList(t3);
      addTicketList(t4);
      addTicketList(t5);
      addTicketList(t6);
      addTicketList(t7);
      addTicketList(t8);
    }
  });
  render();
});


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
  dbSurveyMember = firebase.firestore().collection("Survey_Member");
  dbSurveyGroup = firebase.firestore().collection("Survey_Group");
  CheckSurvey();
  CheckGroup();
}


var DoneSurvey = 0;
function CheckSurvey() {
  dbSurveyMember.where('EmpID','==',sessionStorage.getItem("EmpID_Survey"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      gotoShowSurvey();
    });
  });
}


function gotoShowSurvey() {
  location.href = 'showsurvey.html';
}


// Display feedback after rating 
$('.rating__input').on('click', function() {
  //alert(this['value']);
  var rating1 = this['value'];
  //alert(rating1);
	$('.rating__label').removeClass('active');
  $(this).siblings('.rating__label').addClass('active');
  $('.feedback').css('display', "block"); 
  //feedback_validate(rating1);
  if(!!rating1) { 
    st1_pocet = document.querySelector('input[name="survey1"]:checked').value;
    t1 = { id: 't1', pocet: parseFloat(st1_pocet), hodnota: 1 }; // ticket 1st category
    //console.log(t1+"==="+st1_pocet);
    //sum_score = sum_score-parseFloat(d1);
    sum_score = sum_score+parseFloat(st1_pocet);
    d1 = parseFloat(st1_pocet);
    $("#t1_pocet").html(parseFloat(st1_pocet));  
    //$("#DisplayRatio").html("<div class='btn-score'>"+(sum_score/Cal_Ratio).toFixed(2)+"</div>");  
    document.getElementById('SendQuestion1').style.display='block';
    //render();
  }
});

$('.rating__input2').on('click', function() {
  //alert(this['value']);
  var rating2 = this['value'];
  //alert(rating1);
  $('.rating__label2').removeClass('active');
  $(this).siblings('.rating__label2').addClass('active');
  $('.feedback').css('display', "block"); 
  //feedback_validate(rating1);
  //console.log(rating2);
  if(!!rating2) { 
    st2_pocet = document.querySelector('input[name="survey2"]:checked').value;
    t2 = { id: 't2', pocet: parseFloat(st2_pocet), hodnota: 1 }; // ticket 1st category
    sum_score = sum_score+parseFloat(st2_pocet);
    $("#t2_pocet").html(parseFloat(st2_pocet));  
    document.getElementById('SendQuestion2').style.display='block';
  }
});

$('.rating__input3').on('click', function() {
  var rating3 = this['value'];
  $('.rating__label3').removeClass('active');
  $(this).siblings('.rating__label3').addClass('active');
  $('.feedback').css('display', "block"); 
  if(!!rating3) { 
    st3_pocet = document.querySelector('input[name="survey3"]:checked').value;
    t3 = { id: 't3', pocet: parseFloat(st3_pocet), hodnota: 1 }; // ticket 1st categoryb
    sum_score = sum_score+parseFloat(st3_pocet);
    $("#t3_pocet").html(parseFloat(st3_pocet));  
    document.getElementById('SendQuestion3').style.display='block';
  }
});

$('.rating__input4').on('click', function() {
  var rating4 = this['value'];
  $('.rating__label4').removeClass('active');
  $(this).siblings('.rating__label4').addClass('active');
  $('.feedback').css('display', "block"); 
  if(!!rating4) { 
    st4_pocet = document.querySelector('input[name="survey4"]:checked').value;
    t4 = { id: 't4', pocet: parseFloat(st4_pocet), hodnota: 1 }; // ticket 1st category
    sum_score = sum_score+parseFloat(st4_pocet);
    $("#t4_pocet").html(parseFloat(st4_pocet));  
    document.getElementById('SendQuestion4').style.display='block';
  }
});

$('.rating__input5').on('click', function() {
  var rating5 = this['value'];
  $('.rating__label5').removeClass('active');
  $(this).siblings('.rating__label5').addClass('active');
  $('.feedback').css('display', "block"); 
  if(!!rating5) { 
    st5_pocet = document.querySelector('input[name="survey5"]:checked').value;
    t5 = { id: 't5', pocet: parseFloat(st5_pocet), hodnota: 1 }; // ticket 1st category
    sum_score = sum_score+parseFloat(st5_pocet);
    $("#t5_pocet").html(parseFloat(st5_pocet));  
    document.getElementById('SendQuestion5').style.display='block';
  }
});

$('.rating__input6').on('click', function() {
  var rating6 = this['value'];
  $('.rating__label6').removeClass('active');
  $(this).siblings('.rating__label6').addClass('active');
  $('.feedback').css('display', "block"); 
  if(!!rating6) { 
    st6_pocet = document.querySelector('input[name="survey6"]:checked').value;
    t6 = { id: 't6', pocet: parseFloat(st6_pocet), hodnota: 1 }; // ticket 1st category
    sum_score = sum_score+parseFloat(st6_pocet);
    $("#t6_pocet").html(parseFloat(st6_pocet));  
    document.getElementById('SendQuestion6').style.display='block';
  }
});

$('.rating__input7').on('click', function() {
  var rating7 = this['value'];
  $('.rating__label7').removeClass('active');
  $(this).siblings('.rating__label7').addClass('active');
  $('.feedback').css('display', "block"); 
  if(!!rating7) { 
    st7_pocet = document.querySelector('input[name="survey7"]:checked').value;
    t7 = { id: 't7', pocet: parseFloat(st7_pocet), hodnota: 1 }; // ticket 1st category
    sum_score = sum_score+parseFloat(st7_pocet);
    $("#t7_pocet").html(st7_pocet);  
    document.getElementById('SendQuestion7').style.display='block';
  }
});

$('.rating__input8').on('click', function() {
  var rating8 = this['value'];
  $('.rating__label8').removeClass('active');
  $(this).siblings('.rating__label8').addClass('active');
  $('.feedback').css('display', "block"); 
  if(!!rating8) { 
    st8_pocet = document.querySelector('input[name="survey8"]:checked').value;
    t8 = { id: 't8', pocet: parseFloat(st8_pocet), hodnota: 1 }; // ticket 1st category
    sum_score = sum_score+parseFloat(st8_pocet);
    $("#t8_pocet").html(st8_pocet);  
    document.getElementById('SendQuestion8').style.display='block';
  }
});

$('.rating__input9').on('click', function() {
    document.getElementById('SendQuestion9').style.display='block';
});


function GotoPage(page) {
  if(page==1) {
    document.getElementById('Question1').style.display='block';
    document.getElementById('Question2').style.display='none';
  } else if(page==2) {
    document.getElementById('Question1').style.display='none';
    document.getElementById('Question2').style.display='block';
    document.getElementById('Question3').style.display='none';
  } else if(page==3) {
    document.getElementById('Question2').style.display='none';
    document.getElementById('Question3').style.display='block';
    document.getElementById('Question4').style.display='none';
  } else if(page==4) {
    document.getElementById('Question3').style.display='none';
    document.getElementById('Question4').style.display='block';
    document.getElementById('Question5').style.display='none';
  } else if(page==5) {
    document.getElementById('Question4').style.display='none';
    document.getElementById('Question5').style.display='block';
    document.getElementById('Question6').style.display='none';
  } else if(page==6) {
    document.getElementById('Question5').style.display='none';
    document.getElementById('Question6').style.display='block';
    document.getElementById('Question7').style.display='none';
  } else if(page==7) {
    document.getElementById('Question6').style.display='none';
    document.getElementById('Question7').style.display='block';
    document.getElementById('Question8').style.display='none';
  } else if(page==8) {
    document.getElementById('Question7').style.display='none';
    document.getElementById('Question8').style.display='block';
    document.getElementById('Question9').style.display='none';
  } else if(page==9) {
    document.getElementById('Question8').style.display='none';
    document.getElementById('Question9').style.display='block';
  } else if(page==10) {
    render();
    document.getElementById('Question9').style.display='none';
    document.getElementById('Question10').style.display='block';
  }
}

calculate = function(object, action) {
  if (action === 'plus') {
    total += object.hodnota;
    if(object.pocet>=0 && object.pocet<=4) {
      sum_score = sum_score-object.pocet;
      object.pocet++;
      sum_score = sum_score+object.pocet;
      $("#DisplayRatio").html(sum_score);  
    }
  } else if ((action === 'minus') && (object.pocet > 0)) {
    total -= object.hodnota;
    if(object.hodnota>=0 && object.hodnota<=5) {
      sum_score = sum_score-object.pocet;
      object.pocet--;
      sum_score = sum_score+object.pocet;
      $("#DisplayRatio").html(sum_score);  
    }
  }
  render();
}

render = function() {
  total_tickets = t1.pocet + t2.pocet + t3.pocet + t4.pocet + t5.pocet + t6.pocet + t7.pocet + t8.pocet;
  SumRatio = (total_tickets/40)*5;
  $("#DisplayRatio").html("<div class='btn-score' style='font-size:13px; font-weight: 600;'>" +SumRatio.toFixed(2)+"</div>");  

  $('#amount').html(total.toFixed(0));
  $('#t1_pocet').html(t1.pocet); $('#t2_pocet').html(t2.pocet); $('#t3_pocet').html(t3.pocet);
  $('#t4_pocet').html(t4.pocet); $('#t5_pocet').html(t5.pocet); $('#t6_pocet').html(t6.pocet);
  $('#t7_pocet').html(t7.pocet); $('#t8_pocet').html(t8.pocet); 
  /* assigning hidden inputs */
  $('#total_amount').html(total.toFixed(0));
  $('#t1_amount').html(t1.pocet); $('#t2_amount').html(t2.pocet); $('#t3_amount').html(t3.pocet);
  $('#t4_amount').html(t4.pocet); $('#t5_amount').html(t5.pocet); $('#t6_amount').html(t6.pocet);
  $('#t7_amount').html(t7.pocet); $('#t8_amount').html(t8.pocet); 

  if (total_tickets > 0) {
    $('#continue').prop('disabled', false);
  } else {
    $('#continue').prop('disabled', true);
  }
}




function SaveSurvey() {
  render();
  CheckGroup();
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  dbSurveyMember.add({
    lineID : sessionStorage.getItem("LineID"),
    linename : sessionStorage.getItem("LineName"),
    empPicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_Survey"),
    EmpName : sessionStorage.getItem("EmpName_Survey"),
    EmpBr : sessionStorage.getItem("EmpBR_Survey"),
    Q1 : parseFloat(t1.pocet),
    Q1_memo : document.getElementById("feedback1").value,
    Q2 : parseFloat(t2.pocet),
    Q2_memo : document.getElementById("feedback2").value,
    Q3 : parseFloat(t3.pocet),
    Q3_memo : document.getElementById("feedback3").value,
    Q4 : parseFloat(t4.pocet),
    Q4_memo : document.getElementById("feedback4").value,
    Q5 : parseFloat(t5.pocet),
    Q5_memo : document.getElementById("feedback5").value,
    Q6 : parseFloat(t6.pocet),
    Q6_memo : document.getElementById("feedback6").value,
    Q7 : parseFloat(t7.pocet),
    Q7_memo : document.getElementById("feedback7").value,
    Q8 : parseFloat(t8.pocet),
    Q8_memo : document.getElementById("feedback8").value,
    Q9_group : document.getElementById("GroupQid").value,
    Q9_memo : document.getElementById("feedback9").value,
    AdvScore : SumRatio.toFixed(2),
    RewardStatus : 0,
    RewardDate : '',
    RewardDetail : '',
    TimeStamp : TimeStampDate,
    DateSurvey : dateString
  });

  dbSurveyGroup.doc(EidGroup).update({
    TotalSurvey : parseFloat(sTotalSurvey)+1,
    TotalQ1 : parseFloat(sTotalQ1)+parseFloat(t1.pocet),
    TotalQ2 : parseFloat(sTotalQ2)+parseFloat(t2.pocet),
    TotalQ3 : parseFloat(sTotalQ3)+parseFloat(t3.pocet),
    TotalQ4 : parseFloat(sTotalQ4)+parseFloat(t4.pocet),
    TotalQ5 : parseFloat(sTotalQ5)+parseFloat(t5.pocet),
    TotalQ6 : parseFloat(sTotalQ6)+parseFloat(t6.pocet),
    TotalQ7 : parseFloat(sTotalQ7)+parseFloat(t7.pocet),
    TotalQ8 : parseFloat(sTotalQ8)+parseFloat(t8.pocet),
    SumPoint : parseFloat(sSumPoint)+parseFloat(total_tickets)
/*
    TargetSurvey : 10,
    TotalSurvey : 0,
    TotalQ1 : 0,
    TotalQ2 : 0,
    TotalQ3 : 0,
    TotalQ4 : 0,
    TotalQ5 : 0,
    TotalQ6 : 0,
    TotalQ7 : 0,
    TotalQ8 : 0,
    SumPoint : 0
*/
  });
  document.getElementById('id01').style.display='block';
}



function CheckGroup() {
  //alert(sessionStorage.getItem("EmpBR_Survey"));
  //dbSurveyGroup.where('EmpGroup','==','RH1')
  dbSurveyGroup.where('EmpGroup','==',sessionStorage.getItem("EmpBR_Survey"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidGroup = doc.id;
      sTotalSurvey = doc.data().TotalSurvey;
      sTotalQ1 = doc.data().TotalQ1;
      sTotalQ2 = doc.data().TotalQ2;
      sTotalQ3 = doc.data().TotalQ3;
      sTotalQ4 = doc.data().TotalQ4;
      sTotalQ5 = doc.data().TotalQ5;
      sTotalQ6 = doc.data().TotalQ6;
      sTotalQ7 = doc.data().TotalQ7;
      sTotalQ8 = doc.data().TotalQ8;
      sTargetSurvey = doc.data().TargetSurvey;
      sSumPoint = doc.data().SumPoint;
    });
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
