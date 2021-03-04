// ==UserScript==
// @name                NGA Redirector
// @name:en-US          NGA Redirector
// @name:zh-CN          NGA 重定向
// @description         Auto redirect NGA domains to bbs.nga.cn
// @description:en-US   Auto redirect NGA domains to bbs.nga.cn
// @description:zh-CN   自动重定向 NGA 域名到 bbs.nga.cn
// @namespace           nga-redirector
// @version             2020.10.15
// @author              Akatsuki Rui
// @license             MIT License
// @run-at              document-start
// @match               *://nga.178.com/*
// @match               *://ngabbs.com/*
// @match               *://ngacn.cc/*
// ==/UserScript==

"use strict";

window.location.replace(location.href.replace(location.hostname, "bbs.nga.cn"));
