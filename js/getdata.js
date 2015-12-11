var dataJSON=[];
var dataobj;
var imageURLs = [];
var dishNameJSON=[[]];

function showBill(num){
  console.log("#bill"+num);
  $("#bill"+num).show();
  $("#bill"+num).siblings().hide();
};






$(function() {
  var username = localStorage.username;

  if(username!=""){
    $("#username").text(username);
    $(".name").html(username + "'S BILL LISTS");
    Parse.$ = jQuery;
    Parse.initialize("NBcz95AFPnPDSFByi5Bla1nx28vLYnwcwkChEUy4", "wyHU2uZt3pUmlvRgfb6BlXwHz9lj4qrzUIihSeWw");


    var bills = Parse.Object.extend("Instachecks");
    var query = new Parse.Query(bills);
 
  query.equalTo("username", username);
  query.find({
    success: function(results) {
      //alert("Successfully retrieved " + results.length + " scores.");
      // Do something with the returned Parse.Object values
      for (var i = 0; i < results.length; i++) {
        
        
        var j=i+1;
        console.log(results.length);
        $(".billButtonContainer").append('<button class="btn btn-lg btn-warning billButton" onclick="showBill('+i+')">Bill'+ j +'</button>')
        $(".billContainer").append("<div class='bill' id='bill"+i+"'></div>");

        var checks = results[i];

        
        //imageURLs.push(checks.get('InstacheckImg'));

          //console.log(imageURLs);
          //$('.profileImg').attr('src', imageURLs[0]);
        var title = checks.get("title");
        var createdAt = checks.createdAt;
        var items = checks.get("instacheckItems");
        //var eachItem = items.split("\n\n");
        var price = items.split(/(\d+.\d+)/g);

        var subTotal = 0;
        var tax = checks.get("tax");
        var tips = checks.get("tips");


        $("#bill"+i).html("");

              $("#bill"+i).prepend("<h2>" + title + "</h2><p>" + createdAt + "</p><hr>");


              $.each(price, function(num, item){
                dishNameJSON[i]= price;

                if(num%2==0){
                  $("#bill"+i).append("<div id='item"+num+"'>" + item + "</div>");
                  
                }else if (num%2==1){
                  var t= num -1;
                  item = parseFloat(item);
                  $("#bill"+ i +" #item"+t).append("<span class='itemPrice'>$" + item + "</span>");
                  
                  
                  subTotal = item+subTotal;


                }

              });

                  (function($) {
                    

                    

            $("#bill"+i).append(
              
                      
              (checks.get('instacheckImg'))?
              '<div><img class="img"src="' + checks.get('instacheckImg')._url + '"></div>':
              '<div>no image</div>'
            );

                



                   })(jQuery);

















              
              var total = subTotal + tax + tips;
                  total = total.toFixed(2);
              $("#bill"+i).append("<hr><div class='subTotal'>SubTotal<span class='Price'>$" + subTotal + "</span></div>");
              $("#bill"+i).append("<div class='subTotal'>Tax<span class='itemPrice'>$" + tax + "</span></div>");
              $("#bill"+i).append("<div class='subTotal'>Tips<span class='itemPrice'>$" + tips + "</span></div><hr>");
              $("#bill"+i).append("<div class='total'> Total<span class='Price'>$" + total + "</span></div>");
              $("#bill"+i).append('<div id="container'+i+'"></div>');

              dataJSON[i]='{"bill":[';
              for(var d=0;d< dishNameJSON[i].length -1 ;d++ ){
                if(d==dishNameJSON[i].length -2){
                  dishNameJSON[i][d] = parseFloat(dishNameJSON[i][d]);
                  dataJSON[i] = dataJSON[i] + '"y":'+ dishNameJSON[i][d]+'}]}' ;
                }else if(d%2==0){
                  dataJSON[i] =dataJSON[i] + '{"name":"'+ dishNameJSON[i][d]+'",';
                }else if (d%2==1){
                  dishNameJSON[i][d] = parseFloat(dishNameJSON[i][d]);
                  dataJSON[i] = dataJSON[i] + '"y":'+ dishNameJSON[i][d]+'},' ;
                }
                
              }
              //dataJSON[i] = dataJSON[i] +"]";
              console.log("dataJSON"+dataJSON[i]);
              //console.log("dishNameJSON"+dishNameJSON[i]);

              dataobj = JSON.parse(dataJSON[i]);

              //console.log(dataobj.bill0.y);
              //obj[i] = JSON.parse(dataJSON[i]);

              //console.log(obj[i]);


        $('#container'+i).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: title
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: dataobj.bill
            }]
        });




      } 
    },
    error: function(error) {
      alert("Error: " + error.code + " " + error.message);
    }
  });

  



      $("#sign_out").on("click",function(){
        localStorage.username = "";
        window.location.replace("index.html");
      });





  }else{  
  window.location.replace("index.html");
  }
});

