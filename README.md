# CRM Tool

This is a CRM tool that allows you to manage your contacts, deals, and tasks.

## Backend API

### Setup

1. Create a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Running the Server

Start the FastAPI server with auto-reload:

```bash
uvicorn app.main:app --reload
```

- **API Docs (Swagger UI)**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

## Note

Note: This project is fully “AI-vibe coded” for educational purposes.

## License

MIT
