############################# Développed By Souahil ROUAI 2024 #############################

from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy import Column, Integer, String, Float, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import csv
from fastapi.responses import StreamingResponse


# Configuration de la base de données
DATABASE_URL = "sqlite:///./calculations.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Modèle de données
class Calculation(Base):
    __tablename__ = "calculations"

    id = Column(Integer, primary_key=True, index=True)
    expression = Column(String, index=True)
    result = Column(Float)

# Création des tables
Base.metadata.create_all(bind=engine)

# Initialisation de FastAPI
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Montre le répertoire static pour servir les fichiers statiques
app.mount("/static", StaticFiles(directory="static"), name="static")

# Modèle pour l'expression
class Expression(BaseModel):
    expression: str

@app.get("/", response_class=HTMLResponse)
async def get_index():
    with open("static/index.html") as f:
        return f.read()

def evaluate_rpn(expression: str) -> float:
    stack = []
    tokens = expression.split()
    for token in tokens:
        if token.lstrip('-').replace('.', '', 1).isdigit():  
            stack.append(float(token))
        else:
            if len(stack) < 2:
                raise ValueError("Not enough operands")
            b = stack.pop()
            a = stack.pop()
            if token == '+':
                stack.append(a + b)
            elif token == '-':
                stack.append(a - b)
            elif token == '*':
                stack.append(a * b)
            elif token == '/':
                stack.append(a / b)
            else:
                raise ValueError(f"Unknown operator: {token}")
    if len(stack) != 1:
        raise ValueError("Expréssion incorrect !")
    return stack[0]

@app.post("/calculate/")
async def calculate(exp: Expression):
    db: Session = SessionLocal()
    try:
        result = evaluate_rpn(exp.expression)
        calculation = Calculation(expression=exp.expression, result=result)
        db.add(calculation)
        db.commit()
        db.refresh(calculation)
        return {"expression": exp.expression, "result": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        db.close()

@app.get("/calculations/")
async def get_calculations(skip: int = 0, limit: int = 10):
    db: Session = SessionLocal()
    calculations = db.query(Calculation).offset(skip).limit(limit).all()
    return calculations

@app.get("/download/csv/")
async def download_csv():
    db: Session = SessionLocal()
    try:
        calculations = db.query(Calculation).all()

        def generate_csv():
            yield "id,expression,result\n"  
            for calc in calculations:
                yield f"{calc.id},{calc.expression},{calc.result}\n"

        return StreamingResponse(generate_csv(), media_type="text/csv", headers={"Content-Disposition": "attachment; filename=calculations.csv"})
    finally:
        db.close()
