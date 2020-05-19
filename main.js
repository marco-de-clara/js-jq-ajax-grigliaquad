$(document).ready(function() {
    // catch click on a square
    $('.square').on('click', function(event) {
        // ajax call to generate a number between 1 and 9
        $.ajax({
            'url' : "https://flynn.boolean.careers/exercises/api/random/int",
            'method' : "GET",
            'success' : function(data) {
                // get number from api
                var square_number = data.response;
                // empty the square
                erase(event);
                // append the generated number and set a color to the square
                // number <= 5 -> yellow
                // number > 5 -> green
                numberColor(event, square_number);
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
}

// empty the target
function erase(event) {
    $(event.target).removeClass('yellow').removeClass('green').text('');
}