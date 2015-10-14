$(function(){
	var initDatabase = function() {
		var ref = new Firebase("https://dataviz-liberation.firebaseio.com/");
		var usersRef = ref.child("entries");
		usersRef.update({
			14102015: {
				date_of_birth: "1953",
				full_name: "Claude Lévêque"
			},
			13102015: {
				date_of_birth: "24 janvier 1962",
				full_name: "Lise Han"
			},
			12102015: {
				date_of_birth: "24 mars 1961",
				full_name: "Yánis Varoufákis"
			}
		});
	};
	initDatabase();
});