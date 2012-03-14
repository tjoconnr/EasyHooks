from django.http import HttpResponse
from django.template import RequestContext, loader
import mimetypes
import urllib2

def index(request):
    t = loader.get_template('quickstart/index.html')    
    c = RequestContext(request, {'foo': 'bar',})
    return HttpResponse(t.render(c)) 
	
def getpage(request):    
    url = request.GET.get('url')
    req = urllib2.urlopen(url)
    status_code = req.code
    mimetype = req.headers.typeheader or mimetypes.guess_type(url)
    content = req.read()
    return HttpResponse(content, status=status_code, mimetype=mimetype)
