# jsPDF-GenerateGrid

Use a basic grid to align text in jsPDF created documents.

Returns an object of page coordinates.

- aWidth: available width
- aHeight: available height
- hCenter: horizontal center
- vCenter: vertical center
- cols: array of column objects with the start (x), center (xc), and end (xe) of each column. Use those coordinates to align text as needed.

## Example
````
doc = new jsPDF({ format: 'letter' });

myGrid = doc.generateGrid({ columns: 12, pageMargin: 5, columnMargin: 2 });

col = myGrid.cols;
````
### Alignment
````
doc.setFontStyle('bold');

doc.text(col[3].x, 10, 'Regular text');
doc.text(col[4].xc, 20, 'Centered text', { align: 'center' });
doc.text(col[5].xe, 30, 'Right-aligned text', { align: 'right' });
````
### Draw lines
````
doc.line(col[2].x, 5 - 4, col[5].xe, 5 - 4);
````


