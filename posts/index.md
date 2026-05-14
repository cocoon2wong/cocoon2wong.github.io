---
layout: page
title: Posts
cover-img: /assets/img/pic_posts.png
page_bg: gray
hide_post_title: true
no-breadcrumbs: true
---
<!--
 * @Author: Conghao Wong
 * @Date: 2023-03-03 19:27:32
 * @LastEditors: Conghao Wong
 * @LastEditTime: 2026-05-14 10:29:18
 * @Description: file content
 * @Github: https://cocoon2wong.github.io
 * Copyright 2023 Conghao Wong, All Rights Reserved.
-->

<link rel="stylesheet" href="/assets/css/publication_box.css">

<div id="pagination-controls-top" class="pagination-controls" data-title="Publication News"></div>

<p id="post-subtitle" markdown="1">
    Here are the latest updates on our research.
</p>

<div id="publication-list">

    {% for post in site.posts %}
        {%- capture thumbnail -%}
            {% if post.thumbnail-img %}
                {{ post.thumbnail-img }}
            {% elsif post.cover-img %}
                {% if post.cover-img.first %}
                    {{ post.cover-img[0].first.first }}
                {% else %}
                    {{ post.cover-img }}
                {% endif %}
            {% else %}
            {% endif %}
        {% endcapture %}
        {% assign thumbnail=thumbnail | strip %}

        <div class="publication_box pill pub-item post-item">
            <div class="publication_info_box">

                <div class="publication_title">
                    {{ post.subtitle | strip_html }}
                </div>

                {%- if post.author -%}
                    <div class="publication_author">By {{ post.author | strip_html }}</div>
                {%- endif -%}
                
                <div class="publication_journal">
                    {% assign date_format = site.date_format | default: "%B %-d, %Y" %}
                    Posted on {{ post.date | date: date_format }}
                </div>
                
                <a class="btn btn-theme" href="{{ post.url | absolute_url }}">View</a>

                {% if site.feed_show_tags != false and post.tags.size > 0 %}
                    <div class="pill pill_container">
                        {% for tag in post.tags %}
                            <a class="pill_item" href="{{ '/tags' | absolute_url }}#{{- tag -}}">{{- tag -}}</a>
                        {% endfor %}
                    </div>
                {% endif %}
            </div>

            <div class="publication_picture">
                {% if thumbnail != "" %}
                    <img src="{{ thumbnail | absolute_url }}">
                {% endif %}
            </div>
        </div>
    {% endfor %}
</div>

<div id="pagination-controls-bottom" class="pagination-controls"></div>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        const itemsPerPage = 5; 
        
        const items = Array.from(document.querySelectorAll('.pub-item'));
        const paginationContainers = Array.from(document.querySelectorAll('.pagination-controls'));

        let currentPage = 1;
        const totalPages = Math.ceil(items.length / itemsPerPage);

        window.goToPage = function (page) {
            if (page < 1 || page > totalPages) return;
            currentPage = page;
            renderPage(currentPage);
        };

        function renderPage(page) {
            items.forEach(item => item.style.display = 'none');

            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const currentItems = items.slice(start, end);

            const subtitle = document.getElementById('post-subtitle');
            if (subtitle) {
                subtitle.style.display = (page === 1) ? 'flex' : 'none';
            }

            currentItems.forEach(item => {
                item.style.display = 'flex'; 
            });

            renderControls();

            const listContainer = document.getElementById('post-list');
            if (listContainer) {
                window.scrollTo({
                    top: listContainer.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        }

        function renderControls() {
            if (totalPages <= 1) {
                paginationContainers.forEach(container => container.innerHTML = '');
                return;
            }

            let prevHtml = '';
            if (currentPage > 1) {
                prevHtml = `
                <a class="btn btn-normal titled-pill-nav" href="javascript:void(0);" onclick="goToPage(${currentPage - 1})">
                    <i class="fas fa-arrow-left"></i>
                </a>`;
            }

            let centerHtml = `<div class="pill pill_container">`;
            for (let i = 1; i <= totalPages; i++) {
                if (i === currentPage) {
                    centerHtml += `<span class="pill_item pill_active">${i}</span>`;
                } else {
                    centerHtml += `<a class="pill_item" href="javascript:void(0);" onclick="goToPage(${i})">${i}</a>`;
                }
            }
            centerHtml += `</div>`;

            let nextHtml = '';
            if (currentPage < totalPages) {
                nextHtml = `
                <a class="btn btn-theme titled-pill-nav" href="javascript:void(0);" onclick="goToPage(${currentPage + 1})">
                    <i class="fas fa-arrow-right"></i>
                </a>`;
            }

            paginationContainers.forEach(container => {
                let titleHtml = '';
                const optionalTitle = container.getAttribute('data-title');

                if (optionalTitle) {
                    titleHtml = `<h2 style="margin: 0;">${optionalTitle}</h2>`;
                }

                container.innerHTML = `
                <div style="width: 100%; display: flex; justify-content: space-between; align-items: center;">
                    
                    <div class="pagination-left-group">
                        ${prevHtml}
                        ${titleHtml}
                    </div>
                    
                    <div class="pagination-right-group">
                        ${centerHtml}
                        ${nextHtml}
                    </div>
                    
                </div>`;
            });
        }

        renderPage(currentPage);
    });
</script>
