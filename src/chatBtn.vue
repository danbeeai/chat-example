<template>
    <div id="ChatBtn">
        <div class="dorothyContent" v-if="!isContentOpen">
            <div class="dContnetWrapper">

                <!--<span v-show="chatList.length > 0" id="clearChatBtn" @click="clearChatMsg()" class="test-refresh db-mouse-over" tooltip="초기화" tooltip-placement="right"><i class="fa fa-refresh"></i></span>-->
                <div id="chattingPanel"  class="chat-discussion">
                    <div v-for="(chat, index) in chatList" :key="chat.index">
                        <div v-if="chat.type=='question'" class="chat-message right">
                            <!--<img class="message-avatar img-circle" src="//danbee.ai/chatflow/resources/images/users/user.jpg" alt="사용자 이미지">-->
                            <div class="message m-b-xs">
                                <div>
                                    <span class="message-author"><b>사용자</b></span>
                                    <span class="message-date">{{chat.timestamp}}</span>
                                </div>
                                <span class="message-content" v-html="chat.sentence"> {{chat.sentence}} </span>
                            </div>
                        </div>
                        <div v-else-if="chat.type=='answer'" class="chat-message left" >
                            <img class="message-avatar img-circle" :src="currentChatbot.chatbotImg" alt="챗봇 이미지">
                            <div class="message">
                                <div style="margin-bottom:3px">
                                    <span class="message-author"><b>{{ currentChatbot.chatbotName }}</b></span>
                                    <span v-show="currentChatbot.chatbotName.length <= 5" style="font-size:10px; text-align:right">{{chat.timestamp}}</span>
                                    <div v-show="currentChatbot.chatbotName.length > 5" style="font-size:10px; text-align:right">{{chat.timestamp}}</div>
                                </div>
                                <div v-if="chat.nodeType == 'carousel'">
                                    <div class="message-content" v-html="chat.sentence"> {{chat.sentence}} </div>
                                    <!--<agile ref="slick" :id="'carousel_' + index" init-onload=true infinite='true' speed='500' fade='true' cssEase='linear' adaptiveHeight='true'>-->
                                    <agile ref="slick" :id="'carousel_' + index">
                                        <div v-for="carousel in chat.carouselList" :key="carousel.index">
                                        <span>
                                            <span class="db-carousel-title">{{carousel.cardTitle || ''}}</span>
                                            <img :src="carousel.imgRoute" width="100%">
                                            <div v-if="carousel.imgRoute == '' && carousel.cardTitle" style="height:30px"></div>
                                            <div class="db-carousel-desc">{{carousel.subCardTitle || ''}}</div>
                                            <div v-for="option in carousel.optionList" :key="option.id">
                                                <div @click="optionClick(option)"  class="todo-list m-t-xs small-list db-chatbot-answer" :class="{'db-link-btn':(option.type != 'btn')}">
                                                    <div v-if="option.type=='btn'"><span class="db-answer-btn p-r-none">{{option.label}}</span></div>
                                                    <div v-else-if="option.type=='callFlow'"><span class="db-answer-btn p-r-none">{{option.label}}</span></div>
                                                    <div v-else-if="option.type=='call'">
                                                        <div class="db-btn-left-side"><i class="fa fa-phone"></i></div>
                                                        <div class="db-btn-right-side"><span class="db-answer-btn">{{option.label}}</span></div>
                                                    </div>
                                                    <div v-else-if="option.type=='outApp'">
                                                        <div class="db-btn-left-side"><i class="fa fa-external-link"></i></div>
                                                        <div class="db-btn-right-side"><span class="db-answer-btn">{{option.label}}</span></div>
                                                    </div>
                                                    <div v-else-if="option.type=='inApp'">
                                                        <div class="db-btn-left-side"><i class="fa fa-external-link-square"></i></div>
                                                        <div class="db-btn-right-side"><span class="db-answer-btn">{{option.label}}</span></div>
                                                    </div>
                                                    <div v-else-if="option.type=='link'">
                                                        <div class="db-btn-left-side"><i class="fa fa-link"></i></div>
                                                        <div class="db-btn-right-side"><span class="db-answer-btn">{{option.label}}</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </span>
                                        </div>
                                    </agile>
                                </div>
                                <div v-if="chat.nodeType == undefined || chat.nodeType != 'carousel'">
                                    <div v-show="chat.imgRoute != undefined && chat.imgRoute != ''">
                                        <img width='100%' :src="chat.imgRoute"/>
                                    </div>
                                    <div class="message-content" v-html="chat.sentence"> {{chat.sentence}} </div>
                                    <div v-for="option in chat.optionList" :key="option.id">
                                        <div @click="optionClick(option)"  class="todo-list m-t-xs small-list db-chatbot-answer" :class="{'db-link-btn':(option.type != 'btn')}">
                                            <div v-if="option.type=='btn'"><span>{{option.label}}</span></div>
                                            <div v-else-if="option.type=='callFlow'"><span>{{option.label}}</span></div>
                                            <div v-else-if="option.type=='call'">
                                                <div class="db-btn-left-side"><i class="fa fa-phone"></i></div>
                                                <div class="db-btn-right-side"><span class="db-answer-btn">{{option.label}}</span></div>
                                            </div>
                                            <div v-else-if="option.type=='outApp'">
                                                <div class="db-btn-left-side"><i class="fa fa-external-link"></i></div>
                                                <div class="db-btn-right-side"><span class="db-answer-btn">{{option.label}}</span></div>
                                            </div>
                                            <div v-else-if="option.type=='inApp'">
                                                <div class="db-btn-left-side"><i class="fa fa-external-link-square"></i></div>
                                                <div class="db-btn-right-side"><span class="db-answer-btn">{{option.label}}</span></div>
                                            </div>
                                            <div v-else-if="option.type=='link'">
                                                <div class="db-btn-left-side"><i class="fa fa-link"></i></div>
                                                <div class="db-btn-right-side"><span class="db-answer-btn">{{option.label}}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="chat.type=='askBack'" class="chat-message left">
                            <img class="message-avatar img-circle" :src="currentChatbot.chatbotImg" alt="챗봇 이미지">
                            <div class="message">
                                <div style="margin-bottom:3px">
                                    <span class="message-author"><b>{{ currentChatbot.chatbotName }}</b></span>
                                    <span v-show="currentChatbot.chatbotName.length <= 5" style="font-size:10px; text-align:right">{{chat.timestamp}}</span>
                                    <div v-show="currentChatbot.chatbotName.length > 5" style="font-size:10px; text-align:right">{{chat.timestamp}}</div>
                                </div>
                                <span class="message-content" v-html="chat.sentence"> {{chat.sentence}} </span>
                                <div v-for="intent in chat.intentList" :key="intent.id">
                                    <div class="todo-list m-t-xs small-list ui-sortable db-chatbot-answer db-intent-answer" @click="intentClick(intent)">
                                        <span>{{intent.intent_alias || intent.intent_name}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dInputWrapper">
                <input type="text" refs="inputbox" v-model="inputMessage" @keyup.13="sendMessage('','')" v-focus />
                <button class="sendBtn" @click="sendMessage('','')">Send</button>
            </div>
        </div>
        <div @click="toggleContent" class="dorothyBtn" style="display:none">
            <div class="animated bounceIn">
            <span class="notice">
                이곳에서 <span class="eng">danbee.Ai</span>에 대해 물어보세요!
                <img class="tail" src="img/chatBtn/img_tail.png" />
            </span>
            </div>
            <img v-if="isContentOpen" src="img/chatBtn/img_ask.png" class="chatBtn" alt="dorothy chatting button" @click="panelHeight()">
            <img v-if="!isContentOpen" src="img/chatBtn/img_ask_close.png" class="chatBtn doroclose" alt="dorothy close button" @click="panelClose()">
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import _ from 'lodash'

    export default {
        name: 'ChatBtn',
        data() {
            return {
                inputMessage: '',
                messageTip: 'Dorothy와 대화를 나누어보세요*',
                isContentOpen: true,
                currentChatbot:{
                    chatbotImg : chatbotImg || "",
                    chatbotName : chatbotName || '도로시',
                    chatbotId : chatbotId || '5bbd93a3-00be-4054-b79a-03c4c50424bc'
                },
                currentUser:{
                    userName : 'Jenny'
                },
                chatMsgInfo: {
                    chatMsgTxt : '',
                    sessionId : '',
                    chatflowId : '',
                    chatInstance : '',
                    chatNodeId : '',
                    chatParamId : '',
                    chatIntentId : ''
                },
                chatList:[],
                selectableResult:{
                    list : [],
                    type : ''
                }
            };
        },
        methods: {
            next() {
                this.$refs.slick.next();
            },
            prev() {
                this.$refs.slick.prev();
            },

            toggleContent: function () {
                this.isContentOpen = !this.isContentOpen;
                var width = screen.width;

                if (!this.isContentOpen){
                    this.scrollDown();
                    if (width <= 618) { //모바일 모드에서 채팅창 발생 시 캐로셀 멈춤
                        $('.carousel').carousel('pause');
                    }
                } else {
                    if (width <= 618) {
                        $('.carousel').carousel('cycle');
                    }
                }

            },
            sendMessage: function (chatbotMsg, viewSentence) {

                if(this.inputMessage === '' && viewSentence === ''){
                    return false;
                }

                //set chat message set for sending
                var chatMsg = {};

                if(chatbotMsg != ''){//click event
                    chatMsg = chatbotMsg;
                }else{//typing
                    if(!_.isEmpty(this.selectableResult.list)){//클릭 가능한 list가 있을때

                        var inputMsg = this.inputMessage;

                        if(this.selectableResult.type == 'btn'){
                            var option = _.filter(this.selectableResult.list, function(option){
                                return option.label == inputMsg;
                            });

                            if(!_.isEmpty(option)){
                                this.initSelectableResult();
                                this.optionClick(option[0]);//만약에 이름이 똑같아도 위에걸 보냄..
                                return false;
                            }
                        }else{//type == intent
                            var intent = _.filter(this.selectableResult.list, function(intent){
                                return intent.intent_name == inputMsg || intent.intent_alias == inputMsg;
                            })

                            if(!_.isEmpty(intent)){
                                this.initSelectableResult();
                                this.intentClick(intent[0]);
                                return false;
                            }
                        }
                    }
                    //일반 message 전송
                    chatMsg.session_id = this.chatMsgInfo.sessionId;
                    chatMsg.chatbot_id = this.currentChatbot.chatbotId;
                    chatMsg.user_id = this.currentUser.userName;
                    chatMsg.input_sentence = this.inputMessage;
                    chatMsg.ins_id = this.chatMsgInfo.chatInstance;
                    chatMsg.intent_id = this.chatMsgInfo.chatIntentId;
                    chatMsg.chatflow_id = this.chatMsgInfo.chatflowId;
                    chatMsg.node_id = this.chatMsgInfo.chatNodeId;
                    chatMsg.param_id = this.chatMsgInfo.chatParamId;
                }

                //user chat message push
                var reqInput = {};
                reqInput.type = "question";
                reqInput.timestamp = moment().format('YYYY-MM-DD, h:mm:ss a');

                if(viewSentence === ''){
                    reqInput.sentence = this.inputMessage;
                }else{
                    reqInput.sentence = viewSentence;
                }

                this.chatList.push(reqInput);

                this.scrollDown();

                //message send
                this.$http.post('https://www.danbee.ai/chatflow/engine.do', chatMsg
                ).then(res =>{
                    this.initChatMsgInfo();
                    this.initSelectableResult();

                    const result = res.data.responseSet.result

                    this.chatMsgInfo.sessionId = result.session_id;
                    this.chatMsgInfo.chatflowId = result.chatflow_id;
                    this.chatMsgInfo.chatInstance = result.ins_id;
                    this.chatMsgInfo.chatNodeId = result.node_id;
                    this.chatMsgInfo.chatParamId = result.param_id;
                    this.chatMsgInfo.chatIntentId = result.intent_id;

                    const mainResult = result.result;

                    if ( (mainResult !== undefined && mainResult.length > 0)  && (result.another_result === undefined || result.another_result.length == 0)) {//result만 있는 경우

                        mainResult.forEach((value, index) => {
                            this.setChatList(value.message, value.optionList, value.imgRoute, value.carouselList);
                        });

                    }else if(result.another_result !== undefined && result.another_result.length > 0) {
                        // 애매한 경우 관련 메시지를 채팅창에 나열한다.
                        this.setAskBackMsg(result.another_result, result.result[0].message);
                    }
                }, error=>{
                    //how to handle error?
                    console.log(error);
                })

                this.inputMessage = '';
            },
            getWelcomeMessage: function(){
                this.$http.post('https://www.danbee.ai/chatflow/welcome.do', {
                    chatbot_id: this.currentChatbot.chatbotId,
                    user_id: this.currentUser.userName
                }).then(res =>{
                    const result = res.data.responseSet.result

                    this.chatMsgInfo.sessionId = result.session_id;
                    this.chatMsgInfo.chatflowId = result.chatflow_id;
                    this.chatMsgInfo.chatInstance = result.ins_id;
                    this.chatMsgInfo.chatNodeId = result.node_id;
                    this.chatMsgInfo.chatParamId = result.param_id;
                    this.chatMsgInfo.chatIntentId = result.intent_id;

                    result.result.forEach((value, index) => {
                        this.setChatList(value.message, value.optionList, value.imgRoute, value.carouselList);
                    })

                }, error=>{
                    //how to handle error?
                    console.log(error);
                })
            },
            optionClick : function (option){
                switch(option.type){
                    case 'btn' :
                        var chatMsg = {};
                        chatMsg.session_id = this.chatMsgInfo.sessionId;
                        chatMsg.chatbot_id = this.currentChatbot.chatbotId;
                        chatMsg.user_id = this.currentUser.userName;
                        chatMsg.input_sentence = option.value || option.label;//value가 비었으면 label을 넘김
                        chatMsg.ins_id = this.chatMsgInfo.chatInstance;
                        chatMsg.intent_id = this.chatMsgInfo.chatIntentId;
                        chatMsg.chatflow_id = this.chatMsgInfo.chatflowId;
                        chatMsg.node_id = this.chatMsgInfo.chatNodeId;
                        chatMsg.param_id = this.chatMsgInfo.chatParamId;

                        this.sendMessage(chatMsg, option.label);
                        break;
                    case 'callFlow':
                        var chatMsg = {};
                        chatMsg.session_id = this.chatMsgInfo.sessionId;
                        chatMsg.chatbot_id = this.currentChatbot.chatbotId;
                        chatMsg.user_id = this.currentUser.userName;
                        chatMsg.intent_id = option.value;
                        chatMsg.chatflow_id = this.chatMsgInfo.chatflowId;
                        chatMsg.input_sentence = option.label;

                        this.sendMessage(chatMsg, option.label);
                        break;
                    case 'call'://임시
                        if(typeof window.orientation !== 'undefined'){
                            var url = 'tel:'+ btn.value;
                            var linkElement = document.createElement('a');
                            try {
                                linkElement.setAttribute('href', url);
                                var clickEvent = new MouseEvent("click", {
                                    "view": window,
                                    "bubbles": true,
                                    "cancelable": false
                                });
                                linkElement.dispatchEvent(clickEvent);
                            } catch (ex) {
                            }
                        }else{
                            var tempMessage = {};
                            tempMessage.type = "answer";
                            tempMessage.sentence = "여기로 전화해보세요 : " + option.value;
                            tempMessage.timestamp = moment().format('YYYY-MM-DD, h:mm:ss a');

                            this.chatList.push(tempMessage);
                            this.inputMessage = '';
                            this.scrollDown();
                        }
                        break;

                    default :
                        window.open(option.value, '_blank');
                        this.inputMessage = '';
                        break;
                }
            },
            intentClick : function(intent){
                var chatMsg = {};
                var viewSentence =  intent.intent_alias || intent.intent_name;

                chatMsg.session_id = this.chatMsgInfo.sessionId;
                chatMsg.chatbot_id = this.currentChatbot.chatbotId;
                chatMsg.input_sentence = viewSentence;//intent.sentence;
                chatMsg.ins_id = this.chatMsgInfo.chatInstance;
                chatMsg.intent_id = intent.intent_id;
                chatMsg.chatflow_id = this.chatMsgInfo.chatflowId;
                chatMsg.node_id = this.chatMsgInfo.chatNodeId;
                chatMsg.param_id = this.chatMsgInfo.chatParamId;
                chatMsg.user_id = this.currentUser.userName;

                this.sendMessage(chatMsg, viewSentence);
            },
            clearChatMsg : function(){ //현재 사용하지 않음
                this.chatList = [];
                this.initChatMsgInfo();
            },
            setChatList : function(message, optionList, imgRoute, carouselList){
                //empty message
                if(message == "" && optionList.length == 0 && imgRoute == "" && carouselList.length == 0){
                    return false;
                }

                var resultchatDetail = {};
                if(carouselList.length > 0){//carousel
                    //임시 생략
                    this.selectableResult.type = 'btn';
                    carouselList.forEach((carousel)=>{
                        this.selectableResult.list = this.selectableResult.list.concat(carousel.optionList);
                    });

                    resultchatDetail.type = "answer";
                    resultchatDetail.sentence = message;
                    resultchatDetail.nodeType = 'carousel';
                    resultchatDetail.carouselList = carouselList;
                    resultchatDetail.timestamp = moment().format('YYYY-MM-DD, h:mm:ss a');

                }else{
                    resultchatDetail.type = "answer";
                    resultchatDetail.sentence = message;
                    resultchatDetail.imgRoute = imgRoute;
                    resultchatDetail.optionList = optionList;


                    resultchatDetail.timestamp = moment().format('YYYY-MM-DD, h:mm:ss a');

                    if(optionList.length > 0){
                        this.selectableResult.type = 'btn';
                        this.selectableResult.list = this.selectableResult.list.concat(optionList);
                    }
                }
                this.chatList.push(resultchatDetail);
                this.scrollDown();
            },
            setAskBackMsg : function(anotherResult, message){
                var timeId = $.now();
                this.selectableResult.type = 'intent';
                this.selectableResult.list = anotherResult;

                var resInput = {
                    "type": "askBack",
                    "sentence":  message,
                    "timestamp": moment().format('YYYY-MM-DD, h:mm:ss a'),
                    "timeId" : timeId,
                    "intentList" : anotherResult
                };
                this.chatList.push(resInput);

                this.scrollDown();
            },
            initChatMsgInfo: function(){
                this.chatMsgInfo.chatMsgTxt = '';
                this.chatMsgInfo.sessionId = '';
                this.chatMsgInfo.chatflowId = '';
                this.chatMsgInfo.chatInstance = '';
                this.chatMsgInfo.chatNodeId = '';
                this.chatMsgInfo.chatParamId = '';
                this.chatMsgInfo.chatIntentId = '';
            },
            scrollDown: function(){ //image 늦게 뜰때 끝까지 안내려가는 문제 추후 수정 필요
                setTimeout(function(){
                    if($("#chattingPanel")[0]){
                        $("#chattingPanel").scrollTop($("#chattingPanel")[0].scrollHeight);
                    }
                },200);
            },
            initSelectableResult: function(){
                this.selectableResult.list = [];
                this.selectableResult.type = '';
            },
            panelHeight: function(){//모바일 화면에서 도로시 발생 시 가상 키보드 높이에 맞춰 높이 조정
                var screenWidth = $('html').width();
                if (screenWidth <= 618 ) {
                    setTimeout(function(){
                        var actualHeight = $('html').height() - 70 - 61;
                        $('.chat-discussion').css('height', actualHeight);
                        $('html, body').css({'overflow': 'hidden', 'height': '100%'});
                        $('html').on('scroll touchmove mousewheel', function(event) {
                            event.preventDefault();
                            event.stopPropagation();
                            return false;
                        });
                    }, 600);
                }
            },
            panelClose: function(){
                $('html, body').removeAttr('style');
                $('html').off('scroll touchmove mousewheel');
            }
        },
        computed: {
            getsentenceOutput: function() {

            }
        },
        beforeMount(){
            this.getWelcomeMessage();
        },
        updated(){
            //추후 scroll down관련 고민좀
        },
        mounted(){
            $('#ChatBtn').find('img.chatBtn').removeClass('hover animated infinite bounce');

            setTimeout(function(){
                    $('.dorothyBtn').fadeIn(400);
                    $('.dorothyBtn').find('.animated').fadeOut(3600);
                }, 1000
            );
            $('.dorothyBtn').mouseenter(function(){
                $('.dorothyBtn').find('img.chatBtn').addClass('hover animated infinite bounce');
            });
            $('.dorothyBtn').mouseleave(function(){
                $('.dorothyBtn').find('img.chatBtn').removeClass('hover animated infinite bounce');
            });
        },
        directives: {
            focus: {
                // 디렉티브 정의
                inserted: function (el) {
                    // Focus the element
                    el.focus();
                }
            }
        }
    }
</script>

<style lang="scss">
    $color-point-y: #f8ac59;
    $color-point-y-d: #f69023;
    $border-color :  #999;

    #ChatBtn{
    // background: white;
        position: fixed;
        bottom: 40px;
        right: 40px;
        z-index:1000;
    &.hover {
         position:absolute;
     }
    //color: white;
    #chattingPanel{
        position: relative;
    .test-refresh{
        position: sticky;
        left: 12px;
        top: 0;
        color: $color-point-y;
        font-size: 20px;
    }
    }
    }
    #clearChatBtn{
        position: absolute;
        top: 6px;
        left: 10px;
        z-index: 200;
        color: $color-point-y;
    &:hover{
         cursor: pointer;
     }
    }
    .dorothyBtn {
        text-align:right;
        cursor:pointer;
    }
    .chat-view .ibox-content {
        padding: 0;
    }
    .chat-message {
        padding:10px 5px;
    // display:inline-block;
    }
    .chat-message:after {
        content:"";
        display: block;
        clear:both;
    }
    .chat-message.right .message {
        float:right;
    }
    .message-avatar {
        height: 48px;
        width: 48px;
        border: 1px solid #e7eaec;
        border-radius: 4px;
        margin-top: 1px;
    }
    .chat-discussion .chat-message.left .message-avatar {
        float: left;
        margin-right: 10px;
        border-radius: 25px;
    }
    .chat-discussion .chat-message.right .message-avatar {
        display: none;
    }
    .message {
        background-color: #fff;
        border: 1px solid #e7eaec;
        text-align: left;
        display: block;
        padding: 10px 20px;
        position: relative;
        border-radius: 4px;
    .message-content {
        word-wrap: break-word;
    }
    }
    .chat-discussion .chat-message.left .message-date {
        float: right;
    }
    .chat-discussion .chat-message.right .message-date {
        float: left;color: white;
    }
    .chat-discussion .chat-message.left .message {
        float:left;
        text-align: left;
    // margin-left: 55px;
        max-width:75%;
    }
    .chat-discussion .chat-message.right .message {
    // text-align: right;
        margin-left: 55px;
        background: $color-point-y;
        margin-right: 0;
    }
    .message-date {
        font-size: 10px;
    //color: white;
    }
    .message-content {
        display: block;
    }
    .chat-discussion {
        background: #eee;
        padding: 15px;
        height: 500px;
        overflow-y: auto;
        padding-left: 5px;
        padding-right: 5px;
        width: 360px;
        color: black;
    }
    .chat-users {
        overflow-y: auto;
        height: 400px;
    }
    .chat-message-form .form-group {
        margin-bottom: 0;
    }
    .db-btn-left-side{
        position: absolute;
        left: 9px;
        display: inline-block;
        top: 50%;
        margin-top: -10px;
    }
    .chbotanswer,
    .db-chatbot-answer,
    .chbotanswerpopup {
        position: relative;
        margin-top: 3px;
        padding: 4px 12px 4px 12px;
        border: 1px solid #888;
        background: #665a4b;
        font-size: 17px;
        font-weight: 100;
        color: white;
        cursor: pointer;
        text-align: center;
        line-height: 1.2;
        white-space: pre-line;
        word-break: break-word;
        border-radius: 25px;
    &:hover {
         background: #847462;
         color: white;
    i{
        color: white;
        background:#665a4b;
    }
    }
    }
    .db-chatbot-answer{
    &.db-link-btn{
         border: 1px solid #888;
         background: #665a4b;
    &:hover{
         background: $color-point-y;
         color: white;
     }
    }
    i{
        font-size: 12px;
        color: white;
        padding: 4px;
        background: rgba(255,255,255,.1);
        border-radius: 16px;
    }
    &.db-intent-answer{
         background: $border-color;
         border: none;
         color: #665a4b;
    &:hover{
         color:white;
         background:#888;
     }
    &:active{
         color:$color-point-y;
     }
    }
    }
    .slick-prev:before, .slick-next:before {
        font-size: 25px;
        opacity: 1;
    }
    .slick-next {
        right: -42px;
    }
    .slick-prev {
        left: -42px;
    }

    .chbotanswer
    .chbotanswerpopup {
        background: #fff;
        text-align: center;
        padding: 5px;
        margin-top: 4px;
        color: $color-point-y;
        cursor: pointer;
    }
    .chbotanswerpopup:hover{
        background: $color-point-y;
        font-weight:bold;
    }
    .chbotanswerpopup:active{
        background: #c4c3c3;
        font-weight:bold;
    }
    .intentanswer{
        position: relative;
        margin-top: 3px;
        padding: 4px 12px 4px 12px;
        border: 1px solid #888;
        background: #665a4b;
        font-size: 17px;
        font-weight: 100;
        color: white;
        cursor: pointer;
        text-align: center;
        line-height: 1.2;
        border-radius: 0;
    }
    .intentanswer:hover{
    // background: #d4d3d3;
    // font-weight:bold;
        background: #f8ac59;
        color: white;

    }
    .intentanswer:active{
        background: #c4c3c3;
        font-weight:bold;
    }
    #chattingPanel {
        position: relative;
    .test-refresh {
        position: sticky;
        left: 12px;
        top: 0;
        color: #f8ac59;
        font-size: 20px;
    }
    }
    .dInputWrapper {
        background:#fff;
        padding: 2%;
        font-size: 16px;
    input{
        width: 75%;
        border-top: none;
        border-left: none;
        border-right: none;
        padding: 10px 20px;
    }
    .sendBtn{
        padding: 8px 6px;
        border-radius: 40px;
        width: 20%;
        color: white;
        background: gray;
        border: none;
    &:active,&:focus{
                  background: darkgray;
              }
    }
    }
    .dorothyContent{
        box-shadow: 0 0 2px rgba(128, 179, 235, 0.5), inset 0 0 0 1px rgba(0, 0, 0, 0.05);
        border:2px solid #bbb;
    }
    .agile__arrow{
        background: none;
    }
    .agile__dot {
        margin: 0 3px;
    }
    .agile__arrow svg {
        fill: #665a4b;
    }
    .agile__dot--current button, .agile__dot:hover button {
        background-color: #665a4b;
    }
    .dorothyBtn {
    .notice {
        position:absolute;
        top:10px;
        right:100px;
        width:310px;
        background:#514d4c;
        color:#fff;
        font-size:14px;
        font-weight:400;
        padding:10px 15px;
        border-radius:8px;
    }
    .tail {
        position: absolute;
        right: 10px;
        bottom:-8px;
    }
    }

    @media (max-width: 617px) {
    // .chat-discussion {
    //     height: 300px;
    //     width: 250px;
    // }
    // .dorothyContent {
       //     width: 250px;
       // }
        #ChatBtn {
            right:20px;
            bottom:20px;
            z-index:9999;
        .dorothyBtn {
        .notice {
            width:210px;
            top:-10px;
            right:70px;
        }
    >img {
         width:75%;
     }
    }
    }
    .dorothyContent {
        position: fixed;
        top:60px;
        left:0;
        right:0;
    // bottom:127px;
        border:none;
    }
    #chattingPanel {
        width:100%;
    }
    .chat-message {
    // display:inline-block;
    }
    .chat-message.right {
    // float:right;
    }
    .dInputWrapper {
        position:relative;
        top:-1px;
        background:#fff;
        border-bottom:1px solid #bbb;
        box-shadow:0 2px 4px rgba(0,0,0,.12);
    }
    }
</style>