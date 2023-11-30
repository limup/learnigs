using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BarcodeStandard;
using SkiaSharp;

namespace ConsoleBarCodeGenerator
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
    }
}