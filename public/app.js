$(function() {
  //Save article to database on click
  $(".btn-save").on("click", function(event) {
    event.preventDefault();
    const id = $(this).attr("id");

    $.ajax({
      method: "POST",
      url: `/api/saved/${id}`
    }).then(function() {
      location.reload();
    });
  });
  //Remove saved articles on click
  $(".btn-remove-saved").on("click", function(event) {
    event.preventDefault();
    const id = $(this).attr("data");

    $.ajax({
      method: "POST",
      url: `/api/removed/${id}`
    }).then(function() {
      location.reload();
    });
  });
  //Remove comments on click
  $(".btn-delete-comment").on("click", function(event) {
    event.preventDefault();
    const id = $(this).attr("id");

    $.ajax({
      method: "DELETE",
      url: `/articles/${id}/comment`
    }).then(function() {
      location.reload();
    });
  });

  $(".btn-delete-comment").on("click", function(event) {
    event.preventDefault();
    const id = $(this).attr("data");

    $.ajax({
      method: "DELETE",
      url: `/comments/${id}`
    }).then(function() {
      location.reload();
    });
  });
  //Open comment modal
  $(".btn-comment").on("click", function() {
    const id = $(this).attr("id");
    $.ajax({
      method: "GET",
      url: `/articles/${id}`
    }).then(function(data) {
      $(".btn-save-comment").attr("data", data._id);
      if (data.comment) {
        $(".commentInput").val(data.comment.body);
      }
    });
    $("#commentModal").modal("toggle");
  });
  //Save comments
  $(".btn-save-comment").on("click", function() {
    const id = $(this).attr("data");
    console.log(id);
    const comment = $(".commentInput").val();
    $.ajax({
      method: "POST",
      url: `/comments/${id}`,
      data: { body: comment }
    }).then(function(data) {
      console.log(data);
      console.log(comment);
      location.reload();
    });
    $(".commentInput").val("");
    $("#commentModal").modal("toggle");
  });
});
