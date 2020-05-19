$(document).ready(function() {
    // initializing grid object
    var grid = {};
    // length of the grid's side
    grid.side = 6;
    // initializing square object inside grid
    grid.square = {};
    // number on squares in the grid
    grid.square.number = grid.side * grid.side;
    // length of the square's side
    grid.square.length = (100 / grid.side) + '%';

    // get html from square template
    var template_square = $('#square').html();
    // ready the function
    var template_function = Handlebars.compile(template_square);

    // generating a grid n*n
    for (var i = 0; i < grid.square.number; i++) {
        // set the template
        var square_final = template_function();
        // append square to grid
        $('.grid').append(square_final);
        // set square width
        $('.square').eq(i).width('calc(' + grid.square.length + ' - 4px)');

        // set square height
        $('.square').eq(i).height('calc(' + grid.square.length + ' - 4px)');
    };

    // catch click on a square
    $('.square').on('click', function(event) {
        // ajax call to generate a number between 1 and 9
        $.ajax({
            'url' : "https://flynn.boolean.careers/exercises/api/random/int",
            'method' : "GET",
            'success' : function(data) {
                // get number from api
                var rand_number = data.response;
                // reset the square
                erase(event);
                // append the generated number and set a color to the square
                // number <= 5 -> yellow
                // number > 5 -> green
                numberColor(event, rand_number);
            },
            'error' : function() {
                alert('Si è verificato un errore.');
            }
        });
    });
});

// append the generated number and set a color to the target
function numberColor(event, number) {
    if(number <= 5) {
        $(event.target).addClass('yellow');
    } else {
        $(event.target).addClass('green');
    }
    $(event.target).append(number);
};

// reset the target's classes and content
function erase(event) {
    $(event.target).removeClass('yellow').removeClass('green').text('');
};