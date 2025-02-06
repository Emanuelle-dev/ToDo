from ninja import Router
from .models import Task, User
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
    try:
        user = User.objects.get(id=task.user_id)
    except User.DoesNotExist:
        return 400, {"message": "User not found"}
    task_instance = Task.objects.create(
        user_id=user, 
        title=task.title, 
        description=task.description, 
        priority=task.priority, 
        status=task.status, 
        deadline=task.deadline)
    return {
        "user_id": user.id, 
        "title": task_instance.title,
        "description": task_instance.description,
        "priority": task_instance.priority,
        "status": task_instance.status,
        "deadline": task_instance.deadline,
        "tag": task_instance.tag
    }

@api.put("/tasks/{task_id}", response={200: CreateTaskSchema, 404: dict, 400: dict})
def update_task(request, task_id: int, task_data: CreateTaskSchema):
    try:
        task = Task.objects.get(id=task_id)
    except Task.DoesNotExist:
        return 404, {"message": "Task not found"}
    for attr, value in task_data.dict().items():
        if not task.title: 
            return 400, {"message": "Title is required"}
        setattr(task, attr, value)
    task.save()
    return task

@api.delete("/tasks/{task_id}", response={204: None})
def delete_task(request, task_id: int):
    task = Task.objects.get(id=task_id)
    task.delete()