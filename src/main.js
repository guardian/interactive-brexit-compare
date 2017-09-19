var getJSON = require('./js/utils/getjson');
var template = require('./html/base.html');
var $ = require('jquery');
var policies, intros;

function compare(data) {
	console.log(data)
	policies = data.issues;
	intros = data.intros;
	console.log(policies);
	createselectors(policies);
	list(policies);
//	populateintros(intros);
	addListeners();
};

function populateintros(intros){
	
	var intropars = document.getElementsByClassName("intro");
	//console.log(intropars);
	for (var i = 0; i < intros.length; i++) {
		//var element = intros[i].introtext;
		var element = intros[i].profile[0].minipitch;
		var thispar = intropars[i];
		console.log(thispar,element);
		thispar.textContent = element;				
	}	
};

function highlightpolicy(policies, policyname) {
	//var newItem = document.createElement("LI");       // Create a <li> node
	//var textnode = document.createTextNode("Water");  // Create a text node
	//newItem.appendChild(textnode);

	$(".policylist-item").removeClass("highlighted");
	var item = document.getElementById(policyname);
	item.setAttribute("class", "policylist-item highlighted");
	//console.log("policy=" + policyname); 
	var list = document.getElementById("policylist");
	list.insertBefore(item, list.childNodes[0]);
	// var highlightspot = document.createElement("div");
	// highlightspot.setAttribute("class", "highlight");
	// var highlights = document.getElementById("highlights");
	// highlights.appendChild(highlightspot);
	// listhighlightviewpoints(policy);
};

function hidepolicy(policies, policy) {
	//console.log(policies, policy);
	var i = policies.indexOf(policy);
	policies.splice(i, 1);
	document.getElementById("policylist").innerHTML = "";
	list(policies);
};


function createselectors(policies) {

	for (var i = 0; i < policies.length; i++) {
		var policy = policies[i];

		console.log(policy.issue)

		var selectors = document.getElementById("selectors");
		var item = document.createElement("a");
		item.setAttribute("id", "selector-" + policy.issue);
		item.setAttribute("class", "selector highlighted");
		item.dataset.policy = policy.issue;
		var itemcontents = policy.issue;
		selectors.appendChild(item);
		item.innerHTML = itemcontents;
		item.addEventListener("click", function (e) { 
			
		var policyname = e.target.dataset.policy;
		$(".selector").removeClass("highlighted");
		$(e.target).addClass("highlighted");
		highlightpolicy(policies, policyname) }, false);
	}
};


function list(policies) {
	for (var i = 0; i < policies.length; i++) {
		var policy = policies[i];
		var policylist = document.getElementById("policylist");
		var item = document.createElement("li");
		item.setAttribute("class", "policylist-item");
		item.setAttribute("id", policy.issue);
		var itemcontents = "<div class='pol-item-header'><h2>" + policy.issue + "</h2></div>";
		policylist.appendChild(item);
		item.innerHTML = itemcontents;
		listviewpoints(policy, policylist);
	}
};

function listviewpoints(policy, policylist) {
	var viewpoints = policy.viewpoints;
	
	var headImages = {
	'Andy Burnham': '/imgs/burnham-d.jpg',
	'Yvette Cooper': '/imgs/cooper-d.jpg',
	'Jeremy Corbyn': '/imgs/corbyn-d.jpg',
	'Liz Kendall': '/imgs/kendall-d.jpg'
	
}
	
	var policyListWrapper = document.createElement("div");
	document.getElementById(policy.issue).appendChild(policyListWrapper);
	policyListWrapper.setAttribute("class", "viewpoints-wrapper");
	//policylist.appendChild(policyListWrapper);
	for (var i = 0; i < viewpoints.length; i++) {
		var viewpoint = viewpoints[i];
	// 	var viewpointlist = document.getElementById(policy.name);
		var item = document.createElement("div");
		item.setAttribute("class", "viewpoint");
		var kicker = "<strong>" + viewpoint.politician + "</strong>";
		var subkicker = "<em>" + viewpoint.summary + "</em>";
		var itemcontents = viewpoint.description;
		var headshot = viewpoint.headshot;
		var htmlString = "<div class='viewpoint-head'><img src='https://interactive.guim.co.uk/2017/sep/brexit-imgs/bw-" + viewpoint.headshot + "' alt='' /><div class='viewpoint-head-txt'>" + kicker + subkicker + "</div></div><p>" + itemcontents + "</p>";
		//var htmlString = "<p><img src='/imgs/cooper-colorized.jpg' alt='' />" + kicker + itemcontents + "</p>";
		//console.log("This=" + htmlString);
		policyListWrapper.appendChild(item);
		item.innerHTML = htmlString;
	}
};

