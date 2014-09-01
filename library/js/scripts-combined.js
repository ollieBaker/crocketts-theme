/*
 * Bones Scripts File
 * Author: Eddie Machado
 *
 * This file should contain any js scripts you want to add to the site.
 * Instead of calling it in the header or throwing it inside wp_head()
 * this file will be called automatically in the footer so as not to
 * slow the page load.
 *
 * There are a lot of example functions and tools in here. If you don't
 * need any of it, just remove it. They are meant to be helpers and are
 * not required. It's your world baby, you can do whatever you want.
*/


/*
 * Get Viewport Dimensions
 * returns object with viewport dimensions to match css in width and height properties
 * ( source: http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript )
*/
function updateViewportDimensions() {
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
	return { width:x,height:y }
}
// setting the viewport width
var viewport = updateViewportDimensions();


/*
 * Throttle Resize-triggered Events
 * Wrap your actions in this function to throttle the frequency of firing them off, for better performance, esp. on mobile.
 * ( source: http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed )
*/
var waitForFinalEvent = (function () {
	var timers = {};
	return function (callback, ms, uniqueId) {
		if (!uniqueId) { uniqueId = "Don't call this twice without a uniqueId"; }
		if (timers[uniqueId]) { clearTimeout (timers[uniqueId]); }
		timers[uniqueId] = setTimeout(callback, ms);
	};
})();

// how long to wait before deciding the resize has stopped, in ms. Around 50-100 should work ok.
var timeToWaitForLast = 100;


/*
 * Here's an example so you can see how we're using the above function
 *
 * This is commented out so it won't work, but you can copy it and
 * remove the comments.
 *
 *
 *
 * If we want to only do it on a certain page, we can setup checks so we do it
 * as efficient as possible.
 *
 * if( typeof is_home === "undefined" ) var is_home = $('body').hasClass('home');
 *
 * This once checks to see if you're on the home page based on the body class
 * We can then use that check to perform actions on the home page only
 *
 * When the window is resized, we perform this function
 * $(window).resize(function () {
 *
 *    // if we're on the home page, we wait the set amount (in function above) then fire the function
 *    if( is_home ) { waitForFinalEvent( function() {
 *
 *      // if we're above or equal to 768 fire this off
 *      if( viewport.width >= 768 ) {
 *        console.log('On home page and window sized to 768 width or more.');
 *      } else {
 *        // otherwise, let's do this instead
 *        console.log('Not on home page, or window sized to less than 768.');
 *      }
 *
 *    }, timeToWaitForLast, "your-function-identifier-string"); }
 * });
 *
 * Pretty cool huh? You can create functions like this to conditionally load
 * content and other stuff dependent on the viewport.
 * Remember that mobile devices and javascript aren't the best of friends.
 * Keep it light and always make sure the larger viewports are doing the heavy lifting.
 *
*/

/*
 * We're going to swap out the gravatars.
 * In the functions.php file, you can see we're not loading the gravatar
 * images on mobile to save bandwidth. Once we hit an acceptable viewport
 * then we can swap out those images since they are located in a data attribute.
*/
function loadGravatars() {
  // set the viewport using the function above
  viewport = updateViewportDimensions();
  // if the viewport is tablet or larger, we load in the gravatars
  if (viewport.width >= 768) {
  jQuery('.comment img[data-gravatar]').each(function(){
    jQuery(this).attr('src',jQuery(this).attr('data-gravatar'));
  });
	}
} // end function


