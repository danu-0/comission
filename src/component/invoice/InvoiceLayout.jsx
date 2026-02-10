import { forwardRef } from "react";
import PropTypes from "prop-types";
import invoiceTheme from "./invoiceTemplates";

const InvoiceLayout = forwardRef(function InvoiceLayout(props, ref) {
  const { data } = props;
  const {
    companyName = "Company Name",
    logoUrl,
    clientName = "______________",
    clientContact = "______________",
    payments = [],
    totalPrice = 0||null,
    paymentMethod = "-",
    paymentNumber = "-",
    invoiceId = "-",
    template = "default",
  } = data || {};
 const t = invoiceTheme[template] || invoiceTheme.default;
 
  return (
  <div
    ref={ref}
    className={`
      ${t.paper.bg}
      ${t.paper.textPrimary}
      ${t.paper.border}
      border
      shadow-md
      p-8
      rounded-md
      max-w-3xl
      mx-auto
      text-sm
      font-[Inter]
      space-y-4
      relative
    `}
  >
    {/* Header */}
    <div className={`flex items-center justify-between border-b pb-4 ${t.paper.border}`}>
      <div>
        <h2 className={`text-2xl font-bold ${t.header.text}`}>
          {companyName || "Company Name"}
        </h2>
        <p className={`text-sm ${t.paper.textSecondary}`}>
          Commission Invoice
        </p>
      </div>

      {logoUrl && (
        <img src={logoUrl} alt="Logo" className="h-16 object-contain" />
      )}
    </div>

    {/* Info */}
    <div className="flex justify-between mt-4 text-sm">
      <div className="space-y-1">
        <p>
          <span className="font-semibold">Invoice No:</span> INV-{invoiceId}
        </p>
        <p>
          <span className="font-semibold">Date:</span>{" "}
          {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="space-y-1 text-right">
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

    {/* Alert */}
    <div
      className={`
        ${t.alert.bg}
        ${t.alert.text}
        ${t.alert.border}
        border-l-4
        p-3
        my-4
        rounded-md
      `}
    >
      ⚠️ Order saat ini sedang dalam kondisi <strong>dijeda</strong> sampai pihak
      klien melunasi pembayaran yang sudah ditetapkan pihak pemberi jasa (
      {companyName || "Company Name"}).
    </div>

    {/* Payment Table */}
    <table className={`w-full mt-6 text-sm border-collapse`}>
      <thead
        className={`${t.table.headerBg} ${t.table.headerText}`}
      >
        <tr>
          <th className="py-2 px-3 text-left border-b">#</th>
          <th className="py-2 px-3 text-left border-b">Payment Type</th>
          <th className="py-2 px-3 text-right border-b">Price (Rp)</th>
        </tr>
      </thead>

      <tbody>
        {payments.map((item, i) => (
          <tr
            key={i}
            className={`
              ${i % 2 === 0 ? t.table.rowBg : t.table.rowAltBg}
              ${t.table.rowText}
              border-b
            `}
          >
            <td className="px-3 py-2">{i + 1}</td>
            <td className="px-3 py-2">{item.type || "-"}</td>
            <td className="px-3 py-2 text-right">
              {item.price
                ? parseInt(item.price).toLocaleString()
                : "0"}
            </td>
          </tr>
        ))}

        <tr
          className={`
            font-bold
            ${t.table.totalBg}
            ${t.table.totalText}
          `}
        >
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

      <table className={`w-full text-sm border ${t.paper.border}`}>
        <tbody>
          <tr className="border-b">
            <td
              className={`
                p-2
                font-medium
                ${t.table.headerBg}
                ${t.table.headerText}
                w-1/3
              `}
            >
              Method
            </td>
            <td className="p-2">{paymentMethod || "-"}</td>
          </tr>

          <tr>
            <td
              className={`
                p-2
                font-medium
                ${t.table.headerBg}
                ${t.table.headerText}
              `}
            >
              Payment Number / Account
            </td>
            <td className="p-2">{paymentNumber || "-"}</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Footer */}
    <div
      className={`
        pt-6
        border-t
        text-center
        text-sm
        ${t.footer.text}
        ${t.paper.border}
      `}
    >
      <p>Terima kasih atas kepercayaan Anda kepada ({companyName})</p>
      <p>
        Silakan lakukan pembayaran Anda melalui rincian yang diberikan di atas.
      </p>
    </div>
  </div>
);

});

InvoiceLayout.propTypes = {
  data: PropTypes.any,
  theme: PropTypes.any,
};

export default InvoiceLayout;
