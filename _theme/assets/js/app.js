function load(action){
    if(action){
        $('body').append('<div class="div_load"></div><div class="opacity_load"></div>');
        setTimeout(function(){
            $(".div_load").show();
            $(".opacity_load").show();
        },200);
    }else{
        $('.div_load,.opacity_load').remove();''
    }
}
var ajaxPost = function(param){
    
    var deferred = new $.Deferred();
    if(!$(param.id)[0]){
        if(param.form){
            serialize = param.form;
        }else{
            return false;
        }
    }else{
        serialize = $(param.id).serialize();
    }
    $.ajax({
        url: param.ajax_url,
        type : 'post',
        data : {
            action : param.action,
            post : serialize
        },  
        success:function (data) {

            var $validator = $(param.id).validate();
            var IS_JSON = true;
            var ERRO="";
            try{data= $.parseJSON(data);}
            catch(err){IS_JSON = false; ERRO = err;}  
            if(IS_JSON){
                
                if(data.status=="success"){
                    deferred.resolve(data);
                }else if(data.status=="error"){
                    
                    if($.isArray(data.errors)){
                        $.each(data.errors, function (result, val) {
                            $validator.showErrors(val.validationjquery);  
                        });
                    }else{
                        if($(param.id)[0]){
                            $validator.showErrors(data.errors.validationjquery);
                        } 
                    }
                }
                deferred.resolve(data);
            }else{
                deferred.resolve(data);
            }
        }
    });
   return deferred.promise();
};



function returnJson(data){
    var IS_JSON = true;
    var ERRO="";
    try{
      data = $.parseJSON(data);
    }catch(err){
      IS_JSON = false; 
      ERRO = err; 
    }
    if(IS_JSON){
        return data;
    }else{
        return false;
    }
}

$(document).ready(function(){

    /* site  */
    var t, i, r, u;
    
    $(".icone-busca").click(function() {
        $(this).hasClass("open") ? ($(this).removeClass("open"), $(".menu-busca").addClass("hidden")) : ($(this).addClass("open"), $(".menu-busca").removeClass("hidden"), $("#txtBusca").focus(), $(".explorar").hasClass("open") && ($(".explorar").removeClass("open"), $(".menu-explorar").addClass("hidden")))
    });
    $(".explorar").click(function() {
        $(this).hasClass("open") ? ($(this).removeClass("open"), $(".menu-explorar").addClass("hidden")) : ($(this).addClass("open"), $(".menu-explorar").removeClass("hidden"), $(".icone-busca").hasClass("open") && ($(".icone-busca").removeClass("open"), $(".menu-busca").addClass("hidden")))
    });

    var n = $(window).height(),
        e = $(window).width(),
        f = n - 50;
    
    $(".content-menu-mobile").css("height", f + "px");
    $(".icone-menu").click(function() {
        $(".content-menu-mobile").hasClass("hidden") ? ($(".content-menu-mobile").removeClass("hidden"), $(this).addClass("active")) : ($(".content-menu-mobile").addClass("hidden"), $(this).removeClass("active"))
    });

    $("#txtBusca").keypress(function(n) {
        if (n.keyCode == 13) {
            if ($(this).val().trim() != "") {
                var t = encodeURI($(this).val().trim());
                window.location = "/busca?s=" + t
            }
            return !1
        }
    });
    $("#txtBuscaTela").keypress(function(n) {
        if (n.keyCode == 13) {
            if ($(this).val().trim() != "") {
                var t = encodeURI($(this).val().trim());
                window.location = "/busca?s=" + t
            }
            return !1
        }
    });


   

})


var questions = document.querySelectorAll('.question');


var quizgp = new Quiz();

function htmlEncode(value){
    return $(document.createElement('div')).text(value).html();
}
 
function addChoices(choices){
    if(typeof choices !== "undefined" && $.type(choices) == "array"){
        $('#choice-block').empty();
        for(var i=0;i<choices.length; i++){
            $(document.createElement('li')).addClass('choice choice-box').attr('data-index', i).text(choices[i]).appendTo('#choice-block');                    
        }
    }
}
  

  
 

