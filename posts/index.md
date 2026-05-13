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
 * @LastEditTime: 2026-05-13 20:31:26
 * @Description: file content
 * @Github: https://cocoon2wong.github.io
 * Copyright 2023 Conghao Wong, All Rights Reserved.
-->

<div id="pagination-controls-top" class="pagination-controls" data-title="Publication News"></div>

<p id="post-subtitle" markdown="1">
    Here are the latest updates on our research.
</p>

<div id="post-list">
    <ul class="posts-list list-unstyled" role="list">
      {% for post in site.posts %}
      <li class="post-preview post-item" style="display: none;">
        <article>

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

          {% if site.feed_show_excerpt == false %}
          {% if thumbnail != "" %}
          <div class="post-image post-image-normal">
            <a href="{{ post.url | absolute_url }}" aria-label="Thumbnail">
              <img src="{{ thumbnail | absolute_url }}" alt="Post thumbnail">
            </a>
          </div>
          {% endif %}
          {% endif %}

          <a href="{{ post.url | absolute_url }}">
            {% unless page.hide_post_title %}
              <h2 class="post-title">{{ post.title | strip_html }}</h2>
            {% endunless %}

            {% if post.subtitle %}
              <h3 class="post-subtitle">
              {{ post.subtitle | strip_html }}
              </h3>
            {% endif %}
          </a>

          <p class="post-meta">
            {% if post.author %}
              <span>By <strong>{{ post.author | strip_html }}.</strong></span>
            {% endif %}
            {% assign date_format = site.date_format | default: "%B %-d, %Y" %}
            Posted on {{ post.date | date: date_format }}.
          </p>

          {% if thumbnail != "" %}
          <div class="post-image post-image-small">
            <a href="{{ post.url | absolute_url }}" aria-label="Thumbnail">
              <img src="{{ thumbnail | absolute_url }}" alt="Post thumbnail">
            </a>
          </div>
          {% endif %}

          {% unless site.feed_show_excerpt == false %}
          {% if thumbnail != "" %}
          <div class="post-image post-image-short">
            <a href="{{ post.url | absolute_url }}" aria-label="Thumbnail">
              <img src="{{ thumbnail | absolute_url }}" alt="Post thumbnail">
            </a>
          </div>
          {% endif %}

          <div class="post-entry">
            {% assign excerpt_length = site.excerpt_length | default: 50 %}
            {{ post.excerpt | strip_html | truncatewords: excerpt_length }}
            {% assign excerpt_word_count = post.excerpt | number_of_words %}
            {% if post.content != post.excerpt or excerpt_word_count > excerpt_length %}
              <a href="{{ post.url | absolute_url }}" class="post-read-more">[Read&nbsp;More]</a>
            {% endif %}
          </div>
          {% endunless %}

          {% if site.feed_show_tags != false and post.tags.size > 0 %}
          <div class="blog-tags">
            <span>Tags:</span>
            <ul class="d-inline list-inline" role="list">
              {% for tag in post.tags %}
              <li class="list-inline-item">
                <a href="{{ '/tags' | absolute_url }}#{{- tag -}}">{{- tag -}}</a>
              </li>
              {% endfor %}
            </ul>
          </div>
          {% endif %}

        </article>
      </li>
      {% endfor %}
    </ul>
</div>

<div id="pagination-controls-bottom" class="pagination-controls"></div>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        const itemsPerPage = 5; 
        
        const items = Array.from(document.querySelectorAll('.post-item'));
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
                subtitle.style.display = (page === 1) ? 'block' : 'none';
            }

            currentItems.forEach(item => {
                item.style.display = 'block'; 
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
