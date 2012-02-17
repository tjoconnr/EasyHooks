from django.http import HttpResponse
from django.template import RequestContext, loader

def index(request):
    t = loader.get_template('pages/index.html')    
    c = RequestContext(request, {'foo': 'bar',})
    return HttpResponse(t.render(c)) 
    
