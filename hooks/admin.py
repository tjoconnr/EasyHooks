from hooks.models import Hook
from django.contrib import admin

class HookAdmin(admin.ModelAdmin):
    fields = []
    list_display = ('name', 'url')

admin.site.register(Hook, HookAdmin)
