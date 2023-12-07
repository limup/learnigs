export async function json(req, res) {
  const buffers = [];

  if (isFileUploadRequest(req))
    return

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.body = null;
  }

  res.setHeader("Content-type", "application/json");
}

function isFileUploadRequest(req) {
  return (
    req.headers["content-type"] &&
    req.headers["content-type"].includes("multipart/form-data")
  );
}