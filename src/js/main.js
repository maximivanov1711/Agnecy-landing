$(document).ready(function(){
  $("#menu-button").on("click", function(){
    $("#menu").toggleClass("active");
    $("header").toggleClass("active");
  });

  $(".gallery__photo").on("click", function(){
    let path = $(this).attr("data-path");
    $("#photo-big").attr("src", path);
  });
});