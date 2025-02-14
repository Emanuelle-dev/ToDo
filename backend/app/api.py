import json
from ninja import Router
from .models import Task, User
from .schemas import TaskSchema, CreateTaskSchema

api = Router()

@api.get("/tasks", response=list[TaskSchema])
def list_tasks(request, title: str = None):
    if title:
        tasks = Task.objects.filter(title__icontains=title).all()
    else: tasks = Task.objects.all()    
    return tasks

@api.get("/tasks/{task_id}", response={200: TaskSchema, 404: dict})
def get_task(request, task_id: int):
    try:
        task = Task.objects.get(id=task_id)
        return task
    except Task.DoesNotExist:
        return 404, {"message": "Task not found"}

@api.post("/tasks", response={200: TaskSchema, 400: dict})
def create_task(request, task: CreateTaskSchema):
    if not task.title:
        return 400, {"message": "Title is required"}
    task_instance = Task.objects.create(
        title=task.title, 
        description=task.description, 
        priority=task.priority, 
        status=task.status, 
       )
    return task_instance

@api.put("/tasks/{task_id}", response={200: CreateTaskSchema, 404: dict, 400: dict})
def update_task(request, task_id: int, task_data: CreateTaskSchema):
    print("dados recebidos no update_task:", json.loads(request.body.decode()))
    try:
        task = Task.objects.get(id=task_id)
    except Task.DoesNotExist:
        return 404, {"message": "Task not found"}
    if not task_data.title:
        return 400, {"message": "Title is required"}
    
    for attr, value in task_data.dict().items():
        if value is not None:
            setattr(task, attr, value)
    task.save()
    return task

@api.delete("/tasks/{task_id}", response={204: None, 404: dict})
def delete_task(request, task_id: int):
    try:
        task = Task.objects.get(id=task_id)
        task.delete()
        return 204, None
    except Task.DoesNotExist:
        return 404, {"message": "Task not found" }