# Contributing to Animal Welfare NGO Website

Thank you for your interest in contributing to the Animal Welfare NGO website! This document provides guidelines for contributing to the project.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, Node version)

### Suggesting Features

Feature suggestions are welcome! Please:
- Check if the feature already exists or is planned
- Provide clear use cases
- Explain why it would benefit the project

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Follow coding standards** (see below)
5. **Test your changes**
6. **Commit with clear messages**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
7. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Create a Pull Request**

## 📝 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types (avoid `any`)
- Use interfaces for object shapes
- Export types from `src/types/`

### Code Style

- Follow the ESLint configuration
- Use Prettier for formatting
- Run `npm run format` before committing
- Use meaningful variable names
- Add comments for complex logic

### Component Structure

```typescript
// Import order: React, Next.js, third-party, local
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

// Props interface
interface ComponentProps {
  title: string;
  description?: string;
}

// Component
export function Component({ title, description }: ComponentProps) {
  // Hooks
  const [state, setState] = useState(false);

  // Handlers
  const handleClick = () => {
    setState(true);
  };

  // Render
  return (
    <div>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
      <Button onClick={handleClick}>Click me</Button>
    </div>
  );
}
```

### File Naming

- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Constants: `UPPER_SNAKE_CASE`
- Folders: `kebab-case`

### Git Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

Examples:
```
feat: add donation receipt generation
fix: resolve payment gateway timeout issue
docs: update setup instructions
refactor: optimize database queries
```

## 🧪 Testing

- Test your changes thoroughly
- Test on different screen sizes
- Test payment flows in test mode
- Verify database migrations work

## 📚 Documentation

- Update README.md if adding features
- Add JSDoc comments for functions
- Update SETUP_GUIDE.md if changing setup
- Document API endpoints

## 🔒 Security

- Never commit sensitive data
- Use environment variables
- Validate all user inputs
- Follow security best practices
- Report security issues privately

## 🎨 UI/UX Guidelines

- Follow existing design patterns
- Ensure responsive design
- Maintain accessibility (WCAG 2.1)
- Use shadcn/ui components
- Test on mobile devices

## 📦 Dependencies

- Discuss before adding new dependencies
- Prefer well-maintained packages
- Check bundle size impact
- Update package.json properly

## 🚀 Pull Request Process

1. Update documentation
2. Add tests if applicable
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Request review from maintainers
6. Address review feedback
7. Squash commits if requested

## ✅ Pull Request Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests passing
- [ ] Responsive design verified
- [ ] Accessibility checked

## 🌟 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

## 📞 Questions?

- Open a discussion on GitHub
- Check existing issues
- Review documentation

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Animal Welfare NGO! 🐾