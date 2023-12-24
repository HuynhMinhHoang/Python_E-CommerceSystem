from rest_framework import viewsets, generics
from rest_framework.parsers import MultiPartParser

from .models import Product, Category, Account, Image, UserRole
from .serializers import RoleSerializer, ProductSerializer, CategorySerializer, AccountSerializer, ImageSerializer


class AccountViewSet(viewsets.ViewSet,
                     generics.ListAPIView,
                     generics.CreateAPIView,
                     generics.RetrieveAPIView):
    # RetrieveAPIView lay thong in user dang login
    queryset = Account.objects.filter(active=True)
    serializer_class = AccountSerializer  # serializer du lieu ra thanh json
    parser_classes = [MultiPartParser, ]


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    # permission_classes = [permissions.IsAuthenticated]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    # pagination_class = paginations.ProductPagination

    # permission_classes = [permissions.IsAuthenticated]

    # def get_permissions(self):
    #     if self.action == 'list':
    #         return [permissions.AllowAny()]
    #     return [permissions.IsAuthenticated()]

    def get_queryset(self):
        query = self.queryset
        kw = self.request.query_params.get("kw")
        if kw:
            query = query.filter(name_product__icontains=kw)
        return query


class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer


class RoleViewSet(viewsets.ViewSet,
                  generics.ListAPIView):
    queryset = UserRole.objects.all()
    serializer_class = RoleSerializer
