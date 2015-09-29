/*------------------------------------*\
    ACCESSIBLE TOGGLE
\*------------------------------------*/


// <a href="#test1"
//    data-behaviour="toggle"
//    data-controls="test1"
//    data-state="open">
//    Toggle 1
// </a>
// <a href="#test2"
//    data-behaviour="toggle"
//    data-controls="test2"
//    data-state="open">
//    Toggle 2
// </a>

// <div id="test1">
//     Test 1
// </div>
// <div id="test2">
//     Test 2
// </div>

jQuery(function($) {

    $('[data-behaviour="toggle"]').each(function() {

        var trigger = $(this),
            target  = $('#' + trigger.attr('data-controls')),
            state   = trigger.attr('data-state');

        trigger.attr({
            'role' : 'button',
            'aria-expanded' : state === 'open' ? true : false,
            'aria-expanded' : state === 'closed' ? false : true,
            'aria-controls' : trigger.attr('data-controls')
        });

        target.attr({
            'aria-hidden' : state === 'open' ? false : true,
            'aria-hidden' : state === 'closed' ? true : false,
            'aria-labelledby' : trigger.attr('data-controls')
        });

        // Open
        var openToggle = function() {
            trigger.attr({
                'aria-expanded' : true,
                'data-state' : 'open',
                'class' : 'is-open'
            });
            target.removeAttr('aria-hidden');
        }

        // Close
        var closeToggle = function() {
            trigger.attr({
                'aria-expanded' : false,
                'data-state' : 'closed',
                'class' : 'is-closed'
            });
            target.attr('aria-hidden', 'true');
        }

        // Set Attributes
        if(state === 'open') {
            openToggle();
        }
        if(state === 'closed') {
            closeToggle();
        }



        // Click
        trigger.on('click', function(e) {
            e.preventDefault();

            var state = $(this).attr('data-state');

            if(state === 'open') {
                closeToggle();
            }
            if(state === 'closed') {
                openToggle();
            }
        });
    });



});
