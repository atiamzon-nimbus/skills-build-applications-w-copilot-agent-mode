import app from "./index.js";

const PORT = 8000;
const apiUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.listen(PORT, () => {
  console.log(`Server running at ${apiUrl}`);
  console.log('Verify endpoints with:');
  console.log(`curl ${apiUrl}/api/users`);
  console.log(`curl ${apiUrl}/api/activities`);
});
