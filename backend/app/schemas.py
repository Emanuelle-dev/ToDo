from datetime import datetime
from typing import Literal, Optional
from ninja import Schema, ModelSchema
from .models import Task

class CreateTaskSchema(Schema):
    title : str
    description : str
    priority : Literal['low', 'medium', 'normal', 'high'] = 'normal'
    status : Literal['pending','in_progress', 'completed'] = 'pending'
    tag : Optional[str] = None

class TaskSchema(ModelSchema):
    class Meta:
        model = Task
        fields = '__all__'
    