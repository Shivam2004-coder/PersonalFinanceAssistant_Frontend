import React from 'react'
import { useDispatch } from 'react-redux';
import useTimeRange from '../../../CustomHooks/useTimeRange';
import { setRangePDFSearchData, setRecentPDFSearchData } from '../../../utils/ReduxStore/graphSlice';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ExportPDFButton = (props) => {

    const { form , setForm , which } = props;
    const dispatch = useDispatch();
    // const recentPDFSearchData = useSelector((store) => store.graph.recentPDFSearchData);
    // const rangePDFSearchData = useSelector((store) => store.graph.rangePDFSearchData);
    // console.log("recent export ");
    // console.log(recentPDFSearchData);

    const {handleSearch} = useTimeRange();

    
    const generatePDF = (data) => {
        if (!data || !data.data) return;

        const doc = new jsPDF();

        // Title
        doc.setFontSize(16);
        doc.text(
        which === "recent" ? "Recent Transactions Report" : "Time Range Transactions Report",
        14,
        20
        );

        // Date of export
        doc.setFontSize(10);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);

        // Table headers
        const headers = [["Type", "Category", "Amount", "Description", "Date"]];

        // Table rows
        const rows = data.data.map((txn) => [
            txn.type,
            txn.category,
            txn.amount,
            txn.notes || "-",
            new Date(txn.createdAt).toLocaleDateString()
        ]);

        // Add table
        // ✅ Proper autoTable usage
        autoTable(doc, {
            startY: 35,
            head: [["Type", "Category", "Amount", "Description", "Date"]],
            body: rows,
            styles: { fontSize: 10, cellPadding: 3 },
            headStyles: { fillColor: [41, 128, 185] },
            alternateRowStyles: { fillColor: [245, 245, 245] },
        });
        // doc.autoTable({
        //     startY: 35,
        //     head: headers,
        //     body: rows,
        //     styles: { fontSize: 10, cellPadding: 3 },
        //     headStyles: { fillColor: [41, 128, 185] }, // blue header
        //     alternateRowStyles: { fillColor: [245, 245, 245] }, // zebra effect
        // });

        // Save PDF
        doc.save(which === "recent" ? "RecentTransactions.pdf" : "RangeTransactions.pdf");
    };

    const handleClick = async () => {
        if ( which === "recent" ) {
            const res = await handleSearch( form , setForm , dispatch , setRecentPDFSearchData );
            // console.log("I am inside the recent export ");
            // console.log(recentPDFSearchData);
            generatePDF(res);
        }
        else{
            const res = await handleSearch( form , setForm , dispatch , setRangePDFSearchData );
            // console.log("I am inside the range export ");
            // console.log(rangePDFSearchData);
            generatePDF(res);
        }

    }

    return (
        <div>
            <button
                className='bg-black p-2'
                onClick={handleClick}
            >
                Export PDF
            </button>
        </div>
    )
}

export default ExportPDFButton