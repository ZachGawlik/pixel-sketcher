/*jslint browser: true*/
/*global $, jQuery, alert*/
function make_grid(rows, columns) {
  "use strict";
  var table = $("#grid");
  table.empty();
  for (var i = 0; i < rows; i += 1) {
    var row = $('<tr></tr>');
    for (var j = 0; j < columns; j += 1) {
      row.append('<td><div class="pixel"></div></td>');
    }
    table.append(row);
  }
  $("#container").empty();
  $('#container').append(table);
  
  $('.pixel').mouseenter(function () {
    $(this).css('background-color', '#000000');
  });
}

function random_color() {
  color = "#"
  colorCharArr = ['1','2','3','4','5','6','7','8','9','0','A','B','C','D','E','F']
  for (var i = 0; i < 6; i++) {
    color += colorCharArr[Math.floor(Math.random()*16)];
  }
  return color;
}

$(document).ready(function () {
  "use strict"; 
  make_grid(16, 16);
  
  $("button#setSize").click(function() {
    var newRows = $("input#rows").val();
    var newColumns = $("input#columns").val(); 
    if (newRows > 0 && newRows < 100 && newColumns > 0 && newColumns < 100) {
      make_grid(newRows, newColumns);
    } else {
      alert("Number must be between 0-100");
    } 
  });
  
  $("button#clear").click(function() {
    var pixels = document.getElementsByClassName("pixel");
    for (var i = 0; i < pixels.length; i++) {
      pixels[i].style.backgroundColor = "#eeeeee";
    }
  });
  
  $("button#random").click(function() {
    $('.pixel').mouseenter(function () {
      $(this).css('background-color', random_color());
    });
  });
  
  $("#tsize").on("change mousemove", function() {
    var pixels = document.getElementsByClassName("pixel"),
      newSize = $(this).val() + "px";
    for (var i = 0; i < pixels.length; i++) {
      pixels[i].style.height = newSize;
      pixels[i].style.width = newSize;
    }
    var newMargin = $("#marginSize").val() * .01 * parseInt(newSize);
    var table = document.getElementsByTagName("table");
    table[0].style.borderSpacing = newMargin + "px";
  });
  
  $("#marginSize").on("change mousemove", function() {
    var pixelHeight = parseInt(document.getElementsByClassName("pixel")[0].style.height);
    var newSize = $(this).val() * .01 * pixelHeight;
    var table = document.getElementsByTagName("table");
    table[0].style.borderSpacing = newSize + "px";
    table[0].style.marginLeft = "-" + newSize + "px";
  });
  
  $("input[name=blur]").change(function() {
    $("#container").toggleClass("blurred");
  });
  
  $("input[name=round]").change(function() {
    $(".pixel").toggleClass("rounded");
  });
});

//TODO: keep circles after changing grid size