from datetime import datetime
from typing import Literal
from ninja import Schema, ModelSchema
from .models import Task

class CreateTaskSchema(Schema):
    title : str
    description : str
    priority : Literal['low', 'medium', 'normal', 'high'] = 'normal'
    deadline : datetime
    status : Literal['pending','in_progress', 'overdue', 'completed'] = 'pending'
    tag : str

class TaskSchema(ModelSchema):
    class Meta:
        model = Task
        fields = '__all__'
    