
document.querySelector('.header__burger').addEventListener('click', function(){
    document.querySelector('.header__burger-span').classList.toggle('active');
    document.querySelector('.header__menu-mobile').classList.toggle("animate");
});
$(document).on('click', function(event){
    let $target = $(event.target).closest('.header__burger, .header__menu-mobile');
    if ( !$target.length) {
        $('.header__menu-mobile').removeClass('animate');
        $('.header__burger-span').removeClass('active');
     }
});
