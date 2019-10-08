//when page start  take send the current time to uptime function to make the up timer
window.onload=function() {
 upTime(Date()); 
 } ;
function upTime(countTo){ //set the current time to be start up for the next time
	now = new Date(); 
	countTo = new Date(countTo); 
	difference = (now-countTo);
	days = Math.floor(difference/(60*60*1000*24)*1); 	
	hours = Math.floor((difference%(60*60*1000*24))/(60*60*1000)*1); 
	mins = Math.floor(((difference%(60*60*1000*24))%(60*60*1000))/(60*1000)*1); 
	secs = Math.floor((((difference%(60*60*1000*24))%(60*60*1000))%(60*1000))/1000*1); 		
	document.getElementById('days').firstChild.nodeValue = days; 
	document.getElementById('hours').firstChild.nodeValue = hours; 
	document.getElementById('minutes').firstChild.nodeValue = mins; 
	document.getElementById('seconds').firstChild.nodeValue = secs; 
	clearTimeout("http://upTime.to"); 	
	upTime.to=setTimeout(function(){ upTime(countTo); },1000); };

//Create a function to make a list that holds all of cards
function toArray(obj) {
  var array = [];
  for (var i = obj.length >>> 0; i--;) { 
    array[i] = obj[i];
  }
  return array;
}

 // Display the cards on the page
function display(){
    count = 0;
    $(".moves").text(count);
    var shuffledCards = shuffle(cards); //shuffle the list of cards using the provided "shuffle" method below
    $(".deck").empty();  //remove the old cards from deck
    for (var i = cards.length >>> 0; i--;) {  // loop through each card and add each card's HTML to the page
        $(".deck").append(shuffledCards[i]);
    } 
    $(".card").css("pointer-events","auto"); //make crads clickable
    clicked(); //invoke clicked function after display made
}

var count =0; //count of the moves
var cards = toArray( $(".card")); //pass the cards to toArray function to store them in array
display(); //invoke display function

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function clicked(){
    var firstCard = [];
    var first;
    var second;
    var opened = []; //array of opened cards
    var card;
    var rate = "three stars"; //the rate of playing
    $(".card").click(function(){ //event when click the card
        $(this).addClass("open show");//open the card
        $(this).css("pointer-events","none");//prevent player to choose or click card twice
        if(count > 8){ //if moves over 16
            $("#excllent").removeClass("fa-star"); //redecoration of rate stars 
            $("#excllent").addClass("fa-star-o");
            rate = "two stars";//rate changed
        }
        if(count > 16){ //if moves over 32
            $("#good").removeClass("fa-star");   //redecoration of rate stars 
            $("#good").addClass("fa-star-o");
            rate = "one star";//rate changed
        }
        firstCard.push($(this).attr("id"));
        card = document.getElementsByClassName($(this).attr("class"));  //save the first card that clicked to redecorate if match
        opened.push($(this).children().attr("class")); //store the opened one
        if ( opened.length > 0 && (opened.length)%2 === 0 ){ //if the array has more than one card
            count++; //count each click as move
            $(".moves").text(count); //print the moves
            if( opened[(opened.length)-2] === opened[(opened.length)-1] ){ //if the last one and previous matches
                $(card).addClass("match"); //redocrate them
            }else{ //if not match
                setTimeout(function(){
                    first = "#" + firstCard[firstCard.length - 2].toString();
                    second= "#" + firstCard[firstCard.length - 1].toString();
                    $(first).removeClass("open show").css("pointer-events","auto");
                    $(second).removeClass("open show").css("pointer-events","auto");
                    opened.pop();
                    opened.pop();
                },1000);
            }
        }
        if(opened.length === 16){ //when the array is fulled of matches cards go to result page
            var resultMessage = "you take "+$(".moves").text()+" move" //result that should appear the nimber of movies,time and the rating
                                +" and "+$("#days").text()+" days"
                                +" , "+$("#hours").text()+" hours"
                                +" , "+$("#minutes").text()+" minutes"
                                +" , "+$("#seconds").text()+" seconds"
                                +" and your rate is "+rate;
            sessionStorage.setItem("result",resultMessage);//make browser save the result                           
            window.location.href = "success.html";//go to result page
        }
    });
    
    $("#repeat").click(function(){ //clicking repeat symbol make the game back to start
        window.location.replace("index.html");
    });
}

$(".playagain").click(function (){ //from the result page if want to play again
    window.location.replace("index.html");
});