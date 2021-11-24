$('.commentBtn').on('click', (event)=> {
    let target = event.target.id;
    const commentText = $(`#comment${target}`).val()
    const comment = {
        comment_body: commentText,
        PostsId: target
    }
    fetch("/comment",{
        method:"POST",
        body:JSON.stringify(comment),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href = "/"
        } else {
            alert("Uh Oh")
        }
    })
})