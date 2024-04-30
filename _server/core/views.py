from django.shortcuts import render
from django.conf  import settings
import json
import os
from django.contrib.auth.decorators import login_required

# Load manifest when server launches
MANIFEST = {}
if not settings.DEBUG:
    f = open(f"{settings.BASE_DIR}/core/static/manifest.json")
    MANIFEST = json.load(f)

# Create your views here.
@login_required
def index(req):
    context = {
        "asset_url": os.environ.get("ASSET_URL", ""),
        "debug": settings.DEBUG,
        "manifest": MANIFEST,
        "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
        "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0]
    }
    return render(req, "core/index.html", context)










import json
from django.http import JsonResponse
from .models import Star
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def toggle_star(request):
    if request.method == 'POST':
        # Parse the JSON data from the request body
        data = json.loads(request.body)
        verse_num = data.get('verseNum')
        chapter_num = data.get('chapterNum')
        book_num = data.get('bookNum')

        # Check if a star already exists for the specified verse, chapter, and book
        existing_star = Star.objects.filter( verseNum=verse_num, chapterNum=chapter_num, bookNum=book_num).first()

        # Toggle the star
        if existing_star:
            # If the star exists, delete it
            existing_star.delete()
            message = 'Star removed successfully'
            isNowStarred=False
        else:
            # If the star doesn't exist, create it
            Star.objects.create(
                verseNum=verse_num,
                chapterNum=chapter_num,
                bookNum=book_num
            )
            message = 'Star created successfully'
            isNowStarred=True

        # Return a JSON response indicating success
        return JsonResponse({'message': message, 'isNowStarred':isNowStarred})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
    
def get_starred_verses(req, book_num, chapter_num):
    fav_verses = Star.objects.filter(bookNum=book_num, chapterNum=chapter_num)
    verses_data = [{'verseNum': verse.verseNum} for verse in fav_verses]
    print(JsonResponse(verses_data, safe=False))
    return JsonResponse(verses_data, safe=False)
