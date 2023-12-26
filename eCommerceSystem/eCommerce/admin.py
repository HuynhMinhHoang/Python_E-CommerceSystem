from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django import forms
from django.contrib import admin
from django.template.response import TemplateResponse
from django.urls import path
from django.utils.safestring import mark_safe

from . import dao
from .models import Image, Store, Product, Category, UserRole, Account, Attribute


class eCommerceAdminSite(admin.AdminSite):
    site_header = 'eCommerce - System'

    def get_urls(self):
        return [
                   path('account-stats/', self.account_stats_view)
               ] + super().get_urls()

    def account_stats_view(self, request):
        # account_count = Account.objects.count()
        # info = Account.objects.values("full_name", "role__name_role")
        return TemplateResponse(request, 'admin/account_stats.html', {
            'load_account': dao.load_account(),
            'stats_account': dao.count_account_by_role()
        })


class AccountAdmin(admin.ModelAdmin):
    class Media:
        css = {
            'all': ('/static/css/main.css',)
        }

    list_display = ['id', 'username', 'password', "full_name", 'date_of_birth', 'gender', 'address', 'email', 'phone',
                    'active', 'role']
    search_fields = ['id', 'username']
    list_filter = ['role', 'active']
    readonly_fields = ["avatar"]

    def avatar(self, account):
        return mark_safe(
            "<img src='/static/{img_url}' alt='{alt}' width='120px'/>".format(img_url=account.avt, alt="Error"))


class ProductForm(forms.Form):
    description = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Product
        fields: '__all__'


class ProductAdmin(admin.ModelAdmin):
    list_filter = ['category', 'status']
    forms = ProductForm


class ProductInline(admin.StackedInline):
    model = Product
    extra = 1


class CategoryAdmin(admin.ModelAdmin):
    inlines = (ProductInline,)


adminSite = eCommerceAdminSite('myEcommerce')

adminSite.register(Store)
adminSite.register(Product, ProductAdmin)
adminSite.register(Account, AccountAdmin)
adminSite.register(Category, CategoryAdmin)
adminSite.register(UserRole)
adminSite.register(Attribute)
adminSite.register(Image)
