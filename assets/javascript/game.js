var characters = {
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


var is_enemy_chosen = false;						//var to make you only allowed to choose one enemy
var is_character_chosen = false;					//var to make you only allowed to choose one character

function choose_enemy (is_enemy_chosen){	
	$(".character-boxes").on("click", function(){
		if (is_enemy_chosen == false){	
			enemy_chosen = this;						//sets var enemy_chosen to item clicked on
			$(".enemy-chosen").append(this);			//moves enemy clicked on to defender area
			is_enemy_chosen = true;						//ensures you can only choose 1 enemy

			if ($(this).hasClass("rogue")){					characters.Rogue["position"] = "defender"; }	//CURRENTLY NO USE FOR ANY OF THIS
			else if ($(this).hasClass("death-knight")){		characters.DeathKnight["position"] = "defender";} 
			else if ($(this).hasClass("mage")){				characters.Mage["position"] = "defender";}
			else {											characters.Hunter["position"] = "defender";}
		}					
	})
}

$(document).ready(function() {						
	var character_chosen;								//stores your chosen character
	var enemy_chosen;									//stores your chosen enemy
	document.querySelector(".rogue_health_points").innerHTML = (characters.Rogue.health_points);
	document.querySelector(".dk_health_points").innerHTML = (characters.DeathKnight.health_points);
	document.querySelector(".mage_health_points").innerHTML = (characters.Mage.health_points);
	document.querySelector(".hunter_health_points").innerHTML = (characters.Hunter.health_points);


	$(".character-boxes").on("click", function() {
		if (is_character_chosen == false){				//if you haven't chosen a char yet
			$(".character-chosen").append(this);		//adds char chosen/clicked on to character chosen div
			is_character_chosen = true;					//means you've now chosen a character, can't choose more
			character_chosen = this;					//iniates character chosen to whatever clicked on.
			if ($(this).hasClass("rogue")){					characters.Rogue["position"] = "attacker"; }	//CURRENTLY NO USE FOR ANY OF THIS
			else if ($(this).hasClass("death-knight")){		characters.DeathKnight["position"] = "attacker";} 
			else if ($(this).hasClass("mage")){				characters.Mage["position"] = "attacker";}
			else {											characters.Hunter["position"] = "attacker";}
		}
		$(".character-boxes").each(function(){			//iterates through all possible character boxes,
			if (this !== character_chosen){				//making sure that it's not the one you chose to fight	
				$(".enemies-available").append(this);	//and otherwise adds to "enemies available" list
			}											//closing for if
			choose_enemy(is_enemy_chosen);
		});												//closing for .each func												
	});													//closing for on click

	
	$("button").on("click", function(){

		if (($(".enemy-chosen").children().length > 1 )&& ($(".character-chosen").children().length > 1 )){
			var attacker;

			if ($(".character-chosen").children().hasClass("rogue")){				attacker = characters.Rogue;}
			else if ($(".character-chosen").children().hasClass("death-knight")){	attacker = characters.DeathKnight;}
			else if ($(".character-chosen").children().hasClass("mage")){			attacker = characters.Mage;}
			else {																attacker = characters.Hunter;}


			var defender; 
			if ($(".enemy-chosen").children().hasClass("rogue")){				defender = characters.Rogue;}
			else if ($(".enemy-chosen").children().hasClass("death-knight")){	defender = characters.DeathKnight;}
			else if ($(".enemy-chosen").children().hasClass("mage")){			defender = characters.Mage;}
			else {																defender = characters.Hunter;}

			defender.health_points -= attacker.attack_power;	//subtracts HP from defender based on attacker's ATK power
			attacker.attack_power += attacker.base_attack_power;	//increases attacker's attack power based on their original base

			$(".enemy-chosen").find(".hp").html(defender.health_points); 	//re-writes the HP portion from hp lost

		}
	});
});														//document ready close



