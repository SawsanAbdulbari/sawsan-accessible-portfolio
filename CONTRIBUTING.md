# Contributing to Accessible Portfolio

Thank you for your interest in contributing to this accessible portfolio project! This project serves as a demonstration of web accessibility best practices and WCAG 2.1 Level AA compliance.

## 🎯 Project Goals

This project aims to:
- Demonstrate comprehensive web accessibility implementation
- Maintain perfect accessibility scores (100/100 Lighthouse, 0 axe violations)
- Serve as an educational resource for accessibility best practices
- Showcase inclusive design principles

## 🔄 How to Contribute

### 1. Types of Contributions

We welcome the following contributions:

#### 🐛 Bug Reports
- Accessibility barriers or issues
- Browser compatibility problems
- Broken functionality

#### ✨ Feature Requests
- Additional accessibility features
- Enhanced screen reader support
- Better keyboard navigation

#### 📚 Documentation
- Improved accessibility documentation
- Code examples and tutorials
- Testing procedures

#### 🧪 Testing
- Cross-browser accessibility testing
- Screen reader testing reports
- Mobile accessibility validation

### 2. Before You Start

Please:
- Review the [accessibility statement](accessibility.html)
- Read the [technical implementation guide](TECHNICAL_IMPLEMENTATION.md)
- Check existing issues to avoid duplicates
- Test with accessibility tools before submitting

## 🛠️ Development Setup

### Prerequisites
- Node.js 16+ and npm 8+
- Modern web browser
- Screen reader software (NVDA, JAWS, or VoiceOver)

### Local Development
```bash
# Clone the repository
git clone https://github.com/sawsanabdulbari/sawsan-accessible-portfolio.git
cd sawsan-accessible-portfolio

# Install dependencies
npm install

# Start local server
npm run serve

# Open in browser
open http://localhost:8000
```

### Testing Setup
```bash
# Run all accessibility tests
npm run test:all

# Individual test commands
npm run test:accessibility  # Pa11y testing
npm run test:axe           # axe-core testing
npm run test:lighthouse    # Lighthouse audit
npm run validate:html      # HTML validation
npm run validate:css       # CSS validation
```

## ♿ Accessibility Requirements

All contributions MUST maintain:

### 🏆 Perfect Scores
- **Lighthouse Accessibility**: 100/100
- **axe DevTools**: 0 violations
- **WAVE**: 0 errors
- **HTML Validation**: No errors

### 📋 Standards Compliance
- **WCAG 2.1 Level AA**: Full compliance
- **Section 508**: Compliance
- **Semantic HTML**: Proper use of HTML5 elements
- **ARIA**: Correct implementation when needed

### 🧪 Testing Requirements
All changes must be tested with:
- **Keyboard navigation**: Full site functionality
- **Screen readers**: NVDA, JAWS, or VoiceOver
- **200% zoom**: No horizontal scrolling
- **Mobile devices**: Touch accessibility
- **Multiple browsers**: Chrome, Firefox, Safari, Edge

## 📝 Submission Guidelines

### 1. Issue Template
When reporting accessibility issues, include:

```markdown
**Accessibility Issue Description**
Brief description of the barrier

**Steps to Reproduce**
1. Open page in browser
2. Use [assistive technology]
3. Attempt to [action]
4. Observe [problem]

**Expected Behavior**
What should happen for accessibility

**Actual Behavior**
What actually happens

**Testing Environment**
- Browser: [Chrome 91, Firefox 89, etc.]
- Screen Reader: [NVDA 2021.1, JAWS 2021, etc.]
- Operating System: [Windows 10, macOS 11, etc.]

**Accessibility Tools Used**
- [ ] axe DevTools
- [ ] WAVE
- [ ] Lighthouse
- [ ] Keyboard navigation
- [ ] Screen reader testing

**Severity**
- [ ] Critical (blocks core functionality)
- [ ] High (major accessibility barrier)
- [ ] Medium (minor accessibility issue)
- [ ] Low (enhancement suggestion)
```

