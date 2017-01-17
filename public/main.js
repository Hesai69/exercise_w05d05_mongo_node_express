console.log('hello from main.js');

$('#get-data').on('click', function() {
  $.get('/data', handleGetResponse);
});

function handleGetResponse(res) {
  $('<li>').attr('class', 'item').text(res).appendTo($('.read'));
  $('#get-data').off();
  $('<button>').text('Delete').appendTo('.item').click(function() {
    $('#get-data').on('click', function() {
      $.get('/data', handleGetResponse);
    });
    $(this).parent().remove();
  });
  // res.forEach(function(obj) {
  //   console.log('object', obj);
  //   $('<li>').text(JSON.stringify(obj)).appendTo($('.read'));
  // });
}

// function renderEntries(obj) {
//   var title = obj.title;
//   var content = obj.content;
//   var author = obj.author;
//   return "Title: " + title + ', Content: ' + content + ', Author: ' + author;
// }
