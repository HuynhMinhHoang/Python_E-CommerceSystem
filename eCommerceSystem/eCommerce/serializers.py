from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rest_framework.decorators import parser_classes
from rest_framework.serializers import ModelSerializer

from .models import Image, Product, Category, Attribute, Store, Account, UserRole


class RoleSerializer(ModelSerializer):
    class Meta:
        model = UserRole
        fields = ['id', "name_role"]


class AccountSerializer(ModelSerializer):
    role_name = RoleSerializer(source='role', read_only=True)
    role = serializers.PrimaryKeyRelatedField(queryset=UserRole.objects.all(), write_only=True)

    # avt_info = serializers.SerializerMethodField(source='avt')
    # avt = serializers.ImageField(write_only=True, required=False)

    class Meta:
        model = Account
        fields = ["id", 'full_name', 'date_of_birth', 'gender', 'address', 'email', 'phone', 'username', 'password'
            , 'avt', 'role_name', "role"]

        # extra_kwargs = {
        #     'password': {'write_only': 'true'}
        # }

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

    # def get_avt_info(self, account):
    #     if account.avt:
    #         request = self.context.get('request')
    #         if request:
    #             return request.build_absolute_uri('/static/%s' % account.avt.name)
    #         return '/static/%s' % account.avt.name


# login


class StoreSerializer(ModelSerializer):

    class Meta:
        model = Store
        fields = ["name_store", "address", "avt", "account"]
        # fields = ["id", "name_store", "address", "active"]

    def create(self, validated_data):
        avt = validated_data.pop('avt', None)

        store = Store.objects.create(**validated_data)

        if avt is not None:
            store.avt = avt
            store.save()

        return store


class CategoryListSerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ["name_category"]


class AttributeSerializer(ModelSerializer):
    class Meta:
        model = Attribute
        fields = ["name_at", 'value']
        # fields = ["id", "name_at", "data_type"]


# class ListProductSerializer(ModelSerializer):
#     product_attributes = AttributeSerializer(many=True, read_only=True, source='attribute')
#     store_info = StoreSerializer(source='store', read_only=True)
#     category_info = CategoryListSerializer(source='category', read_only=True)
#
#     class Meta:
#         model = Product
#         fields = ["id", "name_product", "price", "description", "status", "quantity", "store_info", "category_info",
#                   'product_attributes']


class ImageSerializer(ModelSerializer):
    thumbnail = serializers.SerializerMethodField(source='thumbnail')

    class Meta:
        model = Image
        fields = ['id', 'thumbnail']

    def get_thumbnail(self, image):
        if image.thumbnail:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri('/static/%s' % image.thumbnail.name)
            return '/static/%s' % image.thumbnail.name


class ProductSerializer(ModelSerializer):
    product_attributes = AttributeSerializer(many=True, read_only=True, source='attribute')
    store_info = StoreSerializer(source='store', read_only=True)
    category_info = CategoryListSerializer(source='category', read_only=True)
    images = ImageSerializer(many=True, read_only=True, source='image_set')

    class Meta:
        model = Product
        fields = ["id", "name_product", "price", "description", "status", "quantity", "store_info", "category_info",
                  'product_attributes', 'images']


# class ListImageSerializer(ModelSerializer):
#     product_info = ProductSerializer(source='product', read_only=True)
#     thumbnail = serializers.SerializerMethodField(source='thumbnail')
#
#     class Meta:
#         model = Image
#         fields = ['id', 'thumbnail', 'product_info']
#
#     def get_thumbnail(self, image):
#         if image.thumbnail:
#             request = self.context.get('request')
#             if request:
#                 return request.build_absolute_uri('/static/%s' % image.thumbnail.name)
#             return '/static/%s' % image.thumbnail.name


class CategorySerializer(ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ["id", "name_category", "products"]
