document.addEventListener("DOMContentLoaded", () => {

    const dropZones = document.querySelectorAll(".drop-image");

    dropZones.forEach((dropImage) => initDropZone(dropImage));

    function initDropZone(dropImage) {

        const imageInput = dropImage.querySelector(".image-input");
        const uploadContent = dropImage.querySelector(".upload-content");
        const previewContent = dropImage.querySelector(".preview-content");
        const imagePreview = dropImage.querySelector(".image-preview");
        const imageName = dropImage.querySelector(".image-name");
        const imageSize = dropImage.querySelector(".image-size");
        const removeImage = dropImage.querySelector(".remove-image");

        let currentObjectUrl = null;

        // ========================================
        // Pre-populate with existing image (edit/update mode)
        // ========================================
        const existingImageUrl = dropImage.dataset.existingImage;

        if (existingImageUrl) {
            imagePreview.style.display = "block";
            imagePreview.src = existingImageUrl;

            imageName.textContent = "Current image";
            imageSize.textContent = "";

            uploadContent.classList.add("d-none");
            previewContent.classList.remove("d-none");
        }

        // Click → open file picker
        dropImage.addEventListener("click", (event) => {
            if (event.target.closest(".remove-image")) {
                return;
            }
            imageInput.click();
        });

        // Select image from file picker
        imageInput.addEventListener("change", () => {
            const file = imageInput.files[0];
            if (file) {
                handleImage(file);
            }
        });

        // Drag over
        dropImage.addEventListener("dragover", (event) => {
            event.preventDefault();
            dropImage.classList.remove("border-secondary");
            dropImage.classList.add("border-primary");
        });

        // Drag leave
        dropImage.addEventListener("dragleave", () => {
            dropImage.classList.remove("border-primary");
            dropImage.classList.add("border-secondary");
        });

        // Drop
        dropImage.addEventListener("drop", (event) => {
            event.preventDefault();
            dropImage.classList.remove("border-primary");
            dropImage.classList.add("border-secondary");

            const file = event.dataTransfer.files[0];
            if (file) {
                handleImage(file);
            }
        });

        // Handle image (new file selected/dropped)
        function handleImage(file) {

            if (!file.type.startsWith("image/")) {
                alert("Please select a valid image.");
                return;
            }

            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                alert("Image size must be less than 5MB.");
                return;
            }

            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            imageInput.files = dataTransfer.files;

            if (currentObjectUrl) {
                URL.revokeObjectURL(currentObjectUrl);
            }
            currentObjectUrl = URL.createObjectURL(file);

            imagePreview.style.display = "block";
            imagePreview.src = currentObjectUrl;

            imageName.textContent = file.name;
            imageSize.textContent = formatFileSize(file.size);

            uploadContent.classList.add("d-none");
            previewContent.classList.remove("d-none");

            // A new file was picked, so the "existing image" is no longer relevant
            dropImage.dataset.existingImage = "";
        }

        // Remove image
        removeImage.addEventListener("click", (event) => {
            event.stopPropagation();

            imageInput.value = "";

            if (currentObjectUrl) {
                URL.revokeObjectURL(currentObjectUrl);
                currentObjectUrl = null;
            }

            imagePreview.src = "";
            imagePreview.style.display = "none";

            imageName.textContent = "";
            imageSize.textContent = "";

            previewContent.classList.add("d-none");
            uploadContent.classList.remove("d-none");

            // Signal to the backend that the existing image should be deleted
            dropImage.dataset.existingImage = "";

            let removedFlagInput = dropImage.querySelector(".image-removed-flag");
            if (!removedFlagInput) {
                removedFlagInput = document.createElement("input");
                removedFlagInput.type = "hidden";
                removedFlagInput.className = "image-removed-flag";
                removedFlagInput.name = imageInput.name + "_removed";
                dropImage.appendChild(removedFlagInput);
            }
            removedFlagInput.value = "1";
        });
    }

    function formatFileSize(bytes) {
        if (bytes < 1024) {
            return `${bytes} Bytes`;
        }
        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
});