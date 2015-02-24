$(function () {
    var $pixels = $('.pixel');
    var $grid = $('#grid');
    var isRandomColor = false;

    function setPixelBehavior() {
        $pixels.mouseenter(function () {
            if (isRandomColor) {
                $(this).css('background-color', get_random_color());
            } else {
                $(this).css('background-color', '#000000');
            }
        });
    }

    function make_grid(rows, columns) {
        $grid.empty();
        for (var i = 0; i < rows; i += 1) {
            var row = $('<tr></tr>');
            for (var j = 0; j < columns; j += 1) {
                row.append('<td><div class="pixel"></div></td>');
            }
            $grid.append(row);
        }
        $('#container').empty().append($grid);
        $pixels = $('.pixel');
        setPixelBehavior();
    }

    function get_random_color() {
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
            make_grid(newRows, newColumns);
        } else {
            alert('Number must be between 0-99');
        } 
    });

    $('#clear').click(function() {
        $('.pixel').css('background-color', '#eeeeee');
    });

    $('input[name=random]').change(function() {
        isRandomColor = $(this).prop('checked');
        setPixelBehavior();
    });

    $('#tsize').on('change mousemove', function() {
        var newSize = $(this).val() + 'px';
        $pixels.css('height', newSize);
        $pixels.css('width', newSize);
        var newMargin = $('#marginSize').val() * .01 * parseInt(newSize);
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

    make_grid(16, 16);
});
