$('#search').on('click',function(event){
    event.preventDefault();
    $('#articleDivs').empty();
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    queryURL+='?api-key=ea2923a76ac64cfc9f0dfdf6dda3cc85';
    if($('#searchParameters').val()){
        queryURL+='&q='+$('#searchParameters').val();
    }
    if($('#startYear').val()){
        queryURL+='&y='+$('#startYear').val()+'0101';
    }
    if($('#endYear').val()){
        queryURL+='&y='+$('#endYear').val()+'0101';
    }
    var howMany = parseInt($('#numberRecords option:selected').text());
    $.ajax({
        url:queryURL,
        method:'GET'
    }).done(function(response){
        var docsArray = response.response.docs;
        for(var i = 0;i<howMany;i++){
            var newDiv = $('<div>');
            newDiv.append($('<h3><span class="label label-primary">'+(i+1)+'</span><strong>' + docsArray[i].headline.main + '</strong></h3>'));
            if(docsArray[i].byline)newDiv.append($('<p>' + docsArray[i].byline.original + '</p>'));
            newDiv.append($('<p>' + docsArray[i].snippet + '</p>'));
            if(docsArray[i].pub_date)newDiv.append($('<p>' + docsArray[i].pub_date + '</p>'));
            newDiv.append($('<a href=' + docsArray[i].web_url + '>' + docsArray[i].web_url + '</a>'))
            $('#articleDivs').append(newDiv);
        }
    });
});
$('#clear').on('click',function(event){
    event.preventDefault();
    $('.searchElements').val('');
    $('#articleDivs').empty();
});
// var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
// queryURL+='?api-key=ea2923a76ac64cfc9f0dfdf6dda3cc85';
// var howMany = 5;
// $.ajax({
//     url:queryURL,
//     method:'GET'
// }).done(function(response){
//     var docsArray = response.response.docs;
//     for(var i = 0;i<howMany;i++){
//         var newDiv = $('<div class="row">');
//         newDiv.append($('<h3><span class="label label-primary">'+(i+1)+'</span><strong>' + docsArray[i].headline.main + '</strong></h3>'));
//         newDiv.append($('<p>' + docsArray[i].byline.original + '</p>'));
//         newDiv.append($('<p>' + docsArray[i].pub_date + '</p>'));
//         newDiv.append($('<a href=' + docsArray[i].web_url + '>' + docsArray[i].web_url + '</a>'))
//         $('#articleDivs').append(newDiv);
//     }
// });