from django.db.models import Count

from .models import Account, UserRole


def load_account(params={}):
    q = Account.objects.all()

    kw = params.get('kw')
    if kw:
        q = q.filter(subject__icontains=kw)

    role_id = params.get('role_id')
    if role_id:
        q = q.filter(role_id=role_id)
    return q


def count_account_by_role():
    return UserRole.objects.annotate(count=Count('roles__id')).values(
        "id", "name_role", "count"
    ).order_by('count')
