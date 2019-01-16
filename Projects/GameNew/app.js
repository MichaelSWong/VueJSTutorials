/*
1. make new Vue instance
2. set player and monster health to 100
3. make bool for isGameRunning this checks if we should display start a new game or attack and heal, etc
4. change the width of the health bars with percentages
5. display the start New Game and toggle attack, special, etc
6. add the click event to START NEW GAME, make a method for startGame
7. method sets gameIsRunning to true, this.player/this.monster to 100
8. make attack method - attack monster also monster attacks us for attack,special and heal
9. make random damage, get minimum and maximum damage
10. if random number is 1 or 2 math.max will get the minimum number and make it 3
11. check if we are losing or not also refactor
12. special attack and refactor monsterAttack because don't repeat code
13. do healing, adding to health (always adds 10 to health) but don't go over max health
14. give up just starts new game
15. make a game log - unshift adds to the beginning of the array
16. print the log to the html file
17. only add log when length of turns is greater than 0
18. add to log and reset turns when start a new game
19. add binding to class to style the player and monster attacks
*/
new Vue({
    el: '#app',
    data:{
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning : false,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth =100;
            this.turns = [];
        },
        attack: function() {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            });        
            if (this.checkWin()) {
                return;
            }                    
            
            this.monsterAttack();
        },
        specialAttack: function() {
            var damage = this.calculateDamage(10, 20); 
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster hard for ' + damage
            }); 
            
            if (this.checkWin()) {
                return;
            }

            this.monsterAttack();

        },
        heal: function() {
            if (this.playerHealth <=90) {
                this.playerHealth +=10
            }
            else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10'
            }); 
            this.monsterAttack();

        },
        giveUp: function() {
            this.gameIsRunning = false;

        },
        monsterAttack: function() {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage
            });
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min)
        },
        checkWin: function() {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New Game?')) {
                    this.startGame();
                }
                else {
                    this.gameIsRunning = false;
                }                
                return true;
            } else if (this.playerHealth <= 0) {
                if(confirm('You lost! New Game?')) {
                    this.startGame();
                }
                else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }

});



/*
original attack function
attack: function() {
            var max = 10;
            var min = 3;
            var damage = Math.max(Math.floor(Math.random() * max) + 1, min)
            this.monsterHealth -= damage;
            
            if (this.monsterHealth <= 0) {
                alert('You won!');
                this.gameIsRunning = false;
                return;
            }
            
            max = 12;
            min = 5;
            var damage = Math.max(Math.floor(Math.random() * max) + 1, min)
            this.playerHealth -= damage;

            if (this.playerHealth <= 0) {
                alert('You lost!');
                this.gameIsRunning = false;
                return;
            }
        }


*/