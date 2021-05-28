new Vue({
    el : "#app",
    data : {
        playerHeal : 100,
        monsterHeal : 100,
        gameIsOn : false,
        logs : []
    },
    methods : {
        startGame : function (){
            this.gameIsOn = true;
        },
        attack : function (){
            var point = Math.ceil(Math.random() * 10);
            this.monsterHeal -= point;
            this.addToLog({turn : "p", text : "Oyuncu normal saldırıda bulundu. (" + point + ")"});
            this.monsterAttack();
        },
        specialAttack : function (){
            var point = Math.ceil(Math.random() * 25);
            this.monsterHeal -= point;
            this.addToLog({turn : "p", text : "Oyuncu özel saldırıda bulundu. (" + point + ")"});
            this.monsterAttack();
        },
        healUp : function (){
            var point = Math.ceil(Math.random() * 20);
            this.playerHeal += point;
            this.addToLog({turn : "p", text : "Oyuncu sağlık bastı. (" + point + ")"});
            this.monsterAttack();
        },
        giveUp : function (){
            this.playerHeal = 0;
            this.addToLog({turn : "p", text : "Oyuncu pes etti. (" + point + ")"});
        },
        monsterAttack : function (){
            var point = Math.ceil(Math.random() * 15);
            this.addToLog({turn : "m", text : "Canavar saldırıda bulundu. (" + point + ")"});
            this.playerHeal -= point;
        },
        addToLog : function (log){
            this.logs.push(log);
        }
    },
    watch : {
        playerHeal : function (value){
            if(value <= 0){
                this.playerHeal = 0;
                if(confirm("Oyunu Kaybettin! Tekrar denemek ister misin?")){
                    this.playerHeal = 100;
                    this.monsterHeal = 100;
                    this.logs = [];
                }
            }else if(value >= 100){
                this.playerHeal = 100;
            }
        },
        monsterHeal : function (value){
            if(value <= 0){
                this.monsterHeal = 0;
                if(confirm("Oyunu Kazandın! Tekrar denemek ister misin?")){
                    this.playerHeal = 100;
                    this.monsterHeal = 100;
                    this.logs = [];
                }
            }
        }
    }
})