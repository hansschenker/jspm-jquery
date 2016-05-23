import $ from 'jquery';

var titleBox = $('#title');
loadNotes();

titleBox.keypress(function (event) {
    var key = event.which;
    
    if(key == 13){
        addNote(titleBox.val());
        loadNote(titleBox.val());
    }
});

//$('#title').val('test');

function loadNotes(){
  $.getJSON('notes.json',function(data){
    data.notes.forEach(note =>{
        $('#notes').append(`<li class="${note.id}">${note.title}</li>`);
    })    
});  
}

function loadNote(title:string){
    var searchString = `http://localhost:3000/notes?q=${title}`;
    alert(searchString);
    
    $.getJSON(searchString, function (data) {
        $('#notes').append(`<li class="${data.note.id}">${data.note.title}</li>`)
    });
    
}

function addNote(title:string) {
    $.ajax({
       type:"POST",
       dataType: "json",
       data:"title=" + title ,
       url: "http://localhost:3000/notes",
       success: function (note) {
          $('body').append(JSON.stringify(note));
       }
       
    });
}
