;(function() {
 var rows;
      var cols;
      var divs;
      var reds = 0;
      var blues = 0;
      var greens = 0;
      var total;
      function move(e) {
        var r = $(e.currentTarget).data('row');
        var c = $(e.currentTarget).data('col');
        var color = $(e.currentTarget).data('color');
        var $up = $('#' + (r - 1) + '-' + c);
        console.log($up);
        var $down = $('#' + (r + 1) + '-' + c);
        console.log($down);
        var $left = $('#' + r + '-' + (c - 1));
        console.log($left);
        var $right = $('#' + r + '-' + (c + 1));
        console.log($right);
        var $neighbors = [$up, $down, $left, $right];
        if(color == 'green') {
          $(e.currentTarget).toggleClass('green red').data('color', 'red');
          reds++;
          greens--;
          $neighbors.forEach(function($elem, i, array) {
            console.log($elem[0]);
            if($elem[0]) {
              console.log($elem.data('color'));
              if($elem.data('color') == 'green') {
                $elem.toggleClass('green blue').data('color', 'blue');
                if(greens > 0) { greens--; }
                blues++;
                } else if($elem.data('color') == 'blue') {
                $elem.toggleClass('blue green').data('color', 'green');
                if (blues > 0 ) { blues--; }
                console.log('blue: ' + blues)
                greens++;
              }
            }
          });
          $('#reds').html(reds);
          $('#blues').html(blues);
          $('#greens').html(greens);
          if(reds == total) {
            alert("Good game!");
            location.reload();
          } else if(greens == 0) {
            alert("Try harder, sir.");
            location.reload();
          }
        }
      }
      function play(e) {
        e.preventDefault();
        rows = $('form input[name="rows"]').val();
        cols = $('form input[name="cols"]').val();
        $('form').detach();
        for(var r = 0; r < rows; r++) {
          for(var c = 0; c < cols; c++) {
            $('#div-wrapper').append('<div id="' + r + '-' + c + '"></div>');
            $('#' + r + '-' + c).addClass('blue').data({row: r, col: c, color: 'blue'}).click(move);
          }
          $('#div-wrapper').append('<br>');
        }
        $('#0-0').removeClass('blue').addClass('green').data('color', 'green');
        greens = 1;
        blues = rows * cols - 1;
        total = rows * cols;
        $('#blues').html(blues);
        $('#greens').html(greens);
      }

      $(document).ready(function() {
        $('button').click(play);
      }); 
})();
