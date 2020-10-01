function editTodo (id){
    $("#login").hide()
    $("#register").hide()
    $("#todo").hide()
    $('.create-todo').hide()
    $('.edit-todo').show()
    penampungId = id

    $.ajax(`${baseUrl}/edit/${id}`, {
        method : 'GET',
        headers : {
            access_token : localStorage.getItem('access_token')
        }
    })
    .done(result => {
        localStorage.setItem('current_id', result.todo.id)
        $("#edit-title").val(result.todo.title)
        $("#edit-due_date").val(formatDate(result.todo.due_date))
        $("#edit-location").val(result.todo.location)
    })
    .fail(err => {
        throw err
    })
}

$('.edit_todo').on('submit', (event) => {
    event.preventDefault
    $('#edit-page').trigger('reset')
    $.ajax(`${baseServer}/todos/${penampungId}`, {
        method : 'POST',
        headers : {
            access_token : localStorage.getItem('access_token')
        },
        data : {
            title: $('#title').val(),
            due_date: $('#due_date').val(),
            location: $('#location').val()
        }
    })
    .done(result => {
        fetchTodo()
    })
    .fail(err => {
        console.log(err)
    })
})


