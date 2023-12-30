from django.shortcuts import render
from rest_framework import viewsets
from .models import Conversation
from rest_framework.response import Response
from .serializer import MessageSerializer
from .schema import list_message_docs


class MessageViewSet(viewsets.ViewSet):
    @list_message_docs
    def list(self, request):
        channel_id = request.query_params.get("channel_id")

        try:
            conversation = Conversation.objects.get(channel_id=channel_id)
            message = conversation.message.all()
            serializer = MessageSerializer(message, many=True)
            return Response(serializer.data)
        except:
            return Response([])
