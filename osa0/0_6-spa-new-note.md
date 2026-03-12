sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: respond with status code 201 Created
    deactivate server
    
    Note right of browser: The server does not demand a redirect after the request. We stay on the same page. No other HTTP requests are executed