/*
 * Put all your regular jQuery in here.
*/
jQuery(document).ready(function($) {

  /*
   * Let's fire off the gravatar function
   * You can remove this if you don't need it
  */
  loadGravatars();


}); /* end of as page load scripts */;var canvas ;
var width ;
var height ;
var tempX;
var tempY;
var color;
var numParticles = 100;
var img = new  Image;
img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAB1ZJREFUeNqsW1ty2zgQBEBIsXPZPcaeYq+5kSUCyI+Y6rR7HpTNKhQl2qI4PT1vqP7z738lcdTgWn3hM9GxnGsr8b/e9T9HL18/6hdeew9bhdDV+EzNCvwKAN7Dq79Vcb06gh1HCzRb6T0DssS9a8SG/qLgkcB4vb7AgiWEXifMpWbZ0F+ku3euCRBqIAQKvUC7+Ho6mlcgSFD6NwnvrQwQ/GATzgteIwgtwYoQhJ6kvqJ7BdtVgrcAEAsAFK4ZDFgAUhUms7Jm0E+ELhagifeNAGgCEAUyUx61P0mgaZjBFOZQjYixXnGClsYbCdwEAB4bmPaLBMLzBMEZtBr4hJABlsAR7TcQcoO/bQkQ2GaXITSuASDweTphUEaMboSy4jg4pfHNOKsVATABgAFCMwMGOcvjmWYQ+ysDUBPeXwmPQna4hguvIVsiAIY4H6sBC4Ywo0b3ql5+0R2BlfBNgLA977MBEF38jc1F+QAFwE4ADAPAKkJnOgxWxw9U4c03ErTT2sR79hGKAVNofAcQHk6OMUQ4XcIkwihgxW22eSX4sS7Pdbxmk+DvWAblD+Efz/Px/bt4xkVJ0hTa/+QgoyigvLwSHoW9AgAXAY5yhp7mH8/v20spd8dh4zGIscyET04wquSU9jeh8SusiwCkC19SBAA7CHx8x93JKJexmvAJJWsCKqtj4VHTP57rCueLAET5gUVO76B8f77+EMwpgfBLMGEyEN3x/sWI56x91PqPUsqbAAJB2AgEfNhj3Z+C96fwGEqtxGkaIGAoPFUMKc9vaf8KDHgDEN4IBGRBJRNA+t+J/ptD+0khFJW1REj8ywx6IuxtjvYZgDdY7wQGs6AZABzCf1AItTw+Cr8REJwhSh9gJRXNSXs7eX1mwE8A4R1AQGe4CQAeYPPoNPHBh7EO5TALptfK60EWWBxH2IUfQBb8fC5kAppBMwC4GyAtESoHOMvdqDlUb8GsBquT/lp+QDHgHdZPYsHVAYCpb0UJDJUXAmHQs0+n//CXCVSnFvAiAYfBYzEA7wYAFbR5oYQJab9TcnSFJIkLMBUyayYK1IANm1hnQHgzIgFS+bhvEbkBm0g3BG+JJm1YDdZEJrgZNcAPERbfyBkixdGRNbiGGr9TJOlG2W31HqQj7IlmSDuREltpMTPjQr2IQ9hiaJ4F70nqVye9/8OAFfTrvdb3FkSHi+EoL0LbGxUzD1FQbY7gNTGMSWeCUW+/Od0hBmJzfAf39g+tb46wmxPu+BlLVD325OT2TLLk9Q158T0jDbdgAHN66twSH14OGCs5nTkLbmZsVp1BaXra1Z0PL2dGv4z53dlVvvke6X0Bng+IhLZKTq+Xv1Ma20Q77GE0QKcYkixR/k4DnOUpsydpb32BGlqorO0BWVsTDUpOdrgXuAOIanmCu8rtDuUjjQ+nh/egzI3T2wmNTXz/8Vx3aIrw2okZEzrCGVORLbEV9NcUvVl4FlrV9BzqGIDjMzcA48MBQoHhdYdSDLDsh1vW00hXWXhVzyMAWOM/AIBfz/ONWHEXbGCfYcnyie09CDds+4MYEGmenR1meE3UAg/Q+v9PEBCIu8GCjPaljN0YHS2as01Rk+/QuLxD6nujimxRw+MqwBnUEPkA4X8ZbHiI3sAgRZ0yAcsUUOPNcHp30e3lRGVAXWABgA3RG5jCr8AvsCmsJBukCXgsmGTDVkOCw+cO5exFpMJsUh8GCKj9uxEZPD/wKS/owc4sK9bvRhOiinE0AnBJdIXZl9xoqVC5i8TJ8gnF8gHVcIBNmEE1iqAqGMTa78ZobIjW+B0EvokQyYnSSDrDZYXBIral8RaUI4HZk2Nu7OZ0BwCr/cUav5EP2EVoHgIEc4vMcsbHOFoa5LRqAAAKc6GMsAoAlpFR3o2ltD+CGiEshpYQpDiCW3uAJzU6lfNrwuQyabWVC+yJhOiTKXSxvWwZjqwQCCWxwwMnvBb9izEg5Z0hjxOCp9PhbgwPrbAxwP69qHE8jGqLMQDV2BU2aBBiCe6ZwDzTD7A2GPKNBvzvMIBAhxk1MNUOsSUAUIJPQ+uZLFB2hUuxt5jy5oIdZm5sAhv1+VWW6EUPawi6GyxRsb8kGiJuJqiO6TRPJkxnM13c6jRd1F7B6YS7JXoCXncr7Ah57bFp2H6jfTlD7ApT9l9Kfpssp7pRxjejHmE3Yn8N2DAdJ8ht7F1kj2poMQ0mTBFh1qvlb7RJKr3PHhxiE6lzpo9fnS70pAxROUmvMVocIMLJUAkiw6JEZohNCLPktslX4+G8ltxKJjmRKacAiHwBZoiNBiFVDEayABSRwkZCW2VvuivsTV48E1lUNCkAigOC147znNpK0D1kQU/Q3wJkBaOwSHDrfpZQU1xfGUf3FRM48/OT5Wyxyc4APequJACl5H5rmPYB0S801a+2FCNWQvslacNfngmedYKetq1fedbAp0QgnLHpU57/O6JADa6XEv+wOZNzrJPvT7PgO349/jL9TvgVj3lfeobfAwBAbbV+XI+BmAAAAABJRU5ErkJggg==";
var isMobile = (typeof window.onorientationchange != "undefined");

