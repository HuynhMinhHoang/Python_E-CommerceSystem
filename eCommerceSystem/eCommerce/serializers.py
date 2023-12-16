from django.contrib.auth.hashers import make_password
from rest_framework.serializers import ModelSerializer

from .models import Product, Category, ProductAttribute, Attribute, Store, Account


class AccountSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields = ["id", 'full_name', 'date_of_birth', 'gender', 'address', 'email', 'phone', 'username', 'password',
                  'avt', 'role']
        # extra_kwargs = {
        #     'password': {'write_only': 'true'}
        # }

    def create(self, validated_data):
        password = validated_data.pop('password', None)

        if password is not None:
            validated_data['password'] = make_password(password)

        accounts = Account.objects.create(**validated_data)

        return accounts


class StoreSerializer(ModelSerializer):
    class Meta:
        model = Store
        fields = ["name_store"]
        # fields = ["id", "name_store", "address", "active"]


class AttributeSerializer(ModelSerializer):
    class Meta:
        model = Attribute
        fields = ["name_at"]
        # fields = ["id", "name_at", "data_type"]


class ProductAttributeSerializer(ModelSerializer):
    attribute_info = AttributeSerializer(source='attribute', read_only=True)

    class Meta:
        model = ProductAttribute
        fields = ["attribute_info", "value"]


class CategoryListSerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ["name_category"]


class ProductSerializer(ModelSerializer):
    product_attributes = ProductAttributeSerializer(many=True, read_only=True, source='productattributes')
    store_info = StoreSerializer(source='store', read_only=True)

    category_info = CategoryListSerializer(source='category', read_only=True)

    class Meta:
        model = Product
        fields = ["id", "name_product", "price", "description", "status", "quantity", "store_info", "category_info",
                  "product_attributes"]
        # fields = ["id", "name_product", "price", "description", "status", "quantity", "store", "store_info", "category",
        #           "product_attributes"]


class CategorySerializer(ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ["id", "name_category", "products"]
