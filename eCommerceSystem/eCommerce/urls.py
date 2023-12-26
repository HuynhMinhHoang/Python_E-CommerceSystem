from django.urls import include, re_path, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework.routers import DefaultRouter

from . import views
from .admin import adminSite

schema_view = get_schema_view(
    openapi.Info(
        title="eCommerce API",
        default_version='v1',
        description="APIs for eCommerce - System",
        contact=openapi.Contact(email="2051052046"),
        license=openapi.License(name="Huynh Minh Hoang"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

router = DefaultRouter()
router.register('accounts', views.AccountViewSet)

router.register('categories', views.CategoryViewSet)
router.register('products', views.ProductViewSet)
router.register('images', views.ImageViewSet)
router.register('roles', views.RoleViewSet)
urlpatterns = [
    path('', include(router.urls)),
    path('admin/', adminSite.urls),
    path('accounts/register/', views.AccountViewSet.as_view({'post': 'create'}), name='account-register'),

    re_path(r'^swagger(?P<format>\.json|\.yaml)$',
            schema_view.without_ui(cache_timeout=0),
            name='schema-json'),
    re_path(r'^swagger/$',
            schema_view.with_ui('swagger', cache_timeout=0),
            name='schema-swagger-ui'),
    re_path(r'^redoc/$',
            schema_view.with_ui('redoc', cache_timeout=0),
            name='schema-redoc'),
    re_path(r'^ckeditor/', include('ckeditor_uploader.urls')),

]
