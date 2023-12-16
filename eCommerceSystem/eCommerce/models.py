from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class UserRole(models.Model):
    name_role = models.CharField(max_length=255, null=False)

    def __str__(self):
        return self.name_role


class Account(BaseModel):
    full_name = models.CharField(max_length=255, null=False)
    date_of_birth = models.DateField(null=False)
    gender = models.BooleanField(null=False)
    address = models.CharField(max_length=255, null=False)
    email = models.EmailField(unique=True, null=False)
    phone = models.CharField(max_length=15, null=False)
    username = models.CharField(max_length=100, unique=True, null=False)
    password = models.CharField(max_length=1000, null=False)
    avt = models.ImageField(upload_to='account/%Y/%m', default=None)
    active = models.BooleanField(default=False)
    role = models.ForeignKey(UserRole, on_delete=models.CASCADE, related_name="roles")

    def __str__(self):
        return self.username


class Store(BaseModel):
    name_store = models.CharField(max_length=255, null=False)
    address = models.CharField(max_length=500, null=False)
    active = models.BooleanField(default=False)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)

    def __str__(self):
        return self.name_store


class Attribute(models.Model):
    name_at = models.CharField(max_length=255, null=False)
    data_type = models.CharField(max_length=255, null=False)

    def __str__(self):
        return self.name_at


class Category(models.Model):
    name_category = models.CharField(max_length=255, null=False)

    def __str__(self):
        return self.name_category


# class CategoryAt(models.Model):
#     category = models.ForeignKey(Category, on_delete=models.CASCADE)
#     at = models.ForeignKey(Attribute, on_delete=models.CASCADE)
#
#     def __str__(self):
#         return self.category.name_category + " - " + self.at.name_at


class Product(BaseModel):
    name_product = models.CharField(max_length=255, null=False)
    price = models.FloatField(null=False)
    description = models.TextField(null=False)
    status = models.BooleanField(default=True)
    quantity = models.IntegerField(null=False)
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True, related_name='products')
    product_at = models.ManyToManyField(Attribute, through='ProductAttribute', related_name='productAttribute')
    product_account = models.ManyToManyField(Account, through='Cart', related_name='cart_account')

    def __str__(self):
        return self.name_product


class Image(models.Model):
    thumbnail = models.CharField(max_length=1000, null=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return self.product.name_product


class ProductAttribute(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='productattributes')
    attribute = models.ForeignKey(Attribute, on_delete=models.CASCADE, related_name='attributes')
    value = models.CharField(max_length=255, null=False)

    def __str__(self):
        return self.product.name_product + " (" + self.attribute.name_at + ")"


class Cart(BaseModel):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    def __str__(self):
        return self.account.full_name + " - " + self.product.name_product + " - "
        self.quantity


class PaymentType(models.Model):
    name_paymentType = models.CharField(max_length=255, null=False)

    def __str__(self):
        return self.name_paymentType


class ShippingType(models.Model):
    name_shippingType = models.CharField(max_length=255, null=False)
    price_shippingType = models.FloatField(null=False)

    def __str__(self):
        return self.name_shippingType


class Order(models.Model):
    shipping_address = models.CharField(max_length=255)
    shipping_fee = models.FloatField()
    note = models.TextField(null=False)
    status_pay = models.BooleanField(default=False)
    status_review = models.BooleanField(default=False)
    status_order = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    paymentType = models.ForeignKey(PaymentType, on_delete=models.CASCADE)
    shippingType = models.OneToOneField(ShippingType, on_delete=models.CASCADE)
    order_cart = models.ManyToManyField(Cart, through='OrderDetail', related_name='orderDetail')

    def __str__(self):
        return self.account.full_name


class ReviewStore(BaseModel):
    rating = models.IntegerField()
    content = models.TextField()
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    order = models.OneToOneField(Order, null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.account.full_name} đã đánh giá cửa hàng {self.store.name_store}"


class OrderDetail(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)

    def __str__(self):
        return self.product.name_product + " - " + self.quantity


class CommentProduct(BaseModel):
    rating = models.IntegerField()
    content = models.TextField()
    reply_idComment = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies')
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    orderDetail = models.ForeignKey(OrderDetail, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.account.full_name} đã bình luận sản phẩm {self.orderDetail.product.name_product}"
