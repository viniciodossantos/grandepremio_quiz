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
    var listName = ["A - ","B - ","C - ","D - ","E - "]
    


    var quiz_question = [
        {
            "question"      :   "A Shell estampa o carro de um piloto brasileiro na Indy 500. Qual?",
            "image"         :   "assets/images/quiz/1.jpg",
            "mobile"         :   "assets/images/quiz/mobile/1.jpg",
            "choices"       :   [
                                    "Helio Castroneves",
                                    "Pietro Fittipaldi",
                                    "Matheus Leist",
                                    "Tony Kanaan"
                                ],
            "answer"       :   ""
        },
        {
            "question"      :   "Como se chama o chefe da equipe Shell Racing na Stock Car?",
            "image"         :   "assets/images/quiz/2.jpg",
            "mobile"         :   "assets/images/quiz/mobile/2.jpg",
            "choices"       :   [
                                    "Átila Abreu",
                                    "Rosinei Campos",
                                    "Duda Pamplona",
                                    "Thiago Meneghel"
                                ],
            "answer"       :   ""
        },
        {
            "question"      :   "Quantas equipes Sebastian Vettel defendeu na F1 até 2018?",
            "image"         :   "assets/images/quiz/3.jpg",
            "mobile"         :   "assets/images/quiz/mobile/3.jpg",
            "choices"       :   [
                                    "2",
                                    "3",
                                    "4",
                                    "5"
                                ],
            "answer"       :   ""
        },
        {
            "question"      :   "No GP do Brasil de 2017, Sebastian Vettel elogiou um piloto da Academia da Shell e o colocou como possível futuro brasileiro na F1. Hoje, ele faz parte da Academia Ferrari. Quem é?",
            "image"         :   "assets/images/quiz/4.jpg",
            "mobile"         :   "assets/images/quiz/mobile/4.jpg",
            "choices"       :   [
                                    "Marcel Coletta",
                                    "Gianluca Petecof",
                                    "Enzo Fittipaldi",
                                    "Caio Collet"
                                ],
            "answer"       :   ""
        },
        {
            "question"      :   "Qual foi o palco da primeira vitória da Shell Racing na Stock Car 2018?",
            "image"         :   "assets/images/quiz/5.jpg",
            "mobile"         :   "assets/images/quiz/mobile/5.jpg",
            "choices"       :   [
                                    "Curitiba",
                                    "Londrina",
                                    "Santa Cruz do Sul",
                                    "Velopark"
                                ],
            "answer"       :   ""
        },
        {
            "question"      :   "Kimi Räikkönen nasceu na cidade finlandesa de...",
            "image"         :   "assets/images/quiz/6.jpg",
            "mobile"         :   "assets/images/quiz/mobile/6.jpg",
            "choices"       :   [
                                    "Espoo",
                                    "Esboo",
                                    "Eskoo",
                                    "Estoo"
                                ],
            "answer"       :   ""
        },
        {
            "question"      :   "Em que cidade nasceu Ricardo Zonta, piloto da Shell Racing?",
            "image"         :   "assets/images/quiz/7.jpg",
            "mobile"         :   "assets/images/quiz/mobile/7.jpg",
            "choices"       :   [
                                    "Curitiba",
                                    "Ribeirão Preto",
                                    "São Paulo",
                                    "Rio de Janeiro"
                                ],
            "answer"       :   ""
        },
        {
            "question"      :   "Quais foram os convidados da Shell Racing na Corrida de Duplas da Stock Car em 2018?",
            "image"         :   "assets/images/quiz/8.jpg",
            "mobile"         :   "assets/images/quiz/mobile/8.jpg",
            "choices"       :   [
                                    "Laurens Vanthoor e Mark Winterbottom",
                                    "Felipe Massa e Pipo Derani",
                                    "Mark Winterbottom e Felipe Massa",
                                    "Laurens Vanthoor e Pipo Derani"
                                ],
            "answer"       :   ""
        },
        {
            "question"      :   "Quantos títulos na Fórmula 1 tem a atual dupla da Ferrari?",
            "image"         :   "assets/images/quiz/9.jpg",
            "mobile"         :   "assets/images/quiz/mobile/9.jpg",
            "choices"       :   [
                                    "4",
                                    "5",
                                    "3",
                                    "6"
                                ],
            "answer"       :   ""
        },
        {
            "question"      :   "O que quer dizer a sigla DTM?",
            "image"         :   "assets/images/quiz/10.jpg",
            "mobile"         :   "assets/images/quiz/mobile/10.jpg",
            "choices"       :   [
                                    "Deutsche Tourenwagen Masters",
                                    "Deutsche Touring Masters",
                                    "Drivers Touring Masters",
                                    "Driven To Mesmerize"
                                ],
            "answer"       :   ""
        },
        {
            "question"      :   "Qual time da cidade de Átila Abreu disputa a Série B do Campeonato Brasileiro em 2018?",
            "image"         :   "assets/images/quiz/11.jpg",
            "mobile"         :   "assets/images/quiz/mobile/11.jpg",
            "choices"       :   [
                                    "Guarani",
                                    "Oeste",
                                    "Ponte Preta",
                                    "São Bento"
                                ],
            "answer"       :   ""
        },
        {
            "question"      :   "No ano da morte da cantora Tina Turner, qual piloto foi campeão da F1?",
            "image"         :   "assets/images/quiz/12.jpg",
            "mobile"         :   "assets/images/quiz/mobile/12.jpg",
            "choices"       :   [
                                    "Michael Schumacher",
                                    "Lewis Hamilton",
                                    "Nico Rosberg",
                                    "Tina Turner ainda está viva"
                                ],
            "answer"       :   ""
        },
        {
            "question"      :   "Qual o ponto em comum entre os brasileiros Augusto Farfus e Felipe Massa?",
            "image"         :   "assets/images/quiz/13.jpg",
            "mobile"         :   "assets/images/quiz/mobile/13.jpg",
            "choices"       :   [
                                    "Os dois nasceram em Curitiba",
                                    "Os dois moram em Mônaco",
                                    "Os dois já foram pilotos de testes da Sauber na F1",
                                    "Os dois já venceram na Corrida de Duplas da Stock Car"
                                ],
            "answer"       :   ""
        },
        {
            "question"      :   "Quais pilotos foram companheiros do último brasileiro que correu na Scuderia Ferrari?",
            "image"         :   "assets/images/quiz/14.jpg",
            "mobile"         :   "assets/images/quiz/mobile/14.jpg",
            "choices"       :   [
                                    "Michael Schumacher, Kimi Räikkönen e Fernando Alonso",
                                    "Michael Schumacher, Rubens Barrichello e Fernando Alonso",
                                    "Fernando Alonso, Kimi Räikkönen e Eddie Irvine",
                                    "Fernando Alonso, Jean Alesi e Gerhard Berger"
                                ],
            "answer"       :   ""
        },
        {
            "question"      :   "Quais os anos em que o piloto da Shell Racing correu temporadas completas na Fórmula 1?",
            "image"         :   "assets/images/quiz/15.jpg",
            "mobile"         :   "assets/images/quiz/mobile/15.jpg",
            "choices"       :   [
                                    "1998 e 1999",
                                    "1999 e 2000",
                                    "1998, 1999 e 2000",
                                    "2000 e 2001"
                                ],
            "answer"       :   ""
        },
        {
            "question"      :   "Qual destes ex-pilotos é atualmente o chefão de uma grande categoria internacional?",
            "image"         :   "assets/images/quiz/16.jpg",
            "mobile"         :   "assets/images/quiz/mobile/16.jpg",
            "choices"       :   [
                                    "Gerhard Berger",
                                    "Allan McNish",
                                    "Tom Kristensen",
                                    "Niki Lauda"
                                ],
            "answer"       :   ""
        },
        {
            "question"      :   "Qual piloto correu toda a temporada de estreia da Shell Racing na Stock Car?",
            "image"         :   "assets/images/quiz/17.jpg",
            "mobile"         :   "assets/images/quiz/mobile/17.jpg",
            "choices"       :   [
                                    "Alceu Feldmann",
                                    "Rodrigo Sperafico",
                                    "Valdeno Brito",
                                    "Felipe Maluhy"
                                ],
            "answer"       :   ""
        },
        {
            "question"      :   "Durante o bicampeonato de Fernando Alonso, quatro equipes venceram corridas. Quais?",
            "image"         :   "assets/images/quiz/18.jpg",
            "mobile"         :   "assets/images/quiz/mobile/18.jpg",
            "choices"       :   [
                                    "Ferrari, Honda e Renault",
                                    "Ferrari, McLaren e Renault",
                                    "Ferrari, Williams e Renault ",
                                    "Ferrari, Toyota e Renault"
                                ],
            "answer"       :   ""
        },
        {
            "question"      :   "Qual era a dupla de pilotos da Shell Racing no ano do título de Rubens Barrichello na Stock Car?",
            "image"         :   "assets/images/quiz/19.jpg",
            "mobile"         :   "assets/images/quiz/mobile/19.jpg",
            "choices"       :   [
                                    "Átila Abreu e Popó Bueno",
                                    "Átila Abreu e Ricardo Zonta",
                                    "Ricardo Zonta e Valdeno Brito",
                                    "Popó Bueno e Valdeno Brito "
                                ],
            "answer"       :   ""
        },
        {
            "question"      :   "No ano em que Fernando Alonso conquistou seu primeiro título na Fórmula 1, qual era a dupla de pilotos da Scuderia Ferrari? ",
            "image"         :   "assets/images/quiz/20.jpg",
            "mobile"         :   "assets/images/quiz/mobile/20.jpg",
            "choices"       :   [
                                    "Michael Schumacher e Felipe Massa",
                                    "Michael Schumacher e Rubens Barrichello",
                                    "Kimi Räikkonen e Felipe Massa",
                                    "Michael Schumacher e Kimi Räikkönen"
                                ],
            "answer"       :   ""
        }
        
    ];
    var tq = quiz_question.length;


    this.init = function() {
        preloadImage(quiz_question[0].mobile);
        preloadImage(quiz_question[0].image);
    };

    var r = [0,3,2,1,2,0,0,0,1,0,3,3,1,0,1,0,2,0,3,1];
    function preloadImage(url){
        var img=new Image();
        img.src=url;
    }
    function next(){
        //console.log('next');
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
        
        $(questions[ step - 1 ]).animate({height:'0px'},400,function(){
            $(questions[ step - 1 ]).removeClass('active');
            wh(elQuiz, $(questions[ step ]).outerWidth(),$(questions[ step ]).outerHeight(), true);
            
            $(stepNum).show();

        });
        $(questions[ step ]).addClass('active');

        if(step<tq){
            preloadImage(quiz_question[step].mobile);
            preloadImage(quiz_question[step].image);
        }
        
        
        
       

    }

    function end(){
        var t = 0;
        quiz_question.forEach(function(value,index){
            if(r[index]==value.answer){
                t++;
            }
        });
        $(quizend + " .result b").html( ('0' + (t) ).slice(-2) + ' / ' + ('0' + (quiz_question.length)).slice(-2) );

        wh(elQuiz, $(elQuiz).outerWidth(),$(elQuiz).outerHeight(), false);
        $(elQuiz).removeClass('question_on');
        $(elQuestion).animate({height:'0px'},400,function(){
            $(elQuestion).removeClass('active');
            $(elQuiz).css({'height': 'auto', 'width': 'auto'});
        });
        $(quizend).addClass('active');
        $(stepNum).hide();
    }

    function wh(el,w,h,animate){
        if(animate){
            $(el).stop().animate({'height':h, 'width':w},400,function(){
                $(el).css({'height': 'auto', 'width': 'auto'});
                
            });
        }else{
            $(el).css({'height': h, 'width': w});
        }
    }

