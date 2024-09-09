$(function () {


    var areWeTyping = true;
    var isMegaEvolve = false;
    var areWeAttacking = false;
    var isPreviousMiss = false;
    var firstMoveAfterME = false;
    var pikachu_img, charizard_img, attack_img, text_box, yvBar, pikaBar, main_menu, attack_menu, rnd, serena_avatar;

    function YvInitialize() {
        pikachu_img = $("#pikachu");
        charizard_img = $("#charizard");
        attack_img = $("#attack_img");
        text_box = $("#textbox1");
        yvBar = $("#yvBar");
        pikaBar = $("#pikaBar");
        main_menu = $("#main_menu");
        attack_menu = $("#attack_menu");
        serena_avatar = $("#serena_avatar");

        YvWriter("#greetings","게임에 들어오신 것을 환영합니다.",0,100,false,function () {
            $("#greetings").html("트레이너님의 도전인가요? <b>환영합니다!</b>")
        }, 0);

        setTimeout(function () {
            $("#start_button")
                .css("animation", "fading 3s")
                .css("opacity", "1");
        },5500);

    }

    setTimeout(YvInitialize,1000);

    $("#start_button").on("click", function () {

        if(!areWeTyping) {
            $("#start_menu").remove();
            $("#YvLandSvg").css("animation", "slidingland 3s");
            $("#PikaLandSvg").css("animation", "slidingpcl 3s");
            charizard_img.css("animation", "sliding 3s");
            pikachu_img.css("animation", "slidingpc 3s");
            $("#serena").css("animation", "fading 3s");
            $("#challenger").css("animation", "fading 3s");

            setTimeout(function () {
                writeText("#textbox1", "Gym Leader Serena chooses Charizard.~Get ready for battle!", 0, 50);
            }, 3000);

            setTimeout(function () {
                $("#main_menu").css("z-index", 6);
            }, 6500);
        }
    });

    $("#fight").on("click", function () {
        main_menu.css("z-index",0);
        attack_menu.css("z-index",6);
    });

    $("#run").on("click", function () {
        if(!areWeTyping){
            serena_avatar.css("opacity",1);
            YvWriter("#textbox1","You tried to run...~But Serena grabbed you!!!~Ah ha! So u were running awaya!",0,25,true,function () {
                serena_avatar.css("opacity",0);
            },1500);
        }
    });

    $("#change_pokemon").on("click", function () {
        if(!areWeTyping){
            serena_avatar.css("opacity",1);
            YvWriter("#textbox1","Changing pokemon is not allowed in~this battle.~(maybe in later update)",0,25,true,function () {
                serena_avatar.css("opacity",0);
            },1000);
        }
    });

    $("#attack1").on("click", function(){
        if(!areWeAttacking) {
            pikachuTurn("https://i.imgur.com/34kVOsd.png",1);
            areWeAttacking = true;
        }
    });

    $("#attack2").on("click", function () {
        if(!areWeAttacking){
            pikachuTurn("https://i.imgur.com/dZxzg78.png",2);
            areWeAttacking=true;
        }
    });

    $("#attack3").on("click",function () {
        if(!areWeAttacking){
            pikachuTurn("https://i.imgur.com/nBdH2tt.png",3);
            areWeAttacking=true;
        }
    });

    $("#attack4").on("click",function () {
        if(!areWeAttacking){
            pikachuTurn("https://i.imgur.com/JRw8Fjn.png",4);
            areWeAttacking=true;
        }
    });

    function pikachuTurn(imgUrl, id) {
        var i=1.0;
        attack_img.attr("src",imgUrl);
        text_box.html("");

        var intervalId = setInterval(function () {
            i=i-0.1;
            attack_menu.css("opacity",i);

            if(i<=0){
                clearInterval(intervalId);
                animationPikachuAttack(id);
                attack_menu.css("z-index",0).css("opacity",1);
            }

        },100);
    }

    function animationPikachuAttack(id) {
        var i=0, intervalId;
        if(id==1) {
            attack_img.css("opacity", 1);
            attack_img.css("left", "152px");
            intervalId = setInterval(function () {
                i++;
                attack_img.css("opacity", i % 2 == 0 ? 1 : 0.4);

                if (i >= 10) {
                    clearInterval(intervalId);
                    attack_img.css("opacity", 0);
                    areWeAttacking = false;
                    attack_img.css("left","0px");
                    YvWriter(text_box,"Pikachu used: Thunder Bolt.~It's super effective.",0,50,true,function () {
                        decreaseHp(yvBar,90,".text2","/400",1);
                        loadCharizardResource(5);
                    },0);

                }

            },100);

        }else{
            var b =30;
            i=80;
            attack_img.css("opacity", 1).css("bottom","30px").css("left","80px");
            if(id==2 || id==4)
                pikachu_img.css("opacity",0);

            intervalId = setInterval(function () {
                i+=20;
                attack_img.css("left",i+"px").css("bottom",b+=15);

                if(i>=210){
                    clearInterval(intervalId);
                    setTimeout(function () {
                        attack_img.css("opacity",0).css("bottom","auto").css("left","0px");
                        if(id==2 || id==4)
                            pikachu_img.css("opacity",1);
                        areWeAttacking = false;
                        if(id==2 || id==3){
                            YvWriter(text_box,id==2?"Pikachu used: Tackle.~It's not very effective.":"Pikachu used: Electro Ball.~It's super effective.",0,50,true,function () {
                                decreaseHp(yvBar,id==2?30:80,".text2","/400",1);
                            },0);
                        }else{
                            writeText(text_box,"Pikachu used: Volt Tackle.~It's super effective.~It also damages pikachu.",0,30,true);
                            setTimeout(function () {
                                decreaseHp(yvBar,100,".text2","/400",3); //Yv damage
                                setTimeout(function () {
                                    decreaseHp(pikaBar,20,".text4","/350",2);
                                },2000);
                            },3000);
                        }
                        loadCharizardResource(5);
                    },1000);
                }

            },100);
        }
    }

    function decreaseHp(target, damage, update, toAppend, turn) {
        var i=1;
        var intervalId = setInterval(function () {
            target.val(target.val() - 2);
            $(update).html(target.val()+toAppend);
            i+=2;
            if(i>=damage){
                clearInterval(intervalId);
                if(turn==1) {
                    setTimeout(charizardTurn, 2000);
                }else if(turn==0){
                    setTimeout(function () {
                        if(pikaBar.val()<=0)
                            battleOver(1);
                        else
                            main_menu.css("z-index",6);
                    },1000);
                }else if(turn==2){
                    setTimeout(function () {
                        if(pikaBar.val()<=0)
                            battleOver(1);
                        else
                            setTimeout(charizardTurn, 1000);
                    },1000);
                }
            }
        }, 20);
    }

    function loadCharizardResource(limit) {
        getRandomNumber(isMegaEvolve?limit:limit-1);
        if(isMegaEvolve && !firstMoveAfterME){
            firstMoveAfterME=true;
            rnd = 3;
        }
        if(isMegaEvolve){
            if(rnd==0)
                attack_img.attr("src","https://i.imgur.com/PwhPgNW.gif");
            else if(rnd==1)
                attack_img.attr("src", "https://i.imgur.com/9YiABUq.png");
            else if(rnd==2)
                attack_img.attr("src",'https://i.imgur.com/reSz6Ds.png');
            else if(rnd==3)
                attack_img.attr("src","https://i.imgur.com/fB8xmmm.gif");
        }else {
            if (rnd == 0)
                attack_img.attr("src", "https://i.imgur.com/mAuzaqK.gif");
            else if (rnd == 1)
                attack_img.attr("src", "https://i.imgur.com/9YiABUq.png");
            else if (rnd == 2)
                attack_img.attr("src", "https://i.imgur.com/YF6JLlO.png");
        }


    }

    function charizardTurn() {
        var i=0;
        text_box.html("");

        if(!isMegaEvolve && yvBar.val()<=100){
            getMegaEvolve();
            return;
        }

        if(yvBar.val()<=0){
            battleOver(0);
            return;
        }

        if(rnd==0) {
            if(!isMegaEvolve) {
                setTimeout(function () {
                    attack_img.css("opacity", 1).css({WebkitTransform: 'rotate(' + 234 + 'deg)'})
                        .css({'-moz-transform': 'rotate(' + 234 + 'deg)'})
                        .css("left", "186px").css("bottom", "22px");
                    setTimeout(function () {
                        attack_img.css("opacity", 0);
                        setTimeout(function () {
                            YvWriter(text_box, "Charizard used: Flamethrower.", 0, 50, true,function () {
                                decreaseHp(pikaBar, 30, ".text4", "/350",0);
                                attack_img.css({WebkitTransform: 'rotate(0deg)'})
                                    .css({'-moz-transform': 'rotate(0deg)'})
                                    .css("left", "0px").css("bottom", "auto");
                            },0);
                        }, 500);
                    }, 2000);
                }, 1000);
            }else{
                setTimeout(function () {
                    attack_img.css("opacity", 1).css({WebkitTransform: 'rotate(' + 234 + 'deg)'})
                        .css({'-moz-transform': 'rotate(' + 234 + 'deg)'})
                        .css("left", "126px").css("bottom", "8px");
                    setTimeout(function () {
                        attack_img.css("opacity", 0);
                        setTimeout(function () {
                            YvWriter(text_box, "Mega Charizard X used: Flamethrower.", 0, 50, true,function () {
                                decreaseHp(pikaBar, 50, ".text4", "/350",0);
                                attack_img.css({WebkitTransform: 'rotate(0deg)'})
                                    .css({'-moz-transform': 'rotate(0deg)'})
                                    .css("left", "0px").css("bottom", "auto");
                            },0);
                        }, 500);
                    }, 2000);
                }, 1000);
            }
        }else if(rnd==1 || rnd==2){
            setTimeout(function () {
                attack_img.css("opacity",1).css("top","100px").css("left","80px");
                var intervalId = setInterval(function () {
                    i++;
                    attack_img.css("opacity", i % 2 == 0 ? 1 : 0.6);
                    if(i>=10){
                        clearInterval(intervalId);
                        attack_img.css("opacity",0).css("top","auto").css("left","0px");
                        setTimeout(function () {
                            var char = isMegaEvolve?"Mega Charizard X ":"Charizard ";
                            YvWriter(text_box,rnd==1?char+"used: Thunder Punch.~It's not very effective.":char+"used: Fire Punch.",0,50,true,function () {
                                if(rnd==1)
                                    decreaseHp(pikaBar, isMegaEvolve ? 30 : 20, ".text4", "/350", 0);
                                else
                                    decreaseHp(pikaBar,isMegaEvolve?80:50,".text4","/350",0);
                            },0);
                        },500);
                    }
                },100);
            },1000);
        }else if(rnd==3){
            if(isMegaEvolve) {
                setTimeout(function () {
                    attack_img.css("opacity", 1);
                    setTimeout(function () {
                        attack_img.css("opacity", 0);
                        setTimeout(function () {
                            YvWriter(text_box, "Mega Charizard X used: Blast Burn.~It's super effective.", 0, 50, true,function () {
                                decreaseHp(pikaBar, 100, ".text4", "/350",0);
                            },0);
                        }, 500);
                    }, 2000);
                }, 1000);
            }else{
                charizardMissedAttack();
            }
        }else{
            charizardMissedAttack();
        }
    }

    function charizardMissedAttack(){
        if(isPreviousMiss){
            loadCharizardResource(4);
            isPreviousMiss=false;
            charizardTurn();
        }else{
            isPreviousMiss=true;
            setTimeout(function () {
                YvWriter(text_box, isMegaEvolve?"Mega Charizard X attacked.~But it got missed.":"Charizard attacked.~But it got missed.",0,50,true,function () {
                    main_menu.css("z-index", 6);
                },1000);
            },1000);
        }
    }

    function increaseHp(functionToExecuteLater, delay) {
        var i = yvBar.val();
        var text = $(".text2");
        var intervalId = setInterval(function () {
            i+=2;
            yvBar.val(i);
            text.html(i+"/400");
            if(i>=400){
                clearInterval(intervalId);
                setTimeout(functionToExecuteLater, delay);
            }
        },10);
    }

    function getMegaEvolve() {
        var megaStoneIntervalId, i=0;
        isMegaEvolve=true;
        attack_img.attr("src","https://i.imgur.com/4XK3MPf.png").css("left","200px").css("top","100px");
        setTimeout(function () {
            serena_avatar.css("opacity",1).css("top","120px");
            YvWriter(text_box,"Serena Yv: Your pikachu sure put a good fight,~But sorry your luck has ran out,~*Shows her shiny MEGA EVOLUTION STONE*",0,30,true,function () {
                text_box.html("<strong>Serena Yv:</strong> Your pikachu sure put a good fight,<br>But sorry your luck has ran out,<br>*Shows her shiny <b>MEGA EVOLUTION STONE*</b>");
            },0);

            setTimeout(function () {
                megaStoneIntervalId = setInterval(function () {
                    i++;
                    attack_img.css("opacity",i%2==0?0:1);
                    if(i>=9){
                        clearInterval(megaStoneIntervalId);
                        setTimeout(function () {
                            attack_img.css("opacity",0).css("left","0px").css("top","auto");
                            $("#serena_avatar").css("opacity",0);
                            megaEvolvePhase2();
                        },2000);
                    }
                },200);
            },8000);

        },1000);
    }

    function megaEvolvePhase2() {
        var i=0;
        setTimeout(function () {
            charizard_img.attr("src","https://i.imgur.com/rJUqmRr.gif");
            var intervalId = setInterval(function () {
                i++;
                charizard_img.css("opacity",i%2==0?0:1);
                if(i>=13){
                    clearInterval(intervalId);
                    YvWriter(text_box,"Serena used: MEGA STONE, Charizard~has evolved into Mega Charizard X.~His Hp Restored.",0,50,true,function () {
                        increaseHp(function () {
                            main_menu.css("z-index",6);
                        },1000);
                        $(".text1").css("font-size","13px").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mega Charizard X&nbsp;&nbsp;Lv 70");
                    },0);
                }
            },200);
        },1000);
    }



    function battleOver(id) {
        setTimeout(function () {
            if(id==0){
                charizard_img.remove();
                attack_img.attr("src","https://i.imgur.com/9PT1OTu.png").css("top","50px").css("left","170px");
                YvWriter(text_box,"Mega Charizard X fainted.~You have won!",0,50,true,function () {
                    ending(2);
                },2500);
            }else{
                if(yvBar.val()<=0) {
                    charizard_img.remove();
                    pikachu_img.remove();
                    YvWriter(text_box, isMegaEvolve ? "Pikachu fainted.~Mega Charizard X fainted.~It's a draw." : "Pikachu fainted.~Charizard fainted.~It's a draw", 0, 50, true, function () {
                        ending(1);
                    }, 3000);
                }else {
                    pikachu_img.remove();
                    YvWriter(text_box,"Pikachu fainted.~Gym Leader Serena is the Winner!", 0, 50, true,function () {
                        ending(0);
                    },2500);
                }
            }
        },1000);
    }

    function ending(id) {
        var ending = $("#ending");
        var i=0;
        if(id==0 || id==1){ //lose
            $("#end_image").attr("src","https://i.imgur.com/Zjj9NcF.jpg");
            ending.css("z-index",9).css("opacity",0);
            $("#ending").css("background","black");
            $("#ending_text").html(id==0? "다음에 다시 도전하세요!" : "");

            var intervalId = setInterval(function () {
                i=i+0.1;
                ending.css("opacity",i);
                if(i>=1){
                    clearInterval(intervalId);
                    destroyAll();
                    $("#try_again").css("z-index",10);
                }
            },150);

        }else{
            serena_avatar.css("opacity",1);
            YvWriter(text_box,"축하합니다! 당신이 승리하셨군요!",0,50,true,function () {
                $("#ending").css("background-image","url(https://i.imgur.com/VvJZgeQ.jpg)");
                var intervalId = setInterval(function () {
                    attack_img.css("opacity",i%2==0?1:0.6);
                    i++;
                    if(i>=11){
                        setTimeout(win,1000);
                        clearInterval(intervalId);
                    }
                },200);
            },2000);
        }
    }

    function win() {
        var ending = $("#ending"), i=0;
        ending.css("z-index",9).css("opacity",0);
        $("#ending_text").remove();
        $("#try_again").html("Like Code").css("left","95px").css("bottom","10px");
        $("#end_gif").css("opacity",1);
        ending.css("animation", "fading 3s");

        setTimeout(function () {
            $("#end_image").attr("src","https://i.imgur.com/aiBZD0G.gif").css("left","0px").css("opacity",1);
            destroyAll();
            ending.css("z-index",9).css("opacity",1);
            $("#try_again").css("z-index",10);
            
            setTimeout(function(){
                alert("Take Snapshot 📸📱 & share on your activity feed!!!\n\nMake sure u tag me in that😉\n(Thanks for playing...)");
            },2000);
            
        },2000);

    }

    function destroyAll() {
        $("#background").remove();
        $("#YvLandSvg").remove();
        $("#serena").remove();
        $("#PikaLandSvg").remove();
        charizard_img.remove();
        pikachu_img.remove();
        attack_img.remove();
        serena_avatar.remove();
        $("#challenger").remove();
        $("#main_box").remove();
        main_menu.remove();
        attack_menu.remove();
    }


    function writeText(target, message, idx, interval, clear) {
        areWeTyping = true;
        if(clear) $(target).html("");

        var intervalId = setInterval(function () {

            if(message[idx]==='~') {
                $(target).append("<br>");
                idx++;
            }else {
                $(target).append(message[idx++]);
            }

            if (idx >= message.length) {
                clearInterval(intervalId);
                areWeTyping = false;
            }
        }, interval);
    }

    function YvWriter(target, message, idx, interval, clear, funcToExecute, dealy) {
        areWeTyping = true;
        if(clear) $(target).html("");

        var intervalId = setInterval(function () {

            if(message[idx]==='~') {
                $(target).append("<br>");
                idx++;
            }else {
                $(target).append(message[idx++]);
            }

            if (idx >= message.length) {
                clearInterval(intervalId);
                areWeTyping = false;
                setTimeout(funcToExecute, dealy);

            }
        }, interval);
    }

    function getRandomNumber(limit) {
        rnd = Math.floor(Math.random() * limit);
    }

});
