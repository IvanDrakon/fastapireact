from fastapi import FastAPI, HTTPException, Depends, Body
from typing import Annotated, List
from sqlalchemy.orm import Session
from schemas import TransactionModel, TransactionBase
from database import SessionLocal, engine
import crud, models
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind=engine)


@app.post("/transactions/", response_model=TransactionModel)
async def create_transaction(transaction: TransactionBase, db: db_dependency):
    return crud.create_transaction(transaction=transaction, db=db)


@app.get("/transactions/", response_model=List[TransactionModel])
async def read_transactions(db: db_dependency, skip: int = 0, limit: int = 100):
    transactions = crud.get_transactions(db=db, skip=skip, limit=limit)
    return transactions


@app.get("/transactions/{id}", response_model=TransactionModel)
async def read_transaction(id: int, db: db_dependency):
    transaction = crud.get_transaction(db=db, id=id)
    if transaction is None:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return transaction


@app.delete("/transactions/{id}", status_code=200)
async def delete_transaction(id: int, db: db_dependency):
    transaction = db.query(models.Transaction).filter_by(id=id).first()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction not found")
    db.delete(transaction)
    db.commit()
    return {"message": "Deleted"}


@app.put("/transactions/{id}", response_model=TransactionModel)
async def update_transaction(id: int, db: db_dependency, transaction: TransactionBase):
    transaction_db = db.query(models.Transaction).filter_by(id=id).first()
    if transaction_db is None:
        raise HTTPException(status_code=404, detail="Transaction not found")
    for key, value in transaction.model_dump().items():
        setattr(transaction_db, key, value)
    db.commit()
    db.refresh(transaction_db)
    return transaction_db
