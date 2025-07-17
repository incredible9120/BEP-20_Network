# Unified Stylesheet System

This directory contains the unified stylesheet system for the entire application. All styles have been consolidated into a single, comprehensive CSS file for better maintainability and performance.

## File Structure

```
styles/
├── unified.css          # Complete unified stylesheet
└── README.md           # This documentation
```

## Overview

The unified stylesheet system consolidates all CSS into a single file (`unified.css`) that includes:

- **Design Tokens**: Colors, typography, spacing, shadows, and transitions
- **Base Styles**: Reset, typography, and layout foundations
- **Component Styles**: Buttons, forms, cards, alerts, badges, loading states
- **App-Specific Styles**: Dashboard components and layouts
- **Utility Classes**: Text alignment, colors, backgrounds, spacing
- **Responsive Design**: Mobile-first responsive breakpoints
- **Accessibility**: Focus styles, high contrast, reduced motion support

## Design Tokens

All design tokens are defined in CSS custom properties (variables):

### Colors
- **Primary**: `#6366f1` (Indigo)
- **Secondary**: `#667eea` (Blue)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Yellow)
- **Error**: `#ef4444` (Red)
- **Info**: `#3b82f6` (Blue)

### Typography
- **Font Family**: Inter, Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Font Sizes**: `--text-xs` to `--text-6xl`
- **Font Weights**: `--font-light` to `--font-extrabold`

### Spacing
- **Space Scale**: `--space-1` (0.25rem) to `--space-32` (8rem)

### Border Radius
- **Radius Scale**: `--radius-sm` to `--radius-3xl`

### Shadows
- **Shadow Scale**: `--shadow-sm` to `--shadow-2xl`

## Usage

### 1. Import the Unified Stylesheet

In your main App component, import the unified stylesheet:

```jsx
// App.js
import React from 'react';
import './styles/unified.css';
import HUMTokenDashboard from './components/HUMTokenDashboard';

function App() {
  return (
    <div className="App">
      <div className="container">
        <HUMTokenDashboard />
      </div>
    </div>
  );
}
```

### 2. Use Design Tokens

Always use CSS custom properties instead of hardcoded values:

```css
/* ✅ Good */
.my-component {
  color: var(--primary-color);
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

/* ❌ Bad */
.my-component {
  color: #6366f1;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

### 3. Use Component Classes

The system provides pre-built component styles:

```jsx
// Buttons
<button className="btn btn-primary">Primary Button</button>
<button className="btn btn-secondary">Secondary Button</button>

// Cards
<div className="card">
  <div className="card-header">
    <h3 className="card-title">Card Title</h3>
  </div>
  <div className="card-body">
    Card content here
  </div>
</div>

// Forms
<div className="form-group">
  <label className="form-label">Email</label>
  <input type="email" className="form-input" />
</div>

// Alerts
<div className="alert alert-success">
  Success message
</div>
```

### 4. Use Utility Classes

```jsx
// Layout
<div className="grid grid-cols-3 gap-6">
  <div className="bg-primary text-white p-4 rounded-lg">
    Content
  </div>
</div>

// Typography
<h2 className="text-center font-bold text-primary">
  Centered Bold Title
</h2>
```

## Component Library

### Buttons
- `.btn` - Base button
- `.btn-primary`, `.btn-secondary`, `.btn-success`, `.btn-warning`, `.btn-error`
- `.btn-sm`, `.btn-lg` - Size variants
- `.btn-block` - Full width
- `.btn-group` - Button group container

### Forms
- `.form-group` - Form field container
- `.form-label` - Form labels
- `.form-input` - Input fields
- `.form-error` - Error messages
- `.form-row`, `.form-col` - Form layout
- `.form-actions` - Form action buttons

### Cards
- `.card` - Base card
- `.card-header`, `.card-body`, `.card-footer`
- `.card-title`, `.card-subtitle`
- `.card-actions` - Card action buttons

### Alerts
- `.alert` - Base alert
- `.alert-success`, `.alert-warning`, `.alert-error`, `.alert-info`

### Badges
- `.badge` - Base badge
- `.badge-primary`, `.badge-secondary`, `.badge-success`, `.badge-warning`, `.badge-error`

### Loading
- `.loading-spinner` - Spinning loader
- `.loading-dots` - Animated dots

### Modals
- `.modal-overlay` - Modal backdrop
- `.modal` - Modal container
- `.modal-header`, `.modal-title`, `.modal-close`

### Tooltips
- `.tooltip` - Tooltip container
- `.tooltip-content` - Tooltip content

## Layout System

### Grid
```jsx
<div className="grid grid-cols-3 gap-6">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

### Sections
```jsx
<section className="section">
  <div className="section-header">
    <h2 className="section-title">Section Title</h2>
    <p className="section-subtitle">Section description</p>
  </div>
  <div className="section-content">
    Content here
  </div>
</section>
```

## Responsive Design

The system uses mobile-first responsive design with these breakpoints:

- **1200px+**: Desktop
- **992px-1199px**: Large tablet
- **768px-991px**: Tablet
- **576px-767px**: Mobile
- **<576px**: Small mobile

All components are responsive by default and adapt to different screen sizes.

## Accessibility

The unified system includes:

- **Focus styles** for keyboard navigation
- **High contrast mode** support
- **Reduced motion** support
- **Screen reader** utilities
- **Semantic color** usage

## Benefits of Unified Approach

### 1. Performance
- Single CSS file reduces HTTP requests
- Eliminates duplicate styles
- Optimized bundle size

### 2. Maintainability
- All styles in one place
- No need to manage multiple imports
- Easier to find and update styles

### 3. Consistency
- Single source of truth for design tokens
- Consistent styling across all components
- Reduced chance of style conflicts

### 4. Developer Experience
- No need to remember which file to import
- Faster development with all styles available
- Clearer project structure

## Customization

To customize the design system:

1. **Modify design tokens** in the `:root` section of `unified.css`
2. **Add new components** in the appropriate section
3. **Extend utility classes** as needed

### Adding New Design Tokens

```css
:root {
  /* Add new colors */
  --custom-color: #your-color;
  
  /* Add new spacing */
  --space-custom: 2.5rem;
  
  /* Add new font sizes */
  --text-custom: 1.75rem;
}
```

### Adding New Components

```css
/* Add in the appropriate section of unified.css */
.custom-component {
  background: var(--white);
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.custom-component-variant {
  background: var(--primary-color);
  color: var(--white);
}
```

## Migration from Multiple Files

If you're migrating from multiple CSS files:

1. **Remove individual CSS imports** from components
2. **Import unified.css** in your main App component
3. **Verify all styles are working** correctly
4. **Remove old CSS files** to clean up the project

## Best Practices

1. **Use design tokens** for all values
2. **Leverage existing components** when possible
3. **Follow responsive patterns** established in the system
4. **Test on different screen sizes**
5. **Maintain accessibility** standards
6. **Keep the unified file organized** with clear sections

## Conclusion

The unified stylesheet system provides a streamlined, maintainable, and performant approach to styling the entire application. All styles are consolidated in one place, making it easier to maintain consistency and make updates across the entire application. 