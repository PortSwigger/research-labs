# Browser PDF rendering discrepancies 

Proof of concept code for the browser PDF rendering discrepancies. You will need the following tools to generate the file:
- Java version 21
- Gradle

```bash
git clone https://github.com/portswigger-research/research-labs.git
cd ./pdf-rendering-discrepancies
./gradlew clean jar 
# Open the PDF file in the browser
open invoice.pdf 
```

You can change the file content by modifying the fields list in the [App.java:24](./app/src/main/java/net/portswigger/App.java) file. 
```java
List<String[]> fields = List.of(
        // Input fields: Title, size, text field, widget annotation
        new String[]{"No", "50", "1", "1"},
        new String[]{"Qty", "50", "1", "1"},
        new String[]{"Item Description", "200", "L33T Leather Jacket", "Lightweight L33T Leather Jacket"},
        new String[]{"Unit Price", "100", "£399", "£999"},
        new String[]{"Total", "100", "£399", "£999"}
);
```

### The appearance of interactive form fields:

| Browser | Text Field           | Widget Annotation    |
|---------|----------------------|----------------------|
| Chrome  | Supported            | Supported / Rendered |
| Firefox | Not Supported        | Supported / Rendered |
| Safari  | Supported / Rendered | Not Supported        |
