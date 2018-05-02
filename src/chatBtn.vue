<template>
    <div id="dorothyChatBtn">
        <div class="dorothyContent" v-if="!isContentOpen">
            <chat-body></chat-body>
        </div>
        <div @click="toggleContent" class="dorothyBtn" style="display:none">
            <div class="animated bounceIn">
                <span class="notice">
                    이곳에서 <span class="eng">{{serviceNames}}</span>에 대해 물어보세요!
                    <img class="tail" src="img/chatBtn/img_tail.png" />
                </span>
            </div>
            <img v-if="isContentOpen" src="img/chatBtn/img_ask.png" class="chatBtn" alt="dorothy chatting button">
            <img v-if="!isContentOpen" src="img/chatBtn/img_ask_close.png" class="chatBtn doroclose" alt="dorothy close button">
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import _ from 'lodash'


    export default {
        name: 'dorothyChatBtn',
        data() {
            return {
                serviceNames: serviceNames || 'danbee.Ai',
                isContentOpen: true,
                // currentChatbot:{
                //     chatbotImg : chatbotImg || "https://github.com/danbeeai/chat-example/blob/master/img/chatBtn/danbee_dew.png?raw=true",
                //     chatbotName : chatbotName || '단비',
                //     chatbotId : chatbotId || '5bbd93a3-00be-4054-b79a-03c4c50424bc'//심심풀이//'4aaf8bee-d4b3-4cf4-959f-3f7e611a4a32'//회귀검증// '5bbd93a3-00be-4054-b79a-03c4c50424bc' //도로시// 'f9fd0b53-a29b-415c-90c4-b8b88c0bd75c' // 심리테스트
                // },
                currentUser:{
                    userName : 'Landing Page'
                },
            };
        },
        methods: {
            detectmobile: function() {
                if( navigator.userAgent.match(/Android/i)
                    || navigator.userAgent.match(/webOS/i)
                    || navigator.userAgent.match(/iPhone/i)
                    || navigator.userAgent.match(/iPad/i)
                    || navigator.userAgent.match(/iPod/i)
                    || navigator.userAgent.match(/BlackBerry/i)
                    || navigator.userAgent.match(/Windows Phone/i)
                ){
                    return true;
                }
                else {
                    return false;
                }
            },
            scrollDown: function(){ //image 늦게 뜰때 끝까지 안내려가는 문제 추후 수정 필요
                setTimeout(function(){
                    if($("#chattingPanel")[0]){
                        $("#chattingPanel").scrollTop($("#chattingPanel")[0].scrollHeight);
                    }
                },200);
            },
            toggleContent: function () {
                if(this.detectmobile()){
                    window.open('../views/chat.html?cname='+chatbotName+'&cid='+chatbotId+'&cimg='+chatbotImg+'', '_blank');
                    // document.location.href = '../views/chat.html';
                }else{
                    this.isContentOpen = !this.isContentOpen;
                    var width = screen.width;

                    if (!this.isContentOpen){
                        this.scrollDown();
                    }
                }
            },
            // panelHeight: function(){//모바일 화면에서 도로시 발생 시 가상 키보드 높이에 맞춰 높이 조정
            //     var screenWidth = $('html').width();
            //     if (screenWidth <= 618 ) {
            //         setTimeout(function(){
            //             var actualHeight = $('html').height() - 70 - 61;
            //             $('.chat-discussion').css('height', actualHeight);
            //             $('html, body').css({'overflow': 'hidden', 'height': '100%'});
            //             $('html').on('scroll touchmove mousewheel', function(event) {
            //                 event.preventDefault();
            //                 event.stopPropagation();
            //                 return false;
            //             });
            //         }, 600);
            //     }
            // },
            // panelClose: function(){
            //     $('html, body').removeAttr('style');
            //     $('html').off('scroll touchmove mousewheel');
            // }
        },
        computed: {
            getsentenceOutput: function() {

            }
        },
        // beforeMount(){
        //     this.getWelcomeMessage();
        // },
        updated(){
            //추후 scroll down관련 고민좀
        },
        mounted(){
            $('#dorothyChatBtn').find('img.chatBtn').removeClass('hover animated infinite bounce');

            setTimeout(function(){
                    $('.dorothyBtn').fadeIn(400);
                    $('.dorothyBtn').find('.animated').fadeOut(3600);
                }, 1000
            );
            $('.dorothyBtn .chatBtn').mouseenter(function(){
                $('.dorothyBtn').find('img.chatBtn').addClass('hover animated bounce');
            });
            $('.dorothyBtn .chatBtn').mouseleave(function(){
                $('.dorothyBtn').find('img.chatBtn').removeClass('hover animated bounce');
            });
        },
    }
</script>

<style lang="scss">
#dorothyChatBtn{
    position: fixed;
    bottom: 40px;
    right: 40px;
    z-index:1000;
    &.hover {
        position:absolute;
    }
}

.dorothyBtn {
    text-align:right;
    img {
        cursor:pointer;
    }
    .notice {
        position:absolute;
        top:10px;
        right:90px;
        // width:250px;
        background:#514d4c;
        color:#fff;
        font-size:14px;
        font-weight:400;
        padding:10px 15px;
        border-radius:8px;
        white-space:nowrap;
    }
    .tail {
        position: absolute;
        right: 10px;
        bottom:-8px;
    }
}

.dorothyBg {
    display:block;
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background:rgba(0,0,0,.2);
    z-index:-1;
}

@media (max-width: 617px) {
    #dorothyChatBtn {
        right:20px;
        bottom:20px;
        z-index:9999;
        .dorothyBtn {
            .notice {
                top:-10px;
                right:70px;
            }
            >img {
                width:75%;
            }
        }
    }
}
</style>