var particle = {
	context : null,
	alpha: 0,
	velX :5,
	velY: 5,
	color : "rgba(100,100,100,100)",
	width :0,
	x: 0,
	y: 0,

	update : function () {
		this.x += this.velX;
		this.y += this.velY;
		this.context.drawImage(img, this.x, this.y, this.width*2, this.width*2);  
		this.velY += 0.04;
		this.width *= 0.99;
		this.velY *= 0.99;
		this.velX *=0.99;
		if(this.x  > width || this.x < 0) {			
			this.velX *=-1;
		}
		if(this.y < 0) {
			this.velY *=-1;
		}
		if(this.alpha < 1) {
			this.alpha += 0.005;
		}
	}
};
var emitter = {
	x : 0,
	y : 0,
	update : function () {
		var difX = tempX - this.x;
		var difY = tempY - this.y;
		this.x += difX * 0.09;
		this.y += difY * 0.09;
	}
};



var moving = true;

var pArray = [];


function init () {
	
	console.log("yo");

	width = document.body.offsetWidth;
    height = document.getElementById('inner-header').offsetHeight;

    console.log(width, height);
    
    tempX = width/2;
    tempY = height/2;

	canvas = document.createElement('canvas');
	canvas.id = 'canvas';
	canvas.width = width;
	canvas.height = height;
	canvas.style.position = 'absolute';
	canvas.style.top = '0';
	canvas.style.left = '0';
	document.getElementById('inner-header').insertBefore(canvas, document.getElementById('inner-header').firstChild);
	
	createParticles(numParticles, pArray, canvas.getContext("2d"));

	if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        canvas.onmousemove = onMouseMove;
      
  		canvas.addEventListener( 'touchstart', onTouchStart, false );
		canvas.addEventListener( 'touchmove', onTouchMove, false );
		canvas.addEventListener( 'touchend', onTouchEnd, false ); 
		
		// resize the canvas to fill browser window dynamically
        window.addEventListener('resize', resizeCanvas, false);
        
        draw ();
      }

      
  }
  
function draw () {
		
 	//get canvas context to draw to
 	if (canvas) {
 		var ctx = canvas.getContext("2d");
		
		//clear canvas with alpha channel + black
 		ctx.save();		
		ctx.fillStyle = "rgba(48, 95, 143, 0.6)";
    	ctx.fillRect (0, 0, width, height);
  		//ctx.globalAlpha = 0.1;
		//ctx.globalCompositeOperation = "lighter";
   		
		if(moving)
		{
			emitter.update();
		}

		for (var i = pArray.length - 1; i >= 0; i--) {
			var p = pArray[i];
			ctx.save();
			ctx.globalAlpha = p.alpha;
			p.update();
			ctx.restore();
			if(p.width < 3 || p.y > height) {
			   resetP(p);
			}		
		};

		ctx.restore();

	}
	
	window.requestAnimationFrame(draw);

}

function resetP(p) {
	p.alpha = 0;
	p.x = emitter.x;
	p.y = emitter.y;
	p.velX = Math.random()*8;
	p.velY = Math.random()*6;
	p.width = 44 + Math.random()*20;
	p.color = randomColor();
	if(Math.random() > 0.5) {
		p.velX *= -1;	
	}
	if(Math.random() > 0.5) {
		p.velY *= -1;
	}
}

function createParticles(numP, pArray, ctx) {

	for (var i = 0; i < numP; i++) {
		p = Object.create(particle);
	    p.context = ctx;
	    p.x = tempX;
	   	p.y = tempY;
		p.width = 44 + Math.random()*20;
		p.velX = Math.random()*8;
	   	p.velY = Math.random()*6;
	   	p.color = randomColor();
	   	if(Math.random() > 0.5) {
	   		p.velX *= -1;
	    }
	   	if(Math.random() > 0.5) {
	    	p.velY *= -1;
	    }
	  	pArray.push(p);

	};
}

function resizeCanvas() {
	canvas.width = document.getElementById('inner-header').offsetWidth;
    canvas.height = document.getElementById('inner-header').offsetHeight;
	width = document.getElementById('inner-header').offsetWidth;
    height = document.getElementById('inner-header').offsetHeight;	
}

function onMouseMove(event) {
    // move the div in relation to the mouse
    tempX = event.offsetX ;
    tempY= event.offsetY ;

    randomColor();
}

function onTouchStart(event) {
	//do stuff
	event.preventDefault(); 
	moving = true;
	tempX = event.touches[0].clientX;
	tempY = event.touches[0].clientY;
}
 
function onTouchMove(event) {
	// Prevent the browser from doing its default thing (scroll, zoom)
	event.preventDefault(); 
	moving = true;
	tempX = event.touches[0].clientX;
	tempY = event.touches[0].clientY;
	randomColor();
} 
 
function onTouchEnd(event) { 
	//do stuff
	event.preventDefault(); 
	moving = false;
	tempX = event.touches[0].clientX;
	tempY = event.touches[0].clientY;
}

function randomColor() {
	var colors=["240,8,7,255", "95,98,115,255", "164,171,191,255", "204,201,209,255", "226,2225,233,255"];
	
   	var r = Math.round(Math.random()*256);
 	var g = Math.round(Math.random()*256);
 	var b = Math.round(Math.random()*256);
	color = "rgba("+r+","+g+","+b+","+"30)";
	return color
} 