from ninja import NinjaAPI
from app.api import api as app_api

api = NinjaAPI()

api.add_router("/", app_api)