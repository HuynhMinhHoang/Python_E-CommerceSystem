from rest_framework import viewsets, permissions, generics
from rest_framework.parsers import MultiPartParser
from .models import Product, Category, Account
from .serializers import ProductSerializer, CategorySerializer, AccountSerializer


class AccountViewSet(viewsets.ViewSet,
                     generics.ListAPIView,
                     generics.CreateAPIView,
                     generics.RetrieveAPIView):
    queryset = Account.objects.filter(active=True)
    serializer_class = AccountSerializer
    parser_classes = [MultiPartParser, ]

    # permission_classes = [permissions.IsAuthenticated]


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # permission_classes = [permissions.IsAuthenticated]

    # def get_permissions(self):
    #     if self.action == 'list':
    #         return [permissions.AllowAny()]
    #     return [permissions.IsAuthenticated()]
