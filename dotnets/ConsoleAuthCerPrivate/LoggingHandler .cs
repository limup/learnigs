using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace ConsoleAuthCerPrivate
{
    public class LoggingHandler : DelegatingHandler
    {
        public LoggingHandler(HttpMessageHandler innerHandler) : base(innerHandler) { }

        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            // Log da requisição
            Trace.WriteLine($"Sending Request:");
            Trace.WriteLine($"   Timestamp: {DateTime.UtcNow}");
            Trace.WriteLine($"   Request URI: {request.Method} {request.RequestUri}");
            if (request.Content != null)
            {
                string requestBody = await request.Content.ReadAsStringAsync();
                Trace.WriteLine($"   Request Content: {requestBody}");
            }

            foreach (var header in request.Headers)
            {
                Trace.WriteLine($"   Request Header: {header.Key}: {string.Join(",", header.Value)}");
            }

            var response = await base.SendAsync(request, cancellationToken);

            // Log da resposta
            Trace.WriteLine($"Received Response:");
            Trace.WriteLine($"   Timestamp: {DateTime.UtcNow}");
            Trace.WriteLine($"   Response Status: {response.StatusCode}");
            if (response.Content != null)
            {
                string responseBody = await response.Content.ReadAsStringAsync();
                Trace.WriteLine($"   Response Content: {responseBody}");
            }

            foreach (var header in response.Headers)
            {
                Trace.WriteLine($"   Response Header: {header.Key}: {string.Join(",", header.Value)}");
            }

            return response;
        }
    }
}