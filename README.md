# Boliyan Electron App

A Punjabi transliteration application built with Electron, React, and Python. This app provides a desktop interface for transliterating text between different scripts.

## Features

- 🖥️ **Desktop Application**: Native desktop app built with Electron
- 🌐 **Web Interface**: Modern React frontend with beautiful UI
- 🐍 **Python Backend**: Flask API with machine learning models
- 🔄 **Real-time Transliteration**: Instant text conversion
- 📱 **Cross-platform**: Works on Windows, macOS, and Linux

## Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Boliyan-Electron-F
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```
   
   This command will:
   - Install Node.js dependencies for the root project
   - Install frontend dependencies
   - Install Python dependencies in the virtual environment

3. **Set up Python virtual environment** (if not done automatically)
   ```bash
   cd backend
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   
   pip install -r requirements.txt
   cd ..
   ```

## Development

### Running in Development Mode

```bash
npm run dev
```

This will:
- Start the React development server (frontend)
- Start the Python Flask backend
- Launch the Electron app when both servers are ready

### Running Individual Components

- **Frontend only**: `npm run dev:frontend`
- **Backend only**: `npm run dev:backend`
- **Electron only**: `npm start` (requires both frontend and backend to be running)

## Building for Production

### Build the Frontend

```bash
npm run build
```

### Create Distribution Packages

```bash
# For all platforms
npm run dist

# For specific platforms
npm run dist:win    # Windows
npm run dist:mac    # macOS
npm run dist:linux  # Linux
```

The built applications will be available in the `dist` folder.

## Project Structure

```
Boliyan-Electron-F/
├── main.js                 # Electron main process
├── package.json            # Root package.json with Electron config
├── frontend/               # React frontend application
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/                # Python Flask backend
│   ├── app.py
│   ├── models/
│   ├── checkpoints/
│   └── requirements.txt
└── dist/                   # Built applications (after build)
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development environment |
| `npm run dev:frontend` | Start React development server |
| `npm run dev:backend` | Start Python Flask backend |
| `npm start` | Start Electron app |
| `npm run build` | Build React frontend |
| `npm run dist` | Build and package for distribution |
| `npm run install:all` | Install all dependencies |

## Troubleshooting

### Common Issues

1. **Python virtual environment not found**
   - Run `npm run install:all` to set up the environment
   - Make sure Python is installed and accessible

2. **Port conflicts**
   - The frontend runs on port 5173
   - The backend runs on port 5000
   - Make sure these ports are available

3. **Build errors**
   - Ensure all dependencies are installed
   - Check that the frontend builds successfully before packaging

4. **Electron app not starting**
   - Check that both frontend and backend are running
   - Look for error messages in the console

### Development Tips

- Use `Ctrl+Shift+I` (or `Cmd+Option+I` on Mac) to open DevTools
- Check the console for Python backend logs
- The app will automatically restart the Python process if it crashes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions, please open an issue on the GitHub repository. 