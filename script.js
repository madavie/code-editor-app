// Load the required scripts for Monaco Editor 

require.config({
  paths: {
    vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.23.0/min/vs",
  },
});

require(["vs/editor/editor.main"], function () {
  var editor = monaco.editor.create(document.getElementById("editor"), {
    value: "function myFunction() {\n  console.log('Hello, World!');\n}",
    language: "javascript",
    theme: "vs-dark", // Use a valid theme name here
    automaticLayout: true,
    // Enable suggestions for all languages
    suggest: true,
  });

  // Function to update language and theme immediately upon selection
  function updateLanguageAndTheme() {
    var language = document.getElementById("languageSelect").value;
    var theme = document.getElementById("themeSelect").value;

    // Update language
    monaco.editor.setModelLanguage(editor.getModel(), language);
    // Set theme
    monaco.editor.setTheme(theme);
  }

  // Bind change event to language and theme select elements
  document
    .getElementById("languageSelect")
    .addEventListener("change", updateLanguageAndTheme);
  document
    .getElementById("themeSelect")
    .addEventListener("change", updateLanguageAndTheme);

  // Define runCode() function
  window.runCode = function () {
    // Get the code from the editor
    var code = editor.getValue();

    try {
      // Evaluate the code
      var result = eval(code);

      // Display the result in the terminal
      document.getElementById("terminal").innerText = result;
    } catch (error) {
      // Handle any errors that occur during code execution
      console.error("Error running code:", error);
      alert("Error running code: " + error.message);
    }
  };
});