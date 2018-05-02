<template>
<div id='chatBody' class="dorothyContent">
    <div class="dContentWrapper">
        <!-- <span v-show="chatList.length > 0" id="clearChatBtn" @click="clearChatMsg()" class="test-refresh db-mouse-over" tooltip="초기화" tooltip-placement="right"><i class="fa fa-refresh"></i></span> -->
        <div class="mobile-header">
            <div class="pull-left">
                <div class="profile-wrapper">
                    <img :src="currentChatbot.chatbotImg" alt="챗봇 이미지">
                </div>
                <span>{{ currentChatbot.chatbotName }}</span>
            </div>
            <button @click="close()">
                <i class="fa fa-times" aria-hidden="true"></i>
            </button>
        </div>
        <div id="chattingPanel"  class="chat-discussion">
            <div v-for="(chat, index) in chatList" :key="chat.index">

                <div v-if="chat.type=='question'" class="chat-message right">
                    <img class="message-avatar img-circle" src="//danbee.ai/chatflow/resources/images/users/user.jpg" alt="사용자 이미지">
                    <div class="message">
                        <div>
                            <!-- <span class="message-author"><b>사용자</b></span> -->
                            <span class="message-date">{{chat.timestamp}}</span>
                        </div>
                        <span class="message-content" v-html="chat.sentence"> {{chat.sentence}} </span>
                    </div>
                </div>

                <div v-else-if="chat.type=='answer'" class="chat-message left" >
                    <div class="profile-wrapper">
                        <img class="message-avatar img-circle" :src="currentChatbot.chatbotImg" alt="챗봇 이미지">
                    </div>
                    <div class="message">                                        
                        <span class="message-date">{{chat.timestamp}}</span>
                        <div>
                            <span class="message-author">{{ currentChatbot.chatbotName }}</span>
                            <!-- <span v-show="currentChatbot.chatbotName.length <= 5" style="font-size:10px; text-align:right">{{chat.timestamp}}</span>
                            <div v-show="currentChatbot.chatbotName.length > 5" style="font-size:10px; text-align:right">{{chat.timestamp}}</div> -->
                        </div>
                        <div v-if="chat.nodeType == 'carousel'">
                            <div class="message-content" v-html="chat.sentence"> {{chat.sentence}} </div>
                            <!--<agile ref="slick" :id="'carousel_' + index" init-onload=true infinite='true' speed='500' fade='true' cssEase='linear' adaptiveHeight='true'>-->
                            <agile ref="slick" :id="'carousel_' + index">
                                <div v-for="carousel in chat.carouselList" :key="carousel.index">
                                    <div>
                                        <span class="db-carousel-title">{{carousel.cardTitle || ''}}</span>
                                        <div class="img-container">
                                            <img :src="carousel.imgRoute" width="100%">
                                        </div>
                                        <div v-if="carousel.imgRoute == '' && carousel.cardTitle" style="height:30px"></div>
                                        <div class="db-carousel-desc">{{carousel.subCardTitle || ''}}</div>
                                        <div v-for="option in carousel.optionList" :key="option.id">
                                            <div @click="optionClick(option)"  class="todo-list small-list db-chatbot-answer" :class="{'db-link-btn':(option.type != 'btn')}">
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
                                    </div>
                                </div>
                            </agile>
                        </div>
                        <div v-if="chat.nodeType == undefined || chat.nodeType != 'carousel'">
                            <div v-if="chat.nodeType == 'one_carousel'">
                                <span class="db-carousel-title">{{chat.cardTitle || ''}}</span>
                                <div class="img-container">
                                    <img :src="chat.imgRoute" width="100%">
                                </div>
                                <div v-if="chat.imgRoute == '' && chat.cardTitle" style="height:30px"></div>
                                <div class="db-carousel-desc">{{chat.subCardTitle || ''}}</div>
                            </div>
                            <div v-if="chat.nodeType != 'one_carousel'" >            
                                <div v-show="chat.imgRoute != undefined && chat.imgRoute != ''">
                                    <img width='100%' :src="chat.imgRoute"/>
                                </div>
                            </div>
                            <div class="message-content" v-html="chat.sentence"> {{chat.sentence}} </div>
                            <div v-for="option in chat.optionList" :key="option.id">
                                <div @click="optionClick(option)"  class="todo-list small-list db-chatbot-answer" :class="{'db-link-btn':(option.type != 'btn')}">
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
                    <div class="profile-wrapper"></div>
                        <img class="message-avatar img-circle" :src="currentChatbot.chatbotImg" alt="챗봇 이미지">
                    <div class="message">
                        <span class="message-date">{{chat.timestamp}}</span>
                        <span class="message-author">{{ currentChatbot.chatbotName }}</span>
                        <!-- <span v-show="currentChatbot.chatbotName.length <= 5" style="font-size:10px; text-align:right">{{chat.timestamp}}</span>
                        <div v-show="currentChatbot.chatbotName.length > 5" style="font-size:10px; text-align:right">{{chat.timestamp}}</div> -->
                        <span class="message-content" v-html="chat.sentence"> {{chat.sentence}} </span>
                        <div v-for="intent in chat.intentList" :key="intent.id">
                            <div class="todo-list small-list ui-sortable db-chatbot-answer db-intent-answer" @click="intentClick(intent)">
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
        <button class="animated sendBtn" @click="sendMessage('','')">
            <img src="/img/chatBtn/icon_send.png" />
        </button>
    </div>
