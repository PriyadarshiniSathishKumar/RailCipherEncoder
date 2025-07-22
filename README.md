# Cryptography Tool

## Overview

This is a Flask-based web application that provides encryption capabilities for two classical cipher methods: Rail Fence Cipher and Row Transposition Cipher. The application features a clean, dark-themed web interface built with Bootstrap and allows users to encrypt messages using either or both cipher methods.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: HTML5 with Bootstrap 5 (dark theme)
- **Styling**: Custom CSS with Bootstrap variables for consistent theming
- **JavaScript**: Vanilla JavaScript for clipboard functionality and user interactions
- **Theme**: Dark theme using Bootstrap's data-bs-theme="dark" attribute
- **Icons**: Font Awesome 6.4.0 for visual elements

### Backend Architecture
- **Framework**: Flask (Python web framework)
- **Structure**: Simple MVC pattern with:
  - `app.py`: Main Flask application with routes
  - `ciphers.py`: Business logic for encryption algorithms
  - `main.py`: Application entry point
  - `templates/`: HTML templates
  - `static/`: CSS, JavaScript, and other static assets

### Session Management
- Uses Flask's built-in session management with a secret key
- Environment variable `SESSION_SECRET` for production security
- Flash messaging system for user feedback

## Key Components

### Cipher Implementations (`ciphers.py`)
- **RailFenceCipher**: Implements the Rail Fence cipher algorithm
  - Configurable number of rails
  - Handles direction changes in the fence pattern
  - Input sanitization (removes spaces, converts to uppercase)

### Flask Application (`app.py`)
- **Routes**:
  - `/`: Main page displaying the encryption form
  - `/encrypt`: POST endpoint for processing encryption requests
- **Error Handling**: Input validation with user-friendly error messages
- **Logging**: Debug-level logging configuration

### Frontend Features
- **Responsive Design**: Bootstrap-based responsive layout
- **Copy to Clipboard**: JavaScript functionality for copying results
- **User Feedback**: Flash messages for errors and status updates
- **Form Validation**: Client-side and server-side input validation

## Data Flow

1. **User Input**: User enters message and cipher keys through the web form
2. **Form Submission**: POST request sent to `/encrypt` endpoint
3. **Validation**: Server validates input parameters
4. **Processing**: Cipher algorithms process the message
5. **Response**: Results displayed on the same page with copy functionality
6. **Error Handling**: Invalid inputs result in flash messages and redirect

## External Dependencies

### Python Packages
- **Flask**: Web framework for the application
- **Standard Library**: os, logging modules

### Frontend Dependencies (CDN)
- **Bootstrap 5**: CSS framework with dark theme
- **Font Awesome 6.4.0**: Icon library
- **Bootstrap JavaScript**: For interactive components

### Browser APIs
- **Clipboard API**: For copy-to-clipboard functionality
- **Document API**: Fallback clipboard implementation

## Deployment Strategy

### Environment Configuration
- **Development**: Uses default secret key from environment or fallback
- **Production Ready**: Configurable via environment variables
- **Logging**: Debug level logging for development

### File Structure
```
/
├── app.py              # Main Flask application
├── main.py             # Entry point
├── ciphers.py          # Cipher implementations
├── templates/
│   └── index.html      # Main page template
└── static/
    ├── style.css       # Custom styles
    └── script.js       # JavaScript functionality
```

### Scalability Considerations
- **Stateless Design**: No persistent data storage required
- **Session Management**: Minimal session usage (only for flash messages)
- **Static Assets**: Separated for efficient caching
- **Modular Ciphers**: Easy to add new cipher implementations

### Security Features
- **Input Sanitization**: Message cleaning and validation
- **Error Handling**: Prevents information leakage through error messages
- **Session Security**: Configurable secret key for session management

## Working Video - https://drive.google.com/file/d/1kwn4JbQ5B9USg9pQgzcrY0uxEuALw5_V/view?usp=sharing
### Screenshots
<img width="1919" height="871" alt="Screenshot 2025-07-22 175355" src="https://github.com/user-attachments/assets/4498bf03-1468-43fb-af58-69e2b0e06328" />
<img width="1919" height="868" alt="Screenshot 2025-07-22 175412" src="https://github.com/user-attachments/assets/3acd7eeb-2e73-4432-80d2-3e889d8a0a3e" />
<img width="1919" height="875" alt="Screenshot 2025-07-22 175422" src="https://github.com/user-attachments/assets/d4ed5ac0-2742-4cb1-a5a3-cbd58cedac32" />