document.getElementsByClassName("example")
    function loadQuestion(step){
        
        $(".question:last-child .quiz_question h2").html( ('0' + (step + 1)).slice(-2) + '.' );
        $(".question:last-child .quiz_question h3").html( quiz_question[step].question );

        $(".question:last-child .cover").css('background-image', 'url(' + quiz_question[step].image + ')' );
        $(".question:last-child .cover-mobile").css('background-image', 'url(' + quiz_question[step].mobile + ')' );

        $(stepNum).html(('0' + (step + 1)).slice(-2) + ' / ' + ('0' + (quiz_question.length)).slice(-2) );
        
        

        var bt;
        var ch = document.getElementsByClassName("choices");
        ch = ch[( ch.length - 1)];
        ch.innerHTML = "";
        quiz_question[step].choices.forEach(function(value,index){
            bt = document.createElement("BUTTON");
            bt.setAttribute("value", index);
            bt.appendChild(document.createTextNode(listName[index] + value));
            bt.addEventListener("click",function(){
                answer(this, step);
            });
            ch.appendChild(bt);
        });

    }

    function answer(button, step){
        quiz_question[step].answer = $(button).val();
        if((step+1) < quiz_question.length){
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
        event.preventDefault(); 
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
                    //console.log('start');
                    next();
                }
            }
        }
    }
   

    // Start quiz e pre load da primeira imagem
    this.init(); 
}

