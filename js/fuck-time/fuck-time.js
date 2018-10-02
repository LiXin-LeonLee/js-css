// ==UserScript==
// @name         Fuck Time
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  save time of your life
// @author       Leon Lee
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js

// @match        *://sports.qq.com/nba/*
// @match        *://nba.stats.qq.com/*
// @match        *://weibo.com/*
// @match        *://nba.tmiaoo.com/*
// @match        *://www.nba98.com/*
// @match        *://www.ithome.com/*
// @match        *://bbs.smartisan.com/*
// @match        *://www.pornhub.com/*
// @match        *://pan.baidu.com/play/video*
// @match        file:///E:/Web%20Server/f12.html

// @grant        window.close
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
    /* jshint esnext: false */
    /* jshint esversion: 6 */

    // Your code here...


// 获取域名
function getDomain() {
    var domain;
    domain = location.hostname; // 获取主机域名
    return domain;
}

// 获取网址类别
function getClassOfDomain(domain) {
    var domainClassList, domainClass;
    domainClassList = {
        useless: ["sports.qq.com", "nba.stats.qq.com", 'www.ithome.com', 'www.smartisan.com', 'bbs.smartisan.com'],
        porn: ["www.pornhub.com"],
        vedio: ["pan.baidu.com"]
    };
    // 遍历操作，如果不存在则标记为 others
    // domainClass = "useless"; // test
    for (domainClass in domainClassList) {
        if (domainClassList[domainClass].indexOf(domain) !== -1) {
            return domainClass;
        }
    }
    return "others";
}

// 选择执行何种操作
function chooseToDo() {
    var domain, domainClass;
    domain = getDomain();
    domainClass = getClassOfDomain(domain);
    console.log(domainClass);

    // 根据类别执行对应操作
    switch (domainClass) {
        case "useless":
            handleTheUseless(domain);
            break;
        case "porn":
            handleThePorn(domain);
            break;
        case 'vedio':
            handleTheVedio(domain);
            break;
        default:
            handleTheOther(domain);
    }
    console.log("Fuck OK");
}

// 具体操作
function handleTheUseless(domain) {
    // alert("小子，你正在看的" + domain + "是无用网站");

    // 直接关闭
    document.body.innerHTML = '<div style="font-size:100px; text-align:center">block</div>';
}

function handleThePorn(domain) {
    alert("小子，你正在看的" + domain + "是色情网站");
}

const handleTheVedio = (domain) => {
    showPromptWindow('视频网站', '小子最多看 20 分钟', '20');
    createCountdownPane();
};

function handleTheOther(domain){
    // alert("others");
    showPromptWindow("无用网站","prompt","3");
    createCountdownPane();
}

// 模态弹窗，包含：标题、警醒说明、各类操作类型（关闭、浏览3分钟、学习访问）
function showPromptWindow(header, words, typeOfHandler) {
    var windowDOM, styleElement, scriptElement;
    windowDOM = createPromptWindow(header, words, typeOfHandler);
    styleElement = createStyleElement(typeOfHandler);
    scriptElement = createScriptElement();

    document.body.appendChild(windowDOM);
    // 添加样式节点
    document.head.appendChild(styleElement);
    // 添加脚本节点
    document.body.appendChild(scriptElement);
}

function createPromptWindow(header, words, typeOfHandler) {
    var windowDOM, pane, headerPane, wordsPane;

    // 最外层面板，包含模态效果
    windowDOM = document.createElement("div");
    windowDOM.id = "fuckTimeModal";

    // // 提示面板
    // pane = document.createElement("div");
    // pane.className = "fuck-time-pane center";
    // windowDOM.appendChild(pane);
    //
    // // 标题
    // headerPane = document.createElement("div");

    windowDOM.innerHTML = `
        <div class="fuck-time-pane center">
            <div class="fuck-time-header-pane">
                <h1>` + header + `</h1>
            </div>
            <div class="fuck-time-words=pane">
                <p>` + words + `</p>
            </div>
            <div class="fuck-time-button-pane">
                <button type="primary" onclick="clickCloseButton();">关闭</button>
                <button onclick="clickTemporaryButton(${Number(typeOfHandler)});">浏览 ${typeOfHandler} 分钟</button>
                <button onclick="clickLearningButton();">学习需要浏览</button>
            </div>
        </div>
    `;
    return windowDOM;
}

function createStyleElement(typeOfHandler) {
    var styleElement = document.createElement("style");
    styleElement.type = "text/css";
    styleElement.innerHTML = `
        div#fuckTimeModal {
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 10000;
        }
        .fuck-time-pane {
            height: 400px;
            width: 600px;
            padding: 15px;            
            background-color: #f7f7f7;
            text-align: center;
        }
        .fuck-time-header-pane {

        }
        .fuck-time-words-pane {

        }
        .fuck-time-button-pane {

        }
        .fuck-time-button {

        }
        .center {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
        }
        .hide {
            display: none;
        }
        #fuckTimeCountdownPane {
            position: fixed;
            bottom: 10px;
            right: 20px;
            height: 30px;
            width: 120px;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 10000;
        }
    `;
    return styleElement;
}

function createScriptElement() {
    var scriptElement = document.createElement("script");
    scriptElement.type = "text/javascript";
    scriptElement.innerHTML = `
        // 按钮对应执行函数
        function clickCloseButton() {
            document.body.innerHTML = '<div \style="font-size:100px; text-align:center">block</div>';
        }

        function clickTemporaryButton(min = 3) {
            // 显示倒计时
            showTheCountdownPane(min);

            // 关闭面板
            hidePromptWindow();

            // min 分钟后关闭
            setTimeout(clickCloseButton, min*60000);
        }

        function clickLearningButton() {
            // 显示已用时长
        }

        // 隐藏主面板
        function hidePromptWindow() {
            var promptWindowDOM = document.getElementById("fuckTimeModal");
            promptWindowDOM.classList.add("hide");
        }

        // 显示倒计时面板，并初始化时间
        function showTheCountdownPane(min) {
            var countdownDOM, cdList, second;
            countdownDOM = document.getElementById("fuckTimeCountdownPane");
            countdownDOM.classList.remove("hide");
            cdList = countdownDOM.children;
            second = min * 60;

            // 初始化时间，开始倒计时
            setInterval(function() {
                var formatTime = formatSeconds(second);
                cdList[1].innerHTML = formatTime.day + "天 ";
                cdList[2].innerHTML = formatTime.hour + ":";
                cdList[3].innerHTML = formatTime.minute + ":";
                cdList[4].innerHTML = formatTime.second;
                second -= 1;
            }, 1000);
        }

        // 将一个t秒级的转换为一个“x天x时x分x秒”格式
        function formatSeconds(t) {
            var day, d, hour, h, minute, m, second, s;
            s = t;
            second = s % 60;
            m = Math.floor(s / 60);
            minute = m % 60;
            h = Math.floor(m / 60);
            hour = h % 24;
            d = Math.floor(h / 24);
            day = d;
            return {day: day, hour: hour, minute: minute, second: second};
        }
    `;
    return scriptElement;
}

// 创建倒计时面板，开始时隐藏
function createCountdownPane() {
    var countdownDOM;

    countdownDOM = document.createElement("div");
    countdownDOM.id = "fuckTimeCountdownPane";
    countdownDOM.className = "hide";

    countdownDOM.innerHTML = `
        <span>你还可以浏览: </span>
        <span class="hide"></span>
        <span class="hide"></span>
        <span></span>
        <span></span>
    `;
    console.log("createCountdownPane OK");
    document.body.appendChild(countdownDOM);
}

// 执行入口
chooseToDo();

/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */
