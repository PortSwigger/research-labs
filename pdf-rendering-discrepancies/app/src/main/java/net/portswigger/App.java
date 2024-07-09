package net.portswigger;

import org.apache.pdfbox.cos.COSDictionary;
import org.apache.pdfbox.cos.COSName;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.PDResources;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.graphics.form.PDFormXObject;
import org.apache.pdfbox.pdmodel.interactive.annotation.PDAnnotationWidget;
import org.apache.pdfbox.pdmodel.interactive.annotation.PDAppearanceDictionary;
import org.apache.pdfbox.pdmodel.interactive.annotation.PDAppearanceStream;
import org.apache.pdfbox.pdmodel.interactive.form.PDAcroForm;
import org.apache.pdfbox.pdmodel.interactive.form.PDTextField;

import java.util.List;

public class App {

    public static void main(String[] args) {
        try (PDDocument document = new PDDocument()) {
            List<String[]> fields = List.of(
                    // Input fields: Title, size, text, annotation
                    new String[]{"No","50", "1","1"},
                    new String[]{"Qty","50", "1", "1"},
                    new String[]{"Item Description","200", "L33T Leather Jacket", "Lightweight L33T Leather Jacket"},
                    new String[]{"Unit Price","100", "£399", "£999"},
                    new String[]{"Total","100", "£399", "£999"}
            );
            PDPage page = new PDPage();
            document.addPage(page);

            // Create header
            try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
                contentStream.beginText();
                contentStream.setFont(PDType1Font.HELVETICA_BOLD, 24);
                contentStream.newLineAtOffset(50, 750);
                contentStream.showText("Invoice");
                contentStream.setFont(PDType1Font.HELVETICA, 12);
                contentStream.newLineAtOffset(400, 0);
                contentStream.showText("Carlos Montoya");
                contentStream.endText();

                // Add line under header
                contentStream.moveTo(50, 700);
                contentStream.lineTo(550, 700);
                contentStream.stroke();

                // Add content
                contentStream.beginText();
                contentStream.newLineAtOffset(50, 650);
                contentStream.showText("Invoice Number:");
                contentStream.newLineAtOffset(100, 0);
                contentStream.showText("1");
                contentStream.newLineAtOffset(-100, -20);
                contentStream.showText("Date Issued:");
                contentStream.newLineAtOffset(100, 0);
                contentStream.showText("01/01/2001");
                contentStream.newLineAtOffset(-100, -20);
                contentStream.showText("Date Due:");
                contentStream.newLineAtOffset(100, 0);
                contentStream.showText("01/01/3001");
                contentStream.newLineAtOffset(-100, -50);

                fields.forEach(key -> {
                    try {
                        contentStream.showText(key[0]);
                        contentStream.newLineAtOffset(Integer.parseInt(key[1]), 0);
                    } catch (Exception ignored) {
                    }
                });
                contentStream.endText();
            }

            // Add form field
            PDAcroForm acroForm = new PDAcroForm(document);
            document.getDocumentCatalog().setAcroForm(acroForm);

            // Set default resources manually
            PDResources resources = new PDResources();
            resources.put(COSName.getPDFName("Helv"), PDType1Font.HELVETICA);
            acroForm.setDefaultResources(resources);

            // Set default appearance for the entire form
            acroForm.setDefaultAppearance("/Helv 12 Tf 0 0 0 rg");
            int accumulator = 50;
            for (int i = 0; i < fields.size(); i++) {
                String[] key = fields.get(i);
                try {
                    PDTextField field = new PDTextField(acroForm);
                    field.setPartialName(key[0]);
                    field.setActions(null);
                    field.setValue(key[2]);

                    PDRectangle rectangle = new PDRectangle(accumulator, 530, Integer.parseInt(key[1]), 16);
                    PDAnnotationWidget widget = field.getWidgets().get(0);
                    widget.setRectangle(rectangle);

                    // Create and set custom appearance stream
                    PDFormXObject appearanceStream = new PDFormXObject(document);
                    appearanceStream.setResources(resources);

                    try (PDPageContentStream appearanceContents = new PDPageContentStream(document, appearanceStream, appearanceStream.getStream().createOutputStream())) {

                        appearanceContents.beginMarkedContent(COSName.TX);
                        appearanceContents.saveGraphicsState();
                        appearanceContents.clip();

                        appearanceContents.beginText();
                        appearanceContents.setFont(PDType1Font.HELVETICA, 12);
                        appearanceContents.newLineAtOffset(2, 4);
                        appearanceContents.showText(key[3]);
                        appearanceContents.endText();

                        appearanceContents.restoreGraphicsState();
                        appearanceContents.endMarkedContent();
                    }

                    PDAppearanceDictionary appearanceDictionary = new PDAppearanceDictionary();
                    PDAppearanceStream normalAppearance = new PDAppearanceStream(appearanceStream.getCOSObject());
                    appearanceDictionary.setNormalAppearance(normalAppearance);
                    widget.setAppearance(appearanceDictionary);


                    page.getAnnotations().add(widget);
                    acroForm.getFields().add(field);
                    accumulator += Integer.parseInt(key[1]);
                } catch (Exception ignored) {
                }
            }

            // Attempt to disable compression
            COSDictionary dict = document.getDocumentCatalog().getCOSObject();
            dict.setItem(COSName.DECODE_PARMS, null);
            dict.setItem(COSName.FILTER, null);

            // Save the document
            document.save("invoice.pdf");
            System.out.println("PDF created successfully!");
        } catch (Exception ignored) {
        }
    }
}
