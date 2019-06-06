

$(document).ready(function () {

  let screen = 0,
    container = $('.maincontent'),
    pages = $('section'),
    inscroll = false;

    $('.section:first-child').addClass('active');



  let mouseWheel = $('body').on('mousewheel', function(e) {

    let activeSection = pages.filter('.active');

    if (!inscroll) {
      inscroll = true;
      
      if (e.deltaY > 0) {
        
        if (activeSection.prev().length) {
          screen--;
          console.log(inscroll)
          
        };

      } else {

        if (activeSection.next().length) {
          screen++;
          console.log(inscroll)
        };

      };
    };

    let position = (-screen * 100) + '%';

    pages.eq(screen).addClass('active').siblings().removeClass('active');

    container.css('top', position);


    let timeout = setTimeout(() => {
      inscroll = false;
    }, 1000);

    // 

    
  });
});


// function debounce(func, time) {
//   let timeout;

//   return function () {
//     const context = this,
//       args = arguments;


//     let timeout = setTimeout(() => {
//       func.apply(context, args);
//     }, time);

//     clearTimeout(timeout);
//   };
// };






