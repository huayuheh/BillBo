function bgsize(){
	height=$(window).height();
	width=$(window).width();
	$(".bigimage").css({"min-height":height, "width":width});
}



$(function(){

	bgsize();

	var topoffset = 80;

	$('body').scrollspy({ 
		target: 'header .navbar',
		offset: topoffset
	});

	var hash = $(this).find('li.active a').attr('href');
	if(hash !== '#home') {
		$('header nav').addClass('inbody');
	} else {
		$('header nav').removeClass('inbody');
	}

  // Add an inbody class to nav when scrollspy event fires
  $('.navbar-fixed-top').on('activate.bs.scrollspy', function() {
    var hash = $(this).find('li.active a').attr('href');
    if(hash !== '#home') {
      $('header nav').addClass('inbody');
    } else {
      $('header nav').removeClass('inbody');
    }
  });
	$('#myModal').on('shown.bs.modal', function () {
		$('#myInput').focus()
	})






	if (typeof(Storage) !== "undefined") {
        localStorage.username = "";
    }
	$("#signinwarming").hide();

	$(window).resize(function() {
  		bgsize();
	});

	$("#js_close_signin").click(function(){

		$(".sign_in_container").css({"zIndex":"-5"});
		$("#signUp").toggle();
	});

	$("#sign_in").click(function(){
		$(".sign_in_container").css({"zIndex":"5"});
		$("#signUp").toggle();
	});


	Parse.$ = jQuery;
	Parse.initialize("NBcz95AFPnPDSFByi5Bla1nx28vLYnwcwkChEUy4", "wyHU2uZt3pUmlvRgfb6BlXwHz9lj4qrzUIihSeWw");

	$("#signInForm").on("submit",function(e){
		e.preventDefault();

		var data = $(this).serializeArray();
  	 	username = data[0].value;
  	 	password = data[1].value;
		
  	 	Parse.User.logIn(username, password, {
  	 		success: function(user){
          		localStorage.username = username;
       			window.location.replace("data2.html");
  	 		},
  	 		error: function(user,error){
  	 			if (error.code == 209) {    
				    Parse.User.logOut();
				    user.logIn(loginCallback);
				    return;
					}
  	 			$("#signinwarming").show().text("Wrong username or password");
  	 			console.log(error);
  	 		}
  	 	});
	});


	$("#signUpForm").on("submit",function(e){
		e.preventDefault();

		var data = $(this).serializeArray();
  	 	username = data[0].value;
  	 	email = data[1].value;
  	 	password = data[2].value;
  	 	//console.log(username + email + password );
		
  	 	var user = new Parse.User();
		user.set("username", username);
		user.set("password", password);
		user.set("email", email);

		// other fields can be set just like with Parse.Object
		user.signUp(null, {
		  success: function(user) {
		  	localStorage.username = username;
       			window.location.replace("data2.html");
		    // Hooray! Let them use the app now.
		  },
		  error: function(user, error) {
		    // Show the error message somewhere and let the user try again.
		    alert("Error: " + error.code + " " + error.message);
		  }
		});
	});


});