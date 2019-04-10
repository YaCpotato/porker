var role=new Vue({
    el:'#role',
    data:{
        role_deck:[]=deck.myDeck,
        Flash_judge:false,
        Straight_judge:false,
        RoyalStraight_judge:false,
        FourCard_judge:false,
        FullHouse_judge:false,
        ThreeCard_judge:false,
        TwoPair_judge:false,
        OnePair_judge:false
    },
    
    methods:{
        Flash:function(){//フラッシュ判定
            var m=Math.floor(this.role_deck[0]/13)//自分のデッキの1枚目のカードの１３で割った商
            for(var i=1;i<5;i++){
                if(m!=Math.floor(this.role_deck[i]/13)){
                    return 0;
                }
            }
            this.Flash_judge=true
        },

        Straight:function(){
            var i=0
            var surplus=[]
            for(var i=0;i<5;i++){
                surplus.push(this.role_deck[i]%13)
            }
            surplus.sort(
                //これがないと、数字ではなく、文字列としてソートしてしまう/*
                function(a,b){
                    return a-b;
            }
            )
            for(var i=4;i>=1;i--){
                if(surplus[i]!=surplus[i-1]+1){
                    return 0;
                }
                if(i==1){
                    this.Straight_judge=true
                }
            }
            
            if(surplus[4]!=12 || surplus[0]!=0){
                return 0;
            }else if(surplus[4]==12 || surplus[0]==0){
                this.Straight_judge=false
                this.RoyalStraight_judge=true
            }
            if(surplus[4]-surplus[0]!=4){
                this.RoyalStraight_judge=false
                return 0;
            }
        },

        FourCard:function(){//４カード・・・剰余が等しいカードが4枚
            var surplus=[]
            for(var i=0;i<5;i++){
                surplus.push(this.role_deck[i]%13)
            }
            surplus.sort(
                function(a,b){
                    return a-b;
            }
            )
            var suit=[0,0,0,0,0,0,0,0,0,0,0,0,0]

            for(var i=0;i<5;i++){
                suit[surplus[i]]=suit[surplus[i]]+1
            }

            for(var j=0;j<13;j++){
                if(suit[j]==4){
                    this.FourCard_judge=true
                }
            }
        },

        FullHouse:function(){
            var surplus=[]
            for(var i=0;i<5;i++){
                surplus.push(this.role_deck[i]%13)
            }
            surplus.sort(
                function(a,b){
                    return a-b;
            }
            )
            for(var i=0;i<4;i++){
                if(surplus[i]!=surplus[i+1]){//1枚目、2枚目が等しかったら
                    return 0;//等しくなければ終わり
                }else if(i==0){
                    if(surplus[i+1]==surplus[i+2]){//2枚目、3枚目をみる
                            if(surplus[i+3]!=surplus[i+4]){//3枚目と4枚目,4枚目と5枚目を確認する
                                return 0;//等しくなければ終わり
                            }
                        this.FullHouse_judge=true//等しかったら、昇順に並べたときに、3枚、2枚となるフルハウス
                    }else if(surplus[i+1]!=surplus[i+2]){
                        i=2
                    }
                }
            }
            this.FullHouse_judge=true
        },
        ThreeCard:function(){
            var surplus=[]
            for(var i=0;i<5;i++){
                surplus.push(this.role_deck[i]%13)
            }
            surplus.sort(
                //これがないと、数字ではなく、文字列としてソートしてしまう/*
                function(a,b){
                    return a-b;
            }
            )
            var suit=[0,0,0,0,0,0,0,0,0,0,0,0,0]

            for(var i=0;i<5;i++){
                suit[surplus[i]]=suit[surplus[i]]+1
            }

            var pair=0
            for(var j=0;j<13;j++){
                if(suit[j]==3){
                    this.ThreeCard_judge=true
                }
            }
        },
        Pair:function(){
            var surplus=[]
            for(var i=0;i<5;i++){
                surplus.push(this.role_deck[i]%13)
            }
            surplus.sort(
                //これがないと、数字ではなく、文字列としてソートしてしまう/*
                function(a,b){
                    return a-b;
            }
            )
            var suit=[0,0,0,0,0,0,0,0,0,0,0,0,0]

            for(var i=0;i<5;i++){
                suit[surplus[i]]=suit[surplus[i]]+1
            }

            var pair=0
            for(var j=0;j<13;j++){
                if(suit[j]==2){
                    pair=pair+1
                }
            }
            if(pair==2){
                this.TwoPair_judge=true
                return 0;
            }else if(pair==1){
                this.TwoPair_judge=false
                this.OnePair_judge=true
                return 0;
            }
            
        },
        AllRoleJudge:function(){
            this.Flash_judge=false
            this.Straight_judge=false
            this.RoyalStraight_judge=false
            this.FourCard_judge=false
            this.FullHouse_judge=false
            this.ThreeCard_judge=false
            this.TwoPair_judge=false
            this.OnePair_judge=false
            this.Flash()
            this.Straight()
            this.FourCard()
            this.FullHouse()
            this.ThreeCard()
            this.Pair()
        }
    }
})