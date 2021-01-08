$(function(){

    function renderComments(){
        $.ajax({
            url: '/coments',
            contentType: 'application/json',
            method: 'GET',

            statusCode: {
                200:(response) => {
                    var content = $('#content');

                    content.html('<h4>Comentários</h4>');
    
                    response.forEach(function(coments){
                        content.append(`<div class="card bg-light text-dark"> <div class="container card-body card-style"> 
                                        <span id="` + coments.id + `" class="text-style">` + coments.text + `</span>
                                        <button id="listen-button" type="submit" class="btn btn-primary">Ouvir</button></div> </div>`)
                    });
                },
                400:() => {
                    alert('ERROR 400: Não foi possível buscar comentários');
                }
            }
            
        });
    };

    renderComments();

    $('#commentBox').on('input', (event) => {
        event.preventDefault();

        var contCharacter = 255;

        var typedCharacters = $('#commentBox').val().length;

        var remainingCharacters = contCharacter - typedCharacters;

        $('#counter').text('Caracteres restantes: ' + remainingCharacters);

    })

    $('#button1').on('click', (event) => {
        event.preventDefault();

        var createInput = $('#commentBox');
        
        if(createInput.val().trim()){
            $.ajax({
                url: '/coments',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ text: createInput.val() }),

                statusCode: {
                    200:() => {
                        createInput.val('');
                        $('#counter').text('Caracteres restantes: 255');
                        renderComments();
                    },
                    401:() => {
                        alert('ERROR 401: Não foi possível inserir comentário');
                    }
                }
            });
        }
        else alert('Não é possível cadastrar comentários vazios!');
    });

    $(document).on("click", "#listen-button", (event) => {
        var id = event.target.parentElement.children[0].id;
        var text = event.target.parentElement.children[0].innerHTML;

        $.ajax({
            url: '/audio',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ id: id, text: text }),

            statusCode: {
                200:(response) => {
                    $('#source').attr('src', response);
                    $('audio').get(0).load();
                    $('audio').get(0).play();
                },
                400:() => {
                    alert('ERROR 400: Não foi possível conectar com o servidor');
                }
            }
        
        });
    });
});
