$(function(){
	var ref = new Firebase("https://dataviz-liberation.firebaseio.com/");
	var usersRef = ref.child("entries");

	var initDatabase = function(name, age, entryDate) {
		var newEntry = {};
		newEntry[entryDate] = {
			"date_of_birth": age,
			"full_name": name
		};
		/*usersRef.update({
			15102015: {
				date_of_birth: "23 avril 1956",
				full_name: "Jean-Marc Rochette"
			},
			entryDate
		}); */

		usersRef.update(newEntry);
		$(".done").animate({"opacity": 1}, 500).delay(1000).animate({"opacity": 0}, 500);
	},

	gettingDatas = function() {
		// Basic usage of .once() to read the data located at firebaseRef.
		ref.once('value', function(snapshot) {
			var result = $(".result");
			result.animate({"opacity": 1}, 500);
			var values = snapshot.val().entries;
			//debugger;
			$.map(values, function(entry) {
				result.append("<li>" + entry.full_name + "--" + entry.date_of_birth + "</li>");
			})
		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		});
	};

	$(".monSuperForm").on("submit", function() {
		initDatabase($(".usrname").val(), $(".age").val(), $(".entryDate").val());
		return false;
	});
	
	$(".getDatas").on("click", function() {
		gettingDatas();
	});

});