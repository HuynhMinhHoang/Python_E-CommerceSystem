from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views
from .admin import adminSite

router = DefaultRouter()
router.register('accounts', views.AccountViewSet)
router.register('categories', views.CategoryViewSet)
router.register('products', views.ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', adminSite.urls),
]
