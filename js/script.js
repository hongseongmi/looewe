$(document).ready(function(){

    //미디어쿼리 1800이상일때 서브메뉴 이벤트들이랑 스와이퍼 풀페이지 안에 담아주기

    //윈도우 너비값 선언 후 1800이상일때, 그리고 그밖의 경우일때를 적은 뒤 함수 처리하고 호출까지 해주기
    media();
   function media(){
    const ww = $(window).width();
    if(ww >= 1800){

     new fullpage('#wrap', {
        scrollBar:true,
        //스크롤바 생성
        normalScrollElements:'.sec-5,.footer',
        //따옴표 안에 적어둔 섹션에는 스크롤을 정상값으로 돌려놓기
        fitToSection:false,
        //높이값이 풀페이지가 아닌 경우 풀페이지 상단영역으로 올라가는거 막아주는 애

     });

  

    $('.header-menu li').mouseenter(function(){
        //헤더메뉴 li에 마우스 올렸을때

        //1.이 식의 장본인에게 data-alt 속성추가해줘
       let result = $(this).attr('data-alt');
       //data-alt 속성을 추가해줌으로써 헤더메뉴와 메뉴내용을 연결해주는것.
       $('.sub-menu').removeClass('active');
     
        //변수 result에다가 위에 지웠던 같은 액티브 추가
           //여기서 서브메뉴를 지운 뒤 추가하는 이유는 다음 메뉴를 보기위해서 마우스를 옮겼을때 지워주지 않으면 보고있던 화면과 다음 볼 화면이 충돌해서 둘이 겹쳐보이는 오류가 발생한다고 한다. 그렇기 때문에 지워줘야 함.
       $(`#${result}`).addClass('active');

        //서브메뉴박스에 액티브 추가해서 서브메뉴박스 영역보이게
        $('.sub-menu-box').addClass('active');
        
        //서브메뉴에 액티브 추가해서 내용도 보이게
        // $('.sub-menu').addClass('active');
        //라고 생각해서 이렇게 해줬더니 옆에 다음 내용도 같이 노출이 되었음. 그래서 이거 지워준거임

        //헤더메뉴 색 바꾸기
        // $('.header-area a').css({'color':'#262320'});
        // $('.icon-box .icon').css({'color':'#262320'});
        // $('.header-logo').addClass('active');
        //data-alt는 active, on 클래스랑 비슷한것 같다.
        //지금의 경우 헤더메뉴 li에겐 data-alt로 tab1부터 tab4까지 적어주었고  헤더메뉴 li의 내용(서브메뉴박스의 자식인 서브메뉴)에다가 아이디로 tab1부터 tab4까지 적어주었다.
        //이렇게 적어 준 뒤 스크립트로 header-menu li에게 data-alt를 addClass로 추가해주면서 헤더메뉴 li에게 마우스를 갖다댔을때 해당 탭이 바로 뜨게끔 처리를 해주는 것이다.

    });

    $('.sub-menu-box').mouseleave(function(){
        $(this).removeClass('active')
        //서브메뉴박스에서 마우스 나왔을때
        $('.sub-menu').removeClass('active');
        //서브메뉴에 들어간 액티브 지우기

        //header-area에 색상 어둡게 변경했던거 원래대로 되돌리기
        $('.header-area a').css({'color':'#fff'});
        $('.icon-box .icon').css({'color':'#fff'});
        $('.header-logo').removeClass('active');
    });
}else{
        
}
}

    //sec-1 swiper 작업
    var swiper = new Swiper(".mySwiper", {
        direction:"vertical",
        //방향 세로
        loop:true,
        //반복:참
        slidesPerView:'auto',
        //한 슬라이더에서 보여줄 갯수: 자동설정
        speed:2000,
        //속도:2초
        autoplay:{
            //자동재생
            delay:1500,
            //딜레이:1.5초
            disableOnInteraction:false,
            //스와이퍼 동작 자동재생: 거짓
        },
        pagination:{
            //호출여부
            clickable:true,
            //버튼클릭여부:참
            el:".swiper-pagination",
        },
      });
    //sec-5에 도달했을때 헤더메뉴 색상 어둡게 변경

    //스크롤 값 가져오기
    $(window).scroll(function(){


    const sct = $(window).scrollTop();
    const banner = $('.banner').offset().top;
    //offset 함수는 원하는 선택자의 위치값을 top,left 형식을 반환하여 준다.
    //즉 $('.banner).offset().top은 '.banner'의 상단에다가 위치값을 맞춰준다는 얘기가 됨
    const sec1 = $('.sec-1').offset().top;
    const sec2 = $('.sec-2').offset().top;
    const sec4 = $('.sec-4').offset().top;
    const sec5 = $('.sec-5').offset().top;

    //스크롤이 sec5번에 도착했을때 바뀌기

    //2. 스크롤 탑값이 sec4보다 크거나 같고, 스크롤 탑값이 sec5보다 클 때(즉 sec5 범위를 나갔을 경우)액티브 지우기(이러면 sec5에 도달해서 header-area 색 바뀐거 다시 위로 올라갈때 원래대로 돌아옴!)
    if(sct >= sec4 && sct < sec5){
        $('.header-area a').removeClass('active');
        $('.header-logo').removeClass('active');
        $('.icon').removeClass('active');
        $('#hamburger span').removeClass('active');
    }
    //1.스크롤 탑 값이 sec5보다 크거나 같을때 액티브 추가(header-area 색상 어둡게 바뀜)
    else if(sct >= sec5){
        $('.header-area a').addClass('active');
        $('.header-logo').addClass('active');
        $('.icon').addClass('active');
        $('#hamburger span').addClass('active');
    }else{

    }
});

//햄버거 버튼 클릭했을때 서브메뉴 토글로 내려오게 만들기
$('#hamburger').click(function(){
  //햄버거버튼 클릭했을때 
    $(this).toggleClass('active');
    $('#hamburger span').toggleClass('active');
    //햄버거 스판에게 토글로 액티브 추가(연달아 누르면 추가제거 번갈아 함)
    $('.header-menu').toggleClass('active')
    //header-menu에게 translateY(0)을 액티브로 추가해주면서 상하로 들어갔다 나오게끔 처리    
});
});//end

