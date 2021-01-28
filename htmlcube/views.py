import json
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from .models import User, Puzzle

# Create your views here.
def index(request):

    return render(request, "htmlcube/index.html")

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "htmlcube/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "htmlcube/login.html")

def register(request):
    if request.method == "POST":
        username = request.POST["username"]


        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "htmlcube/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username,password)
            user.save()
        except IntegrityError:
            return render(request, "htmlcube/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "htmlcube/register.html")

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def saved_puzzles(request):
    #get a list of all puzzles saved by this user
    user_id = request.user.id

    puzzles = Puzzle.objects.filter(owner=int(user_id))
    return render(request, "htmlcube/saved_puzzles.html",{
        "puzzles":puzzles,
    })

def saved_puzzle(request, name):

    puzzledata = Puzzle.objects.get(name=name).serialize()

    return render(request, "htmlcube/index.html",{
        "puzzledata": puzzledata,
        #"puzzleName": puzzledata['name'],
        #"lastSave": puzzledata['lastSave']
    })

@csrf_exempt
def save(request):
    data = json.loads(request.body)
    snapLog = json.dumps(data["snapLog"])
    moveIndex = data["moveIndex"]
    snap = json.dumps(data["snap"])
    name = data["saveName"]
    lastSave = data["lastSave"]

    #if name already exists then perform an update
    try:
        puzz = Puzzle.objects.get(name=name)
        puzz.lastSave=lastSave
        puzz.snap=snap
        puzz.history=snapLog
        puzz.save()

    #get all puzzle names created by this user
    #check if current 'name' is in the list
    #if yes, update that record, if no continue
    except:
        puzz = Puzzle(owner=request.user,name=name,lastSave=lastSave, snap=snap,history=snapLog)
        puzz.save()

    puzzledata = Puzzle.objects.get(name=name).serialize()

    return render(request, "htmlcube/index.html",{
        "puzzledata": puzzledata,
    })
