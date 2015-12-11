var username = localStorage.username;
var billObjectId = [];
var dataJSON =[];
var dishNameJSON =[];
var subTotal2;
var total2;
var tax;
var tips;
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);

}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

function dropDivide(){
  for(i=1; i<4; i++){
      var billPrice = 0;
      var divideDrop = 0;
      var divideDrop2 = 0;
      $("#billDrop" + i).find("span").each(function(index){
        var billPrice = parseFloat($(this).text().slice(1));

        divideDrop = divideDrop + billPrice;
        

      });

      subTotal2 = parseFloat(subTotal2);
      tax = parseFloat(tax);
      tips = parseFloat(tips);

      var divideDropTax = divideDrop/subTotal2*tax;
        divideDropTax = parseFloat(divideDropTax);
        console.log(divideDropTax);
      var divideDropTips = divideDrop/subTotal2*tips;
        divideDropTips = parseFloat(divideDropTips);
        console.log(divideDropTips);
      var divideDropTotal = divideDrop+divideDropTax+divideDropTips;
        console.log(divideDrop2);
      var divideDropTotal2 = divideDropTotal.toFixed(2);
      var divideDrop2 = divideDrop.toFixed(2);
  $("#devideDrop" + i).text("Subtotal:" + divideDrop2 + "  |  Total:" + divideDropTotal2);



  }


}



function showBill(num){
  $("#billList").html("");
  $("#billShare").html("<div class='billDrop' id='billDrop1' ondrop='drop(event)' ondragover='allowDrop(event)'>Drop1</div><span id='devideDrop1' class='total'></span><div class='billDrop' id='billDrop2' ondrop='drop(event)' ondragover='allowDrop(event)'>Drop2</div><span id='devideDrop2' class='total'></span><div class='billDrop' id='billDrop3' ondrop='drop(event)' ondragover='allowDrop(event)'>Drop3</div><span id='devideDrop3' class='total'></span><div><button type='button' class='btn btn-warning divideButton' onclick='dropDivide()'>Divide</button></div>");
  $("#devideTotal").text("");
Parse.$ = jQuery;
Parse.initialize("NBcz95AFPnPDSFByi5Bla1nx28vLYnwcwkChEUy4", "wyHU2uZt3pUmlvRgfb6BlXwHz9lj4qrzUIihSeWw");
var bills = Parse.Object.extend("Instachecks");
var query = new Parse.Query(bills);

query.get(billObjectId[num], {
  success: function(bill) {
    //console.log("successfully");

        var title = bill.get("title");
          $("#billList").append("<h2>"+ title +"</h2>");

        var createdAt = bill.createdAt;
          $("#billList").append("<p>"+ createdAt +"</p><hr>");

        var items = bill.get("instacheckItems");
        var price = items.split(/(\d+.\d+)/g);
        var subTotal = 0;
        //var url = bill.get('instacheckImg')._url;
              $.each(price, function(i, item){
                dishNameJSON[num]= price;
                if(i%2==0){
                  $("#billList").append("<div id='item"+i+"' draggable='true' ondragstart='drag(event)'>" + item + "</div>");  
                }else if (i%2==1){
                  var t= i -1;
                  item = parseFloat(item);
                  
                  $("#billList #item"+t).append("<span class='itemPrice'>$" + item + "</span>"); 
                  subTotal = item+subTotal;
                  
                }
              });
        subTotal2 = subTotal.toFixed(2);
          $("#billList").append("<hr><div class='subTotal'>SubTotal<span class='Price'>$" + subTotal2 + "</span></div>");
        tax = bill.get("tax");
          $("#billList").append("<div class='subTotal'>Tax<span class='itemPrice'>$" + tax + "</span></div>");
        tips = bill.get("tips");
          $("#billList").append("<div class='subTotal'>Tips<span class='itemPrice'>$" + tips + "</span></div><hr>");
        var total = subTotal + tax + tips;
        total2 = total.toFixed(2);
          $("#billList").append("<div class='total'> Total<span class='Price'>$" + total2 + "</span></div><hr>");



            dataJSON[num]='{"bill":[';
              for(var d=0;d< dishNameJSON[num].length -1 ;d++ ){
                if(d==dishNameJSON[num].length -2){
                  dishNameJSON[num][d] = parseFloat(dishNameJSON[num][d]);
                  dataJSON[num] = dataJSON[num] + '"y":'+ dishNameJSON[num][d]+'}]}' ;
                }else if(d%2==0){
                  dataJSON[num] =dataJSON[num] + '{"name":"'+ dishNameJSON[num][d]+'",';
                }else if (d%2==1){
                  dishNameJSON[num][d] = parseFloat(dishNameJSON[num][d]);
                  dataJSON[num] = dataJSON[num] + '"y":'+ dishNameJSON[num][d]+'},' ;
                }
                
              };
            dataobj = JSON.parse(dataJSON[num]);
            //console.log(dataobj.bill);

            $('#billChart').highcharts({
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


  },
  error: function(object, error) {

  }
});
};

$(".divideButton").on("click",function(){

  var dividePeople = parseInt($(this).val());
  var devideTotal = total2 / dividePeople;
  $("#devideTotal").text("Every one need pay: $" + devideTotal);
  console.log(devideTotal);
});







$(function() {
  

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
      for (var i = 0; i < results.length; i++) {
        
        var j=i+1;

        var checks = results[i];

        billObjectId[i] = checks.id;
            //console.log(billObjectId);
        $(".pager").append('<li><button class="btn btn-warning billButton"  onclick="showBill('+i+')">Bill'+ j +'</button> </li>');
      }

      showBill(0);
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

