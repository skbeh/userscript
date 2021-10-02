// ==UserScript==
// @name                bilibili Danmaku Disabler
// @name:en-US          bilibili Danmaku Disabler
// @name:zh-CN          bilibili 弹幕关闭
// @name:zh-TW          bilibili 彈幕關閉
// @description         Automatically turn off bilibili HTML5 player danmaku
// @description:en-US   Automatically turn off bilibili HTML5 player danmaku
// @description:zh-CN   自动关闭哔哩哔哩 HTML5 播放器弹幕
// @description:zh-TW   自動關閉嗶哩嗶哩 HTML5 播放器彈幕
// @namespace           bilibili-danmaku-disabler
// @version             2021.10.02
// @author              Akatsuki Rui
// @license             MIT License
// @grant               GM_info
// @compatible          chrome  Since Chrome 26
// @compatible          firefox Since Firefox 14
// @compatible          opera Since 15
// @run-at              document-idle
// @match               *://www.bilibili.com/*video/*
// @match               *://www.bilibili.com/bangumi/play/*
// @match               *://www.bilibili.com/blackboard/*
// @match               *://www.bilibili.com/html/player.html*
// @match               *://player.bilibili.com/*
// ==/UserScript==

"use strict";

const SELECTOR_NATIVE = {
  on: "input:checked[class='bui-switch-input']",
  off: "input:not(:checked)[class='bui-switch-input']",
};

const SELECTOR_EMBED = {
  on: "div[class~='bilibili-player-video-btn-danmaku'][data-text='打开弹幕']",
  off: "div[class~='bilibili-player-video-btn-danmaku'][data-text='关闭弹幕']",
};

const IS_EMBED = document.location.hostname === "player.bilibili.com";
const SELECTOR = IS_EMBED ? SELECTOR_EMBED : SELECTOR_NATIVE;

// Disable danmaku
function disableDanmaku() {
  const button = document.querySelector(SELECTOR.on);

  if (button) button.click();
  setTimeout(() => {
    if (document.querySelector(SELECTOR.off) === null) disableDanmaku();
  }, 500);
}

// Disable danmaku with PJAX detector
function disableDanmakuPJAX() {
  const obServer = new MutationObserver(disableDanmaku);
  const obTarget = document.getElementById("bilibili-player");
  const obOption = { childList: true };

  disableDanmaku();
  obServer.observe(obTarget, obOption);
}

// Redirect `bilibili.com/s/video/*` to `bilibili.com/video/*`
if (location.href.includes("/s/video/"))
  location.replace(location.href.replace("/s/video/", "/video/"));

// Run disabler
IS_EMBED ? disableDanmaku() : disableDanmakuPJAX();
