#!/usr/bin/python
import sys, os

# Add a custom Python path.
sys.path.insert(0, "/home1/dotnetap/python")
sys.path.insert(1, "/home1/dotnetap/python/lib/python2.7/site-packages/Django-1.3.1-py2.7.egg")
sys.path.insert(2, "/home1/dotnetap/python/lib/python2.7/site-packages/flup-1.0.3.dev_20110405-py2.7.egg")
sys.path.insert(3, "/home1/dotnetap/public_html")

os.chdir("/home1/dotnetap/public_html/easyhooks")

# Set the DJANGO_SETTINGS_MODULE environment variable.
os.environ['DJANGO_SETTINGS_MODULE'] = "easyhooks.settings"

from django.core.servers.fastcgi import runfastcgi

runfastcgi(method="threaded", daemonize="false")
