(this.webpackJsonpcredence=this.webpackJsonpcredence||[]).push([[2],{31:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var r,c=n(2),a=n.n(c),s=n(23),i=n.n(s),o=(n(31),n(6)),u=n.n(o),l=n(13),d=n(14),b=n(5);!function(e){e[e.HOME=0]="HOME",e[e.LOBBY=1]="LOBBY",e[e.GAME=2]="GAME"}(r||(r={}));var j,f=function(e,t){switch(t.type){case"SET_SELF":return Object(b.a)(Object(b.a)({},e),{},{self:t.self});case"SET_SCREEN":return Object(b.a)(Object(b.a)({},e),{},{screenState:t.state});case"SET_GAME":return Object(b.a)(Object(b.a)({},e),{},{currentGame:t.game});default:return console.warn("reducer fallthrough"),e}},h=n(1),p=function(e){var t=e.state,n=e.dispatch,r=e.beginSubscription,a=Object(c.useState)(""),s=Object(d.a)(a,2),i=s[0],o=s[1],u=Object(c.useCallback)((function(e){n({type:"SET_SELF",self:Object(b.a)(Object(b.a)({},t.self),{},{userName:e.target.value})})}),[n,t]);return Object(h.jsxs)("div",{children:[Object(h.jsx)("h1",{children:"Credence Calibration"}),""===t.self.uid?"waiting for firebase...":Object(h.jsxs)("div",{children:[Object(h.jsx)("div",{children:Object(h.jsxs)("label",{children:["My username"," ",Object(h.jsx)("input",{type:"text",placeholder:"username",maxLength:30,value:t.self.userName,onChange:u})]})}),Object(h.jsxs)("div",{style:{padding:"1em"},children:[Object(h.jsxs)("label",{children:["game code"," ",Object(h.jsx)("input",{type:"text",value:i,onChange:function(e){return o(e.target.value)},maxLength:20,placeholder:"game code"})]}),Object(h.jsx)("button",{onClick:function(){return r(i)},disabled:""===t.self.userName||""===i,children:"Join Game"})]}),Object(h.jsx)("div",{style:{padding:"1em"},children:Object(h.jsx)("button",{onClick:function(){return r()},disabled:""===t.self.userName,children:"Create Game"})})]})]})},O=n(11),m=n(9),x=n(12),g=(n(35),n(38),JSON.parse(null!==(j='{"apiKey": "AIzaSyBBQZhD4Vp64zQuTz_0Lmx2qDiHwuXi-1s", "authDomain": "credence-calibration.firebaseapp.com","projectId": "credence-calibration","storageBucket": "credence-calibration.appspot.com","messagingSenderId": "1094450646130","appId": "1:1094450646130:web:af290142f6c0aab67586eb","measurementId": "G-JTMNZPM222"}')?j:"{}")),v=x.a.initializeApp(g),w=x.a.auth(),y=x.a.firestore(),S=x.a.firestore;w.signInAnonymously().catch((function(e){return console.log(e)}));var E=function(){var e=Object(l.a)(u.a.mark((function e(t,n,r){var c,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.collection("members").get();case 2:return c=e.sent,a={questionIdx:n,answer:"mcq"===r.solution.type?0:(r.solution.range[0]+r.solution.range[1])/2,confidence:.7},e.next=6,c.forEach(function(){var e=Object(l.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.ref;case 2:return n=e.sent,e.next=5,n.update({answers:S.FieldValue.arrayUnion(a)});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 6:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),k=function(e,t){var n=t.answers[t.answers.length-1];return 100*(n.answer===e.solution.answer?Math.log2(n.confidence/.5):Math.max(Math.log2((1-n.confidence)/.5),-50))},C=function(){var e=Object(l.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.collection("members").get();case 2:return n=e.sent,e.next=5,n.forEach(function(){var e=Object(l.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.ref;case 2:return n=e.sent,e.next=5,n.update({score:0});case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),T=function(){var e=Object(l.a)(u.a.mark((function e(t,n){var r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.collection("members").get();case 2:return r=e.sent,e.next=5,r.forEach(function(){var e=Object(l.a)(u.a.mark((function e(t){var r,c,a,s;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.ref;case 2:return r=e.sent,c=t.data(),a=c.answers[c.answers.length-1],s=n.questions[a.questionIdx],e.next=8,r.update({score:S.FieldValue.increment(k(s,c))});case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),M=function(){var e=Object(l.a)(u.a.mark((function e(t,n){var r,c,a,s,i,o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.get();case 2:if(r=e.sent.data(),c=r.state,a=c.showingScoreboard&&c.currentQuestionIdx===c.questions.length-1,s=1===c.currentTime?!c.showingScoreboard:c.showingScoreboard,i=1===c.currentTime&&c.showingScoreboard,o=i?Math.min(c.currentQuestionIdx+1,c.questions.length-1):c.currentQuestionIdx,!s||1!==c.currentTime){e.next=11;break}return e.next=11,T(t,c);case 11:if(!i){e.next=14;break}return e.next=14,E(t,o,c.questions[o]);case 14:if(!a||1!==c.currentTime){e.next=20;break}return clearInterval(n),e.next=18,t.update({state:{type:"lobby"}});case 18:e.next=22;break;case 20:return e.next=22,t.update({"state.currentTime":1===c.currentTime?r.timeAllotted:S.FieldValue.increment(-1),"state.showingScoreboard":s,"state.gameOver":a,"state.currentQuestionIdx":o});case 22:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),q=function(e){var t=e.state,n=e.dispatch,a=e.startGame,s=Object(m.b)().collection("games").doc(t.currentGame),i=s.collection("members"),o=Object(m.d)(s),u=o.status,l=o.data,d=Object(m.c)(i),b=d.status,j=d.data;Object(c.useEffect)((function(){l&&"play"===l.state.type&&n({type:"SET_SCREEN",state:r.GAME})}),[l,n]);var f=Object(c.useCallback)((function(){C(s)}),[s]);if("success"!==u||"success"!==b)return Object(h.jsx)("div",{children:"loading..."});var p=l.admin===t.self.uid;return Object(h.jsxs)("div",{children:[Object(h.jsx)("h1",{children:"Lobby"}),Object(h.jsxs)("h2",{children:["code ",l.code]}),Object(h.jsxs)("h2",{children:["there will be ",l.numQuestions," questions with ",l.timeAllotted," ","seconds per question"]}),p&&Object(h.jsx)("button",{onClick:a,children:"start game"}),p&&Object(h.jsx)("button",{onClick:f,children:"reset scores"}),Object(h.jsx)("div",{children:j.map((function(e){return Object(h.jsxs)("div",{style:{backgroundColor:e.isAdmin?"#ffe70b7f":"rgba(0,0,0,0)"},children:[e.name," (score: ",e.score,")"]},e.uid)}))})]})},I=n(16),A=function(e){var t=e.question,n=e.memberRef,r=Object(m.d)(n),a=r.data,s=r.status,i=Object(c.useCallback)((function(e){var t=Object(I.a)(a.answers);t[t.length-1]=Object(b.a)(Object(b.a)({},t[t.length-1]),{},{answer:parseInt(e.target.value,10)}),n.update({answers:t})}),[n,a]),o=Object(c.useCallback)((function(e){var t=Object(I.a)(a.answers);t[t.length-1]=Object(b.a)(Object(b.a)({},t[t.length-1]),{},{confidence:parseFloat(e.target.value)}),n.update({answers:t})}),[n,a]),u=Object(c.useState)("mcq"===t.solution.type?Object(O.shuffle)(t.solution.options.map((function(e,t){return{s:e,i:t}}))):[]),l=Object(d.a)(u,2),j=l[0];l[1];if("success"!==s||a.answers.length<1)return Object(h.jsx)("div",{children:"loading..."});var f=a.answers[a.answers.length-1];return Object(h.jsxs)("div",{children:[Object(h.jsx)("div",{children:j.map((function(e){var t=e.s,n=e.i;return Object(h.jsx)("div",{children:Object(h.jsxs)("label",{style:{width:"100%"},children:[Object(h.jsx)("input",{type:"radio",value:n,checked:f.answer===n,onChange:i})," ",t]})},t+n)}))}),Object(h.jsxs)("div",{children:["your confidence: ",Math.round(100*f.confidence),"%"]}),Object(h.jsxs)("label",{children:["50%",Object(h.jsx)("input",{type:"range",min:.5,max:1,step:.05,value:f.confidence,onChange:o})," ","100%"]})]})},G=function(e){var t=e.question,n=e.memberRef,r=Object(m.d)(n),a=r.data,s=r.status,i=Object(c.useCallback)((function(e){var t=Object(I.a)(a.answers);t[t.length-1]=Object(b.a)(Object(b.a)({},t[t.length-1]),{},{answer:parseInt(e.target.value,10)}),n.update({answers:t})}),[n,a]),o=Object(c.useCallback)((function(e){var t=Object(I.a)(a.answers);t[t.length-1]=Object(b.a)(Object(b.a)({},t[t.length-1]),{},{confidence:parseFloat(e.target.value)}),n.update({answers:t})}),[n,a]);if("success"!==s||a.answers.length<1)return Object(h.jsx)("div",{children:"loading..."});if("num"!==t.solution.type)return Object(h.jsx)("div",{children:"error"});var u=a.answers[a.answers.length-1];return Object(h.jsxs)("div",{children:[Object(h.jsxs)("div",{children:["your estimate: ",u.answer.toLocaleString()]}),Object(h.jsxs)("label",{children:[t.solution.range[0].toLocaleString()," ",Object(h.jsx)("input",{type:"range",min:t.solution.range[0],max:t.solution.range[1],value:u.answer,onChange:i})," ",t.solution.range[1].toLocaleString()]}),Object(h.jsxs)("div",{children:["your confidence: ",100*u.confidence,"%"]}),Object(h.jsxs)("label",{children:["50%",Object(h.jsx)("input",{type:"range",min:.5,max:1,step:.05,value:u.confidence,onChange:o})," ","100%"]})]})},B=function(e){var t=e.state,n=e.dispatch,a=Object(m.b)().collection("games").doc(t.currentGame),s=a.collection("members"),i=s.doc(t.self.uid),o=Object(m.d)(a),u=o.status,l=o.data,d=Object(m.c)(s),b=d.status,j=d.data;if(Object(c.useEffect)((function(){"lobby"===l.state.type&&n({type:"SET_SCREEN",state:r.LOBBY})}),[l,n]),"success"!==u||"success"!==b)return Object(h.jsx)("div",{children:"loading..."});if("play"!==l.state.type)return Object(h.jsx)("div",{});var f=l.state,p=f.questions[f.currentQuestionIdx],x=Object(O.orderBy)(j,"score","desc");return f.showingScoreboard||f.gameOver?Object(h.jsxs)("div",{children:[f.gameOver&&Object(h.jsxs)("h1",{children:["Game Over, ",x[0].name," wins"]}),Object(h.jsx)("h1",{children:"Scoreboard"}),Object(h.jsxs)("h2",{children:["correct answer was"," ","mcq"===p.solution.type?p.solution.options[p.solution.answer]:p.solution.answer]}),Object(h.jsxs)("h2",{children:[f.currentTime," sec"]}),x.map((function(e){return Object(h.jsxs)("div",{style:{margin:"1em"},children:[Object(h.jsx)("span",{style:{fontWeight:e.uid===t.self.uid?"bold":"normal"},children:e.name}),": ",Math.round(e.score)," ",Object(h.jsxs)("span",{style:{color:k(p,e)>0?"rgb(159, 255, 159)":"#ff8856"},children:["(",k(p,e)>0&&"+",Math.round(k(p,e)),")"]})]},e.uid)}))]}):Object(h.jsxs)("div",{children:[Object(h.jsx)("h1",{children:p.prompt}),Object(h.jsxs)("h2",{children:[f.currentTime," sec"]}),"num"===p.solution.type?Object(h.jsx)(G,{memberRef:i,question:p}):Object(h.jsx)(A,{memberRef:i,question:p})]})},L=n(24),N=n(25),F=function(){var e=Object(O.shuffle)(L),t=Object(d.a)(e,2),n=t[0],r=t[1];return{prompt:"Which population is larger?",solution:{type:"mcq",options:[n.country,r.country],answer:n.population>r.population?0:1}}},_=function(){var e=Object(O.shuffle)(N),t=Object(d.a)(e,2),n=t[0],r=t[1];return{prompt:"Which country's area is larger?",solution:{type:"mcq",options:[n.country,r.country],answer:n.area>r.area?0:1}}},Q=function(){return Object(O.shuffle)([_,F])[0]()};var R=function(){var e=Object(c.useReducer)(f,{self:{userName:"",uid:""},screenState:r.HOME,currentGame:""}),t=Object(d.a)(e,2),n=t[0],a=t[1],s=Object(c.useRef)();Object(c.useEffect)((function(){w.onAuthStateChanged((function(e){e?(a({type:"SET_SELF",self:{userName:"",uid:e.uid}}),console.log("signed in as ".concat(e.uid))):console.error("user signed out")}))}),[]);var i=Object(c.useCallback)((function(e){Object(l.a)(u.a.mark((function t(){var c,s,i,o,l,d;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e){t.next=16;break}return c=y.collection("games").doc(e),t.next=4,c.get();case 4:if(!t.sent.exists){t.next=13;break}return s={uid:n.self.uid,name:n.self.userName,isAdmin:!1,isSpectator:!1,score:0,answers:[]},t.next=9,c.collection("members").doc(s.uid).set(s);case 9:a({type:"SET_GAME",game:e}),a({type:"SET_SCREEN",state:r.LOBBY}),t.next=14;break;case 13:alert("game doesn't exist");case 14:t.next=26;break;case 16:return i=Object(O.times)(5,(function(){return Object(O.random)(35).toString(36)})).join(""),o={code:i,admin:n.self.uid,timeAllotted:10,numQuestions:8,state:{type:"lobby"}},l={uid:n.self.uid,name:n.self.userName,isAdmin:!0,isSpectator:!1,answers:[],score:0},d=y.collection("games").doc(i),t.next=22,d.set(o);case 22:return t.next=24,d.collection("members").doc(l.uid).set(l);case 24:a({type:"SET_GAME",game:i}),a({type:"SET_SCREEN",state:r.LOBBY});case 26:case"end":return t.stop()}}),t)})))()}),[n,a]),o=Object(c.useCallback)((function(){var e=y.collection("games").doc(n.currentGame);M(e,s.current)}),[s,n]),b=Object(c.useCallback)((function(){Object(l.a)(u.a.mark((function e(){var t,r,c,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=y.collection("games").doc(n.currentGame),e.next=3,t.get();case 3:return r=e.sent.data(),c={type:"play",currentQuestionIdx:0,currentTime:r.timeAllotted,questions:Object(O.shuffle)(Object(O.times)(r.numQuestions,Q)),showingScoreboard:!1,gameOver:!1},e.next=7,t.update({state:c});case 7:return e.next=9,E(t,0,c.questions[0]);case 9:a=setInterval(o,1e3),s.current=a;case 11:case"end":return e.stop()}}),e)})))()}),[n,o]);return Object(h.jsx)("div",{children:n.screenState===r.HOME?Object(h.jsx)(p,{state:n,dispatch:a,beginSubscription:i}):n.screenState===r.LOBBY?Object(h.jsx)(q,{state:n,startGame:b,dispatch:a}):n.screenState===r.GAME?Object(h.jsx)(B,{state:n,dispatch:a}):Object(h.jsx)("div",{})})},Y=function(e){e&&e instanceof Function&&n.e(11).then(n.bind(null,44)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),r(e),c(e),a(e),s(e)}))};i.a.render(Object(h.jsx)(a.a.StrictMode,{children:Object(h.jsx)(m.a,{firebaseApp:v,children:Object(h.jsx)(R,{})})}),document.getElementById("root")),Y()}},[[37,3,4]]]);
//# sourceMappingURL=main.c795550c.chunk.js.map