from rest_framework.response import Response
from rest_framework import viewsets
from .models import Account
from .serializer import AccountSerializer
from .schema import list_account_docs
from rest_framework.permissions import IsAuthenticated


class AccountViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @list_account_docs
    def list(self, request):
        user_id = request.query_params.get("user_id")
        queryset = Account.objects.get(id=user_id)
        serializer = AccountSerializer(queryset)
        return Response(serializer.data)
