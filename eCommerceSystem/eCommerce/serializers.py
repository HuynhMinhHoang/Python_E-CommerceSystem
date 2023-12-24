from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import Image, Product, Category, ProductAttribute, Attribute, Store, Account, UserRole


class RoleSerializer(ModelSerializer):
    class Meta:
        model = UserRole
        fields = ['id', "name_role"]


class AccountSerializer(ModelSerializer):
    role_name = RoleSerializer(source='role', read_only=True)
    role = serializers.PrimaryKeyRelatedField(queryset=UserRole.objects.all(), write_only=True)
    avt_info = serializers.SerializerMethodField(source='avt')
    avt = serializers.ImageField(write_only=True, required=False)

    class Meta:
        model = Account
        fields = ["id", 'full_name', 'date_of_birth', 'gender', 'address', 'email', 'phone', 'username', 'password'
            , 'avt_info', 'avt', 'role_name', "role"]
        # fields = ["id", 'full_name', 'date_of_birth', 'gender', 'address', 'email', 'phone', 'username', 'password',
        #           'avt', 'role', "role_info"]
        extra_kwargs = {
            'password': {'write_only': 'true'}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        avt = validated_data.pop('avt', None)
        if password is not None:
            validated_data['password'] = make_password(password)

        accounts = Account.objects.create(**validated_data)

        if avt is not None:
            accounts.avt = avt
            accounts.save()

        return accounts

    def get_avt_info(self, account):
        if account.avt:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri('/static/%s' % account.avt.name)
            return '/static/%s' % account.avt.name


class StoreSerializer(ModelSerializer):
    class Meta:
        model = Store
        fields = ["name_store", "address"]
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


class ImageSerializer(ModelSerializer):
    product_info = ProductSerializer(source='product', read_only=True)
    thumbnail = serializers.SerializerMethodField(source='thumbnail')

    class Meta:
        model = Image
        fields = ['id', 'thumbnail', 'product_info']

    def get_thumbnail(self, image):
        if image.thumbnail:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri('/static/%s' % image.thumbnail.name)
            return '/static/%s' % image.thumbnail.name


class CategorySerializer(ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ["id", "name_category", "products"]
