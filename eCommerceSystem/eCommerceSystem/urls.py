from django.urls import path, include

from eCommerceSystem.eCommerce.admin import adminSite

urlpatterns = [
    path('admin/', adminSite.urls),
    path('', include("eCommerce.urls")),
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
]
