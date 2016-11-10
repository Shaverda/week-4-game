var characters = {
	"Rogue" : {
		health_points: 150,
		attack_power: 15,
		defense: 10},
	"Death Knight" : {
		health_points: 200,
		attack_power: 7,
		defense: 15}, 
	"Mage" : {
		health_points: 100,
		attack_power: 15,
		defense: 10}, 
	"Hunter" : {
		health_points: 125,
		attack_power: 13,
		defense: 13}
};
function choose_enemy (is_enemy_chosen){	
	$(".character-boxes").on("click", function(){
		if (is_enemy_chosen == false){	
			var enemy_chosen = this;						//sets var enemy_chosen to item clicked on
			console.log(enemy_chosen);
			$(".enemy-chosen").append(this);			//moves enemy clicked on to defender area
			is_enemy_chosen = true;						//ensures you can only choose 1 enemy
			return is_enemy_chosen;
		}					
	})
}

$(document).ready(function() {						
	var is_character_chosen = false;					//var to make you only allowed to choose one character
	var character_chosen;								//stores your chosen character
	var is_enemy_chosen = false;						//var to make you only allowed to choose one enemy
	var enemy_chosen;									//stores your chosen enemy
	var char_boxes_clicked = 0;							//used to only allow an enemy to be chosen if a char box has already been chosen previously

	$(".character-boxes").on("click", function() {
		if (is_character_chosen == false){				//if you haven't chosen a char yet
			$(".character-chosen").append(this);		//adds char chosen/clicked on to character chosen div
			is_character_chosen = true;					//means you've now chosen a character, can't choose more
			character_chosen = this;					//iniates character chosen to whatever clicked on.
			char_boxes_clicked++;						//used to only allow an enemy to be chosen if a char box has already been chosen previously
		}
		$(".character-boxes").each(function(){			//iterates through all possible character boxes,	
			if (this !== character_chosen){				//making sure that it's not the one you chose to fight	
				$(".enemies-available").append(this);	//and otherwise adds to "enemies available" list
			}											//closing for if
			is_enemy_chosen = choose_enemy(is_enemy_chosen);
		});												//closing for .each func												
	});													//closing for on click
});														//document ready close



