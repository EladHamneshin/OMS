import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const generatePDF = () => {
  const content = document.getElementById('dashboard');

  html2canvas(content!, { scrollY: -window.scrollY }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape', // Use 'portrait' if needed
      unit: 'px',
      format: [content!.offsetHeight, content!.offsetWidth],
    });

    pdf.addImage(imgData, 'JPEG', 0, 0, content!.offsetHeight, content!.offsetWidth);

    // Save the PDF to the downloads folder
    pdf.save('dashboard.pdf');
  });
};

export default generatePDF