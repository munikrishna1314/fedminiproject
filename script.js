const generateImageForm = document.getElementById('generate-image-form');  
const formInput = document.getElementById('form-input');  
const imageContainer = document.getElementById('images-visible');  
const generatedImage = document.getElementById('generated-image');  
const errorMessage = document.getElementById('error-message');  
const loadingMessage = document.getElementById('loading-message');  
const clearButton = document.getElementById('clear-button');  

async function fetchImages(prompt) {  
    loadingMessage.innerText = "Loading... Please wait.";  
    generatedImage.src = ''; // Clear previous image  
    errorMessage.innerText = ''; // Clear previous error message  

    try {  
        // Simulating an API call with a timeout (replace with your actual API call)  
        const response = await fetch(`https://api.your-image-api.com/generate?text=${encodeURIComponent(prompt)}`);  
        const data = await response.json();  

        loadingMessage.innerText = ''; // Clear loading message  

        if (!data || !data.imageUrl) {  
            errorMessage.innerText = "No images found. Please try a different prompt.";  
            return;  
        }  

        generatedImage.src = data.imageUrl;  
        imageContainer.style.display = "block";  
    } catch (error) {  
        loadingMessage.innerText = ''; // Clear loading message  
        errorMessage.innerText = "Error fetching image: " + error.message;  
        console.error(error);  
    }  
}  

function clearFields() {  
    formInput.value = '';  
    generatedImage.src = '';  
    imageContainer.style.display = "none";  
    errorMessage.innerText = '';  
    loadingMessage.innerText = '';  
}  

generateImageForm.addEventListener('submit', (e) => {  
    e.preventDefault();  
    let enteredText = formInput.value.trim();  
    if (enteredText !== "") {  
        fetchImages(enteredText);  
    } else {  
        errorMessage.innerText = "Input field cannot be empty!";  
    }  
});  

// Add event listener for clear button  
clearButton.addEventListener('click', clearFields);  

// Add event listener for image download  
generatedImage.addEventListener('click', () => {  
    if (generatedImage.src) {  
        const link = document.createElement('a');  
        link.href = generatedImage.src;  
        link.download = 'generated-image.png'; // Set the file name  
        document.body.appendChild(link);  
        link.click();  
        document.body.removeChild(link);  
    }  
});