
	
	
	document.write('<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.0.min.js" ></script>"');
	document.write('<link rel="stylesheet" href="./css/afc.css">');

var AToast={};
	AToast.show=function(c){var a=document.createElement("span");
	a.style.padding="20px";
	a.style.borderRadius="10px";
	a.style.backgroundColor="rgba(4, 4, 4, 0.8)";
	a.style.color="white";
	a.style.boxShadow="3px 3px 8px #222222";
	a.style.fontSize="25px";
	a.style.whiteSpace="pre-line";
	a.style.margin="20px";
	a.style.display="inline-block";
	a.style.wordBreak="break-all";
	a.innerHTML=c;
	console.log("1>"+ c);
	var b=document.createElement("div");
	console.log("2>"+ b);
	b.style.position="absolute";
	b.style.width="100%";
	b.style.bottom="100px";
	b.style.textAlign="center";
	b.appendChild(a);
	b.style.zIndex="2147483647";
	document.body.appendChild(b);
	console.log("3>"+ b);
	b.setAttribute("class","show-toast");
	console.log("4>"+ b);
	b.addEventListener("webkitAnimationEnd",function(){
		console.log("5>"+ b);
		document.body.removeChild(this);
	
	});
	console.log("6>"+ b);
	};
	
	function whenClick(msg){
	    AToast.show(msg);
	};
