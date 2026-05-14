---
layout: page
title: Publications
subtitle: Our Trajectory Prediction Research
cover-img: /assets/img/pic_publications.jpeg
page_bg: gray
no-breadcrumbs: true
---
<!--
 * @Author: Conghao Wong
 * @Date: 2023-03-03 16:04:54
 * @LastEditors: Conghao Wong
 * @LastEditTime: 2026-05-14 10:34:30
 * @Description: file content
 * @Github: https://cocoon2wong.github.io
 * Copyright 2023 Conghao Wong, All Rights Reserved.
-->

<link rel="stylesheet" href="/assets/css/publication_box.css">

<div id="pagination-controls-top" class="pagination-controls" data-title="Publication List"></div>

<p id="publication-subtitle" markdown="1">
    We are dedicated to conducting high-quality academic research.
    Our findings have been published in top-tier international journals and conferences, including the IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI), the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), the IEEE/CVF International Conference on Computer Vision (ICCV), the European Conference on Computer Vision (ECCV), etc.
</p>

<div id="publication-list">
    {% assign current_year = "" %}

    {% for pub in site.data.pub_data %}
        {% if pub.year != current_year %}
            <h3 class="pub-year" data-year="{{ pub.year }}">{{ pub.year }}</h3>
            {% assign current_year = pub.year %}
        {% endif %}

        <div class="publication_box pill pub-item" data-parent-year="{{ pub.year }}">
            <div class="publication_info_box">
                <div class="publication_title">{{ pub.title }}</div>
                <div class="publication_author">{{ pub.authors }}</div>
                <div class="publication_journal">
                    {{ pub.journal }}
                    {% if pub.submitted and pub.submitted != "" %}
                    <br>{{ pub.submitted }}
                    {% endif %}
                </div>

                {% case pub.status %}
                {% when 'I' %}<span class="pill pill_single pub-badge--progress">In progress</span>
                {% when 'C' %}<span class="pill pill_single pub-badge--conf">Conference</span>
                {% when 'J' %}<span class="pill pill_single pub-badge--journal">Journal</span>
                {% endcase %}

                <div class="pill pill_container">
                    {% if pub.github and pub.github != "" %}
                        <a class="pill_item" href="{{ pub.github }}">GitHub</a>
                    {% endif %}
                    {% if pub.arxiv and pub.arxiv != "" %}
                        <a class="pill_item" href="{{ pub.arxiv }}">Paper</a>
                    {% endif %}
                    {% if pub.homepage and pub.homepage != "" %}
                        <a class="pill_item" href="{{ pub.homepage }}">Homepage</a>
                    {% endif %}
                </div>
            </div>
            <div class="publication_picture">
                {% if pub.picture and pub.picture != "" %}
                    <img src="/assets/img/publications/{{ pub.picture }}">
                {% endif %}
            </div>
        </div>
    {% endfor %}
</div>

<div id="pagination-controls-bottom" class="pagination-controls"></div>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        const itemsPerPage = 5;
        const allItems = Array.from(document.querySelectorAll('.pub-item'));
        const years = Array.from(document.querySelectorAll('.pub-year'));
        const paginationContainers = Array.from(document.querySelectorAll('.pagination-controls'));

        let filteredItems = [...allItems];
        let currentSearchTerm = '';

        let currentPage = 1;
        let totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;

        let isInitialLoad = true;

        window.goToPage = function (page) {
            if (page < 1 || page > totalPages) return;
            currentPage = page;
            renderPage(currentPage);
        };

        function filterAndRender() {
            const term = currentSearchTerm.toLowerCase().trim();
            if (term === '') {
                filteredItems = [...allItems];
            } else {
                filteredItems = allItems.filter(item => {
                    return item.innerText.toLowerCase().includes(term);
                });
            }

            totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
            currentPage = 1;
            renderPage(currentPage);
        }

        function renderPage(page) {
            allItems.forEach(item => item.style.display = 'none');
            years.forEach(year => year.style.display = 'none');

            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const currentItems = filteredItems.slice(start, end);

            const subtitle = document.getElementById('publication-subtitle');
            if (subtitle) {
                subtitle.style.display = (page === 1 && currentSearchTerm.trim() === '') ? 'block' : 'none';
            }

            currentItems.forEach(item => {
                item.style.display = 'flex';
                const itemYear = item.getAttribute('data-parent-year');
                const targetYearHeader = years.find(y => y.getAttribute('data-year') === itemYear);
                if (targetYearHeader) {
                    targetYearHeader.style.display = 'block';
                }
            });

            const searchInput = document.getElementById('pub-search-input');
            const isTyping = searchInput && document.activeElement === searchInput;

            renderControls();

            if (!isTyping && !isInitialLoad) {
                const listContainer = document.getElementById('publication-list');
                if (listContainer) {
                    window.scrollTo({
                        top: listContainer.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }

            isInitialLoad = false;
        }

        function renderControls() {
            const existingInput = document.getElementById('pub-search-input');
            const isFocused = existingInput && document.activeElement === existingInput;

            let prevHtml = '';
            if (currentPage > 1) {
                prevHtml = `
                <a class="btn btn-normal titled-pill-nav" href="javascript:void(0);" onclick="goToPage(${currentPage - 1})">
                    <i class="fas fa-arrow-left"></i>
                </a>`;
            }

            let centerHtml = '';
            if (totalPages > 1) {
                centerHtml = `<div class="pill pill_container">`;
                for (let i = 1; i <= totalPages; i++) {
                    if (i === currentPage) {
                        centerHtml += `<span class="pill_item pill_active">${i}</span>`;
                    } else {
                        centerHtml += `<a class="pill_item" href="javascript:void(0);" onclick="goToPage(${i})">${i}</a>`;
                    }
                }
                centerHtml += `</div>`;
            } else if (filteredItems.length === 0) {
                centerHtml = `<span style="color: #888; font-size: 0.9rem; font-style: italic;">No results found</span>`;
            }

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

                let searchBoxHtml = '';
                if (container.id === 'pagination-controls-top') {
                    const safeSearchTerm = currentSearchTerm.replace(/"/g, '&quot;');
                    searchBoxHtml = `
                        <input type="text" id="pub-search-input" class="pill pill_container" value="${safeSearchTerm}" placeholder="Search..." 
                               autocomplete="off"
                               style="padding: 6px 16px; font-size: 0.9rem; width: 180px; transition: border-color 0.2s;">
                    `;
                }

                container.innerHTML = `
                <div style="width: 100%; display: flex; justify-content: space-between; align-items: center;">
                    
                    <div class="pagination-left-group" style="display: flex; align-items: center; gap: 24px;">
                        ${prevHtml}
                        ${titleHtml}
                    </div>
                    
                    <div class="pagination-right-group" style="display: flex; align-items: center; gap: 16px;">
                        ${searchBoxHtml}
                        ${centerHtml}
                        ${nextHtml}
                    </div>
                    
                </div>`;
            });

            const newSearchInput = document.getElementById('pub-search-input');
            if (newSearchInput) {
                if (isFocused) {
                    newSearchInput.focus();
                    const val = newSearchInput.value;
                    newSearchInput.value = '';
                    newSearchInput.value = val;
                }

                newSearchInput.addEventListener('input', function(e) {
                    currentSearchTerm = e.target.value;
                    filterAndRender();
                });
            }
        }

        renderPage(currentPage);
    });
</script>

<style>
@media (max-width: 768px) {
    #pub-search-input {
        display: none !important;
    }
}
</style>
