using BarcodeStandard;
using SkiaSharp;
using ZXing;
using ZXing.QrCode;
using System.Drawing;
using ZXing.SkiaSharp.Rendering;

namespace ConsoleQRCodeGenerator
{
    public static class Base64Extensions
    {
        private static readonly Barcode _barcode = new()
        {
            EncodedType = BarcodeStandard.Type.Interleaved2Of5,
            ForeColor = SKColors.Black,
            BackColor = SKColors.White,
            Width = 700,
            Height = 50
        };

        public static string ConvertToImgemBase64(this string code)
        {
            var barcode = _barcode.Encode(code);
            SKData encoded = barcode.Encode(SKEncodedImageFormat.Jpeg, 100);
            string barcodeBase64String;
            using (MemoryStream m = new MemoryStream())
            {
                encoded.SaveTo(m);
                byte[] barcodeImageBytes = m.ToArray();
                barcodeBase64String = Convert.ToBase64String(barcodeImageBytes);
            }
            return barcodeBase64String;
        }

        private static readonly BarcodeWriter<SKBitmap> _qrCodeWriter = new()
        {
            Format = BarcodeFormat.QR_CODE,
            Options = new QrCodeEncodingOptions
            {
                DisableECI = true,
                CharacterSet = "UTF-8",
                Width = 700,
                Height = 700,
            },
            Renderer = new SKBitmapRenderer()
        };

        public static string ConvertQRCodeToImgemBase64(this string qrCodeData)
        {
            var qrCodeBitmap = _qrCodeWriter.Write(qrCodeData);
            // var qrCodeBitmap = _qrCodeWriter.Encode(qrCodeData);
            SKData encoded = qrCodeBitmap.Encode(SKEncodedImageFormat.Jpeg, 100);
            string barcodeBase64String;
            using (MemoryStream m = new MemoryStream())
            {
                encoded.SaveTo(m);
                byte[] barcodeImageBytes = m.ToArray();
                barcodeBase64String = Convert.ToBase64String(barcodeImageBytes);
            }
            return barcodeBase64String;
        }
    }
}