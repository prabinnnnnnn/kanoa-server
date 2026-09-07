function previewMultipleImages(event) {
    const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    const imageDetailsContainer = document.getElementById('imageDetailsContainer');
    const imageDetailsTemplate = document.getElementById('imageDetailsTemplate');
    
    // Clear previous previews and details
    imagePreviewContainer.innerHTML = '';
    imageDetailsContainer.innerHTML = '';
    
    const files = event.target.files;
    
    Array.from(files).forEach((file, index) => {
        // Create image preview
        const previewCol = document.createElement('div');
        previewCol.className = 'col-md-3 mb-3';
        
        const img = document.createElement('img');
        img.className = 'img-fluid rounded';
        img.style.maxHeight = '200px';
        
        const reader = new FileReader();
        reader.onload = (e) => {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
        
        previewCol.appendChild(img);
        imagePreviewContainer.appendChild(previewCol);
        
        // Create image details form
        const detailsClone = imageDetailsTemplate.content.cloneNode(true);
        const detailsCard = detailsClone.querySelector('.card');
        
        // Add image number to card header
        const cardHeader = document.createElement('div');
        cardHeader.className = 'card-header';
        cardHeader.textContent = `Image ${index + 1}`;
        detailsCard.insertBefore(cardHeader, detailsCard.firstChild);
        
        // Set default values
        const altTextInput = detailsClone.querySelector('[name="imageAltTexts[]"]');
        const sortOrderInput = detailsClone.querySelector('[name="imageSortOrders[]"]');
        
        altTextInput.value = file.name.split('.')[0]; // Use filename as default alt text
        sortOrderInput.value = index; // Use index as default sort order
        
        imageDetailsContainer.appendChild(detailsClone);
    });
}
