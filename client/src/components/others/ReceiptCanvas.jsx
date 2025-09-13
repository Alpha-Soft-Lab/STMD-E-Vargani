import React, { useRef, useEffect } from "react";
import Receipt from "../../assets/img/Receipt.jpg";

const ReceiptCanvas = ({ entry, isOpen, onReady }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!entry || !isOpen) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const scale = window.devicePixelRatio || 1;
    canvas.width = 600 * scale;
    canvas.height = 800 * scale;
    ctx.scale(scale, scale);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    img.src = Receipt;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 600, 800);

      const marginX = 60;
      let currentY = 140;
      const sectionSpacing = 80;
      const lineHeight = 30;

      currentY += sectionSpacing;

      ctx.textAlign = "left";
      ctx.font = "16px sans-serif";
      ctx.fillStyle = "#555";
      const customerText = "Recipient Details";
      ctx.fillText(customerText, marginX, currentY);

      const customerLineWidth = ctx.measureText(customerText).width;
      ctx.setLineDash([3, 2]);
      ctx.beginPath();
      ctx.moveTo(marginX, currentY + 8);
      ctx.lineTo(marginX + customerLineWidth, currentY + 8);
      ctx.strokeStyle = "#ccc";
      ctx.stroke();
      ctx.setLineDash([]);

      currentY += lineHeight;
      ctx.font = "16px sans-serif";
      ctx.fillStyle = "#111";
      ctx.fillText(`Name: ${entry.name?.toUpperCase()}`, marginX, currentY);
      currentY += lineHeight;
      ctx.fillText(`Payment Method: ${entry.paymentMethod?.toUpperCase()}`, marginX, currentY);

      currentY += sectionSpacing;

      ctx.font = "16px sans-serif";
      ctx.fillStyle = "#555";
      const transactionText = "Transaction Details";
      ctx.fillText(transactionText, marginX, currentY);

      const transactionLineWidth = ctx.measureText(transactionText).width;
      ctx.setLineDash([3, 2]);
      ctx.beginPath();
      ctx.moveTo(marginX, currentY + 8);
      ctx.lineTo(marginX + transactionLineWidth, currentY + 8);
      ctx.stroke();
      ctx.setLineDash([]);

      currentY += lineHeight;
      ctx.font = "16px sans-serif";
      ctx.fillStyle = "#111";
      ctx.fillText(`Amount: ₹${entry.amount || "0.00"}`, marginX, currentY);
      currentY += lineHeight;
      ctx.fillText(`Date: ${new Date(entry.date).toLocaleDateString("en-IN")}`, marginX, currentY);
      currentY += lineHeight;
      ctx.fillText(`Status: ${entry.status?.toUpperCase()}`, marginX, currentY);
      currentY += lineHeight;
      ctx.fillText(`Receipt No: ${entry.Entryno || ""}`, marginX, currentY);

      const footerY = 640;
      ctx.fillText("Authorized By: STMD", marginX, footerY);
      ctx.fillText(`Signature: ${entry.creatorName || ""}`, marginX, footerY + lineHeight);

      ctx.font = "14px sans-serif";
      ctx.fillStyle = "#444";
      ctx.textAlign = "center";
      ctx.fillText("Thank you for your contribution", 300, footerY + lineHeight * 3);


      if (onReady) onReady(canvasRef);
    };
  }, [entry, isOpen, onReady]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={800}
      className="w-full border rounded-lg shadow-lg bg-white"
    />
  );
};

export default ReceiptCanvas;
