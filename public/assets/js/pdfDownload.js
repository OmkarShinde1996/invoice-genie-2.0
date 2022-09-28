

let downloadAsPdfBtn = document.getElementById('download-as-pdf')
let spinner = document.querySelector('.spinner-border')
let check = document.getElementById('check')


downloadAsPdfBtn.addEventListener('click', e => {
    e.preventDefault();//preventing form from submitting
    downloadAsPdfBtn.innerText = 'Generating and Downloading PDF...'

    // console.log(downloadAsPdfBtn.innerText)
    downloadFunction()
    downloadAsPdfBtn.innerText = 'Download as PDF'

    // console.log(downloadAsPdfBtn.innerText)
})



// function downloadFunction() {
//     spinner.classList.remove('d-none')
//     html2canvas(document.getElementById('to-be-printed'), {
//         scale: 4 //Don't change it will hamper height of the canvas in PDF
//     }).then((canvas) => {
//         let base64image = canvas.toDataURL('image/png')
//         // let pdf = new jsPDF()
//         let pdf = new jsPDF('p', 'pt','a4',true)
//         let formWidth = pdf.internal.pageSize.width
//         // let actualHeight = Math.floor((canvas.height * 0.264583) / 4.4)
//         let actualHeight = Math.floor((canvas.height * 0.264583) / 1.6)
//         let actualWidth = Math.floor((canvas.width * 0.264583) / 4.4)
//         console.log(`Making canvas of ${canvas.width}px x ${canvas.height}px`)
//         console.log(`Storing canvas in PDF ${actualWidth}mm x ${actualHeight}mm`)
//         console.log({ formWidth })
//         console.log(screen.width)
//         // pdf.addImage(base64image, 'PNG', 0, 0, formWidth, actualHeight)
//         pdf.addImage(base64image, 'PNG', 0, 0, formWidth, actualHeight, undefined,'FAST')
//         if(screen.width <= 768){
//             window.open(pdf.output("bloburl"), "_blank");
//         }else{
//             pdf.save('invoice.pdf')
//         } 
//         // pdf.save('downloaded.pdf')
//         spinner.classList.add('d-none')
//         check.classList.remove('d-none')
//         setTimeout(() => { check.classList.add('d-none') }, 3000) //will show content after 3 sec
//     })
// }



function downloadFunction(){
    spinner.classList.remove('d-none')
    var HTML_Width = $("#to-be-printed").width();
    var HTML_Height = $("#to-be-printed").height();
    var top_left_margin = 0;
    var PDF_Width = HTML_Width+(top_left_margin*2);
    var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;
    
    var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
    

    html2canvas($("#to-be-printed")[0],{scale:5}).then(function(canvas) {
        canvas.getContext('2d');
        
        // console.log(canvas.height+"  "+canvas.width);
        
        
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height],true);
        pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height, undefined,'FAST');
        
        
        for (var i = 1; i <= totalPDFPages; i++) { 
            pdf.addPage(PDF_Width, PDF_Height);
            pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height, undefined,'FAST');
        }

        if(screen.width <= 768){
            window.open(pdf.output("bloburl"), "_blank");
        }else{
            pdf.save('invoice.pdf')
        }
        spinner.classList.add('d-none')
        check.classList.remove('d-none')
        setTimeout(() => { check.classList.add('d-none') }, 3000) //will show content after 3 sec
    });
};