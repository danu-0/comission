import { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";
import { getFeedbackLink } from "../../services/getLink";
import { FaCopy, FaArrowLeft } from "react-icons/fa";
import InvoiceLayout from "../../component/invoice/InvoiceLayout";

function InvoicePage() {
  const invoiceRef = useRef();

  const [companyName, setCompanyName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientContact, setClientContact] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentNumber, setPaymentNumber] = useState("");
  const [payments, setPayments] = useState([{ type: "", price: "" }]);
  const [link, setLink] = useState(null);
  const [loadingLink, setLoadingLink] = useState(false);
  const [isButtonAppear, setIsButtonAppear] = useState(false);
  const [template, setTemplate] = useState("default");

  const invoiceId = new Date().getTime().toString().slice(-5);

  const handleAddPayment = () => {
    setPayments([...payments, { type: "", price: "" }]);
  };

  const handleChangePayment = (index, field, value) => {
    const newPayments = [...payments];
    newPayments[index][field] = value;
    setPayments(newPayments);
  };

  const handleDownloadPDF = async () => {
    const canvas = await html2canvas(invoiceRef.current, { scale: 3 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice_${clientName}.pdf`);
    setIsButtonAppear(true);
  };

  const handleDownloadImage = async (type = "png") => {
    const canvas = await html2canvas(invoiceRef.current, { scale: 3 });
    const link = document.createElement("a");
    link.download = `invoice_${clientName}.${type}`;
    link.href = canvas.toDataURL(`image/${type}`);
    link.click();
    setIsButtonAppear(true);
  };

  

  const totalPrice = payments.reduce(
    (sum, item) => sum + (parseInt(item.price) || 0),
    0,
  );

  const handleGenerateLink = async () => {
    try {
      setLoadingLink(true);
      const data = await getFeedbackLink(invoiceId);
      setLink(data);
    } catch (err) {
      alert("Gagal generate feedback link");
    } finally {
      setLoadingLink(false);
      setIsButtonAppear(false);
    }
  };

  const invoiceData = {
  companyName,
  logoUrl,
  clientName,
  clientContact,
  payments,
  totalPrice,
  paymentMethod,
  paymentNumber,
  invoiceId,
  template,
};
  return (
    <div className="p-8 space-y-6">
      <Link to="/" className="btn text-2xl">
        <FaArrowLeft />
      </Link>
      <h2 className="text-2xl font-bold text-center">Form Invoice Generator</h2>

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
                  setLogoUrl(reader.result);
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
          <div className="flex w-full justify-between">
            <button
              className="text-blue-600 hover:underline"
              onClick={handleAddPayment}
            >
              + Add Payment Item
            </button>
            {isButtonAppear ? (
              <button
                onClick={handleGenerateLink}
                disabled={loadingLink}
                className={`text-blue-600 hover:underline ${
                  loadingLink
                    ? "opacity-50 cursor-not-allowed"
                    : "text-gray-600"
                }`}
              >
                {loadingLink ? "Generating..." : "Generate feedback link"}
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center">Sample generate</h2>
      <div className="max-w-2xl mx-auto">
  <label className="block font-medium mb-2">Invoice Theme</label>

  <div className="grid grid-cols-3 gap-3">
    {[
      { id: "default", name: "Default", desc: "Clean & professional" },
      { id: "dark", name: "Dark", desc: "Modern & bold" },
      { id: "minimal", name: "Minimal", desc: "Simple & clean" },
      { id: "diamond", name: "Formal", desc: "Formal" },
      { id: "gold", name: "Premium", desc: "premium" },
    ].map((t) => (
      <label
        key={t.id}
        className={`cursor-pointer rounded-lg border p-3 text-sm transition
          ${
            template === t.id
              ? "border-blue-600 bg-blue-50 ring-2 ring-blue-500"
              : "border-gray-200 hover:border-gray-400"
          }
        `}
      >
        <input
          type="radio"
          name="invoice-theme"
          value={t.id}
          checked={template === t.id}
          onChange={(e) => setTemplate(e.target.value)}
          className="hidden"
        />

        <div className="font-semibold">{t.name}</div>
        <div className="text-xs text-gray-500">{t.desc}</div>
      </label>
    ))}
  </div>
</div>

      {/* Invoice Preview */}
      <InvoiceLayout
        ref={invoiceRef}
        data={invoiceData}
      />

      {link && (
        <div className="max-w-2xl mx-auto mt-4 p-4 border rounded bg-gray-400-800">
          <p className="font-medium text-yellow-700 mb-2">
            Feedback link berhasil dibuat
          </p>

          <div className="flex flex-col gap-2">
            <a
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all"
            >
              {link.link}
            </a>

            <button
              className="ml-2 text-sm text-yellow-800 hover:underline flex justify-end items-center gap-2"
              onClick={() => {
                navigator.clipboard.writeText(link.link);
                alert("Link copied!");
              }}
            >
              <FaCopy />
              Copy
            </button>
          </div>
        </div>
      )}

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
