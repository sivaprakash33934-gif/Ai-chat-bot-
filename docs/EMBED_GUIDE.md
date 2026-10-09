# SYNEX Autonomous Commercial Agent — Embed Integration Guide

The SYNEX Website AI Agent is an autonomous, retrieval-grounded commercial copilot designed for high-trust B2B commerce. This guide covers embedding the customer-facing chat widget on any external website or e-commerce storefront.

---

## 1. Quick Start Installation

Embed the widget by adding a single `<script>` tag immediately before the closing `</body>` tag of your website:

```html
<script 
  src="https://your-domain.com/synex-widget-embed.js" 
  data-tenant-id="senthil-traders" 
  data-position="bottom-right" 
  data-theme="light">
</script>
```

---

## 2. Configuration Attributes

| Attribute | Required | Values | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `data-tenant-id` | **Yes** | `senthil-traders` \| `kavin-exports` \| `murugan-textiles` | *None* | Verifies the authorized commercial tenant. Rejecting unauthorized tenants protects isolation. |
| `data-position` | No | `bottom-right` \| `bottom-left` | `bottom-right` | Anchors the floating launcher and popup modal on the host screen. |
| `data-theme` | No | `light` \| `dark` | `light` | Sets the visual aesthetic. `dark` inverts the interface to ink canvas (`#121210`) with paper text. |

---

## 3. Example HTML Implementation

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Precision Tools Storefront</title>
</head>
<body>
  <h1>Welcome to Precision Tools</h1>
  <p>Browse our catalog of brass rods and industrial fasteners.</p>

  <!-- SYNEX Client Embed -->
  <script 
    src="https://your-domain.com/synex-widget-embed.js" 
    data-tenant-id="senthil-traders" 
    data-position="bottom-right" 
    data-theme="light">
  </script>
</body>
</html>
```

---

## 4. Security & Content Security Policy (CSP)

### Tenant Whitelisting
The embed loader script executes client-side authentication against a cryptographic whitelist of allowed enterprise tenants. If an unrecognized `data-tenant-id` is supplied, the script logs an error and refuses to render:

```
[SYNEX Embed Error] Invalid or unauthorized data-tenant-id: "unknown-tenant"
```

### Recommended Content Security Policy (CSP) Headers
When hosting the embed on third-party domains, configure your web server with the following CSP directives:

```http
Content-Security-Policy: frame-src 'self' https://your-synex-domain.com; script-src 'self' https://your-synex-domain.com;
```

---

## 5. Accessibility & Motion Compliance (WCAG 2.1 AA)

* **Keyboard Trapping:** When the chat modal is opened, focus moves adaptively to the composer input on desktop, or to the close button on touch devices to avoid virtual keyboard occlusion.
* **Escape Key Dismissal:** Pressing `Escape` anywhere within the chat window closes the modal and immediately restores focus to the launcher.
* **Reduced Motion:** Fully complies with `prefers-reduced-motion: reduce`. Multi-phase state animations and token streaming are bypassed in favor of instant static responses.
* **Zero Drop-Shadows:** Built upon the Swiss Porcelain / Editorial Ledger design tokens with 1px hairline rules and high-contrast typography.
