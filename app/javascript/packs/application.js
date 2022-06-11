// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap"

Rails.start()
Turbolinks.start()
ActiveStorage.start`()`


// function nl2br(str){
//  return str.replace(/(?:\r\n|\r|\n)/g, '<br>');
// }

function getOrdinalNum(n) {
  return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
}


function countDownCounter(dt){
	const date = dt;
	setInterval(function() {
	var countDownDate = new Date(date).getTime();
	var now = new Date().getTime();
	var timeleft = countDownDate - now;
	    
	var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
	var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

	document.getElementById("days").innerHTML = days + "d "
    document.getElementById("hours").innerHTML = hours + "h " 
    document.getElementById("mins").innerHTML = minutes + "m " 
    document.getElementById("secs").innerHTML = seconds + "s " 

	if (timeleft < 0) {
        clearInterval(myfunc);
        document.getElementById("days").innerHTML = ""
        document.getElementById("hours").innerHTML = "" 
        document.getElementById("mins").innerHTML = ""
        document.getElementById("secs").innerHTML = ""
        document.getElementById("end").innerHTML = "TIME UP!!";
    }
	}, 1000, date);
}

$(document).ready(function(){
	$.ajax({
		url: "https://stage.goals.fit/api/v11/challenges/685",
		type: "GET",
		dataType: 'json', 
		success: function (data, status, xhr) {// success callback function
            console.log(data)
            let profile = $('#profile-image-url');
            let user_name = $('#user-name');
            let user_nm = $('#user_name');
            let challenge_type = $('#challenge_type');
            let payment_categories =  $('#payment_categories');
            let challenge_criteria = $('#challenge-criteria');
            let rules_regulation = $('#rules_regulation');
            let current_stats = $('#current_stats');
            let time_duration = $("#time_duration");
            let counter = countDownCounter(data.last_date)

            let messages = data.message.split("\n");
            let stats = data.stats.split("\n");

            let start_date = new Date(data.start_date);
            let end_date = new Date(data.end_date);

            let year1 = start_date.getFullYear();
            let year2 = end_date.getFullYear();

            let month1 = start_date.toLocaleString('default', { month: 'long' });
            let month2 = end_date.toLocaleString('default', { month: 'long' });

            let day1 = getOrdinalNum(start_date.getDay());
            let day2 = getOrdinalNum(end_date.getDay());

            let duration = `${month1} ${day1}, ${year1} to ${month2} ${day2}, ${year2}`

            profile.attr("src", `${data.creator.profile_url}`)
            user_name.text(`${data.name} User September Challange 900km`);
            user_nm.text(`${data.creator.first_name} ${data.creator.last_name}`);
            challenge_type.text(data.challenge_type.toUpperCase());
            (data.payment_categories != NaN) ? payment_categories.append("<button class='btn-success btn-sm'>PAID</button>") : console.log("No payment_categories")
            challenge_criteria.text(data.criteria)
            time_duration.text(duration)
            
            console.log("MESS", messages)

            messages.forEach(element => (
            	rules_regulation.append(`<li>${element}</li>`)
            ))

            stats.forEach(element => (
            	current_stats.append(`<li>${element}</li>`)
            ))

    	}
	})
})