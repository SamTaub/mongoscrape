$(function () {
    //Save article to database on click
    $('.btn-save').on("click", function(event){
        event.preventDefault();
        const id = $(this).attr('id');

        $.ajax({
            method: 'POST',
            url: `/api/saved/${id}`
        }).then(function(){
            location.reload();
        });
    });
    //Remove saved articles on click
    $('.btn-remove-saved').on("click", function(event){
        event.preventDefault();
        const id = $(this).attr('data');

        $.ajax({
            method: 'POST',
            url: `/api/removed/${id}`
        }).then(function(){
            location.reload();
        });
    });
    //Open comment modal
    $('.btn-comment').on("click", function(){
        const id = $(this).attr('id');
        $.ajax({
            method: 'GET',
            url: `/articles/${id}`
        }).then(function(data){
            console.log(data);
        })
        $('#commentModal').modal('toggle');
    });
});