</div>
</template>

<script>
    import moment from 'moment'
    import _ from 'lodash'

    export default {
        name: 'chatBody',
        data() {
            return {
                inputMessage: '',
                serviceNames: serviceNames || 'danbee.Ai',
                isContentOpen: true,
                currentChatbot:{
                    chatbotImg : chatbotImg || "https://github.com/danbeeai/chat-example/blob/master/img/chatBtn/danbee_dew.png?raw=true",
                    chatbotName : chatbotName || '단비',
                    chatbotId : chatbotId || '5bbd93a3-00be-4054-b79a-03c4c50424bc'//심심풀이//'4aaf8bee-d4b3-4cf4-959f-3f7e611a4a32'//회귀검증// '5bbd93a3-00be-4054-b79a-03c4c50424bc' //도로시// 'f9fd0b53-a29b-415c-90c4-b8b88c0bd75c' // 심리테스트
                },
                currentUser:{
                    userName : 'Landing Page'
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
                // reqInput.timestamp = moment().format('YYYY-MM-DD, h:mm:ss a');
                reqInput.timestamp = moment().format('a h:mm');

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
                    this.selectableResult.type = 'btn';
                    carouselList.forEach((carousel)=>{
                        this.selectableResult.list = this.selectableResult.list.concat(carousel.optionList);
                    });

                    resultchatDetail.type = "answer";            
                    resultchatDetail.sentence = message;
                    resultchatDetail.timestamp = moment().format('a h:mm');
                    
                    if(carouselList.length == 1){
                        resultchatDetail.nodeType = 'one_carousel';    
                        resultchatDetail.cardTitle = carouselList[0].cardTitle;
                        resultchatDetail.subCardTitle = carouselList[0].subCardTitle;
                        resultchatDetail.imgRoute = carouselList[0].imgRoute;
                        resultchatDetail.optionList = carouselList[0].optionList;
                    }else{
                        resultchatDetail.nodeType = 'carousel';
                        resultchatDetail.carouselList = carouselList;
                    }
                    
                }else{
                    resultchatDetail.type = "answer";
                    resultchatDetail.sentence = message;
                    resultchatDetail.imgRoute = imgRoute;
                    resultchatDetail.optionList = optionList;
                    
                    resultchatDetail.timestamp = moment().format('a h:mm');
                    // resultchatDetail.timestamp = moment().format('YYYY-MM-DD, h:mm:ss a');

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
            close: function(){
                window.close();
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
    $border-color:#999;

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
    .chat-view .ibox-content {
        padding:0;
    }
    .chat-users {
        overflow-y: auto;
        height: 400px;
    }
    .chat-message-form .form-group {
        margin-bottom: 0;
    } 
    .slick-prev:before, .slick-next:before {
        font-size:25px;
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
        background: #f8ac59;
        color: white;

    }
    .intentanswer:active{
        background: #c4c3c3;
        font-weight:bold;
    }
    .agile {
        .db-carousel-title {
            display:block;
        }
        img {
            display:block;
            min-width:200px;
        }
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

/*-- style 변경 --*/

.dorothyContent{
    background-color:#f0f2f3;
    padding:0;
    box-shadow:0 4px 15px rgba(0, 0, 0, 0.15);
    border:1px solid #ccc;
    font-size:13px;
    letter-spacing:-0.02em;
    .mobile-header {
        display:none;
    }
    .chat-discussion {
        background-color:#e2e4e5;
        background-image:url("../img/chatBtn/bg_chat.png");
        background-repeat:repeat-y;
        padding:10px;
        height:500px;
        overflow-y:auto;
        width:400px;
        &::-webkit-scrollbar {
            width: 5px;
            height: 5px;
        }
        &::-webkit-scrollbar-track {
            background-color: #ddd;
        }
        &::-webkit-scrollbar-thumb {
            background-color:#aaa;
            &:hover {
                background-color: #888;
            }
        }
        .test-refresh {
            position: sticky;
            left: 12px;
            top: 0;
            color: #f8ac59;
            font-size: 20px;
        }
        > div:last-child {
            .left {
                .message {
                    border-radius:0 16px 16px 16px;
                }
            }
            .right {
                    border-radius:16px 0 16px 16px;
            }
        }
        .chat-message {
            padding:0;
            margin-bottom:15px;
            &:after {
                content:"";
                display: block;
                clear:both;
            }
            .message {
                position:relative;
                background-color: #fff;
                border:1px solid #f0f0f0;
                border-radius:16px;
                text-align:left;
                display:block;
                max-width:70%;
                padding:7px 12px;
                box-shadow:0 1px 4px rgba(0,0,0,.12);
                .message-content {
                    word-break:keep-all;
                    white-space:pre-line;
                }
                .message-date {
                    position:absolute;
                    bottom:0;
                    font-size:10px;
                    color:#777;
                    font-family:Arial;
                    letter-spacing:0;
                }
            }
            &.left {
                .profile-wrapper {
                    float:left;
                    width:48px;
                    height:48px;
                    border:none;
                    border-radius:50%;
                    text-align:center;
                    background-color:#fff;
                    box-shadow:0 1px 3px rgba(0,0,0,.5);
                    margin-right:5px;
                    img {
                        height:40px;
                        position:relative;
                        top:50%;
                        margin-top:-20px;
                    }
                }
                .message {
                    float:left;
                    .message-author {
                        display:block;
                        font-weight:bold;
                        margin-bottom:3px;
                        color:$color-point-y-d;
                    }
                    .message-date {
                        right:-42px;
                    }
                    .message-content {
                        margin-bottom:5px;
                    }
                    .img-container {
                        max-height:120px;
                        overflow:hidden;
                        img {
                            max-height:120px;
                            object-fit:contain;
                            object-position:center;
                        }
                    }
                    .chbotanswer,
                    .db-chatbot-answer,
                    .chbotanswerpopup {
                        position:relative;
                        margin-top:3px;
                        padding:3px 12px;
                        border:none;
                        background:$color-point-y;
                        font-size:14px;
                        color:#fff;
                        cursor:pointer;
                        text-align:center;
                        white-space:pre-line;
                        word-break:break-word;
                        border-radius:12px;
                        box-shadow:0 1px 2px rgba(0,0,0,.12);
                        .db-btn-left-side{
                            position: absolute;
                            left: 9px;
                            display: inline-block;
                            top: 50%;
                            margin-top: -10px;
                            opacity:0.8;
                        }
                        &:hover {
                            background:$color-point-y-d;
                            color: white;
                            .db-btn-left-side{
                                opacity:1;
                            }
                            i {
                                color: white;
                            }
                        }
                    }
                    .db-chatbot-answer{
                        i {
                            font-size: 12px;
                            color: white;
                        }
                    }
                }
            }
            &.right {
                .message-avatar {
                    display:none;
                }
                .message {
                    float:right;
                    background:#fb7533;
                    border:none;
                    color:#fff;
                    max-width:86%;
                    .message-date {
                        left:-44px;
                    }
                }
            }
        }
    }
    .dInputWrapper {
        position:relative;
    	width:100%;
        background:#fff;
        padding:5px 10px; 
        font-size: 14px;
        input{
            width:100%;
            border-top: none;
            border-left: none;
            border-right: none;
            padding: 8px 34px 8px 8px;
        }
        .sendBtn{
            position:absolute;
            top:6px;
            right:8px;
            width:34px;
            height:34px;
            border-radius:50%;
            background:transparent;
            border: none;
            -webkit-transition:all 0.4s;
            -moz-transition:all 0.4s;
            -o-transition:all 0.4s;
            transition:all 0.4s;
            &:hover {
                background:rgba(248, 172, 89, 0.2);
            }
            &:active,&:focus{
                background:rgba(248, 172, 89, 0.4);;
            }
        } 
    }
}


/*-- mobile style --*/
#mobileChat {
    height:100%;
    .dorothyContent {
        height:100%;
        min-height:100%;
        border:none;
        box-shadow:none;
        .dContentWrapper {
            height:95%;
            height : unquote("-webkit-calc(100% - 48px)");
            height : unquote("-moz-calc(100% - 48px)");
            height : unquote("calc(100% - 48px)");
            .mobile-header {
                display:block;
                position:fixed;
                top:0;
                left:0;
                right:0;
                height:48px;
                padding:0 0 0 10px;
                background:#fff;
                border-bottom:1px solid #bbb;
                z-index:2000;
                box-shadow:0 1px 3px rgba(0,0,0,.2);
                .pull-left {
                    .profile-wrapper {
                        position:relative;
                        display:inline-block;
                        width:36px;
                        height:36px;
                        border-radius:50%;
                        margin-top:6px;
                        background:#eee;
                        text-align:center;
                        box-shadow:0 2px 5px rgba(0, 0, 0, .4);
                        margin-right:5px;
                        img {
                            position:absolute;
                            border-radius:50%;
                            height:36px;
                            left:50%;
                            margin-left:-18px;
                            top:50%;
                            margin-top:-18px;
                        }
                    }
                    span {
                        position:relative;
                        top:-13px;
                        font-size:16px;
                        font-weight:bold;
                    }
                }
                button {
                    float:right;
                    width:40px;
                    height:40px;
                    margin-top:4px;
                    background:transparent;
                    border:none;
                    font-size:18px;
                    color:#bbb;
                }
                &:after {
                    content:"";
                    display:block;
                    clear:both;
                }
            }
            .chat-discussion {
                width:100%;
                height:100%;
                min-height:100%;
                padding-top:55px;
                background-size:contain;
                .chat-message {
                    &.left {
                        .profile-wrapper {
                            display:none;
                        }
                        .message {
                            max-width:87%;
                            .message-author {
                                display:none;
                            }
                        }
                    }
                }
            }
        }
        .dInputWrapper {
            position:relative;
            top:-1px;
            input {
                font-size:16px;
            }
            border-top:1px solid #eee;
        }
    }
}
</style>