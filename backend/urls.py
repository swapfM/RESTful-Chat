from django.contrib import admin
from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter
from server.views import ServerListViewSet, CategoryListViewSet
from account.views import (
    AccountViewSet,
    JWTCookieTokenObtainPairView,
    JWTCookieTokenRefreshView,
    LogoutApiView,
    RegisterAPIView,
)
from django.conf import settings
from django.conf.urls.static import static
from chats.consumer import WebChatConsumer
from chats.views import MessageViewSet


router = DefaultRouter()
router.register("api/server/select", ServerListViewSet)
router.register("api/server/category", CategoryListViewSet)
router.register("api/messages", MessageViewSet, basename="message")
router.register("api/account", AccountViewSet, basename="account")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/docs/schema", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/schema/ui", SpectacularSwaggerView.as_view()),
    path(
        "api/token/", JWTCookieTokenObtainPairView.as_view(), name="token_obtain_pair"
    ),
    path(
        "api/token/refresh/", JWTCookieTokenRefreshView.as_view(), name="token_refresh"
    ),
    path("api/logout/", LogoutApiView.as_view(), name="logout"),
    path("api/register/", RegisterAPIView.as_view(), name="register"),
] + router.urls

websocket_utlpatterns = [
    path("<str:serverId>/<str:channelId>", WebChatConsumer.as_asgi())
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
