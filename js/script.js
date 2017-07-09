function loadData() {

    var $body = $("body");
    var $wikiElem = $("#wikipedia-links");
    var $nytHeaderElem = $("#nytimes-header");
    var $nytElem = $("#nytimes-articles");
    var $greeting = $("#greeting");

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load Google Street View image
    var streetInput = $("#street").val();
    var cityInput = $("#city").val();
    var gkey = "74e83c0fbef64668ab64f1bd10492c4e";
    var beginningStreetUrl = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=";
    var picUrl = beginningStreetUrl + streetInput + "," + cityInput + "&" + gkey;

    $body.append("<img class='bgimg' src='" + picUrl + "'>");


    // load New York Times articles
    var nytkey = "74e83c0fbef64668ab64f1bd10492c4e";
    var nytSearchTerm = (cityInput).replace(" ", "+");
    var nytUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + nytSearchTerm + "&sort=newest&&api-key=" + nytkey;

    $.getJSON(nytUrl, function(data) {
    $nytHeaderElem.text("New York Times Articles About " + cityInput);
    var articles = data.response.docs;
    var article;
    for (var i = 0 ; i <articles.length ; i++) {
        article = articles[i];
        $nytElem.append("<li class='article'>" + "<a href='" + article.web_url + "'>"+ article.headline.main +"</a>" + "</li>");
    }

//---------------------------------------------
$("#street").val("");
$("#city").val("");
$("#details").html(JSON.stringify(articles, null, 4));
});
//dont touch anything below --------------------
    return false;
};
$("#form-container").submit(loadData);