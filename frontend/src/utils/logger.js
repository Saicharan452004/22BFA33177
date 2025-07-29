// This is the exported function. We define the main logic inside it
// to keep the access token from being exposed globally.
export async function log(level, pkg, message) {
  // --- Configuration ---
  // Assign your token to the variable here
  const YOUR_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMDIyY3NtLnIxNzdAc3ZjZS5lZHUuaW4iLCJleHAiOjE3NTM3Njc1ODgsImlhdCI6MTc1Mzc2NjY4OCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImEyYTYwNDhmLTkzZjgtNDU0NC04OTg5LWY5MDNkMDU3YjIwYiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6Im11dGh5YWxhIHNhaSBjaGFyYW4iLCJzdWIiOiI1MTJiNmFkOC02NWIyLTRkYzgtODIyZC0yYjRiYjc2NmMxY2MifSwiZW1haWwiOiIyMDIyY3NtLnIxNzdAc3ZjZS5lZHUuaW4iLCJuYW1lIjoibXV0aHlhbGEgc2FpIGNoYXJhbiIsInJvbGxObyI6IjIyYmZhMzMxNzciLCJhY2Nlc3NDb2RlIjoiUHJqeVFGIiwiY2xpZW50SUQiOiI1MTJiNmFkOC02NWIyLTRkYzgtODIyZC0yYjRiYjc2NmMxY2MiLCJjbGllbnRTZWNyZXQiOiJ5YmJ3dVRzZlJTcEJuUnZjIn0.77somw7Hb8Agy5b5l77AakdTt17T8jfgkMbyTjICMGk';
  
  const LOG_API_ENDPOINT = 'http://20.244.56.144/evaluation-service/logs';

  // --- Main Logic ---
  const payload = {
    stack: "frontend",
    level: level,
    package: pkg,
    message: message,
  };

  try {
    const response = await fetch(LOG_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Now, use the variable correctly in the header
        'Authorization': `Bearer ${YOUR_ACCESS_TOKEN}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error('Authorization failed. Check your access token.');
      }
      throw new Error(`Server responded with status: ${response.status}`);
    }
  } catch (error) {
    // We log errors to the browser console so they don't cause an infinite loop
    console.error(`Logger Error:`, error.message);
  }
}