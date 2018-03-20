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
        useless: ["sports.qq.com", "nba.stats.qq.com"],
        porn: ["www.pornhub.com"]
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

    // 根据类别执行对应操作
    switch (domainClass) {
        case "useless":
            handleTheUseless(domain);
            break;
        case "porn":
            handThePorn(domain);
            break;
        default:
            handleTheOther(domain);
    }
    console.log("Fuck OK");
}

// 具体操作
function handleTheUseless(domain) {
    alert("小子，你正在看的" + domain + "是无用网站");
}

function handThePorn(domain) {
    alert("小子，你正在看的" + domain + "是色情网站");
}

function handleTheOther(domain){
    // alert("others");
    showPromptWindow("无用网站","prompt","3");
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
                <button onclick="clickCloseButton();">关闭</button>
                <button onclick="clickTemporaryButton();">浏览 3 分钟</button>
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
            background-color: #f7f7f7;
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
    `;
    return styleElement;
}

function createScriptElement() {
    var scriptElement = document.createElement("script");
    scriptElement.type = "text/javascript";
    scriptElement.innerHTML = `
        // 按钮对应执行函数
        function clickCloseButton() {
            document.body.innerHTML = '<p style="font-size:100px">block</p>';
        }
        function clickTemporaryButton() {
            // 显示倒计时
        }
        function clickLearningButton() {
            // 显示已用时长
        }
    `;
    return scriptElement;
}

// 执行入口
chooseToDo();

/* jshint ignore:start */
]]></>).toString();
var c = Babel.transform(inline_src, { presets: [ "es2015", "es2016" ] });
eval(c.code);
/* jshint ignore:end */