function Quiz(){
    
    var elQuestion = '.question';
    var elQuiz = '.quiz';
    var stepNum = '.numberstep';
    var quizend = '.quiz_end';

    
    var car = dragtostart.querySelector('.car');
    var questions = '';
    var start = false;


    var quiz_question = [
        {
            "question"      :   "No período em que Sebastian Vettel foi campeão na F1, quantos pilotos foram titulares da Scuderia Ferrari?",
            "image"         :   "assets/images/quiz/1.jpg",
            "mobile"         :   "assets/images/quiz/1mobile.jpg",
            "choices"       :   [
                                    "2 pilotos",
                                    "3 pilotos",
                                    "4 pilotos",
                                    "5 pilotos"
                                ],
            "answer"       :   ""
        },
        {
            "question"      :   "No período em que Sebastian Vettel foi campeão na F1, quantos pilotos foram titulares da Scuderia Ferrari?",
            "image"         :   "assets/images/quiz/2.jpg",
            "mobile"         :   "assets/images/quiz/1mobile.jpg",
            "choices"       :   [
                                    "2 pilotos",
                                    "3 pilotos",
                                    "4 pilotos",
                                    "5 pilotos"
                                ],
            "answer"       :   ""
        }
    ];


    this.init = function() {
        
    };
    function next(){
        console.log('next');
        questions = $(elQuestion);

        questions.each(function(index,question){
            if($(question).hasClass('active')){
                wh(elQuiz, $(elQuiz).outerWidth(),$(elQuiz).outerHeight()), false;
                loadQuestion(index);
                step = index + 1;
                if(!$(elQuiz).hasClass('question_on')){
                    $(elQuiz).addClass('question_on');
                }
            }
        });
        
        $(questions[ step - 1 ]).animate({height:'0px'},600,function(){
            $(questions[ step - 1 ]).removeClass('active');
            wh(elQuiz, $(questions[ step ]).outerWidth(),$(questions[ step ]).outerHeight(), true);
            
            $(stepNum).show();

        });
        $(questions[ step ]).addClass('active');

    }

    function end(){
        $(quizend + " .result b").html( ('0' + (step) ).slice(-2) + ' / ' + ('0' + (quiz_question.length)).slice(-2) );

        wh(elQuiz, $(elQuiz).outerWidth(),$(elQuiz).outerHeight(), false);
        $(elQuiz).removeClass('question_on');
        $(elQuestion).animate({height:'0px'},600,function(){
            $(elQuestion).removeClass('active');
            $(elQuiz).css({'height': 'auto', 'width': 'auto'});
        });
        $(quizend).addClass('active');
        $(stepNum).hide();
    }

    function wh(el,w,h,animate){
        if(animate){
            $(el).animate({'height':h, 'width':w},400,function(){
                $(el).css({'height': 'auto', 'width': 'auto'});
                
            });
        }else{
            $(el).css({'height': h, 'width': w});
        }
    }

    function loadQuestion(step){
        
        $(".question:last-child .quiz_question h2").html( ('0' + (step + 1)).slice(-2) + '.' );
        $(".question:last-child .quiz_question h3").html( quiz_question[step].question );

        $(".question:last-child .cover").css('background-image', 'url(' + quiz_question[step].image + ')' );
        $(".cover-mobile").css('background-image', 'url(' + quiz_question[step].mobile + ')' );

        $(stepNum).html(('0' + (step + 1)).slice(-2) + ' / ' + ('0' + (quiz_question.length)).slice(-2) );
        
        var choices="";
        quiz_question[step].choices.forEach(function(value,index){
            choices += '<button type="button" value="' + index + '">' + value + '</button>';
        });
        $(".question:last-child .quiz_question .choices").html(choices);
        $('button').click(function(){
            answer(this, step);
        });
    }

    function answer(button, step){
        if((step+1) < quiz_question.length){
            quiz_question[step].answer = $(button).val();
            $('<div class="question">' + $(".question.active").html() + '</div>').appendTo(".quiz");
            next();
        }else{
            $qz = $(quizend).html();
            $(quizend).remove();
            $('<div class="quiz_end">' + $qz + '</div>').appendTo(".quiz");
            end();
        }
    }


    car.addEventListener('touchstart', function(event){
        carEvent(event);
    });
    
    car.onmousedown = function(event) {
        event.preventDefault(); 
        carEvent(event)
    };

    function carEvent(event){
        if(!start){
            
            var shiftX = (event.clientX ? event.clientX : event.changedTouches[0].clientX) - car.getBoundingClientRect().left;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);

            
            car.addEventListener('touchmove', onTouchMove, false);
            car.addEventListener('touchend', onMouseUp, false);
            
            function move(newLeft){
                if (newLeft < 0) {
                    newLeft = 0;
                }
                var rightEdge = dragtostart.offsetWidth - car.offsetWidth;
                if (newLeft > rightEdge) {
                    newLeft = rightEdge;
                    start = true;
                }else{
                    start = false;
                }
                
                car.style.left = newLeft + 'px';
            }
            function onTouchMove(event) {
                event.preventDefault();
                console.log(event.changedTouches[0].clientX);
                console.log(shiftX);
                console.log(dragtostart.getBoundingClientRect().left);

                var newLeft = event.changedTouches[0].clientX - shiftX - dragtostart.getBoundingClientRect().left;
                
                move(newLeft);
            }
            
            function onMouseMove(event) {
                var newLeft = event.clientX - shiftX - dragtostart.getBoundingClientRect().left;
                move(newLeft);
            }
            function onMouseUp() {
                document.removeEventListener('mouseup', onMouseUp);
                document.removeEventListener('mousemove', onMouseMove);

                if(start == true){
                    console.log('start');
                    next();
                }
            }
        }
    }
   

    // Start quiz
    this.init(); 
}

