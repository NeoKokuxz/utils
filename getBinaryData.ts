const getBinaryData = async (token: string, baseUrl: string) => {
  try {
    // File path
    const pathToBinaryUrls = path.join(__dirname, 'ccda_binary_urls.txt');
    // Get the file content
    const fileContent = fs.readFileSync(pathToBinaryUrls, 'utf-8');
    // Split the file content into an array of URLs
    const urls = fileContent.split('\n').filter((url: string) => url.trim());

    for (const url of urls) {
      try {
        const response = await axios.get(baseUrl + url, {
          headers: {
            Authorization: token,
            Accept: 'application/json',
          },
        });
        // Create filename from URL by taking the last part and construct format 
        const filename = `${url.split('/').pop()}.xml`;
        // Write path
        const filePath = path.join(__dirname, 'data', filename);

        // Ensure the directory exists
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        // Write the response data to file
        fs.writeFileSync(filePath, JSON.stringify(response.data, null, 2));
        console.log(`Saved binary data to ${filePath}`);
      } catch (error) {
        console.error(`Error fetching binary from ${url}:`, error);
      }
    }
  } catch (error) {
    console.error('Error reading file:', error);
  }
};
