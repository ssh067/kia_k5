//햄버거 버튼을 클릭하면 
$('.open_gnb').click(function(){
    $(this).toggleClass('open');
    $('.gnb_area').slideToggle();
    $('.m_gnb_dimmed').fadeToggle(200);
});

//open_snb를 클릭하면 서브메뉴가 보임
$('.open_snb').click(function(){
    $(this).toggleClass('open');
});


$(window).resize(function(){
    winW = $(window).width();
    //모바일 상태에서 메뉴 슬라이드가 작동 된 뒤 남아있는 style속성을 없애준다
    if(winW > 1024){
        $('.gnb_area,.m_gnb_dimmed').removeAttr('style');   
        $('.open_gnb').removeClass('open');
    }

    //모바일 상태에서 .subInner부분이 슬라이더로
    if(winW < 769){
        $('.type2, .type3, .type4').addClass('mySlider');
        //slick이 적용된 요소에서 발생하는 이벤트를 처리해 주는 함수(꼭 slick 적용전 사용)
        $('.mySlider').on('init reInit afterChange',function(event, slick, currentSlide, nextSlide){
            var index = (currentSlide ? currentSlide : slick.currentSlide) + 1; 
            $('.slick-dots').html('<li>'+index+'/'+(slick.slideCount)+'</li>');
            //dot이 나올 자리에 삽입
        });
        $('.mySlider').slick({ dots:true });
    } else {
        $('.mySlider').slick('unslick');
        $('.type2, .type3, .type4').removeClass('mySlider');

    }


// location.reload();    //화면 새로고침-위에거 다 지우고 이거 하나만 
});

//모바일 상태에서 .subInner부분이 슬라이더로 
winW = $(window).width();
if(winW < 769){
    $('.type2, .type3, .type4').addClass('mySlider');

    //slick이 적용된 요소에서 발생하는 이벤트를 처리해 주는 함수(꼭 slick 적용전 사용)
    $('.mySlider').on('init reInit afterChange',function(event, slick, currentSlide, nextSlide){
        var index = (currentSlide ? currentSlide : slick.currentSlide) + 1; 
        $('.slick-dots').html('<li>'+index+'/'+(slick.slideCount)+'</li>');
        //dot이 나올 자리에 삽입
    });

    $('.mySlider').slick({
        dots: true, 
    });

} else {
    $('.mySlider').slick('unslick');
    $('.type2, .type3, .type4').removeClass('mySlider');
};



var pos = [];   //각 section이 top에서 부터 얼마나 떨어져 있냐를 알아내기 위한 변수 설정(배열)
for(var i=1 ; i<7 ; i++){
    pos.push(($('#section'+i).offset().top) - 160) ;
}
console.log(pos);



//인디게이터를 누르면 각 페이지(section)으로 이동한다
$('.indicator li a').on("click",function(e){
    e.preventDefault();       //a의 기본 기능을 못하게 한다.
    var targ = this.hash;     //  #(해쉬) 값을 찾아서 변수에 넣는다    

    var sectionH =($(targ).offset().top) - 1; 
    //각section의 위로부터의 거리에서 고정 헤더길이(160px)만큼 빼줌
    $('html,body').animate({scrollTop:sectionH},500);    
});


var currentP //현재 어떤 section 부분에 있는지
$(window).scroll(function(){
    var scrollH = $(window).scrollTop();    //스크롤 된 거리  
    console.log(scrollH);

    //모바일상 indicator
    if(scrollH >=60){
        $('.snb_wrap, .m_indicator').addClass('stick');
    }else{
        $('.snb_wrap, .m_indicator').removeClass('stick');
    }



    //웹상에서 indicator
    if(scrollH < pos[1]) {
        $('.indicator li').removeClass('on');
        $('.indicator li').eq(0).addClass('on');
        $('.indicator_prev').css({'display':'none'});
        $('.indicator_next').css({'display':'block'});
        currentP = 0;
    } 
    else if (scrollH >= pos[1] && scrollH < pos[2]) {
        $('.indicator li').removeClass('on');
        $('.indicator li').eq(1).addClass('on');
        $('.indicator_prev').css({'display':'block'});
        $('.indicator_next').css({'display':'block'});
        currentP = 1;
    } 
    else if (scrollH >= pos[2] && scrollH < pos[3]) {
        $('.indicator li').removeClass('on');
        $('.indicator li').eq(2).addClass('on');
        $('.indicator_prev').css({'display':'block'});
        $('.indicator_next').css({'display':'block'});
        currentP = 2;
    } 
    else if (scrollH >= pos[3] && scrollH < pos[4]) {
        $('.indicator li').removeClass('on');
        $('.indicator li').eq(3).addClass('on');
        $('.indicator_prev').css({'display':'block'});
        $('.indicator_next').css({'display':'block'});
        $('.buy_car img').removeClass('ani');
        currentP = 3;
    }else if (scrollH >= pos[4] && scrollH < pos[5]) {
        $('.indicator li').removeClass('on');
        $('.indicator li').eq(4).addClass('on');
        $('.indicator_prev').css({'display':'block'});
        $('.indicator_next').css({'display':'block'});
        currentP = 4;
    }
    else {
        $('.indicator li').removeClass('on');
        $('.indicator li').eq(5).addClass('on');
        $('.indicator_prev').css({'display':'block'});
        $('.indicator_next').css({'display':'none'});
        $('.buy_car img').addClass('ani');
        currentP = 5;
    }
});
$('.indicator_prev').on('click',function(){
    currentP = currentP -1;
    $('html,body').animate({scrollTop:pos[currentP]+2},500);
})
$('.indicator_next').on('click',function(){
    currentP = currentP + 1;
    $('html,body').animate({scrollTop:pos[currentP]+2},500); 
});


