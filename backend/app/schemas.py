from datetime import datetime
from ninja import Schema, ModelSchema
from .models import Task

class CreateTaskSchema(Schema):
    title : str
    description : str
    priority : str
    deadline : datetime
    status : str

class TaskSchema(ModelSchema):
    class Meta:
        model = Task
        fields = '__all__'
    