var st1_pocet = 0;
var st2_pocet = 0;
var st3_pocet = 0;
var st4_pocet = 0;
var st5_pocet = 0;
var st6_pocet = 0;
var st7_pocet = 0;
var st8_pocet = 0;
var d1 = 0;
var d2 = 0;
var d3 = 0;
var d4 = 0;
var d5 = 0;
var d6 = 0;
var d7 = 0;
var d8 = 0;

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

/*

$('button.btn-survey1').disabled = true;	// disable button on load

// Enable button 
function enable_submit() {
  $('button.btn-survey1').disabled = false;
  $('button.btn-survey1').addClass('not-disabled');
}

// Disable button
function disable_submit() {
  $('button.btn-survey1').disabled = true;
  $('button.btn-survey1').removeClass('not-disabled');
}
*/


$(document).ready(function() {
  /* click on back button - will do reset and removal of previously appended children */
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
  /* click on continue button */
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
  console.log(rating2);
  if(!!rating2) { 
    st2_pocet = document.querySelector('input[name="survey2"]:checked').value;
    t2 = { id: 't2', pocet: parseFloat(st2_pocet), hodnota: 1 }; // ticket 1st category
    //sum_score = sum_score-parseFloat(d2);
    sum_score = sum_score+parseFloat(st2_pocet);
    //d2 = parseFloat(st2_pocet);
    $("#t2_pocet").html(parseFloat(st2_pocet));  
    //$("#DisplayRatio").html(sum_score);  
    document.getElementById('SendQuestion2').style.display='block';
    //render();
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
    //sum_score = sum_score-parseFloat(d3);
    sum_score = sum_score+parseFloat(st3_pocet);
    //d3 = parseFloat(st3_pocet);
    $("#t3_pocet").html(parseFloat(st3_pocet));  
    //$("#DisplayRatio").html(sum_score);  
    document.getElementById('SendQuestion3').style.display='block';
    //render();
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
    //sum_score = sum_score-parseFloat(d4);
    sum_score = sum_score+parseFloat(st4_pocet);
    //d4 = parseFloat(st4_pocet);
    $("#t4_pocet").html(parseFloat(st4_pocet));  
    //$("#DisplayRatio").html(sum_score);  
    document.getElementById('SendQuestion4').style.display='block';
    //render();
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
    //sum_score = sum_score-parseFloat(d5);
    sum_score = sum_score+parseFloat(st5_pocet);
    //d5 = parseFloat(st5_pocet);
    $("#t5_pocet").html(parseFloat(st5_pocet));  
    //$("#DisplayRatio").html(sum_score);  
    document.getElementById('SendQuestion5').style.display='block';
    //render();
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
    //sum_score = sum_score-parseFloat(d6);
    sum_score = sum_score+parseFloat(st6_pocet);
    //d6 = parseFloat(st6_pocet);
    $("#t6_pocet").html(parseFloat(st6_pocet));  
    //$("#DisplayRatio").html(sum_score);  
    document.getElementById('SendQuestion6').style.display='block';
    //render();
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
    //sum_score = sum_score-parseFloat(d7);
    sum_score = sum_score+parseFloat(st7_pocet);
    //d7 = parseFloat(st7_pocet);
    $("#t7_pocet").html(st7_pocet);  
    //$("#DisplayRatio").html(sum_score);  
    document.getElementById('SendQuestion7').style.display='block';
    //render();
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
    //sum_score = sum_score-parseFloat(d8);
    sum_score = sum_score+parseFloat(st8_pocet);
    //d8 = parseFloat(st8_pocet);
    $("#t8_pocet").html(st8_pocet);  
    //$("#DisplayRatio").html(sum_score);  
    document.getElementById('SendQuestion8').style.display='block';
    //render();
  }
});

$('.rating__input9').on('click', function() {
  //var rating9 = this['value'];
  //$('.rating__label8').removeClass('active');
  //$(this).siblings('.rating__label8').addClass('active');
  //$('.feedback').css('display', "block"); 
  //if(!!rating8) { 
    document.getElementById('SendQuestion9').style.display='block';
  //}
});

/*
// Run enable button function based on input
$('.feedback textarea').keyup(function() {
  if ($('.feedback textarea').val().length > 3)   {
    enable_submit();
  }
});

// Enable or disable button by validation
function feedback_validate(val) {
  if (val <= 3) {
    disable_submit();
    
  } 
  else if (val > 3) {
    enable_submit();
  }
}
*/



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

/* recalculate and display numbers + assigning hidden inputs */
render = function() {
  total_tickets = t1.pocet + t2.pocet + t3.pocet + t4.pocet + t5.pocet + t6.pocet + t7.pocet + t8.pocet;
  var SumRatio = (total_tickets/40)*5;
  $("#DisplayRatio").html("<div class='btn-score'>"+SumRatio.toFixed(2)+"</div>");  

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

/* add a list of tickets if multiple tickets are selected, argument is a ticket category 
addTicketList = function(objekt) {
  if (objekt.pocet > 1 || total_tickets > 1) {
    for (var i = 0; i < objekt.pocet; i++) {
      $('#listed_' + objekt.id).removeClass('hidden').append(insert(i+1));
    }
  }
}
*/
/* insert a row if multiple ticket are selected, argument passed is a ticket count (for that section) */
/*
var insert = function(num) {
  return (
  "<div class='row'>"+
    "<div class='col-xs-1'><label for='row' class='p-top'><span class='ticket_span'>"+ num +"#</span></label></div>"+
    "<div class='col-xs-5'><input type='text' class='form-control' name='names[]' placeholder='Full name' required></div>"+
    "<div class='col-xs-6'><input type='email' class='form-control' name='emails[]' placeholder='anothername@gmail.com' required></div>"+
  "</div>");
}
*/

