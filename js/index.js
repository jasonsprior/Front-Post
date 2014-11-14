
//Describe master list of RSS Feeds

var sourceList = new Object();

sourceList.soccerNet = {
	name: "<h2>ESPN Soccernet</h2><ul>",
	url: "http://www.espnfc.com/rss",
	divID: "#soccerNet",
	feedCount: 5
}

sourceList.uefa = {
	name: "<h2>UEFA Champtions League</h2><ul>",
	url: "http://www.uefa.com/rssfeed/uefachampionsleague/rss.xml",
	divID: "#uefaChampLeague",
	feedCount: 5
}

sourceList.foxSoccer = {
	name: "<h2>Fox Soccer</h2><ul>",
	url: "http://feeds.foxsports.com/feedout/syndicatedContent?categoryId=2662",
	divID: "#foxSoccer",
	feedCount: 5
}

sourceList.techCrunch = {
	name:"<h2>Tech Crunch</h2><ul>",
	url: "http://feeds.feedburner.com/TechCrunch/",
	divID: "#techCrunch",
	feedCount: 5
}




window.onload=function(){
	//Kicks Off Whole Thing
	currentFeedIndex=0;
	getNextFeed(sourceList);

};

function getNextFeed(obj) {
    var sourceCount = Object.keys(obj).length;
    console.log("count of objects", sourceCount, "current feed index",	 currentFeedIndex);

    if(currentFeedIndex < (sourceCount)){
	    var cFeed = obj[Object.keys(obj)[currentFeedIndex]];

		getRSS(cFeed);
	}
	else{console.log("complete")}
}




function getRSS(source){
	
	// Set Variables required by Google Feed API
	var feedurl = source.url;
	var feedlimit = source.feedCount;

	//Set Variables for HTML location and Title
	var feedcontainer = source.divID;
	var rssoutput = source.name;
	console.log("feedname in getRss", rssoutput);


	//Retrieves feed from RSS source
	var feedpointer=new google.feeds.Feed(feedurl)
	feedpointer.setNumEntries(feedlimit)
	feedpointer.load(function(result) {

		if (!result.error){

			var thefeeds=result.feed.entries;

			for (var i=0; i<thefeeds.length; i++){
				rssoutput+="<li><a target=\"_new\" href='" + thefeeds[i].link + "''>" + thefeeds[i].title + "</a></li>";
			}

			rssoutput+="</ul></br>"

			//write to correct div ID
			$(feedcontainer).html(rssoutput);

		}
		else {alert("Error fetching feeds!")
		}
	console.log("end of loop", feedcontainer);
	currentFeedIndex ++;
	console.log("current feed index - next", currentFeedIndex);

	getNextFeed(sourceList);
	});
}
