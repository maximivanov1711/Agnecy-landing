$(document).ready(function(){
  $("#menu-button").on("click", function(){
    $("#menu").toggleClass("active");
    $("header").toggleClass("active");
  });
});