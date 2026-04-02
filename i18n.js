// === DreamPath AI — i18n Language Toggle ===
// Shared across index.html and vip.html

(function() {
  'use strict';

  // Current language: 'zh' or 'en'
  let currentLang = localStorage.getItem('dp_lang') || 'zh';

  // === TRANSLATION DICTIONARIES ===
  // PLACEHOLDER:index_translations
  // PLACEHOLDER:vip_translations
  // PLACEHOLDER:dynamic_translations

  // === t() HELPER — returns translated string for dynamic content ===
  window.t = function(key) {
    const dict = translations[currentLang];
    return dict && dict[key] !== undefined ? dict[key] : key;
  };

  window.getCurrentLang = function() { return currentLang; };

  // === APPLY TRANSLATIONS TO data-i18n ELEMENTS ===
  function applyTranslations() {
    const lang = currentLang;
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      var dict = translations[lang];
      if (dict && dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-placeholder');
      var dict = translations[lang];
      if (dict && dict[key] !== undefined) {
        el.placeholder = dict[key];
      }
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-html');
      var dict = translations[lang];
      if (dict && dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-title');
      var dict = translations[lang];
      if (dict && dict[key] !== undefined) {
        el.title = dict[key];
      }
    });
    // Update page title
    var pageTitle = document.querySelector('title');
    if (pageTitle) {
      var titleKey = pageTitle.getAttribute('data-i18n');
      if (titleKey && translations[lang] && translations[lang][titleKey]) {
        document.title = translations[lang][titleKey];
      }
    }
    // Update toggle button text
    var toggleBtn = document.getElementById('langToggle');
    if (toggleBtn) {
      toggleBtn.textContent = lang === 'zh' ? 'EN' : '\u4E2D\u6587';
    }
    // Update html lang attribute
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  }

  // === CREATE TOGGLE BUTTON ===
  function createToggleButton() {
    var nav = document.querySelector('.header-nav');
    if (!nav || document.getElementById('langToggle')) return;
    var btn = document.createElement('button');
    btn.id = 'langToggle';
    btn.textContent = currentLang === 'zh' ? 'EN' : '\u4E2D\u6587';
    btn.style.cssText = 'font-family:var(--font-cn);font-size:0.75rem;font-weight:700;padding:5px 14px;border-radius:20px;border:1px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.06);color:var(--text-secondary);cursor:pointer;transition:all 0.3s ease;letter-spacing:1px;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);margin-right:4px;';
    btn.addEventListener('mouseenter', function() {
      btn.style.borderColor = 'var(--star-cyan)';
      btn.style.color = 'var(--star-cyan)';
      btn.style.background = 'rgba(0,229,255,0.1)';
      btn.style.boxShadow = '0 0 12px rgba(0,229,255,0.2)';
    });
    btn.addEventListener('mouseleave', function() {
      btn.style.borderColor = 'rgba(255,255,255,0.15)';
      btn.style.color = 'var(--text-secondary)';
      btn.style.background = 'rgba(255,255,255,0.06)';
      btn.style.boxShadow = 'none';
    });
    btn.addEventListener('click', function() {
      currentLang = currentLang === 'zh' ? 'en' : 'zh';
      localStorage.setItem('dp_lang', currentLang);
      applyTranslations();
    });
    // Insert before login button or user-info
    var loginBtn = nav.querySelector('.login-btn') || nav.querySelector('.user-info') || nav.lastElementChild;
    if (loginBtn) {
      nav.insertBefore(btn, loginBtn);
    } else {
      nav.appendChild(btn);
    }
  }

  // === TRANSLATIONS OBJECT ===
  var translations = {
    zh: {
      // Page titles
      'page_title_index': 'DreamPath AI \u2014 \u63A2\u68A6\u9020\u672A\u6765',
      'page_title_vip': 'DreamPath AI \u2014 VIP\u4F1A\u5458\u4E2D\u5FC3',
      // Header nav (index)
      'nav_dreamcanvas': '\u753B\u68A6\u5DE5\u574A',
      'nav_storyboard': '\u6545\u4E8B\u677F\u5DE5\u5382',
      'nav_futureme': '\u672A\u6765\u7684\u6211',
      'nav_login': '\u767B\u5F55',
      // Header nav (vip)
      'nav_back_home': '\u8FD4\u56DE\u9996\u9875',
      // Hero
      'hero_title_1': '\u63A2\u68A6\u65E0\u754C\uFF0C',
      'hero_title_2': '\u521B\u9020\u672A\u6765',
      'hero_subtitle_html': '\u7528 AI \u7684\u529B\u91CF\u7ED8\u5236\u68A6\u60F3\u3001\u7F16\u7EC7\u6545\u4E8B\u3001\u6A21\u62DF\u672A\u6765\u3002<br>DreamPath AI \u4F60\u7684\u79C1\u4EBA\u521B\u610F\u5B87\u5B99\u3002',
      'hero_cta': '\u5F00\u59CB\u63A2\u7D22',
      // DreamCanvas section
      'dc_tag': 'DreamCanvas',
      'dc_title_html': '\u753B\u68A6\u5DE5\u574A <span class="glow">AI \u56FE\u50CF\u521B\u4F5C</span>',
      'dc_desc': '\u7528\u6587\u5B57\u63CF\u8FF0\u4F60\u7684\u60F3\u8C61\uFF0CAI \u5373\u523B\u5C06\u5176\u7ED8\u5236\u6210\u753B\u3002\u652F\u6301\u98CE\u683C\u8F6C\u6362\u3001\u8FED\u4EE3\u7F16\u8F91\uFF0C\u8BA9\u6BCF\u4E00\u6B21\u521B\u4F5C\u90FD\u66F4\u63A5\u8FD1\u5FC3\u4E2D\u6240\u60F3\u3002',
      'dc_input_title': '\u63CF\u8FF0\u4F60\u7684\u753B\u9762',
      'dc_placeholder': '\u63CF\u8FF0\u4F60\u60F3\u751F\u6210\u7684\u56FE\u50CF...\n\u4F8B\u5982\uFF1A\u300C\u4E00\u53EA\u661F\u7A7A\u732B\u54AA\u5728\u7D2B\u8272\u661F\u4E91\u4E2D\u6F2B\u6B65\uFF0C\u8EAB\u8FB9\u6F02\u6D6E\u7740\u6C34\u6676\u788E\u7247\u300D',
      'dc_style_dream': '\u68A6\u5E7B',
      'dc_style_cyber': '\u8D5B\u535A\u670B\u514B',
      'dc_style_watercolor': '\u6C34\u5F69',
      'dc_style_oil': '\u6CB9\u753B',
      'dc_style_pixel': '\u50CF\u7D20\u98CE',
      'dc_style_ukiyo': '\u6D6E\u4E16\u7ED8',
      'dc_style_minimal': '\u6781\u7B80',
      'dc_generate': '\u2726 \u751F\u6210\u56FE\u50CF',
      'dc_preview_text': '\u7B49\u5F85\u751F\u6210...',
      'dc_history_label': '\u751F\u6210\u5386\u53F2',
      // Storyboard section
      'sb_tag': 'Storyboard Factory',
      'sb_title_html': '\u6545\u4E8B\u677F\u5DE5\u5382 <span class="glow">AI \u521B\u610F\u5206\u955C</span>',
      'sb_desc': '\u8F93\u5165\u4F60\u7684\u521B\u610F\u7075\u611F\uFF0CAI \u81EA\u52A8\u751F\u6210\u7ED3\u6784\u5316\u6545\u4E8B\u677F\u3002\u6BCF\u4E2A\u5E27\u5305\u542B\u573A\u666F\u3001\u5BF9\u8BDD\u3001\u60C5\u7EEA\u4E0E\u8282\u594F\uFF0C\u652F\u6301\u6301\u7EED\u8FED\u4EE3\u5B8C\u5584\u3002',
      'sb_input_title': '\u8F93\u5165\u521B\u610F\u60F3\u6CD5',
      'sb_placeholder': '\u63CF\u8FF0\u4F60\u7684\u6545\u4E8B\u521B\u610F...\n\u4F8B\u5982\uFF1A\u300C\u4E00\u4E2A\u5931\u5FC6\u7684\u673A\u5668\u4EBA\u5728\u5E9F\u5F03\u57CE\u5E02\u4E2D\u5BFB\u627E\u81EA\u5DF1\u8FC7\u53BB\u7684\u8BB0\u5FC6\u788E\u7247\u300D',
      'sb_ctrl_5': '5\u5E27',
      'sb_ctrl_10': '10\u5E27',
      'sb_ctrl_image': '\u542B\u56FE\u50CF\u63D0\u793A',
      'sb_ctrl_save': '\u4FDD\u5B58\u9879\u76EE',
      'sb_generate': '\u2726 \u751F\u6210\u6545\u4E8B\u677F',
      'sb_projects_label': '\u5DF2\u4FDD\u5B58\u7684\u9879\u76EE',
      'sb_preview_title': '\u6545\u4E8B\u677F\u9884\u89C8',
      'sb_frame_emotion_1': '\u5B64\u72EC / \u597D\u5947',
      'sb_frame_pace_1': '\u7F13\u6162',
      'sb_frame_scene_1': '\u5E9F\u5F03\u57CE\u5E02\u7684\u9ECE\u660E\u3002\u951B\u8FF9\u6591\u6591\u7684\u9AD8\u697C\u5728\u6668\u96FE\u4E2D\u82E5\u9690\u82E5\u73B0\uFF0C\u4E00\u4E2A\u5C0F\u578B\u673A\u5668\u4EBA\u4ECE\u6B8B\u57A3\u65AD\u58C1\u4E2D\u7F13\u7F13\u82CF\u9192\uFF0C\u773C\u775B\u95EA\u70C1\u7740\u5FAE\u5F31\u7684\u84DD\u5149\u3002',
      'sb_frame_dialogue_1': '\u201C\u6211...\u662F\u8C01\uFF1F\u8FD9\u91CC\u662F\u4EC0\u4E48\u5730\u65B9\uFF1F\u201D',
      'sb_frame_emotion_2': '\u56F0\u60D1 / \u51B3\u610F',
      'sb_frame_pace_2': '\u6E10\u5FEB',
      'sb_frame_scene_2': '\u673A\u5668\u4EBA\u5728\u5E9F\u58DF\u4E2D\u53D1\u73B0\u4E00\u5757\u7834\u788E\u7684\u5168\u606F\u6295\u5F71\u5361\u3002\u5361\u7247\u4E0A\u9690\u7EA6\u663E\u793A\u7740\u4E00\u6BB5\u6A21\u7CCA\u7684\u5F71\u50CF \u2014 \u4E00\u4E2A\u7B11\u7740\u7684\u4EBA\u7C7B\u6B63\u5728\u7EC4\u88C5\u4EC0\u4E48\u4E1C\u897F\u3002',
      'sb_frame_dialogue_2': '\u201C\u8FD9\u4E2A\u4EBA...\u597D\u50CF\u8BA4\u8BC6\u6211\u3002\u6211\u8981\u627E\u5230\u66F4\u591A\u7EBF\u7D22\u3002\u201D',
      'sb_frame_emotion_3': '\u7D27\u5F20 / \u5E0C\u671B',
      'sb_frame_pace_3': '\u4E2D\u901F',
      'sb_frame_scene_3': '\u7A7F\u8D8A\u5012\u5854\u7684\u5730\u94C1\u96A7\u9053\u3002\u8FDC\u5904\u4F20\u6765\u5FAE\u5F31\u7684\u7535\u5B50\u4FE1\u53F7\u58F0\u3002\u673A\u5668\u4EBA\u52A0\u901F\u524D\u8FDB\uFF0C\u80F8\u53E3\u7684\u6838\u5FC3\u5F00\u59CB\u53D1\u51FA\u6E29\u6696\u7684\u6A59\u8272\u5149\u8292\u3002',
      'sb_frame_dialogue_3': '\u201C\u4FE1\u53F7\u6E90...\u5C31\u5728\u524D\u65B9\u3002\u4E5F\u8BB8\u90A3\u91CC\u6709\u5173\u4E8E\u6211\u7684\u7B54\u6848\u3002\u201D',
      // Future Me section
      'fm_tag': 'Future Me',
      'fm_title_html': '\u672A\u6765\u7684\u6211 <span class="glow">\u4EBA\u751F\u6A21\u62DF</span>',
      'fm_desc': '\u63CF\u8FF0\u4F60\u7684\u73B0\u72B6\u4E0E\u9009\u62E9\uFF0CAI \u6A21\u62DF\u4E0D\u540C\u65F6\u95F4\u7EBF\u4E0A\u7684\u4EBA\u751F\u8DEF\u5F84\u3002\u7ED3\u6784\u5316\u62A5\u544A + \u8BE6\u7EC6\u573A\u666F + \u5B9E\u7528\u5EFA\u8BAE\uFF0C\u52A9\u4F60\u6D1E\u89C1\u672A\u6765\u53EF\u80FD\u3002',
      'fm_input_title': '\u63CF\u8FF0\u4F60\u7684\u73B0\u72B6',
      'fm_label_identity': '\u5F53\u524D\u8EAB\u4EFD / \u804C\u4E1A',
      'fm_placeholder_identity': '\u4F8B\u5982\uFF1A25\u5C81\uFF0C\u4E92\u8054\u7F51\u4EA7\u54C1\u7ECF\u7406',
      'fm_label_situation': '\u5F53\u524D\u72B6\u51B5\u63CF\u8FF0',
      'fm_placeholder_situation': '\u63CF\u8FF0\u4F60\u76EE\u524D\u7684\u751F\u6D3B\u3001\u5DE5\u4F5C\u3001\u611F\u60C5\u72B6\u51B5...',
      'fm_label_choices': '\u9762\u4E34\u7684\u4EBA\u751F\u9009\u62E9',
      'fm_placeholder_choices': '\u4F8B\u5982\uFF1A\u8003\u8651\u8F9E\u804C\u521B\u4E1A vs \u7EE7\u7EED\u5728\u5927\u5382\u6DF1\u8015...',
      'fm_simulate': '\u2726 \u6A21\u62DF\u672A\u6765',
      'fm_history_label': '\u5386\u53F2\u6A21\u62DF\u8BB0\u5F55',
      'fm_timeline_title': '\u672A\u6765\u65F6\u95F4\u7EBF',
      'fm_year_1': '1 \u5E74\u540E',
      'fm_year_5': '5 \u5E74\u540E',
      'fm_year_10': '10 \u5E74\u540E',
      'fm_year_20': '20 \u5E74\u540E',
      'fm_card_career': '\u804C\u4E1A\u53D1\u5C55',
      'fm_card_finance': '\u8D22\u52A1\u72B6\u51B5',
      'fm_card_life': '\u751F\u6D3B\u8D28\u91CF',
      'fm_card_advice': '\u5B9E\u7528\u5EFA\u8BAE',
      'fm_card_career_text': '\u8DEF\u5F84A\uFF1A\u521B\u4E1A\u521D\u671F\uFF0C\u4EA7\u54C1\u5DF2\u4E0A\u7EBF\u4F46\u7528\u6237\u589E\u957F\u7F13\u6162\uFF0C\u9700\u8981\u6301\u7EED\u878D\u8D44\u3002\u8DEF\u5F84B\uFF1A\u664B\u5347\u4E3A\u9AD8\u7EA7\u4EA7\u54C1\u603B\u76D1\uFF0C\u7BA1\u740610\u4EBA\u56E2\u961F\u3002',
      'fm_card_finance_text': '\u8DEF\u5F84A\uFF1A\u79EF\u84C4\u6D88\u8017\u7EA660%\uFF0C\u6708\u6536\u5165\u4E0D\u7A33\u5B9A\u3002\u8DEF\u5F84B\uFF1A\u5E74\u85AA\u589E\u957F30%\uFF0C\u6709\u7A33\u5B9A\u50A8\u84C4\u8BA1\u5212\u3002',
      'fm_card_life_text': '\u8DEF\u5F84A\uFF1A\u538B\u529B\u8F83\u5927\u4F46\u5145\u6EE1\u6FC0\u60C5\uFF0C\u793E\u4EA4\u5708\u6269\u5C55\u5230\u521B\u4E1A\u8005\u7FA4\u4F53\u3002\u8DEF\u5F84B\uFF1A\u751F\u6D3B\u89C4\u5F8B\uFF0C\u5F00\u59CB\u8003\u8651\u5B9A\u5C45\u8D2D\u623F\u3002',
      'fm_card_advice_text': '\u65E0\u8BBA\u9009\u62E9\u54EA\u6761\u8DEF\u5F84\uFF0C\u5EFA\u8BAE\u4FDD\u7559\u81F3\u5C1112\u4E2A\u6708\u7684\u751F\u6D3B\u5907\u7528\u91D1\u3002\u540C\u65F6\u6301\u7EED\u63D0\u5347\u8DE8\u9886\u57DF\u6280\u80FD\u4EE5\u4FDD\u6301\u7ADE\u4E89\u529B\u3002',
      // Footer
      'footer_copy': '\u00A9 2026 DreamPath AI. \u63A2\u68A6\u9020\u672A\u6765\u3002',
      'footer_twitter': 'Twitter/X',
      // Login modal
      'auth_title_login': '\u6B22\u8FCE\u56DE\u6765',
      'auth_title_register': '\u521B\u5EFA\u8D26\u53F7',
      'auth_subtitle_login': '\u767B\u5F55\u4EE5\u4FDD\u5B58\u4F60\u7684\u521B\u4F5C\u4E0E\u6A21\u62DF\u8BB0\u5F55',
      'auth_subtitle_register': '\u6CE8\u518C\u4EE5\u5F00\u59CB\u4F60\u7684\u521B\u610F\u4E4B\u65C5',
      'auth_placeholder_name': '\u6635\u79F0',
      'auth_placeholder_email': '\u90AE\u7BB1\u5730\u5740',
      'auth_placeholder_password': '\u5BC6\u7801',
      'auth_submit_login': '\u767B \u5F55',
      'auth_submit_register': '\u6CE8 \u518C',
      'auth_toggle_to_register': '\u8FD8\u6CA1\u6709\u8D26\u53F7\uFF1F',
      'auth_toggle_to_login': '\u5DF2\u6709\u8D26\u53F7\uFF1F',
      'auth_link_register': '\u7ACB\u5373\u6CE8\u518C',
      'auth_link_login': '\u7ACB\u5373\u767B\u5F55',
      // VIP page
      'vip_title_1': 'VIP',
      'vip_title_2': '\u4F1A\u5458\u4E2D\u5FC3',
      'vip_subtitle': '\u89E3\u9501\u5168\u90E8\u9AD8\u7EA7\u529F\u80FD\uFF0C\u7545\u4EAB\u65E0\u9650\u521B\u4F5C',
      'vip_balance_label': '\u5F53\u524D\u4F59\u989D',
      'vip_status_free': '\u5F53\u524D\u72B6\u6001\uFF1A\u514D\u8D39\u7528\u6237',
      'vip_section_tiers': '\u9009\u62E9\u4F1A\u5458\u5957\u9910',
      'vip_tier_monthly': '\u6708\u5EA6\u4F1A\u5458',
      'vip_tier_quarterly': '\u5B63\u5EA6\u4F1A\u5458',
      'vip_tier_yearly': '\u5E74\u5EA6\u4F1A\u5458',
      'vip_popular': '\u6700\u53D7\u6B22\u8FCE',
      'vip_price_monthly': 'USDT/\u6708',
      'vip_price_quarterly': 'USDT/\u5B63',
      'vip_price_yearly': 'USDT/\u5E74',
      'vip_feature_unlimited': '\u5168\u90E8AI\u5DE5\u5177\u65E0\u9650\u4F7F\u7528',
      'vip_feature_priority': '\u9AD8\u4F18\u5148\u7EA7\u751F\u6210\u961F\u5217',
      'vip_feature_badge': '\u4E13\u5C5E\u4F1A\u5458\u6807\u8BC6',
      'vip_feature_quarterly_save': '\u6BD4\u6708\u5EA6\u8282\u7701 <b>-0.17%</b>',
      'vip_feature_yearly_save': '\u6700\u9AD8\u6027\u4EF7\u6BD4 <b>\u8282\u77015\u4E07%</b>',
      'vip_subscribe': '\u7ACB\u5373\u8BA2\u9605',
      'vip_recharge_title': 'USDT \u5145\u503C',
      'vip_recharge_label': '\u5145\u503C\u91D1\u989D (USDT)',
      'vip_recharge_placeholder': '\u8F93\u5165\u5145\u503C\u91D1\u989D',
      'vip_recharge_hint': '1 USDT = 1 USDT (1:1)',
      'vip_select_chain': '\u9009\u62E9\u94FE',
      'vip_wallet_label': '\u6536\u6B3E\u94B1\u5305\u5730\u5740',
      'vip_copy_address': '\u590D\u5236\u5730\u5740',
      'vip_select_wallet': '\u9009\u62E9\u94B1\u5305\u652F\u4ED8',
      'vip_metamask': 'MetaMask',
      'vip_please_login': '\u8BF7\u5148\u767B\u5F55',
      // Dynamic messages (for t() function)
      'toast_address_copied': '\u5730\u5740\u5DF2\u590D\u5236',
      'toast_please_login': '\u8BF7\u5148\u767B\u5F55',
      'toast_balance_insufficient': '\u4F59\u989D\u4E0D\u8DB3\uFF0C\u8BF7\u5148\u5145\u503C\u3002\u5F53\u524D\u4F59\u989D: ',
      'toast_subscribe_confirm': '\u786E\u8BA4\u4F7F\u7528 ',
      'toast_subscribe_confirm_2': ' USDT \u8BA2\u9605',
      'toast_subscribe_confirm_3': '\u4F1A\u5458\uFF1F',
      'toast_subscribe_success': '\u8BA2\u9605\u6210\u529F\uFF01\u5DF2\u5F00\u901A',
      'toast_subscribe_fail': '\u8BA2\u9605\u5931\u8D25: ',
      'toast_enter_amount': '\u8BF7\u8F93\u5165\u6709\u6548\u7684\u5145\u503C\u91D1\u989D',
      'toast_wallet_not_found': '\u672A\u68C0\u6D4B\u5230 ',
      'toast_wallet_install': '\uFF0C\u8BF7\u5B89\u88C5\u8BE5\u94B1\u5305',
      'toast_connecting': '\u6B63\u5728\u8FDE\u63A5 ',
      'toast_wallet_connect_fail': '\u94B1\u5305\u8FDE\u63A5\u5931\u8D25',
      'toast_tx_submitted': '\u4EA4\u6613\u5DF2\u63D0\u4EA4\uFF0C\u7B49\u5F85\u786E\u8BA4... TxHash: ',
      'toast_recharge_success': '\u5145\u503C\u6210\u529F\uFF01+',
      'toast_tx_cancelled': '\u4EA4\u6613\u5DF2\u53D6\u6D88',
      'toast_tx_fail': '\u4EA4\u6613\u5931\u8D25: ',
      'toast_metamask_no_solana': 'MetaMask \u6682\u4E0D\u652F\u6301 Solana \u94FE\uFF0C\u8BF7\u9009\u62E9\u5176\u4ED6\u94B1\u5305',
      'toast_solana_not_found': '\u672A\u68C0\u6D4B\u5230\u652F\u6301 Solana \u7684 ',
      'toast_solana_install': '\uFF0C\u8BF7\u5B89\u88C5\u8BE5\u94B1\u5305',
      'toast_solana_connected': '\u5DF2\u8FDE\u63A5 Solana \u94B1\u5305: ',
      'toast_solana_manual': '... \u8BF7\u5728\u94B1\u5305\u4E2D\u5B8C\u6210 USDT \u8F6C\u8D26',
      'toast_solana_alert': '\u8BF7\u5728\u94B1\u5305\u4E2D\u624B\u52A8\u8F6C\u8D26 ',
      'toast_solana_alert_2': ' USDT \u5230\u4EE5\u4E0B\u5730\u5740\uFF1A\n\n',
      'toast_solana_alert_3': '\n\n\u8F6C\u8D26\u5B8C\u6210\u540E\uFF0C\u4F59\u989D\u5C06\u5728\u9A8C\u8BC1\u540E\u66F4\u65B0\u3002',
      'toast_solana_fail': 'Solana \u94B1\u5305\u8FDE\u63A5\u5931\u8D25: ',
      'wallet_detected': '\u5DF2\u68C0\u6D4B\u5230',
      'wallet_not_detected': '\u672A\u68C0\u6D4B\u5230',
      'vip_status_login_first': '\u8BF7\u5148\u767B\u5F55\u540E\u64CD\u4F5C',
      'vip_label_monthly': '\u6708\u5EA6\u4F1A\u5458',
      'vip_label_quarterly': '\u5B63\u5EA6\u4F1A\u5458',
      'vip_label_yearly': '\u5E74\u5EA6\u4F1A\u5458',
      'vip_status_prefix': '\u5F53\u524D\u72B6\u6001\uFF1A',
      'vip_status_vip': 'VIP ',
      'vip_status_expiry': ' \u00B7 \u5230\u671F\uFF1A',
      'load_user_fail': '\u52A0\u8F7D\u7528\u6237\u6570\u636E\u5931\u8D25:',
      // Index page dynamic messages
      'toast_enter_image_desc': '\u8BF7\u8F93\u5165\u56FE\u50CF\u63CF\u8FF0',
      'toast_login_first_generate': '\u8BF7\u5148\u767B\u5F55\u518D\u751F\u6210',
      'toast_optimizing': '\u2726 \u6B63\u5728\u4F18\u5316\u63D0\u793A\u8BCD...',
      'toast_generating_image': '\u2726 \u6B63\u5728\u751F\u6210\u56FE\u50CF...',
      'toast_creation_done': '\u521B\u4F5C\u5B8C\u6210\uFF01',
      'toast_generate_fail': '\u751F\u6210\u5931\u8D25: ',
      'toast_generate_fail_retry': '\u751F\u6210\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5',
      'toast_enter_story': '\u8BF7\u8F93\u5165\u6545\u4E8B\u521B\u610F',
      'toast_login_first_story': '\u8BF7\u5148\u767B\u5F55\u518D\u751F\u6210',
      'toast_ai_creating': '\u2726 AI \u6B63\u5728\u521B\u4F5C...',
      'toast_sb_generating': '\u6545\u4E8B\u677F\u751F\u6210\u4E2D\uFF0C\u8BF7\u7A0D\u5019...',
      'toast_sb_done': '\u6545\u4E8B\u677F\u751F\u6210\u5B8C\u6210\uFF01',
      'toast_sb_fail_retry': '\u751F\u6210\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5',
      'toast_project_loaded': '\u9879\u76EE\u5DF2\u52A0\u8F7D',
      'toast_load_fail': '\u52A0\u8F7D\u5931\u8D25',
      'toast_fill_info': '\u8BF7\u81F3\u5C11\u586B\u5199\u4E00\u9879\u4FE1\u606F',
      'toast_login_first_sim': '\u8BF7\u5148\u767B\u5F55\u518D\u6A21\u62DF',
      'toast_simulating': '\u2726 AI \u6B63\u5728\u6A21\u62DF\u672A\u6765...',
      'toast_sim_calculating': '\u672A\u6765\u8DEF\u5F84\u8BA1\u7B97\u4E2D...',
      'toast_sim_done': '\u6A21\u62DF\u5B8C\u6210\uFF01',
      'toast_sim_fail': '\u6A21\u62DF\u5931\u8D25: ',
      'toast_sim_fail_retry': '\u6A21\u62DF\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5',
      'toast_record_loaded': '\u8BB0\u5F55\u5DF2\u52A0\u8F7D',
      'toast_register_success': '\u6CE8\u518C\u6210\u529F\uFF01\u6B22\u8FCE ',
      'toast_login_success': '\u767B\u5F55\u6210\u529F\uFF01',
      'toast_fill_email_pwd': '\u8BF7\u586B\u5199\u90AE\u7BB1\u548C\u5BC6\u7801',
      'toast_pwd_min6': '\u5BC6\u7801\u81F3\u5C116\u4F4D',
      'auth_err_email_in_use': '\u8BE5\u90AE\u7BB1\u5DF2\u6CE8\u518C',
      'auth_err_invalid_email': '\u90AE\u7BB1\u683C\u5F0F\u4E0D\u6B63\u786E',
      'auth_err_wrong_pwd': '\u5BC6\u7801\u9519\u8BEF',
      'auth_err_user_not_found': '\u7528\u6237\u4E0D\u5B58\u5728',
      'auth_err_invalid_cred': '\u90AE\u7BB1\u6216\u5BC6\u7801\u9519\u8BEF',
      'auth_err_weak_pwd': '\u5BC6\u7801\u5F3A\u5EA6\u4E0D\u591F',
      'auth_err_config': 'Firebase \u8BA4\u8BC1\u672A\u914D\u7F6E\uFF0C\u8BF7\u5728 Firebase Console \u2192 Authentication \u2192 Sign-in method \u4E2D\u542F\u7528 Email/Password',
      'auth_err_network': '\u7F51\u7EDC\u8FDE\u63A5\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC',
      'auth_err_too_many': '\u8BF7\u6C42\u8FC7\u4E8E\u9891\u7E41\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5',
      'auth_err_firebase': 'Firebase\uFF1A\u9519\u8BEF\uFF08',
      'toast_logged_out': '\u5DF2\u9000\u51FA',
      'profile_logout': '\u9000\u51FA\u767B\u5F55',
      'profile_vip_user': 'VIP\u7528\u6237',
      'profile_free_user': '\u514D\u8D39\u7528\u6237',
      'profile_upgrade': '\u5347\u7EA7\u4F1A\u5458',
      'profile_expiry': '\u5230\u671F\uFF1A',
      'usage_free': '\u514D\u8D39',
      'usage_limit_reached': '\u7528\u6237',
      'usage_limit_msg_1': '\u4F7F\u7528\u6B21\u6570\u5DF2\u8FBE\u4E0A\u9650\uFF08',
      'usage_limit_msg_2': '\u6B21\uFF09\uFF0C',
      'usage_vip_exhausted': '\u672C\u671F\u5DF2\u7528\u5B8C',
      'usage_upgrade': '\u8BF7\u5347\u7EA7\u4F1A\u5458\u89E3\u9501\u66F4\u591A\u6B21\u6570',
      'dc_no_image_data': '\u56FE\u50CF\u751F\u6210\u5B8C\u6210\uFF0C\u4F46\u672A\u8FD4\u56DE\u56FE\u7247\u6570\u636E',
      'api_call_fail': 'API \u8C03\u7528\u5931\u8D25',
      'image_gen_fail': '\u56FE\u50CF\u751F\u6210\u5931\u8D25',
      'ai_parse_fail': 'AI \u8FD4\u56DE\u683C\u5F0F\u89E3\u6790\u5931\u8D25',
      'unnamed': '\u672A\u547D\u540D',
      'sim_record': '\u6A21\u62DF\u8BB0\u5F55',
      'prev_sim_context': '\n\n\u3010\u7528\u6237\u5386\u53F2\u6A21\u62DF\u8BB0\u5F55\uFF08\u4F9B\u53C2\u8003\uFF0C\u4FDD\u6301\u4EBA\u751F\u8FDE\u7EED\u6027\uFF09\u3011\n',
      'fm_hist_1': '2026-03-20 \u00B7 \u521B\u4E1A vs \u6DF1\u8015',
      'fm_hist_2': '2026-02-14 \u00B7 \u51FA\u56FD\u7559\u5B66 vs \u56FD\u5185\u53D1\u5C55',
      'sb_sample_1': '\u5931\u5FC6\u673A\u5668\u4EBA',
      'sb_sample_2': '\u661F\u9645\u65C5\u884C\u8005',
      'sb_sample_date_1': '3\u670828\u65E5',
      'sb_sample_date_2': '3\u670825\u65E5'
    },
    en: {
      // Page titles
      'page_title_index': 'DreamPath AI \u2014 Dream the Future',
      'page_title_vip': 'DreamPath AI \u2014 VIP Membership',
      // Header nav (index)
      'nav_dreamcanvas': 'DreamCanvas',
      'nav_storyboard': 'Storyboard',
      'nav_futureme': 'Future Me',
      'nav_login': 'Login',
      // Header nav (vip)
      'nav_back_home': 'Home',
      // Hero
      'hero_title_1': 'Dream Beyond, ',
      'hero_title_2': 'Create the Future',
      'hero_subtitle_html': 'Use the power of AI to paint dreams, weave stories, and simulate the future.<br>DreamPath AI \u2014 your personal creative universe.',
      'hero_cta': 'Start Exploring',
      // DreamCanvas section
      'dc_tag': 'DreamCanvas',
      'dc_title_html': 'DreamCanvas <span class="glow">AI Image Creation</span>',
      'dc_desc': 'Describe your imagination in words, and AI will paint it instantly. Supports style transfer and iterative editing, bringing every creation closer to your vision.',
      'dc_input_title': 'Describe Your Scene',
      'dc_placeholder': 'Describe the image you want to generate...\ne.g. "A starry cat walking through a purple nebula, surrounded by floating crystal fragments"',
      'dc_style_dream': 'Dreamy',
      'dc_style_cyber': 'Cyberpunk',
      'dc_style_watercolor': 'Watercolor',
      'dc_style_oil': 'Oil Paint',
      'dc_style_pixel': 'Pixel Art',
      'dc_style_ukiyo': 'Ukiyo-e',
      'dc_style_minimal': 'Minimal',
      'dc_generate': '\u2726 Generate Image',
      'dc_preview_text': 'Awaiting generation...',
      'dc_history_label': 'Generation History',
      // Storyboard section
      'sb_tag': 'Storyboard Factory',
      'sb_title_html': 'Storyboard Factory <span class="glow">AI Creative Storyboarding</span>',
      'sb_desc': 'Input your creative inspiration, and AI automatically generates structured storyboards. Each frame includes scenes, dialogue, emotions, and pacing, with continuous iteration support.',
      'sb_input_title': 'Enter Your Idea',
      'sb_placeholder': 'Describe your story concept...\ne.g. "An amnesiac robot searching for fragments of its past memories in an abandoned city"',
      'sb_ctrl_5': '5 Frames',
      'sb_ctrl_10': '10 Frames',
      'sb_ctrl_image': 'Image Prompts',
      'sb_ctrl_save': 'Save Project',
      'sb_generate': '\u2726 Generate Storyboard',
      'sb_projects_label': 'Saved Projects',
      'sb_preview_title': 'Storyboard Preview',
      'sb_frame_emotion_1': 'Lonely / Curious',
      'sb_frame_pace_1': 'Slow',
      'sb_frame_scene_1': 'Dawn in the abandoned city. Rusty skyscrapers loom through the morning fog. A small robot slowly awakens from the ruins, its eyes flickering with a faint blue glow.',
      'sb_frame_dialogue_1': '"Who...am I? Where is this place?"',
      'sb_frame_emotion_2': 'Confused / Determined',
      'sb_frame_pace_2': 'Accelerating',
      'sb_frame_scene_2': 'The robot discovers a broken holographic card in the ruins. The card faintly displays a blurry image \u2014 a smiling human assembling something.',
      'sb_frame_dialogue_2': '"This person...seems to know me. I need to find more clues."',
      'sb_frame_emotion_3': 'Tense / Hopeful',
      'sb_frame_pace_3': 'Medium',
      'sb_frame_scene_3': 'Traversing a collapsed subway tunnel. A faint electronic signal echoes from afar. The robot accelerates, its core beginning to emit a warm orange glow.',
      'sb_frame_dialogue_3': '"The signal source...is just ahead. Maybe that\'s where I\'ll find answers about myself."',
      // Future Me section
      'fm_tag': 'Future Me',
      'fm_title_html': 'Future Me <span class="glow">Life Simulation</span>',
      'fm_desc': 'Describe your current situation and choices, and AI simulates life paths across different timelines. Structured reports + detailed scenarios + practical advice to help you envision future possibilities.',
      'fm_input_title': 'Describe Your Situation',
      'fm_label_identity': 'Current Role / Occupation',
      'fm_placeholder_identity': 'e.g. 25 years old, Internet product manager',
      'fm_label_situation': 'Current Situation',
      'fm_placeholder_situation': 'Describe your current life, work, and relationship status...',
      'fm_label_choices': 'Life Choices You Face',
      'fm_placeholder_choices': 'e.g. Considering quitting to start a business vs staying at a big company...',
      'fm_simulate': '\u2726 Simulate Future',
      'fm_history_label': 'Simulation History',
      'fm_timeline_title': 'Future Timeline',
      'fm_year_1': '1 Year',
      'fm_year_5': '5 Years',
      'fm_year_10': '10 Years',
      'fm_year_20': '20 Years',
      'fm_card_career': 'Career Development',
      'fm_card_finance': 'Financial Status',
      'fm_card_life': 'Quality of Life',
      'fm_card_advice': 'Practical Advice',
      'fm_card_career_text': 'Path A: Early startup phase, product launched but slow user growth, continuous fundraising needed. Path B: Promoted to Senior Product Director, managing a team of 10.',
      'fm_card_finance_text': 'Path A: Savings depleted by ~60%, unstable monthly income. Path B: 30% salary increase, stable savings plan.',
      'fm_card_life_text': 'Path A: High pressure but full of passion, social circle expanded to entrepreneur community. Path B: Regular lifestyle, starting to consider settling down.',
      'fm_card_advice_text': 'Regardless of the path chosen, maintain at least 12 months of living expenses as a reserve. Also continuously improve cross-domain skills to stay competitive.',
      // Footer
      'footer_copy': '\u00A9 2026 DreamPath AI. Dream the Future.',
      'footer_twitter': 'Twitter/X',
      // Login modal
      'auth_title_login': 'Welcome Back',
      'auth_title_register': 'Create Account',
      'auth_subtitle_login': 'Log in to save your creations and simulation records',
      'auth_subtitle_register': 'Register to start your creative journey',
      'auth_placeholder_name': 'Nickname',
      'auth_placeholder_email': 'Email address',
      'auth_placeholder_password': 'Password',
      'auth_submit_login': 'Log In',
      'auth_submit_register': 'Sign Up',
      'auth_toggle_to_register': 'Don\'t have an account?',
      'auth_toggle_to_login': 'Already have an account?',
      'auth_link_register': 'Sign up now',
      'auth_link_login': 'Log in now',
      // VIP page
      'vip_title_1': 'VIP',
      'vip_title_2': 'Membership',
      'vip_subtitle': 'Unlock all premium features, enjoy unlimited creation',
      'vip_balance_label': 'Current Balance',
      'vip_status_free': 'Status: Free User',
      'vip_section_tiers': 'Choose a Plan',
      'vip_tier_monthly': 'Monthly',
      'vip_tier_quarterly': 'Quarterly',
      'vip_tier_yearly': 'Annual',
      'vip_popular': 'Most Popular',
      'vip_price_monthly': 'USDT/mo',
      'vip_price_quarterly': 'USDT/qtr',
      'vip_price_yearly': 'USDT/yr',
      'vip_feature_unlimited': 'Unlimited access to all AI tools',
      'vip_feature_priority': 'High priority generation queue',
      'vip_feature_badge': 'Exclusive member badge',
      'vip_feature_quarterly_save': 'Save <b>-0.17%</b> vs monthly',
      'vip_feature_yearly_save': 'Best value <b>save 67%</b>',
      'vip_subscribe': 'Subscribe Now',
      'vip_recharge_title': 'USDT Recharge',
      'vip_recharge_label': 'Amount (USDT)',
      'vip_recharge_placeholder': 'Enter recharge amount',
      'vip_recharge_hint': '1 USDT = 1 USDT (1:1)',
      'vip_select_chain': 'Select Chain',
      'vip_wallet_label': 'Receiving Wallet Address',
      'vip_copy_address': 'Copy Address',
      'vip_select_wallet': 'Select Wallet to Pay',
      'vip_metamask': 'MetaMask',
      'vip_please_login': 'Please log in first',
      // Dynamic messages (for t() function)
      'toast_address_copied': 'Address copied',
      'toast_please_login': 'Please log in first',
      'toast_balance_insufficient': 'Insufficient balance, please recharge. Current balance: ',
      'toast_subscribe_confirm': 'Confirm using ',
      'toast_subscribe_confirm_2': ' USDT to subscribe to ',
      'toast_subscribe_confirm_3': ' membership?',
      'toast_subscribe_success': 'Subscription successful! Activated ',
      'toast_subscribe_fail': 'Subscription failed: ',
      'toast_enter_amount': 'Please enter a valid recharge amount',
      'toast_wallet_not_found': 'Could not detect ',
      'toast_wallet_install': ', please install the wallet',
      'toast_connecting': 'Connecting to ',
      'toast_wallet_connect_fail': 'Wallet connection failed',
      'toast_tx_submitted': 'Transaction submitted, waiting for confirmation... TxHash: ',
      'toast_recharge_success': 'Recharge successful! +',
      'toast_tx_cancelled': 'Transaction cancelled',
      'toast_tx_fail': 'Transaction failed: ',
      'toast_metamask_no_solana': 'MetaMask does not support Solana chain, please choose another wallet',
      'toast_solana_not_found': 'Could not detect Solana-compatible ',
      'toast_solana_install': ', please install the wallet',
      'toast_solana_connected': 'Connected to Solana wallet: ',
      'toast_solana_manual': '... Please complete the USDT transfer in your wallet',
      'toast_solana_alert': 'Please manually transfer ',
      'toast_solana_alert_2': ' USDT to the following address:\n\n',
      'toast_solana_alert_3': '\n\nBalance will be updated after verification.',
      'toast_solana_fail': 'Solana wallet connection failed: ',
      'wallet_detected': 'Detected',
      'wallet_not_detected': 'Not detected',
      'vip_status_login_first': 'Please log in to continue',
      'vip_label_monthly': 'Monthly',
      'vip_label_quarterly': 'Quarterly',
      'vip_label_yearly': 'Annual',
      'vip_status_prefix': 'Status: ',
      'vip_status_vip': 'VIP ',
      'vip_status_expiry': ' \u00B7 Expires: ',
      'load_user_fail': 'Failed to load user data:',
      // Index page dynamic messages
      'toast_enter_image_desc': 'Please enter an image description',
      'toast_login_first_generate': 'Please log in to generate',
      'toast_optimizing': '\u2726 Optimizing prompt...',
      'toast_generating_image': '\u2726 Generating image...',
      'toast_creation_done': 'Creation complete!',
      'toast_generate_fail': 'Generation failed: ',
      'toast_generate_fail_retry': 'Generation failed, please retry',
      'toast_enter_story': 'Please enter a story idea',
      'toast_login_first_story': 'Please log in to generate',
      'toast_ai_creating': '\u2726 AI is creating...',
      'toast_sb_generating': 'Generating storyboard, please wait...',
      'toast_sb_done': 'Storyboard generated!',
      'toast_sb_fail_retry': 'Generation failed, please retry',
      'toast_project_loaded': 'Project loaded',
      'toast_load_fail': 'Failed to load',
      'toast_fill_info': 'Please fill in at least one field',
      'toast_login_first_sim': 'Please log in to simulate',
      'toast_simulating': '\u2726 AI is simulating the future...',
      'toast_sim_calculating': 'Calculating future paths...',
      'toast_sim_done': 'Simulation complete!',
      'toast_sim_fail': 'Simulation failed: ',
      'toast_sim_fail_retry': 'Simulation failed, please retry',
      'toast_record_loaded': 'Record loaded',
      'toast_register_success': 'Registration successful! Welcome ',
      'toast_login_success': 'Login successful!',
      'toast_fill_email_pwd': 'Please enter email and password',
      'toast_pwd_min6': 'Password must be at least 6 characters',
      'auth_err_email_in_use': 'This email is already registered',
      'auth_err_invalid_email': 'Invalid email format',
      'auth_err_wrong_pwd': 'Incorrect password',
      'auth_err_user_not_found': 'User not found',
      'auth_err_invalid_cred': 'Incorrect email or password',
      'auth_err_weak_pwd': 'Password is too weak',
      'auth_err_config': 'Firebase auth not configured. Please enable Email/Password in Firebase Console \u2192 Authentication \u2192 Sign-in method',
      'auth_err_network': 'Network connection failed, please check your network',
      'auth_err_too_many': 'Too many requests, please try again later',
      'auth_err_firebase': 'Firebase: Error (',
      'toast_logged_out': 'Logged out',
      'profile_logout': 'Log Out',
      'profile_vip_user': 'VIP Member',
      'profile_free_user': 'Free User',
      'profile_upgrade': 'Upgrade',
      'profile_expiry': 'Expires: ',
      'usage_free': 'Free',
      'usage_limit_reached': ' user ',
      'usage_limit_msg_1': ' usage limit reached (',
      'usage_limit_msg_2': ' times), ',
      'usage_vip_exhausted': 'quota exhausted for this period',
      'usage_upgrade': 'please upgrade to unlock more',
      'dc_no_image_data': 'Image generation complete, but no image data returned',
      'api_call_fail': 'API call failed',
      'image_gen_fail': 'Image generation failed',
      'ai_parse_fail': 'Failed to parse AI response',
      'unnamed': 'Untitled',
      'sim_record': 'Simulation record',
      'prev_sim_context': '\n\n[User\'s previous simulation records (for reference, maintain life continuity)]\n',
      'fm_hist_1': '2026-03-20 \u00B7 Startup vs Career Growth',
      'fm_hist_2': '2026-02-14 \u00B7 Study Abroad vs Domestic Development',
      'sb_sample_1': 'Amnesiac Robot',
      'sb_sample_2': 'Interstellar Traveler',
      'sb_sample_date_1': 'Mar 28',
      'sb_sample_date_2': 'Mar 25'
    }
  };

  // === INIT ===
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      createToggleButton();
      applyTranslations();
    });
  } else {
    createToggleButton();
    applyTranslations();
  }

  // Expose for external use
  window.applyI18n = applyTranslations;
})();
