$(function () {

  $("#red-slider, #green-slider, #blue-slider").slider({
    orientation: "horizontal",
    range: "min",
    max: 255,
    value: 50,
    animate: "slow"
  });

  // TEXT COLOR EDIT

  $('#textChange').on('click', e => {

    function changeTextColor() {
      let red = $("#red-slider").slider("value"),
        green = $("#green-slider").slider("value"),
        blue = $("#blue-slider").slider("value");
      let hex = hexFromRGB(red, green, blue);
      $("#result").css("color", "#" + hex);
    };

    $("#red-slider, #green-slider, #blue-slider").slider({
      slide: changeTextColor,
      change: changeTextColor
    });

  });


  // BG COLOR EDIT

  $('#backgroundChange').on('click', e => {

    function changeBackgroundColor() {
      let red = $("#red-slider").slider("value"),
        green = $("#green-slider").slider("value"),
        blue = $("#blue-slider").slider("value"),
        hex = hexFromRGB(red, green, blue);
      $("#result").css("backgroundColor", "#" + hex);
    };

    $("#red-slider, #green-slider, #blue-slider").slider({
      slide: changeBackgroundColor,
      change: changeBackgroundColor
    });
  });

  // BUTTONS

  $(".btn-group").buttonset();

  // functions

  function hexFromRGB(r, g, b) {
    var hex = [
      r.toString(16),
      g.toString(16),
      b.toString(16)
    ];
    $.each(hex, function (nr, val) {
      if (val.length === 1) {
        hex[nr] = "0" + val;
      }
    });
    return hex.join("").toUpperCase();
  }

  setTimeout(function () {
    $('#textChange').trigger('click');
  }, 200);

  // function changeColor(target) {
  //   let red = $("#red-slider").slider("value"),
  //     green = $("#green-slider").slider("value"),
  //     blue = $("#blue-slider").slider("value"),
  //     hex = hexFromRGB(red, green, blue);
  //   $("#result").css(target, "#" + hex);
  // };
});