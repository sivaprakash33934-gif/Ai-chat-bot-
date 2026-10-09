/**
 * SYNEX Autonomous Commercial Agent — Client Embed Snippet
 * 
 * USAGE:
 * Add the following script tag to any webpage before </body>:
 * <script 
 *   src="https://your-domain.com/synex-widget-embed.js" 
 *   data-tenant-id="senthil-traders" 
 *   data-position="bottom-right" 
 *   data-theme="light">
 * </script>
 * 
 * ATTRIBUTES:
 * - data-tenant-id: Allowed tenants: 'senthil-traders' | 'kavin-exports' | 'murugan-textiles'
 * - data-position: 'bottom-right' (default) | 'bottom-left'
 * - data-theme: 'light' (default) | 'dark'
 */

(function () {
  'use strict';

  // Addendum A: Security Whitelist
  var ALLOWED_TENANTS = ['senthil-traders', 'kavin-exports', 'murugan-textiles'];

  var currentScript = document.currentScript || (function () {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  if (!currentScript) return;

  var tenantId = currentScript.getAttribute('data-tenant-id');
  var position = currentScript.getAttribute('data-position') || 'bottom-right';
  var theme = currentScript.getAttribute('data-theme') || 'light';

  // Validate tenant security
  if (!tenantId || ALLOWED_TENANTS.indexOf(tenantId) === -1) {
    console.error('[SYNEX Embed Error] Invalid or unauthorized data-tenant-id: "' + tenantId + '". Allowed tenants:', ALLOWED_TENANTS);
    return;
  }

  // Derive base URL from script origin or current location
  var scriptSrc = currentScript.src || '';
  var baseUrl = '';
  try {
    if (scriptSrc) {
      var urlObj = new URL(scriptSrc);
      baseUrl = urlObj.origin;
    }
  } catch (e) {
    baseUrl = window.location.origin;
  }

  var iframeUrl = (baseUrl || '') + '/embed?tenant=' + encodeURIComponent(tenantId) + '&theme=' + encodeURIComponent(theme);

  // Create Launcher Button
  var launcher = document.createElement('button');
  launcher.id = 'synex-embed-launcher';
  launcher.setAttribute('aria-label', 'Open SYNEX AI Chat');
  launcher.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg><span style="font-family:monospace;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">CHAT</span>';

  var isLeft = position === 'bottom-left';
  var launcherStyle = {
    position: 'fixed',
    bottom: '20px',
    zIndex: '2147483640',
    display: 'flex',
    alignItems: 'center',
    height: '44px',
    padding: '0 16px',
    backgroundColor: '#121210',
    color: '#FBFBF9',
    border: '1px solid rgba(18, 18, 16, 0.15)',
    borderRadius: '22px',
    cursor: 'pointer',
    boxShadow: 'none',
    outline: 'none',
    transition: 'transform 0.15s ease'
  };
  launcherStyle[isLeft ? 'left' : 'right'] = '20px';

  for (var key in launcherStyle) {
    launcher.style[key] = launcherStyle[key];
  }

  // Create Iframe Modal Container
  var modal = document.createElement('div');
  modal.id = 'synex-embed-modal';
  var modalStyle = {
    position: 'fixed',
    bottom: '76px',
    zIndex: '2147483645',
    width: '400px',
    maxWidth: 'calc(100vw - 32px)',
    height: '620px',
    maxHeight: 'calc(100vh - 96px)',
    display: 'none',
    backgroundColor: '#FFFFFF',
    border: '1px solid rgba(18, 18, 16, 0.12)',
    borderRadius: '4px',
    boxShadow: 'none',
    overflow: 'hidden'
  };
  modalStyle[isLeft ? 'left' : 'right'] = '20px';

  for (var mKey in modalStyle) {
    modal.style[mKey] = modalStyle[mKey];
  }

  var iframe = document.createElement('iframe');
  iframe.src = iframeUrl;
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  iframe.setAttribute('title', 'SYNEX Chat Assistant');

  modal.appendChild(iframe);

  var isOpen = false;
  launcher.addEventListener('click', function () {
    isOpen = !isOpen;
    modal.style.display = isOpen ? 'block' : 'none';
    launcher.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  window.addEventListener('message', function (event) {
    if (event.data === 'synex:close') {
      isOpen = false;
      modal.style.display = 'none';
      launcher.focus();
    }
  });

  document.body.appendChild(launcher);
  document.body.appendChild(modal);
})();
