from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<chat_id>[^/]+)/$', consumers.ChatConsumer.as_asgi()),
    re_path(r'ws/room_action/(?P<room_id>[^/]+)/$', consumers.RoomActionConsumer.as_asgi())
]