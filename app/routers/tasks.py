from fastapi import APIRouter, HTTPException
from typing import List
from app.models import Task, TaskCreate

router = APIRouter(
    prefix="/tasks",
    tags=["tasks"],
)

# In-memory storage
tasks_db = []
current_id = 0

@router.get("/", response_model=List[Task])
def get_tasks():
    return tasks_db

@router.get("/{task_id}", response_model=Task)
def get_task(task_id: int):
    for task in tasks_db:
        if task.id == task_id:
            return task
    raise HTTPException(status_code=404, detail="Task not found")

@router.post("/", response_model=Task)
def create_task(task: TaskCreate):
    global current_id
    current_id += 1
    new_task = Task(id=current_id, **task.model_dump())
    tasks_db.append(new_task)
    return new_task

@router.put("/{task_id}", response_model=Task)
def update_task(task_id: int, task_update: TaskCreate):
    for i, task in enumerate(tasks_db):
        if task.id == task_id:
            updated_task = Task(id=task_id, **task_update.model_dump())
            tasks_db[i] = updated_task
            return updated_task
    raise HTTPException(status_code=404, detail="Task not found")

@router.delete("/{task_id}")
def delete_task(task_id: int):
    global tasks_db
    for i, task in enumerate(tasks_db):
        if task.id == task_id:
            del tasks_db[i]
            return {"message": "Task deleted"}
    raise HTTPException(status_code=404, detail="Task not found")
