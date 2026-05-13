/*
 * @Author: Conghao Wong
 * @Date: 2025-12-09 09:50:23
 * @LastEditors: Conghao Wong
 * @LastEditTime: 2025-12-09 10:00:51
 * @Github: https://cocoon2wong.github.io
 * Copyright 2025 Conghao Wong, All Rights Reserved.
 */

(function () {
  var ADDRESS = {
    conghao: { user: "conghaowong", domain: "icloud.com" },
    beihao: { user: "xbh_hust", domain: "hust.edu.cn" },
    ziqian: { user: "ziqianzoulive", domain: "icloud.com" }
  };

  // 查找所有带 data-email-id 的元素
  var nodes = document.querySelectorAll("[data-email-id]");
  if (!nodes.length) return;

  nodes.forEach(function (el) {
    var id = el.getAttribute("data-email-id");
    var cfg = ADDRESS[id];
    if (!cfg) return; // 没配置就跳过

    var addr = cfg.user + "@" + cfg.domain;
    var display = el.getAttribute("data-email-display") || "auto";
    var tag = el.tagName.toLowerCase();

    // 如果是 <a> 标签，默认认为是“邮箱链接”
    if (tag === "a") {
      el.setAttribute("href", "mailto:" + addr);

      // 如果显示完整邮箱文字，可用 data-email-display="text"
      if (display === "text" && !el.textContent.trim()) {
        el.textContent = addr;
      } else {
        el.textContent = "✉️";
      }
    } else {
      // 非 <a> 标签，默认当成纯文本显示
      el.textContent = addr;
    }
  });
})();
