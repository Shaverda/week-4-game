var characters = {		//object of objects to hold various characters
	"Rogue" : {
		health_points: 150,
		attack_power: 15,
		base_attack_power: 15,
		counter_attack: 10},
	"DeathKnight" : {
		health_points: 200,
		attack_power: 7,
		base_attack_power: 7,
		counter_attack: 15}, 
	"Mage" : {
		health_points: 100,
		attack_power: 15,
		base_attack_power: 15,
		counter_attack: 10}, 
	"Hunter" : {
		health_points: 125,
		attack_power: 13,
		base_attack_power: 13,
		counter_attack: 13}
};
//lets you de-select character chosen by click on it after enemy has been chosen fix it shelby


function choose_enemy (){	
	$(".character-boxes").on("click", function(){
		if ($(".enemy-chosen").children().length == 1){	//makes sure an enemy isn't already chosen
			$(".enemy-chosen").append(this);			//moves enemy clicked on to defender area
			$(".alert-text").html("Now...fight!");
		}					
	})
}

$(document).ready(function() {						
	var character_chosen;								//stores your chosen character
	document.querySelector(".rogue_health_points").innerHTML = (characters.Rogue.health_points);	//writes number of hP per char
	document.querySelector(".dk_health_points").innerHTML = (characters.DeathKnight.health_points);
	document.querySelector(".mage_health_points").innerHTML = (characters.Mage.health_points);
	document.querySelector(".hunter_health_points").innerHTML = (characters.Hunter.health_points);

	$(".alert-text").html("Choose a character!");


	$(".character-boxes").on("click", function() {
		if ($(".character-chosen").children().length == 1){				//if you haven't chosen a char yet
			$(".character-chosen").append(this);		//adds char chosen/clicked on to character chosen div
			character_chosen = this;					//iniates character chosen to whatever clicked on.
			$(".alert-text").html("Choose an enemy!");
		}
		$(".character-boxes").each(function(){			//iterates through all possible character boxes,
			if (this !== character_chosen){				//making sure that it's not the one you chose to fight	
				$(".enemies-available").append(this);	//and otherwise adds to "enemies available" list
			}											//closing for if
			choose_enemy();
		});												//closing for .each func												
	});													//closing for on click

	
	$("button").on("click", function(){
		if (($(".enemy-chosen").children().length > 1 )&& ($(".character-chosen").children().length > 1 )){ //only lets you enter this if you have a char chosen and an enemy chosen
			var attacker;
			//checks to see what class the character box under character chosen has
			if ($(".character-chosen").children().hasClass("rogue")){				attacker = characters.Rogue;}
			else if ($(".character-chosen").children().hasClass("death-knight")){	attacker = characters.DeathKnight;}
			else if ($(".character-chosen").children().hasClass("mage")){			attacker = characters.Mage;}
			else {																	attacker = characters.Hunter;}


			var defender; 				//checks to see what class the character box under enemy chosen has
			if ($(".enemy-chosen").children().hasClass("rogue")){				
				defender = characters.Rogue;
			}
			else if ($(".enemy-chosen").children().hasClass("death-knight")){	
				defender = characters.DeathKnight;
			}
			else if ($(".enemy-chosen").children().hasClass("mage")){			
				defender = characters.Mage;
			}
			else {																
				defender = characters.Hunter;
			}

			if ((defender.health_points < 0) || ((defender.health_points -= attacker.attack_power) < 0)){	//enters if enemy is dead or if your next attack will kill him
				$(".alert-text").html("Bro. You already won. C'mon, why u still attack?");
				$(".enemy-chosen .character-boxes").remove();	//deletes the character when they deaddddd
				if ($(".enemies-available").children().length < 2){		//creates "you won!!!" text when there are no more enemies available
					alert("YOU WOOOOOOOOOOOON YAY");
				}
				$(".alert-text").html("You won! Choose a new enemy!");

			}

			defender.health_points -= attacker.attack_power;	//subtracts HP from defender based on attacker's ATK power
			attacker.health_points -= defender.counter_attack;	//subtracts hP from attacker based on defender counter attack;
			attacker.attack_power += attacker.base_attack_power;	//increases attacker's attack power based on their original base

			$(".enemy-chosen").find(".hp").html(defender.health_points); 	//re-writes the HP portion from hp lost
			$(".character-chosen").find(".hp").html(attacker.health_points); 	//re-writes the HP portion from hp lost


		}
	});
});														//document ready close



