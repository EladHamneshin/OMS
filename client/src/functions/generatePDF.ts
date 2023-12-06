import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';


const generatePDF = () => {
  const pdf = new jsPDF();

  html2canvas(document.body, { windowWidth: document.body.scrollWidth, windowHeight: document.body.scrollHeight }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');

    pdf.addImage(imgData, 'JPEG', 0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height);

    pdf.save('dashboard.pdf');
  });
};


export default generatePDF