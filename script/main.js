$(function() {
    ////////////////////////////////////////////////////////
    /////// VARIABLE DECLARATIONS
    ////////////////////////////////////////////////////////

    const content = $('.main-content');
    const textInput = $('.form__input');
    const addBtn = $('.btn--add');
    const decideBtn = $('.btn--decide');
    const listContainer = $('.list');
    const decision = $('.decision');
    const decisionAnswer = $('.decision__text--answer');
    const closeBtn = $('.btn--close');

    ////////////////////////////////////////////////////////
    /////// FUNCTIONS
    ////////////////////////////////////////////////////////

    const addItem = function(e) {
        if (textInput.val() !== '') {
            listContainer.append(
                $('<li>').addClass('list-item').css('opacity', '0').append(
                    $('<a>').attr('href', '#').append(
                        textInput.val()
                    )
                ).animate({
                    opacity: '1'
                }, 200)
            )
            textInput.val('');
        }
        e.preventDefault();
    }

    const decide = function(e) {
        if ($('li').length > 1) {
            let randomNumber = Math.floor(Math.random() * $('li').length);
            decisionAnswer.text($('a:eq(' + randomNumber + ')').text());
            content.addClass('main-content--blur');
            decision.css({
                opacity: '0',
                visibility: 'visible'
            }).animate({
                opacity: '1'
            }, 500);
            content.css('pointer-events', 'none');
        }
        e.preventDefault();
    }

    ////////////////////////////////////////////////////////
    /////// EVENT LISTENERS
    ////////////////////////////////////////////////////////

    addBtn.click(addItem);

    textInput.on('keypress', function(e) {
        if (e.which === 13) {
            addItem(e);
        }
    })

    $(listContainer).on('click', 'a', function(e) {
        $(this).parent().animate({
            opacity: '0'
        }, 200, function() {
            $(this).remove();  
        });     
        e.preventDefault();
    });

    $(decideBtn).click(decide);

    $(closeBtn).click(function(e) {
        content.removeClass('main-content--blur');
        decision.animate({
            opacity: '0'
        }, 500).css({
            visibility: 'hidden'
        });
        listContainer.empty();
        content.css('pointer-events', 'auto');
        e.preventDefault();
    });
});