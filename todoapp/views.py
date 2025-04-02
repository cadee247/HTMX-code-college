from django.shortcuts import render, get_object_or_404
from .models import JournalEntry
from django.http import HttpResponse

def journal_list(request):
    entries = JournalEntry.objects.all().order_by('-created_at')
    context = {'entries': entries}
    return render(request, 'journal_list.html', context)

def create_entry(request):
    if request.POST.get("entry_id"):
        entry_id = request.POST.get("entry_id")
        entry = JournalEntry.objects.get(id=entry_id)
        entry.title = request.POST.get("title")
        entry.content = request.POST.get("content")
        entry.save()
    else:
        title = request.POST.get("title")
        content = request.POST.get("content")
        JournalEntry.objects.create(title=title, content=content)
        
    entries = JournalEntry.objects.all().order_by('-created_at')
    context = {'entries': entries}
    return render(request, 'journal_list.html', context)

def delete_entry(request, pk):
    entry = get_object_or_404(JournalEntry, id=pk)
    entry.delete()
    entries = JournalEntry.objects.all().order_by('-created_at')
    context = {'entries': entries}
    return render(request, 'journal_list.html', context)

def edit_entry_form(request, pk):
    entry = get_object_or_404(JournalEntry, pk=pk)
    return HttpResponse(f'''
        <input type="hidden" value="{entry.id}" name="entry_id"/>
        <input id="title" value="{entry.title}" placeholder="Entry Title" name="title" required/>
        <textarea id="content" placeholder="Write your journal entry" name="content" required>{entry.content}</textarea>
    ''')

