// const container = document.getElementById('newContents');

function handleRemoveContentItem(itemId) {
    document.getElementById(itemId).remove();
}

// Make the Content submit disable if there is no content
document.addEventListener("DOMContentLoaded", function () {

    const container = document.getElementById('editDevelopmentContentsContainer');
    const submitBtn = document.getElementById('all-content-submit');

    function toggleSubmitButton() {
        submitBtn.disabled = container.childElementCount === 0;
    }

    toggleSubmitButton();

    const observer = new MutationObserver(toggleSubmitButton);
    observer.observe(container, { childList: true });

});
// 

function addDevelopmentPortfolioContent() {
    const contentFields = document.getElementById('editDevelopmentContentsContainer');
    const totalFields = document.getElementById('faqAccordion').children.length + 1;
    const contents = contentFields.children.length;
    const sortOrder = totalFields + contents

    const contentTemplate = `
    <div class="mb-3 content-item">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Content ${sortOrder}</h5>
                <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.content-item').remove()">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
            <div class="card-body">
                <div class="row gy-4">
                    <div class="col-md-12">
                        <label for="faqQuestion" class="form-label">Title</label>
                        <input type="text" class="form-control" name="contents[${contents}][title]" required>
                    </div>
                    <div class="col-12">
                        <label for="description" class="form-label">Description</label>
                        <textarea name="contents[${contents}][description]" id="description" class="form-control" rows="5" required></textarea>
                    </div>
                    <div class="col-12">
                        <label for="coverImage" class="form-label">Image</label>
                        <input type="file" class="form-control" id="coverImage" name="contentImages" data-index="${contents}" accept="image/*" required>
                        <img id="imagePreview" src="#" alt="Image Preview" class="d-none mt-2 w-25 img-fluid" />
                    </div>
                    <div class="col-md-12">
                        <label for="faqSortOrder" class="form-label">Sort Order</label>
                        <input type="number" class="form-control" name="contents[${contents}][sortOrder]" value="${sortOrder}">
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    contentFields.insertAdjacentHTML('beforeend', contentTemplate);
}

function handleRemoveContent(contentId, elementId) {
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

function handleRemoveDigitalMarketingContent(contentId, elementId) {
    console.log({ contentId, elementId })
    if (confirm('Are you sure you want to delete this Content?')) {
        fetch(`/portfolio-marketing-content/delete/${contentId}`, {
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