### 2. Pull Request Process

#### Before Submitting
- [ ] Run all accessibility tests (`npm run test:all`)
- [ ] Test with keyboard navigation
- [ ] Test with screen reader
- [ ] Validate HTML and CSS
- [ ] Check 200% zoom functionality
- [ ] Test on mobile devices

#### PR Template
```markdown
**Description**
Brief description of changes

**Accessibility Impact**
How this affects accessibility

**Testing Completed**
- [ ] Lighthouse: 100/100 accessibility score
- [ ] axe DevTools: 0 violations
- [ ] WAVE: 0 errors
- [ ] Keyboard navigation: Full functionality
- [ ] Screen reader: [Specify which one tested]
- [ ] 200% zoom: No horizontal scroll
- [ ] Mobile: Touch accessibility verified

**Screenshots/Videos**
Include accessibility testing screenshots

**Checklist**
- [ ] Code follows accessibility best practices
- [ ] All tests pass
- [ ] Documentation updated if needed
- [ ] No console errors
- [ ] Semantic HTML used
- [ ] ARIA attributes correct
```

### 3. Code Standards

#### HTML Guidelines
```html
<!-- ✅ Good: Semantic HTML with proper ARIA -->
<main id="main" role="main">
  <section aria-labelledby="heading-id">
    <h2 id="heading-id">Section Title</h2>
    <button aria-describedby="help-text">Action</button>
    <div id="help-text">Helpful context</div>
  </section>
</main>

<!-- ❌ Bad: Non-semantic HTML -->
<div>
  <div>Section Title</div>
  <div onclick="doSomething()">Action</div>
</div>
```

#### CSS Guidelines
```css
/* ✅ Good: Accessible focus indicators */
button:focus {
  outline: 2px solid #1976d2;
  outline-offset: 2px;
}

/* ✅ Good: Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
  }
}

/* ❌ Bad: Removed focus outline */
button:focus {
  outline: none; /* Never do this without alternative */
}
```

#### JavaScript Guidelines
```javascript
// ✅ Good: Accessible dynamic content
function updateContent(newText) {
  const element = document.getElementById('dynamic-content');
  element.textContent = newText;
  
  // Announce to screen readers
  announceToScreenReader(`Content updated: ${newText}`);
}

// ❌ Bad: Inaccessible dynamic changes
function updateContent(newText) {
  document.getElementById('dynamic-content').innerHTML = newText;
  // Screen readers won't know content changed
}
```

## 🔍 Review Process

### 1. Automated Checks
All PRs must pass:
- GitHub Actions accessibility tests
- HTML/CSS validation
- Cross-browser compatibility tests

### 2. Manual Review
Maintainers will verify:
- Accessibility standards compliance
- Code quality and documentation
- Testing coverage
- User experience impact

### 3. Accessibility Testing
Required testing includes:
- Screen reader compatibility
- Keyboard navigation
- Color contrast verification
- Mobile accessibility
- Zoom functionality

## 📚 Resources

### Accessibility Guidelines
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Articles](https://webaim.org/articles/)

### Testing Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Pa11y](https://pa11y.org/)

### Screen Readers
- [NVDA](https://www.nvaccess.org/) (Windows - Free)
- [JAWS](https://www.freedomscientific.com/products/software/jaws/) (Windows)
- [VoiceOver](https://www.apple.com/accessibility/mac/vision/) (macOS/iOS)

## 🙋‍♀️ Questions?

- Create an issue for questions
- Tag issues with `question` label
- Check existing documentation first
- Be specific about accessibility context

## 🎉 Recognition

Contributors who help maintain accessibility standards will be:
- Listed in project acknowledgments
- Credited in accessibility documentation
- Invited to review future accessibility PRs

Thank you for helping make the web more accessible! 🌟

---

**Remember**: Every change should improve or maintain accessibility. When in doubt, test with real users and assistive technologies.
