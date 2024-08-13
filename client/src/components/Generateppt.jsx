import PptxGenJS from "pptxgenjs";

const generatePpt = (content) => {
  const pptx = new PptxGenJS();

  // Define the slide master layout (for uniformity across slides)
  pptx.defineSlideMaster({
    title: "MASTER_SLIDE",
    background: { fill: "F1F1F1" }, // Light grey background
    objects: [
      { rect: { x: 0, y: 0, w: "100%", h: "0.75in", fill: "003366" } }, // Header bar
      {
        text: {
          text: "Generative AI Presentation",
          options: { x: 0.5, y: 0.1, w: "90%", h: 0.5, fontSize: 18, color: "FFFFFF", bold: true },
        },
      },
    ],
    slideNumber: { x: 0.5, y: "90%", color: "003366", fontSize: 14 },
  });

  // Split content into an array of strings, each representing a slide
  const slidesContent = content.split("\n");

  // Loop through each piece of content and create a slide for it
  slidesContent.forEach((text, index) => {
    let slide = pptx.addSlide({ masterName: "MASTER_SLIDE" });

    // Extract title and content from the slide text
    const [title, ...contentLines] = text.split("**").map(line => line.trim());
    const content = contentLines.join("\n");

    // Add slide title
    slide.addText(title, {
      x: 0.5,
      y: 1,
      w: "90%",
      h: 0.5,
      fontSize: 24,
      bold: true,
      color: "003366", // Dark blue
      align: "center",
    });

    // Add content (use different formatting for bullets, etc.)
    const contentOptions = {
      x: 0.5,
      y: 1.8,
      w: "90%",
      h: "70%",
      fontSize: 16,
      color: "333333", // Dark grey
      bullet: true,
    };

    // Handling bullet points and normal text separately
    if (content.includes("*")) {
      const bulletPoints = content.split("*").filter(line => line.trim() !== "");
      bulletPoints.forEach((point, idx) => {
        slide.addText(point, { ...contentOptions, y: 1.8 + idx * 0.4 });
      });
    } else {
      slide.addText(content, contentOptions);
    }

    // Optional: Add images or other design elements based on content
    // slide.addImage({ path: 'path/to/image.png', x: 5, y: 1.5, w: 2, h: 1.5 });
  });

  // Save the presentation
  pptx.writeFile({ fileName: "AwesomeGeneratedPresentation.pptx" });
};

export default generatePpt;
