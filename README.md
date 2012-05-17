ServiceStack.MovieRest.Sencha.Touch.Example
===========================================

### Live demo
[Here]( http://assaframan.github.com/ServiceStack.MovieRest.Sencha.Touch.Example) is a live demo of this code.
I am starting with the live demo as it is the first thing I look for in similer code projects.

### Project summary
This code demonstrate how to use [Sencha Touch 2]( http://www.sencha.com/products/touch/) with [Service Stack]( http://www.servicestack.net/) used as a REST web service.

The server side is the example [ServiceStack.MovieRest]( https://github.com/ServiceStack/ServiceStack.Examples) – created by the ServiceStack team.
I have used [AppHarbor](http://appharbor.com) to host the server side. 
* I created [this](https://github.com/assaframan/MoviesRestForAppHarbor) git repository - it is a copy of ServiceStack's examples repository - I just renamed ServiceStack.MovieRest.sln to AppHarbor.sln so AppHarbor will know it is the solution I want to host.
* My AppHarbor service root address is this: http://moviesrest.apphb.com
* You can view the original MovieRest webpage demo here: http://moviesrest.apphb.com/default.htm
* This is the movies REST service: http://moviesrest.apphb.com/movies
* This is the movies database reset REST service: http://moviesrest.apphb.com/reset-movies
* All the services are as in the ServiceStack.Examples repo without any change. 

The Sencha Touch app was built using [Sencha Architect 2](http://www.sencha.com/products/architect/), a great product - you should give it a try. You don't have to use Sencha Architect to modify the code (you can use any text editor). I do recommend trying Sencha Architect 2 (you can download a 30-day trial), the main reason for building this code was to learn how to use Sencha Architect – and I found it be a great time saver.

### A list of some of the things that this code demonstrates:
* Working with a ServiceStack REST web service using Sencha Touch models and stores.
* Working with a ServiceStack REST web service using Sencha Architect.
* Changing the REST web service URL dynamically inside the Sencha Touch app.
* Doing add, update, delete and clone REST record operations – with basic error handling.
* The code supports cross domain XMLHttpRequest. (I needed to patch the ServiceStack.MovieRest to get this to work; my patches where committed to ServiceStack.MovieRest main repository in GitHub so don’t worry about it).

### When developing this I found out more information about the way [REST](http://en.wikipedia.org/wiki/Representational_state_transfer) works, here is what I learn:
* REST is a way to add, update and delete records on a web server using a web service.
* REST uses HTTP verbs that I didn't know about, I am used to GET and POST, but REST uses also PUT and DELETE. 
* POST means "create a record".
* PUT means "update record".
* DELETE means "delete a record".
* If you use [XMLHttpRequest](http://en.wikipedia.org/wiki/XMLHttpRequest) the way the browser works is to first contact the web server with an OPTION verb, then if it likes the response – only than it sends the REST verb (meaning POST, PUT and DELETE).
* You can view the HTTP request using [Fiddler](http://www.fiddler2.com).
* The Chrome JavaScript console helps to see if the request fails.
* The main reason my requests failed was that I worked "cross domain"\"cross site" – meaning my app had a different URL address root then the web service.
* When requesting data using XMLHttpRequest the server needs to add the some response headers (same as it got when calling OPTIONS) to its HTTP result.
* The default for more servers is not to have the needed response headers – meaning XMLHttpRequest fails. This is what I need to fix in the ServiceStack.MovieRest example.
* You can read more about the "cross domain"\"cross site"\"HTTP access control (CORS)" and what response headers are needed [here](https://developer.mozilla.org/en/http_access_control) or search Google for: Access-Control-Allow-Methods or Access-Control-Allow-Origin or Access-Control-Allow-Headers.

### General notes
* When developing I tested this project using Google Chrome, so I am not sure about the behavior on mobile phones.
* The Chrome JavaScript console is great, you can see the call stack, add break points, auto break on error, add watches and much much more.  
* It is a good idea not to "hardcode" the service URL in the [proxies](http://docs.sencha.com/touch/2-0/#!/api/Ext.data.proxy.Proxy) as it will be hard to maintain as the project gets more complicated, my project sets the [service URL](http://docs.sencha.com/touch/2-0/#!/api/Ext.data.proxy.Rest-cfg-url) for the proxies at the app launch – you can use it as reference to achieve the same functionality.
* Error handling for web operations is a must – as the service can fail.
* Service Stack is a great framework to develop the server side of a web site.
* Service Stack service can run on Linux – but people report about memory leaks in some cases when using Mono. They have a solution for it – to [run ServiceStack as a daemon on Linux](https://github.com/ServiceStack/ServiceStack/wiki/Run-ServiceStack-as-a-daemon-on-Linux).