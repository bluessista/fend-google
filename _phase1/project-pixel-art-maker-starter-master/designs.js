$(document).ready(function() {

  // Variables
  const PIXELCANVAS = $('#pixelCanvas');

  let pixelColor = $('input[type="color"]');

  function makeGrid() {
    let gridHeight = $('#inputHeight').val();
    let gridWidth = $('#inputWeight').val();

    //clear the grid
    PIXELCANVAS.empty();

    //create a grid within the table
    for(var rows = 0; rows < gridHeight; rows++) {
      PIXELCANVAS.append("<tr></tr>");
      for(var cells = 0; cells < gridWidth; cells++) {
        PIXELCANVAS.children().last().append("<td></td>");
      }
    }
  };

  //create the grid on submit
  $('input[type="submit"]').click(function(evt){
    evt.preventDefault();
    makeGrid();
  });

  //Select a Color
  $("td").click(function() {
    let color = $("#colorPicker").val();
    $(this).css("background-color", color);
  });

  //Drag and color multiple cells
  PIXELCANVAS.on("mousedown", "td", function() {
    mouseDrag = true;
  });

  PIXELCANVAS.on("mousemove", "td", function() {
    color = $("#colorPicker").val();
    if (mouseDrag) {
      $(this).css("background-color", color);
    }
  });

  PIXELCANVAS.on("mouseup mouseleave dragstart", function() {
    mouseDrag = false;
  });

})
