# TEC-6 Regression Notes

Manual security regression checks for unsafe content rendering:

1. Save this as the user name:
   `<img src=x onerror=alert(1)>`
   Expected: the greeting shows the text literally, with no image and no alert.

2. Add this as a task:
   `<img src=x onerror=alert(1)>`
   Expected: the task card shows the text literally, with no image and no alert.

3. Use an RSS item fixture with:
   - title: `<img src=x onerror=alert(1)>`
   - link: `javascript:alert(1)`
   Expected: the title renders as text, and the link is disabled instead of using the unsafe URL.

4. Try saving a custom feed URL such as:
   `javascript:alert(1)`
   Expected: the app rejects it and only accepts HTTP or HTTPS feed URLs.
