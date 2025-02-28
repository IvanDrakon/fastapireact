from sqlalchemy.orm import Session
import models
import schemas


def get_transaction(db: Session, id: int):
    return db.query(models.Transaction).get(id)


def get_transactions(db: Session, skip: int = 0,  limit: int = 100):
    return db.query(models.Transaction).offset(skip).limit(limit).all()


def create_transaction(db: Session, transaction: schemas.TransactionBase):
    db_transaction = models.Transaction(**transaction.model_dump())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction
