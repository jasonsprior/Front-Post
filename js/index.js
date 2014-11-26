
//Describe master list of RSS Feeds

var sourceList = new Object();

sourceList.soccerNet = {
	name: "<h2>ESPN FC</h2><ul>",
	url: "http://www.espnfc.com/rss",
	divID: "#soccerNet",
	feedCount: 10
}

sourceList.uefa = {
	name: "<h2>UEFA Champtions League</h2><ul>",
	url: "http://www.uefa.com/rssfeed/uefachampionsleague/rss.xml",
	divID: "#uefaChampLeague",
	feedCount: 10
}

sourceList.foxSoccer = {
	name: "<h2>Fox Soccer</h2><ul>",
	url: "http://feeds.foxsports.com/feedout/syndicatedContent?categoryId=2662",
	divID: "#foxSoccer",
	feedCount: 10
}


sourceList.sbi = {
	name:"<h2>Soccer By Ives</h2><ul>",
	url: "http://www.sbisoccer.com/feed",
	divID: "#sbi",
	feedCount: 10
}

sourceList.soccerlens = {
	name:"<h2>Soccer Lens</h2><ul>",
	url: "http://feeds.feedburner.com/soccerlens?format=xml",
	divID: "#soclens",
	feedCount: 10
}

sourceList.nbcsoc = {
	name:"<h2>NBC Pro Soccer Talk</h2><ul>",
	url: "http://prosoccertalk.nbcsports.com/category/top-posts/feed/",
	divID: "#nbcsoc",
	feedCount: 10
}

sourceList.bpl = {
	name:"<h2>Premier League</h2><ul>",
	url: "http://www.premierleague.com/content/premierleague/en-gb/news/newsfeed.rss",
	divID: "#bpl",
	feedCount: 10
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
			console.log(result);
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
