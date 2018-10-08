
function InfoConfig(type, header, message, imageType) {
    var image = "/resources/jgrowl/images/icon-info.gif";
    if(imageType == "info"){
        image = "/resources/jgrowl/images/icon-info.gif";
    } else if(imageType == "error"){
        image = "/resources/jgrowl/images/icon-error.gif";
    } else if(imageType == "warning"){
        image = "/resources/jgrowl/images/icon-warning.gif";
    } else if(imageType == "question"){
        image = "/resources/jgrowl/images/icon-question.gif";
    }

    switch(type) {
		case "mono": 
			
			var theText 		= '<img style="width: 32px;height:32px;" src="' + image + '" class="img-thumb" /><span class="separator">&nbsp;</span>' + message;
	
			var themeAnimate = 	function() {
											setTimeout(function() { 
												$('img.img-thumb').animate({marginLeft: "-.5em"});
												$('.separator').animate({marginLeft: "-.3em"});
												$('div.jGrowl div.themed div.header').animate({marginLeft: "4.7em"}, 500);
												$('div.jGrowl div.themed div.message').animate({marginLeft: "6em"}, 1000);
											}, 10);
										}
					
			$.jGrowl(theText, {
						header: header,
						theme: 'themed', 
						open: themeAnimate
			});
			
		break;
		case "basic":
			
			var theText 		= '<img src="' + image + '" class="img-thumb-themed2" />' + message;
			var themedAnimate = 	function() {
											setTimeout(function() { 
												$('img.img-thumb-themed2').animate({right: "18em"}, 1000);
											}, 10);
										}
					
			$.jGrowl(theText, {
						header: header,
						theme: 'themed2', 
						open: themedAnimate
			});
			
		break;
	}
}