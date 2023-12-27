from django.shortcuts import render
from rest_framework import viewsets
from .models import Server
from .serializer import ServerSerializer
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from django.db.models import Count
from .schema import server_list_docs


class ServerListViewSet(viewsets.ViewSet):
    # Initial queryset containing all servers
    queryset = Server.objects.all()

    @server_list_docs
    def list(self, request):
        # Extracting query parameters
        category = request.query_params.get("category")
        qty = request.query_params.get("qty")
        by_user = request.query_params.get("by_user") == "true"
        by_serverid = request.query_params.get("by_serverid")
        with_num_members = request.query_params.get("with_num_members") == "true"

        # Check authentication if filtering by user
        if not request.user.is_authenticated:
            raise AuthenticationFailed()

        # Filtering by category if provided
        if category:
            self.queryset = self.queryset.filter(category__name=category)

        # Filtering by the current user if requested
        if by_user:
            user_id = request.user.id
            self.queryset = self.queryset.filter(members=user_id)

        # Annotating queryset with the number of members if requested
        if with_num_members:
            self.queryset = self.queryset.annotate(num_members=Count("members"))

        # Limiting the queryset by quantity if provided
        if qty:
            self.queryset = self.queryset[: int(qty)]

        # Filtering by server ID if provided
        if by_serverid:
            try:
                self.queryset = self.queryset.filter(id=by_serverid)

                # Raise ValidationError if server ID not found
                if not self.queryset:
                    raise ValidationError(
                        detail=f"Server with id {by_serverid} not found !"
                    )

            except ValueError:
                # Raise ValueError if server ID is not valid
                raise ValueError(detail=f"Server with id {by_serverid} not found !")

        # Serializing queryset with or without num_members context
        serializer = ServerSerializer(
            self.queryset, many=True, context={"num_members": with_num_members}
        )
        return Response(serializer.data)
