from ninja import Router
from .models import Task
from .schemas import TaskSchema, CreateTaskSchema

api = Router()

@api.get("/tasks", response=list[TaskSchema])
def list_tasks(request, title: str = None):
    if title:
        tasks = Task.objects.filter(title__icontains=title).all()
        return tasks
    return None

@api.get("/tasks/{task_id}", response={200: TaskSchema, 404: dict})
def get_task(request, task_id: int):
    try:
        task = Task.objects.get(id=task_id)
        return task
    except Task.DoesNotExist:
        return 404, {"message": "Task not found"}

@api.post("/tasks", response={200: CreateTaskSchema, 400: dict})
def create_task(request, task: CreateTaskSchema):
    if not task.title:
        return 400, {"message": "Title is required"}
    if not task.priority:
        return 400, {"message": "Priority is required"}
    task = Task.objects.create(**task.dict())
    return task

@api.put("/tasks/{task_id}", response=CreateTaskSchema)
def update_task(request, task_id: int, task_data: CreateTaskSchema):
    task = Task.objects.get(id=task_id)
    for attr, value in task_data.dict().items():
        setattr(task, attr, value)
    task.save()
    return task

@api.delete("/tasks/{task_id}", response={204: None})
def delete_task(request, task_id: int):
    task = Task.objects.get(id=task_id)
    task.delete()