from django.conf.urls.defaults import patterns, include, url

urlpatterns = patterns('quickstart.views',
    url(r'^$', 'index'),
    url(r'^p/$', 'getpage'),
)
