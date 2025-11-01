from fastapi import FastAPI, Depends, HTTPException, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from backend import models, database, auth
from backend.utils.file_handler import save_file
from backend.utils.stats import process_csv

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

# Allow frontend (React) requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # in production use specific origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/register")
def register(username: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    user_exists = db.query(models.User).filter(models.User.username == username).first()
    if user_exists:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_pw = auth.get_password_hash(password)
    user = models.User(username=username, password=hashed_pw)
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": "User registered successfully"}

@app.post("/login")
def login(username: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user or not auth.verify_password(password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = auth.create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}

@app.post("/upload")
def upload_csv(file: UploadFile, db: Session = Depends(get_db)):
    file_path = save_file(file)
    result = process_csv(file_path)
    return result
