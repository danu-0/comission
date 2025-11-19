import { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";

function InvoicePage() {
  const invoiceRef = useRef();

  const [companyName, setCompanyName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientContact, setClientContact] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentNumber, setPaymentNumber] = useState("");
  const [payments, setPayments] = useState([{ type: "", price: "" }]);

  const handleAddPayment = () => {
    setPayments([...payments, { type: "", price: "" }]);
  };

  const handleChangePayment = (index, field, value) => {
    const newPayments = [...payments];
    newPayments[index][field] = value;
    setPayments(newPayments);
  };

  const handleDownloadPDF = async () => {
    const canvas = await html2canvas(invoiceRef.current, {scale:3});
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice_${clientName}.pdf`);
  };

  const handleDownloadImage = async (type = "png") => {
    const canvas = await html2canvas(invoiceRef.current, {scale:3});
    const link = document.createElement("a");
    link.download = `invoice_${clientName}.${type}`;
    link.href = canvas.toDataURL(`image/${type}`);
    link.click();
  };

  const totalPrice = payments.reduce(
    (sum, item) => sum + (parseInt(item.price) || 0),
    0
  );

  return (
    <div className="p-8 space-y-6">
      <Link to="//" className="btn text-2xl">
        🔙
      </Link>
      <h2 className="text-2xl font-bold text-center">Invoice Generator</h2>

      {/* Form Input */}
      <div className="grid gap-4 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Company Name"
          className="p-2 border rounded"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="space-y-2">
          <label className="font-medium">Logo Image</label>
          <input
            type="text"
            placeholder="Paste Logo Image URL (optional)"
            className="p-2 border rounded w-full"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setLogoUrl(reader.result); // base64 image URL
                };
                reader.readAsDataURL(file);
              }
            }}
            className="block text-sm text-gray-500"
          />
        </div>

        <input
          type="text"
          placeholder="Client Name"
          className="p-2 border rounded"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Client Contact (Email/WhatsApp)"
          className="p-2 border rounded"
          value={clientContact}
          onChange={(e) => setClientContact(e.target.value)}
        />
        <input
          type="text"
          placeholder="Payment Method (e.g. Gopay, Dana, BCA)"
          className="p-2 border rounded"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <input
          type="text"
          placeholder="Payment Number / Account"
          className="p-2 border rounded"
          value={paymentNumber}
          onChange={(e) => setPaymentNumber(e.target.value)}
        />

        <div className="space-y-2">
          <p className="font-medium">Payment Items</p>
          {payments.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder="Type"
                className="p-2 border rounded w-full"
                value={item.type}
                onChange={(e) =>
                  handleChangePayment(index, "type", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Price"
                className="p-2 border rounded w-40"
                value={item.price}
                onChange={(e) =>
                  handleChangePayment(index, "price", e.target.value)
                }
              />
            </div>
          ))}
          <button
            className="text-blue-600 hover:underline"
            onClick={handleAddPayment}
          >
            + Add Payment Item
          </button>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center">Sample generate</h2>
      {/* Invoice Preview */}
      <div
        ref={invoiceRef}
        className="bg-white shadow-md p-8 rounded-md max-w-3xl mx-auto text-sm text-gray-700 font-[Inter] space-y-4 border relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h2 className="text-2xl font-bold">
              {companyName || "Company Name"}
            </h2>
            <p className="text-sm text-gray-500">Commission Invoice</p>
          </div>
          {logoUrl && (
            <img src={logoUrl} alt="Logo" className="h-16 object-contain" />
          )}
        </div>

        {/* Info */}
        <div className="flex justify-between mt-4 text-sm">
          <div>
            <p>
              <span className="font-semibold">Invoice No:</span> INV-
              {new Date().getTime().toString().slice(-5)}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date().toLocaleDateString()}
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold">Client:</span>{" "}
              {clientName || "______________"}
            </p>
            <p>
              <span className="font-semibold">Contact:</span>{" "}
              {clientContact || "______________"}
            </p>
          </div>
        </div>

        {/* Message */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 my-4 rounded-md">
          ⚠️ Order saat ini sedang dalam kondisi <strong>dijeda</strong> sampai
          pihak klien melunasi pembayaran yang sudah ditetapkan pihak pemberi
          jasa ({companyName || "Company Name"}).
        </div>

        {/* Payment Table */}
        <table className="w-full mt-6 border-t border-gray-200 text-sm">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              <th className="py-2 px-3 border-b text-left">#</th>
              <th className="py-2 px-3 border-b text-left">Payment Type</th>
              <th className="py-2 px-3 border-b text-right">Price (Rp)</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((item, i) => (
              <tr key={i} className="border-b">
                <td className="px-3 py-2">{i + 1}</td>
                <td className="px-3 py-2">{item.type || "-"}</td>
                <td className="px-3 py-2 text-right">
                  {item.price ? parseInt(item.price).toLocaleString() : "0"}
                </td>
              </tr>
            ))}
            <tr className="font-bold bg-blue-200 text-blue-900">
              <td colSpan="2" className="px-3 py-3 text-right">
                Total
              </td>
              <td className="px-3 py-3 text-right">
                Rp {totalPrice.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Payment Method Info */}
        <div className="mt-6">
          <h4 className="font-semibold mb-2">💳 Payment Information</h4>
          <table className="w-full border text-sm">
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-medium bg-gray-100 w-1/3">Method</td>
                <td className="p-2">{paymentMethod || "-"}</td>
              </tr>
              <tr>
                <td className="p-2 font-medium bg-gray-100">
                  Payment Number / Account
                </td>
                <td className="p-2">{paymentNumber || "-"}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t text-center text-sm text-gray-500">
          <p>Terima kasih atas kepercayaan Anda kepada ({companyName})</p>
          <p>
            Silakan lakukan pembayaran Anda melalui rincian yang diberikan di
            atas.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handleDownloadPDF}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Download PDF
        </button>
        <button
          onClick={() => handleDownloadImage("png")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Download PNG
        </button>
        <button
          onClick={() => handleDownloadImage("jpeg")}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Download JPG
        </button>
      </div>
    </div>
  );
}

export default InvoicePage;
