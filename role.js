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
            console.log('Flash(),isActive.')
            var m=Math.floor(this.role_deck[0]/13)//自分のデッキの1枚目のカードの１３で割った商
            //console.log(m)
            for(var i=1;i<5;i++){
                //console.log(Math.floor(this.role_deck[i]/13))
                if(m!=Math.floor(this.role_deck[i]/13)){
                    console.log('Not Flash')
                    return 0;
                }
            }
            this.Flash_judge=true
        },
        Straight:function(){
            console.log('Straight(),isActive.')
            var i=0
            var surplus1=[]
            for(var i=0;i<5;i++){
                surplus1.push(this.role_deck[i]%13)
            }
//ソートする
            surplus1.sort(
                //これがないと、数字ではなく、文字列としてソートしてしまう/*
                function(a,b){
                    return a-b;
            }
            )
            for(var i=0;i<5;i++){
                console.log(surplus1[i])
            }

            /*var suit=[0,0,0,0,0,0,0,0,0,0,0,0,0]

            for(var i=0;i<5;i++){
                suit[surplus1[i]]=suit[surplus1[i]]+1
            }
            console.log('suit= '+suit)
var i=0;
            while(i<5){
                if(suit[i]==1){
                    var k=suit[i]
                    for(var j=k;j<k+5;j++){
                        if(suit[j]!=suit[j+1]){
                            console.log('Straight count='+i)
                            return 0;
                        }
                        i=i+1
                    }
                    this.Straight_judge=true
                    return 0;
                }
            }*/

            for(var i=4;i>=1;i--){
                console.log('i='+i)
                if(surplus1[i]!=surplus1[i-1]+1){
                    console.log(i+'連番判定×')
                    console.log(surplus1[i])
                    console.log(surplus1[i-1]+1)
                    return 0;
                }
                if(i==1){
                    this.Straight_judge=true
                }
            }
            
            if(surplus1[4]!=12 || surplus1[0]!=0){
                console.log('RS判定×')
                return 0;
            }else if(surplus1[4]==12 || surplus1[0]==0){
                this.Straight_judge=false
                this.RoyalStraight_judge=true
            }
            if(surplus1[4]-surplus1[0]!=4){
                //RoyalStraight時にはでる
                console.log('前後判定×')
                this.RoyalStraight_judge=false
                return 0;
            }
        },

        FourCard:function(){//４カード・・・剰余が等しいカードが4枚
            console.log('FourCard(),isActive.')
            var surplus2=[]
            for(var i=0;i<5;i++){
                surplus2.push(this.role_deck[i]%13)
                console.log('surplus2[i]='+surplus2[i])
            }
            surplus2.sort(
                //これがないと、数字ではなく、文字列としてソートしてしまう/*
                function(a,b){
                    return a-b;
            }
            )
            for(var i=0;i<4;i++){
                if(surplus2[i]!=surplus2[i+1])
                return 0;
            }
            this.FourCard_judge=true
        },

        FullHouse:function(){
            console.log('FullHouse(),isActive.')
            var surplus3=[]
            for(var i=0;i<5;i++){
                surplus3.push(this.role_deck[i]%13)
                console.log('surplus3[i]='+surplus3[i])
            }
            surplus3.sort(
                //これがないと、数字ではなく、文字列としてソートしてしまう/*
                function(a,b){
                    return a-b;
            }
            )
            for(var i=0;i<4;i++){
                if(surplus3[i]!=surplus3[i+1]){//1枚目、2枚目が等しかったら
                    return 0;//等しくなければ終わり
                }else if(i==0){
                    if(surplus3[i+1]==surplus3[i+2]){//2枚目、3枚目をみる
                            if(surplus3[i+3]!=surplus3[i+4]){//3枚目と4枚目,4枚目と5枚目を確認する
                                return 0;//等しくなければ終わり
                            }
                        this.FullHouse_judge=true//等しかったら、昇順に並べたときに、3枚、2枚となるフルハウス
                    }else if(surplus3[i+1]!=surplus3[i+2]){
                        console.log('Not a 3-2 FullHouse,then...')
                        i=2
                    }
                }
            }
            this.FullHouse_judge=true
        },
        ThreeCard:function(){
            console.log('ThreeCard(),isActive.')
            var surplus4=[]
            for(var i=0;i<5;i++){
                surplus4.push(this.role_deck[i]%13)
                console.log('surplus4[i]='+surplus4[i])
            }
            surplus4.sort(
                //これがないと、数字ではなく、文字列としてソートしてしまう/*
                function(a,b){
                    return a-b;
            }
            )
            var suit=[0,0,0,0,0,0,0,0,0,0,0,0,0]

            for(var i=0;i<5;i++){
                suit[surplus4[i]]=suit[surplus4[i]]+1
            }
            console.log('suit= '+suit)

            var pair=0
            for(var j=0;j<13;j++){
                console.log('number check detected')
                console.log(suit[j])
                if(suit[j]==3){
                    console.log('threeCard judge')
                    this.ThreeCard_judge=true
                }
            }
        },
        Pair:function(){
            console.log('Pair(),isActive.')
            var surplus5=[]
            for(var i=0;i<5;i++){
                surplus5.push(this.role_deck[i]%13)
                console.log('surplus5[i]='+surplus5[i])
            }
            surplus5.sort(
                //これがないと、数字ではなく、文字列としてソートしてしまう/*
                function(a,b){
                    return a-b;
            }
            )
            var suit=[0,0,0,0,0,0,0,0,0,0,0,0,0]

            for(var i=0;i<5;i++){
                suit[surplus5[i]]=suit[surplus5[i]]+1
            }
            console.log('suit= '+suit)

            var pair=0
            for(var j=0;j<13;j++){
                console.log('number check detected')
                console.log(suit[j])
                if(suit[j]==2){
                    console.log('pair judge')
                    pair=pair+1
                    console.log('pair='+pair)
                }
            }
            console.log('最終確認pair='+pair)
            if(pair==2){
                console.log('最終確認ツーペアpair='+pair)
                this.TwoPair_judge=true
                return 0;
            }else if(pair==1){
                console.log('最終確認ワンペアpair='+pair)
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
            console.log('AllRoleJudge begin')
            this.Flash()
            this.Straight()
            this.FourCard()
            this.FullHouse()
            this.ThreeCard()
            this.Pair()
            console.log('AllRoleJudge,isActive.')
            if(this.Straight_judge){
                return console.log('Straight!!!');   
            }
            if(this.RoyalStraight_judge && this.Flash_judge){
                return console.log('Royal Straight Flash!!!');
            }else if(this.RoyalStraight_judge){
                console.log('Royal Straight!!!')
            }else if(this.Flash_judge){
                return console.log('Flash!!!');
            }else if(this.FourCard_judge){
                return console.log('FourCard!!!')
            }else if(this.FullHouse_judge){
                return console.log('FullHouse!!!')
            }else if(this.ThreeCard_judge){
                return console.log('ThreeCard!!!')
            }else if(this.TwoPair_judge){
                return console.log('Two Pair!!!')
            }else if(this.OnePair_judge){
                return console.log('One Pair!!!')
            }
        }
    }
})