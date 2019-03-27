$(function () {
    //Save article to database on click
    $('.btn-save').on("click", function(event){
        event.preventDefault();
        const id = $(this).attr('id');

        $.ajax({
            method: 'POST',
            url: `/api/saved/${id}`
        }).then(function(data){
            location.reload();
        });
    });

    $('.btn-remove-saved').on("click", function(event){
        event.preventDefault();
        const id = $(this).attr('data');

        $.ajax({
            method: 'POST',
            url: `/api/removed/${id}`
        }).then(function(data){
            location.reload();
        });
    });
});





