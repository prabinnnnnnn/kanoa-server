function previewImage(event) {
    const imagePreview = document.getElementById('imagePreview');
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        imagePreview.src = e.target.result;
        imagePreview.classList.remove('d-none');
    }
    reader.readAsDataURL(file);
}

function singlePreviewImage(event) {
    const imagePreview = document.getElementById('singleImagePreview');
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        imagePreview.src = e.target.result;
        imagePreview.classList.remove('d-none');
    }
    reader.readAsDataURL(file);
}

function removeFeatureItem(itemId) {
    document.getElementById(itemId).remove();
}

function addNewFeatureItem() {
    const featureFields = document.getElementById('featureFields');
    const featureCount = document.querySelectorAll('.feature-item').length;
    const featureTemplate = `
    <div class="mb-3 feature-item">
        <div class="card">
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-md-4 col-12 mb-2 mb-md-0">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="featureTitle${featureCount}" name="features[${featureCount}][title]" placeholder="Enter title" required>
                            <label for="featureTitle${featureCount}">Title</label>
                        </div>
                    </div>
                    <div class="col-md-4 col-12 mb-2 mb-md-0">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="featureDescription${featureCount}" name="features[${featureCount}][value]" placeholder="Enter value" required>
                            <label for="featureDescription${featureCount}">Description</label>
                        </div>
                    </div>
                    <div class="col-md-3 col-10 mb-2 mb-md-0">
                        <div class="form-floating">
                            <input type="number" class="form-control" id="featureSortOrder${featureCount}" name="features[${featureCount}][sortOrder]" value="${featureCount + 1}">
                            <label for="featureSortOrder${featureCount}">Order</label>
                        </div>
                    </div>
                    <div class="col-md-1 col-2">
                        <button type="button" class="btn btn-outline-danger" onclick="this.closest('.feature-item').remove()">
                            <i class="ri-delete-bin-line"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    featureFields.insertAdjacentHTML('beforeend', featureTemplate);
}

function removeFaqItem(itemId) {
    document.getElementById(itemId).remove();
}

function addNewFaqItem() {
    const newIndex = document.querySelectorAll('.faq-item').length;
    const template = `
        <div class="accordion-item faq-item py-3" id="faq-item-new-${newIndex}">
            <h2 class="accordion-heade fs-3" id="heading-new-${newIndex}">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#collapse-new-${newIndex}" aria-expanded="true">
                    New FAQ
                </button>
            </h2>
            <div id="collapse-new-${newIndex}" class="accordion-collapse collapse show" 
                 data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                    <div class="mb-3">
                        <label class="form-label">Question</label>
                        <input type="text" class="form-control faq-question" 
                               name="faqs[${newIndex}][question]" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Answer</label>
                        <textarea class="form-control faq-answer" 
                                  name="faqs[${newIndex}][answer]" rows="3" required></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Sort Order</label>
                        <input type="number" class="form-control faq-sort" 
                               name="faqs[${newIndex}][sortOrder]" value="${newIndex + 1}" required>
                    </div>
                    <div class="text-end">
                        <button type="button" class="btn btn-danger btn-sm" 
                                onclick="removeFaqItem('faq-item-new-${newIndex}')">Remove FAQ</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('newFaqContainer').insertAdjacentHTML('beforeend', template);
}

function removeContentItem(itemId) {
    document.getElementById(itemId).remove();
}


// Make the Content submit disable if there is no content
document.addEventListener("DOMContentLoaded", function () {

    const container = document.getElementById('newContents');
    const submitBtn = document.getElementById('all-content-submit');

    function toggleSubmitButton() {
        submitBtn.disabled = container.childElementCount === 0;
    }

    toggleSubmitButton();

    // Re-check whenever content changes
    const observer = new MutationObserver(toggleSubmitButton);
    observer.observe(container, { childList: true });

});
// 

function addNewContent() {
    const container = document.getElementById('newContents');
    const index = newContentCounter++;

    const contentNumber = container.children.length + 1;

    const template = `
        <div class="accordion-item content-item py-4 border-top"
            id="content-item-new-${index}">

            <h2 class="accordion-header">
                <button class="accordion-button" type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse-new-${index}">
                    New Content ${contentNumber}
                </button>
            </h2>

            <div class="text-end mb-2">
                <button type="button" class="btn btn-danger btn-sm"
                    onclick="removeContentItem('content-item-new-${index}')">
                    Remove
                </button>
            </div>

            <div id="collapse-new-${index}"
                class="accordion-collapse collapse show">
                <div class="accordion-body">
                    <div class="mb-3">
                        <label class="form-label">Title</label>
                        <input type="text" class="form-control"
                            name="contents[${index}][title]" required>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Description</label>
                        <textarea class="form-control" rows="5"
                            name="contents[${index}][description]" required></textarea>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Image</label>
                        <input type="file"
                            name="contentImages"
                            class="form-control"
                            accept="image/*" required>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Sort Order</label>
                        <input type="number"
                            class="form-control"
                            name="contents[${index}][sortOrder]"
                            value="${contentNumber}">
                    </div>
                </div>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', template);
}

function deleteContent(contentId, elementId) {
    console.log({ contentId, elementId })
    if (confirm('Are you sure you want to delete this Content?')) {
        fetch(`/portfolio-development-content/delete/${contentId}`, {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById(elementId).remove();
                    window.location.reload();
                }
            })
            .catch(error => {
                console.error('Error:', error);
                window.location.reload();
            });
    }
}



document.getElementById('title').addEventListener('input', function () {
    let title = this.value;
    let slug = title.toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
    document.getElementById('slug').value = slug;
});

function deleteProductImage(imageId, elementId) {
    console.log({ imageId, elementId })
    if (confirm('Are you sure you want to delete this image?')) {
        fetch(`/products/delete-image/${imageId}`, {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById(elementId).remove();
                    window.location.reload();
                }
            })
            .catch(error => {
                console.error('Error:', error);
                window.location.reload();
            });
    }
}

function deleteServiceImage(imageId, elementId) {
    console.log({ imageId, elementId })
    if (confirm('Are you sure you want to delete this image?')) {
        fetch(`/services/delete-image/${imageId}`, {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById(elementId).remove();
                    window.location.reload();
                }
            })
            .catch(error => {
                console.error('Error:', error);
                window.location.reload();
            });
    }
}