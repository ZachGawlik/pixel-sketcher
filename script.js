$(function () {
    var $grid = $('#grid');
    var $pixels = $('.pixel');
    var isRandomColor = false;

    function setPixelBehavior() {
        $pixels.mouseenter(function () {
            var color = isRandomColor ? getRandomColor() : '#000000';
            $(this).css('background-color', color);
        });
    }

    function makeGrid(rows, columns) {
        $grid.empty();
        for (var i = 0; i < rows; i += 1) {
            var row = $('<tr></tr>');
            for (var j = 0; j < columns; j += 1) {
                row.append('<td><div class="pixel"></div></td>');
            }
            $grid.append(row);
        }
        $pixels = $('.pixel');
        setPixelBehavior();
    }

    function getRandomColor() {
        var color = '#';
        hexChars = '0123456789abcdef';
        for (var i = 0; i < 6; i++) {
            color += hexChars[Math.floor(Math.random()*16)];
        }
        return color;
    }

    $('#rows, #columns').change(function() {
        var newRows = $('#rows').val();
        var newColumns = $('#columns').val(); 
        if (newRows > 0 && newRows < 100 && newColumns > 0 && newColumns < 100) {
            makeGrid(newRows, newColumns);
        } else {
            alert('Number must be between 0-99');
        } 
    });

    $('#clear').click(function() {
        $pixels.css('background-color', '#eeeeee');
    });

    $('input[name=random]').change(function() {
        isRandomColor = $(this).prop('checked');
        setPixelBehavior();
    });

    $('#tsize').on('change mousemove', function() {
        var newSize = $(this).val() + 'px';
        var newMargin = $('#marginSize').val() * .01 * parseInt(newSize);
        $pixels.height(newSize).width(newSize);
        $grid.css('border-spacing', newMargin + 'px');
    });

    $('#marginSize').on('change mousemove', function() {
        var pixelHeight = $pixels.height();
        var newSize = $(this).val() * .01 * pixelHeight;
        $grid.css('border-spacing', newSize + 'px');
        $grid.css('margin-left', '-' + newSize + 'px');
    });

    $('input[name=blur]').change(function() {
        $('#container').toggleClass('blurred');
    });

    $('input[name=round]').change(function() {
        $('#container').toggleClass('rounded');
    });

    makeGrid(16, 16);
});
