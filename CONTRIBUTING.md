# Contributing to AWS Services Monitor

Thank you for your interest in contributing to AWS Services Monitor! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, Node version, etc.)

### Suggesting Features

1. Check if the feature has been suggested
2. Create an issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach

### Pull Requests

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes following our coding standards
4. Add tests for new functionality
5. Ensure all tests pass: `npm test` and `pytest`
6. Commit with conventional commits: `feat: add new feature`
7. Push to your fork: `git push origin feature/your-feature-name`
8. Create a Pull Request with:
   - Clear description of changes
   - Reference to related issues
   - Screenshots/videos if UI changes

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/Proyecto_aws.git

# Install dependencies
npm install
cd backend && pip install -r requirements.txt

# Run development servers
npm run dev
python backend/main.py
```

## Coding Standards

### Frontend (TypeScript/React)

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Use functional components with hooks
- Write meaningful component and function names
- Add JSDoc comments for complex functions

### Backend (Python/FastAPI)

- Follow PEP 8 style guide
- Use type hints for all functions
- Write docstrings for modules, classes, and functions
- Use async/await for I/O operations
- Handle errors gracefully

### Testing

- Write tests for new features
- Maintain test coverage above 80%
- Frontend: Vitest for unit tests, Playwright for E2E
- Backend: pytest for unit and integration tests

### Git Commits

Use Conventional Commits format:

```
feat: add new feature
fix: fix bug
docs: update documentation
style: code formatting
refactor: code refactoring
test: add tests
chore: maintenance tasks
```

## Project Structure Guidelines

- Keep components small and focused
- Separate business logic from UI components
- Use custom hooks for reusable logic
- Follow the existing folder structure
- Update types when adding new features

## Documentation

- Update README.md for significant changes
- Add JSDoc/docstring comments
- Update API documentation
- Include code examples when helpful

## Review Process

1. Automated checks must pass (CI/CD)
2. Code review by maintainers
3. Address feedback and update PR
4. Final approval and merge

## Questions?

Feel free to open an issue for any questions or reach out to the maintainers.

Thank you for contributing!
