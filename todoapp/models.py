from django.db import models

class JournalEntry(models.Model):
    title = models.CharField(max_length=200, blank=True, null=True)  # Optional for entry summaries
    content = models.TextField()  # For detailed journal content
    created_at = models.DateTimeField(auto_now_add=True)  # Creation timestamp
    updated_at = models.DateTimeField(auto_now=True)  # Last modification timestamp

    def __str__(self):
        return self.title if self.title else f"Entry from {self.created_at.strftime('%Y-%m-%d')}"