var edit = $('.editBttn');
var deleteComment = $('.deleteBttn')
edit.click(function (e){
    e.preventDefault();
    var edited = $(this);
    var element = edited.parent().children().eq(1).attr("id")
    let text = $(`#${element}`).val();
    console.log(text)
    fetch('/newPost', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: text, id: element }),
    }).then((response)=>{
        alert("post edited")
        location.href= '/dashboard'
    })
})

deleteComment.click(function (e){
    e.preventDefault();
    var edited = $(this);
    var id = edited.parent().children().eq(1).attr("id")
    fetch('/newPost/' + id, {
        method: 'DELETE',
    }).then((response)=>{
        alert("post deleted")
        location.href= '/dashboard'
    })
})