//https://interactive.guim.co.uk/2017/sep/brexit-imgs/bw-johnson.jpg


function listhighlightviewpoints(policy) {
	var viewpoints = policy.viewpoints;
	for (var i = 0; i < viewpoints.length; i++) {
		var viewpoint = viewpoints[i];
		var viewpointlist = document.getElementById("highlights");
		var item = document.createElement("div");
		item.setAttribute("class", "viewpoint");
		var kicker = "<strong>" + viewpoint.politician + ": </strong>";
		var itemcontents = viewpoint.description;
		highlights.appendChild(item);
		item.innerHTML = kicker + itemcontents;
	}
};

function addListeners() {
	
	$(".summary").click(function() {
  
  	//console.log("data=" + $(this).data("index"));
	 // $(this).addClass("selected");
	 
	 var selectedIndex = Number($(this).data("index"));
	  
	  var htmlString = "";
	  
	  $(".summary img").addClass("desaturate");
	  $(".intro-image-wrapper").removeClass("highlighted");
	  $(".summary").removeClass("highlighted");
	  $(this).find("img").removeClass("desaturate");
	  $(this).find(".intro-image-wrapper").addClass("highlighted");
	  $(this).addClass("highlighted");
	  
	  
	  $("#intro .summary h3").hide();
	  $("#intro .summary p").hide();
	  $("#intro .summary .info-button").hide();
	 
	  
	  var candidateName = intros[selectedIndex].politician; //$(this).find("h3").text();
	  var candidateDesc = "<div class='intro-section'><h5>The pitch</h5><p>" + intros[selectedIndex].profile[0].pitch + "</p></div>";
	  candidateDesc += "<div class='intro-section'><h5>Unique selling point</h5><p>" + intros[selectedIndex].profile[0].USP + "</p></div>";
	  candidateDesc += "<div class='intro-section'><h5>Most novel policy</h5><p>" + intros[selectedIndex].profile[0].mostnovelpolicy + "</p></div>";
	  candidateDesc += "<div class='intro-section'><h5>The record</h5><p>" + intros[selectedIndex].profile[0].record + "</p></div>";
	  candidateDesc += "<div class='intro-section'><h5>The personal backstory</h5><p>" + intros[selectedIndex].profile[0].backstory + "</p></div>";
	  candidateDesc += "<div class='intro-section'><a class='full-profile-link' href='" + intros[selectedIndex].profile[0].fullerprofilelink + "'>Read full profile ...</a></div>";
	  
	  
	  //console.log(intros[0].profile[0].backstory);
	  htmlString += "<h3>" + candidateName + "</h3>";
	  htmlString += candidateDesc;
	  htmlString += "<div id='close-button'></div>";
	  
	  $("#detail-summary").html(htmlString).show();
});

$("#detail-summary").click(function(e) {
	
	var targ = e.target.id;
	
	if (targ == "close-button") {
	
	
		  $("#detail-summary").hide();
		  $("#intro .summary h3").show();
		  $("#intro .summary p").attr("style", "");
		  $("#intro .summary .info-button").show();
	  
		   $(".summary img").removeClass("desaturate");
		   $(".intro-image-wrapper").removeClass("highlighted");
		   $(".summary").removeClass("highlighted");
	}
	  
	  
});	

	
}

function boot(el) {
	el.innerHTML = template;
	var key = '1HpJPm7VfWLCLyazghc8IaWvKAEoulZM_qSTuT-XsHPc';
	var url = 'https://interactive.guim.co.uk/docsdata-test/14T1P_IwAEpITgAIlnSpDUEuR8YyV1soRGgGJdFp0ydg.json'; // this is the test data source
	//var url = 'http://interactive.guim.co.uk/docsdata/' + key + '.json'; // change to this one for production  https://interactive.guim.co.uk/docsdata-test/14T1P_IwAEpITgAIlnSpDUEuR8YyV1soRGgGJdFp0ydg.json
	getJSON(url, compare);
}

module.exports = { boot: boot };
